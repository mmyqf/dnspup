# dnspup Customer API v1 接入指南

本文面向需要把 dnspup 网络探测与监控能力接入测速站、运维平台、主机面板、状态页或自动化系统的开发和运维团队。接口的在线版本、可用能力和限制以 [dnspup API 文档](https://dnspup.com/api.html)及管理员分配的权益为准。

## 1. 接入范围

API 基址为 `https://api.dnspup.com`，当前版本为 `v1`。

| 能力组 | 能力 | 典型用途 |
| --- | --- | --- |
| 一次性探测 | Ping、Tcping、HTTP、DNS、Traceroute、MTR | 测速站、在线诊断、工单辅助定位 |
| 批量探测 | Ping、Tcping、HTTP | 资产巡检、发布前检查、站点批量可用性检测 |
| DNS 与网络工具 | DNS 传播、Find Ping、CDN 识别 | DNS 变更核验、可达地址发现、CDN 资产识别 |
| 网站与 IP 体检 | 网站体检、IP 纯净度、IP 信息 | TLS/DNS/安全检查、出口网络风险识别 |
| BGP/ASN | 路由资料、Peer 图谱、Looking Glass、安全、历史、新鲜度 | 线路分析、路由证据和供应商排障 |
| 持续监控 | HTTP、PING、TCPING、DNS、DNS 传播、SSL | 状态页、SLA、故障事件和趋势分析 |

## 2. 接入前准备

1. 向 dnspup 管理员申请 Customer API 凭证，并确认已开通的工具、月度请求配额、监控权益和来源白名单。
2. 为调用服务准备固定公网 IP，或准备一个由你控制的完整服务器域名。
3. 在服务端密钥管理系统中保存 `DNSPUP_API_KEY` 和 `DNSPUP_API_SECRET`。
4. 先调用 `GET /v1/health` 检查连通性，再调用 `GET /v1/account`、`GET /v1/tools` 和 `GET /v1/nodes` 核对权益与节点。

> API Key 和 Secret 属于服务端凭证。不要将它们放入浏览器 JavaScript、移动端安装包、桌面客户端、日志、截图或 Git 历史。

## 3. 认证与来源白名单

除健康检查外，请求需要携带：

```http
X-API-Key: <API Key>
X-API-Secret: <API Secret>
```

### 3.1 固定公网 IP

推荐生产服务使用固定公网出口 IP。管理员把密钥绑定到该 IP 后，服务端会按可信代理链判断实际来源。代理、NAT 或容器平台上线前，应确认最终公网出口与白名单一致。

### 3.2 服务器域名

域名来源模式除 Key 和 Secret 外，还要求以下请求头：

```http
X-API-Source-Domain: api.example.com
X-API-Timestamp: <Unix 时间戳>
X-API-Nonce: <一次性随机值>
X-API-Signature: <HMAC 签名>
```

签名覆盖请求方法、转义后的路径、原始查询串、时间戳、nonce、规范化域名以及原始请求体的 SHA-256。时间戳有效窗口为 90 秒，nonce 不得复用。域名模式的规范串分隔符、签名输出编码等实现细节必须与管理员提供的当前签名规范保持一致；不要仅发送可伪造的域名请求头，也不要自行猜测签名格式。

域名模式必须满足：

- 使用可靠时间源同步系统时钟；
- nonce 由密码学安全随机数生成器产生，每个请求唯一；
- JSON 序列化完成后再计算请求体哈希，签名后不得重新格式化请求体；
- 查询参数的顺序和百分号编码必须与实际发送的原始查询串完全相同；
- 签名失败、来源不匹配或 nonce 重放时，不应改用无签名请求降级。

## 4. 快速验证

### 4.1 健康检查

健康检查无需认证，也不用于判断当前密钥的权益。

```bash
curl -fsS 'https://api.dnspup.com/v1/health'
```

### 4.2 账户、工具和节点

```bash
export DNSPUP_API_KEY='your-api-key'
export DNSPUP_API_SECRET='your-api-secret'

curl -fsS \
  -H "X-API-Key: ${DNSPUP_API_KEY:?set DNSPUP_API_KEY}" \
  -H "X-API-Secret: ${DNSPUP_API_SECRET:?set DNSPUP_API_SECRET}" \
  'https://api.dnspup.com/v1/account'

curl -fsS \
  -H "X-API-Key: ${DNSPUP_API_KEY:?set DNSPUP_API_KEY}" \
  -H "X-API-Secret: ${DNSPUP_API_SECRET:?set DNSPUP_API_SECRET}" \
  'https://api.dnspup.com/v1/tools'

curl -fsS \
  -H "X-API-Key: ${DNSPUP_API_KEY:?set DNSPUP_API_KEY}" \
  -H "X-API-Secret: ${DNSPUP_API_SECRET:?set DNSPUP_API_SECRET}" \
  'https://api.dnspup.com/v1/nodes'
```

## 5. 一次性探测

所有示例均提交到 `POST /v1/probes`。`nodeIds` 为可选数组，其值来自 `GET /v1/nodes`；不指定时由平台按当前规则选择可用节点。

### 5.1 HTTP 网站测速

```json
{
  "type": "http",
  "target": "https://example.com",
  "ipVersion": "4",
  "count": 4,
  "method": "GET",
  "nodeIds": ["node-id-from-v1-nodes"]
}
```

```bash
curl -fsS -X POST \
  -H "X-API-Key: ${DNSPUP_API_KEY:?set DNSPUP_API_KEY}" \
  -H "X-API-Secret: ${DNSPUP_API_SECRET:?set DNSPUP_API_SECRET}" \
  -H 'Content-Type: application/json' \
  -d '{"type":"http","target":"https://example.com","ipVersion":"4","count":4,"method":"GET"}' \
  'https://api.dnspup.com/v1/probes'
```

### 5.2 其他探测类型

| 类型 | 请求体关键字段 | 示例 |
| --- | --- | --- |
| Ping | `type`、`target`、`ipVersion`、`count` | `{"type":"ping","target":"example.com","ipVersion":"4","count":4}` |
| Tcping | Ping 字段加 `port` | `{"type":"tcping","target":"example.com","ipVersion":"4","count":4,"port":443}` |
| DNS | `type`、`target`、`ipVersion`、`record`、`server` | `{"type":"dns","target":"example.com","ipVersion":"4","record":"A","server":"运营商DNS"}` |
| Traceroute | `type`、`target`、`ipVersion`、`mode` | `{"type":"traceroute","target":"example.com","ipVersion":"4","mode":"traceroute"}` |
| MTR | `type`、`target`、`ipVersion`、`mode` | `{"type":"mtr","target":"example.com","ipVersion":"4","mode":"mtr"}` |

目标、节点、记录类型、端口和探测次数必须使用当前账户权益允许的值。不要通过重复提交来模拟更大的节点并发，这会额外消耗配额并可能触发容量限制。

## 6. 批量探测与专项工具

### 6.1 批量探测

```bash
curl -fsS -X POST \
  -H "X-API-Key: ${DNSPUP_API_KEY:?set DNSPUP_API_KEY}" \
  -H "X-API-Secret: ${DNSPUP_API_SECRET:?set DNSPUP_API_SECRET}" \
  -H 'Content-Type: application/json' \
  -d '{"type":"ping","targets":["example.com","1.1.1.1"],"ipVersion":"4"}' \
  'https://api.dnspup.com/v1/batch-probes'
```

### 6.2 专项工具示例

| 接口 | 请求示例或参数 | 说明 |
| --- | --- | --- |
| `POST /v1/tools/dns-propagation` | `{"target":"example.com","record":"A","expectedValues":["203.0.113.10"]}` | 比较多节点 DNS 答案和预期值 |
| `POST /v1/tools/find-ping` | `{"target":"8.8.8.0/24"}` | 扫描公网 IPv4 范围的可达地址 |
| `POST /v1/tools/website-check` | `{"target":"https://example.com","nodeCount":3}` | 执行 HTTP、TLS、DNS 与安全体检 |
| `POST /v1/tools/ip-purity` | `{"ip":"1.1.1.1"}` | 查询 IP 风险与网络属性 |
| `GET /v1/tools/ip-info` | 无请求体 | 查询调用方 IP 的数据库信息 |
| `POST /v1/tools/cdn-detect` | `{"ips":["1.1.1.1","8.8.8.8"]}` | 批量识别 CDN 网段 |
| `POST /v1/tools/ip-purity/segment` | `{"ip":"1.1.1.1"}` | 查询公网 IPv4 的 C 段画像 |

### 6.3 BGP/ASN

| 方法与路径 | 说明 |
| --- | --- |
| `GET /v1/tools/bgp-asn?query=AS13335` | BGP/ASN 路由资料 |
| `GET /v1/tools/bgp-asn/graph?query=AS13335` | BGP Peer 图谱 |
| `GET /v1/tools/bgp-asn/looking-glass?query=AS13335` | Looking Glass 路由证据 |
| `GET /v1/tools/bgp-asn/security?query=AS13335` | 路由安全资料 |
| `GET /v1/tools/bgp-asn/history?query=1.1.1.1` | Origin ASN 历史观测 |
| `GET /v1/tools/bgp-asn/freshness` | BGP 数据新鲜度 |

查询参数应由标准 URL 编码器生成。签名模式下必须保留编码后的原始查询串，不能在签名和发送之间重新排序参数。

## 7. 持续监控

监控接口要求 API Key 已绑定用户。监控任务数量、最短周期、节点数量和月度监控 units 由账户权益决定。

### 7.1 创建 HTTP 监控

```bash
curl -fsS -X POST \
  -H "X-API-Key: ${DNSPUP_API_KEY:?set DNSPUP_API_KEY}" \
  -H "X-API-Secret: ${DNSPUP_API_SECRET:?set DNSPUP_API_SECRET}" \
  -H 'Content-Type: application/json' \
  -d '{"name":"主站可用性","type":"http","target":"https://example.com/health","intervalSeconds":300,"nodeCount":3,"failureThresholdPercent":50,"consecutiveFailures":2,"ipVersion":"4","responseTimeThresholdMs":10000}' \
  'https://api.dnspup.com/v1/monitors'
```

### 7.2 监控任务接口

| 方法与路径 | 说明 |
| --- | --- |
| `GET /v1/monitors` | 查询任务、状态和当前权益 |
| `POST /v1/monitors` | 创建监控任务 |
| `GET /v1/monitors/{monitorId}` | 查询单个任务配置和状态 |
| `PATCH /v1/monitors/{monitorId}` | 更新任务配置 |
| `DELETE /v1/monitors/{monitorId}` | 删除任务及历史；执行前必须二次确认 |
| `PATCH /v1/monitors/{monitorId}/enabled` | 暂停或恢复任务 |
| `GET /v1/monitors/{monitorId}/history` | 查询最近检测轮次和节点证据 |
| `GET /v1/monitors/{monitorId}/events` | 查询故障事件和通知状态 |

暂停示例：

```bash
curl -fsS -X PATCH \
  -H "X-API-Key: ${DNSPUP_API_KEY:?set DNSPUP_API_KEY}" \
  -H "X-API-Secret: ${DNSPUP_API_SECRET:?set DNSPUP_API_SECRET}" \
  -H 'Content-Type: application/json' \
  -d '{"enabled":false}' \
  'https://api.dnspup.com/v1/monitors/um_MONITOR_ID/enabled'
```

## 8. 测速站接入方案

浏览器不能直接调用 Customer API，因为这会公开密钥并允许访客消耗账户配额。正确的调用链为：

```text
浏览器 / App
    │  业务身份、目标和节点筛选条件
    ▼
你的测速站后端
    │  鉴权、限流、目标校验、审计、密钥注入
    ▼
dnspup Customer API
    │  多节点探测结果
    ▼
结果归一化 / 缓存 / 展示
```

建议流程：

1. 后端缓存 `GET /v1/nodes` 的可用节点列表，在前端只暴露业务允许的地区和线路。
2. 用户提交目标后，后端执行登录校验、租户配额、频率限制和目标格式校验。
3. 使用 `POST /v1/probes` 发起 HTTP 测速；批量场景使用 `POST /v1/batch-probes`，不要在应用层无界并发。
4. 后端保留请求追踪 ID、调用耗时、HTTP 状态和稳定错误码，但对日志中的目标与结果按隐私政策脱敏。
5. 前端按节点展示 DNS、连接、TLS、首字节、下载阶段和总耗时；字段映射应以真实 API 响应为准，不依赖未公开字段。
6. 对相同用户和相同目标设置短期去重或缓存，避免刷新页面重复消耗月配额。

本仓库提供一个零依赖 Node.js 服务端示例：

```bash
cd examples/customer-api-node
DNSPUP_API_KEY='your-api-key' \
DNSPUP_API_SECRET='your-api-secret' \
node speed-test-server.mjs
```

该示例用于说明安全边界和请求转发，不包含业务登录、分布式限流、计费、持久化或结果字段转换；这些能力应在你的业务网关中实现。

## 9. 错误处理与重试

所有 API 错误均使用稳定的 JSON error envelope。调用方应优先按错误码分支，不要解析错误文案。

| HTTP | 错误码 | 处理建议 |
| --- | --- | --- |
| 400 | `invalid_request`、`invalid_nodes`、`trusted_dns_resolution_failed` | 修正请求参数、节点或目标；不要自动重试 |
| 401 | `unauthorized` | 检查密钥状态、有效期和请求头；停止重试并告警 |
| 401 | `signature_required`、`malformed_signature`、`bad_signature`、`stale_signature` | 检查签名、原始字节和时钟同步；使用新 nonce 重建请求 |
| 403 | `source_forbidden`、`owner_required`、`target_restricted`、`tool_not_allowed` | 检查来源白名单、用户绑定、目标和工具授权 |
| 409 | `replay` | nonce 已使用；使用新 nonce 重新签名 |
| 409 | `entitlement_exceeded` | 降低监控数量、周期或节点数，或调整套餐 |
| 429 | `quota_exceeded` | 月度配额耗尽；不要短时重试 |
| 429 | `rate_limited`、`capacity_limited` | 尊重 `Retry-After`（若返回），增加抖动后退避 |
| 503 | `service_unavailable` | 对安全的读取请求退避重试；写请求先确认是否已受理 |

每次成功受理的 API 请求消耗 1 次 API 月配额；监控轮次按本轮选中节点数消耗监控 units，两类额度独立。由于公开文档未声明幂等键，`POST`、`PATCH` 和 `DELETE` 在网络超时后不得盲目重试。先查询资源状态，或在业务侧记录操作状态后再决定是否重放。

## 10. 生产检查清单

- [ ] 密钥仅位于服务端密钥管理系统，仓库和镜像中无明文凭证
- [ ] 固定 IP 或域名来源已正确绑定，域名模式已实现时间同步和 nonce 防重放
- [ ] 入站接口有用户鉴权、租户配额、速率限制、请求体大小限制和超时
- [ ] 只允许业务所需的探测类型、目标协议、端口、节点和 IP 版本
- [ ] 对内网、环回、链路本地、云元数据等高风险目标进行阻断，并保留 API 的目标限制
- [ ] 日志不记录 Secret、签名或完整敏感结果；错误响应不向前端透传内部细节
- [ ] 连接、读取和总请求均有超时；取消下游请求时同步取消上游调用
- [ ] 429 和 503 使用指数退避与随机抖动，非幂等请求不自动重放
- [ ] 定期检查 `/v1/account` 用量、到期时间和 `/v1/tools` 权益变化
- [ ] 删除监控等破坏性操作需要业务侧二次确认和审计

## 11. 接口总览

| 方法 | 路径 | 认证 | 用途 |
| --- | --- | --- | --- |
| GET | `/v1/health` | 否 | 服务健康检查 |
| GET | `/v1/account` | 是 | 套餐、到期时间与当前用量 |
| GET | `/v1/tools` | 是 | 当前 Key 已开通工具 |
| GET | `/v1/nodes` | 是 | 当前可用探测节点 |
| POST | `/v1/probes` | 是 | 单次网络探测 |
| POST | `/v1/batch-probes` | 是 | 批量 Ping、Tcping 或 HTTP |
| POST | `/v1/tools/dns-propagation` | 是 | DNS 传播检查 |
| POST | `/v1/tools/find-ping` | 是 | Find Ping |
| POST | `/v1/tools/website-check` | 是 | 网站综合体检 |
| POST | `/v1/tools/ip-purity` | 是 | IP 纯净度 |
| GET | `/v1/tools/ip-info` | 是 | IP 信息 |
| POST | `/v1/tools/cdn-detect` | 是 | CDN 识别 |
| GET | `/v1/tools/bgp-asn` | 是 | BGP/ASN 路由资料 |
| POST | `/v1/tools/ip-purity/segment` | 是 | IPv4 C 段画像 |
| GET | `/v1/tools/bgp-asn/graph` | 是 | Peer 图谱 |
| GET | `/v1/tools/bgp-asn/looking-glass` | 是 | Looking Glass 证据 |
| GET | `/v1/tools/bgp-asn/security` | 是 | 路由安全资料 |
| GET | `/v1/tools/bgp-asn/history` | 是 | Origin ASN 历史 |
| GET | `/v1/tools/bgp-asn/freshness` | 是 | BGP 数据新鲜度 |
| GET | `/v1/monitors` | 是，且需绑定用户 | 监控任务列表 |
| POST | `/v1/monitors` | 是，且需绑定用户 | 创建监控任务 |
| GET | `/v1/monitors/{monitorId}` | 是，且需绑定用户 | 监控详情 |
| PATCH | `/v1/monitors/{monitorId}` | 是，且需绑定用户 | 更新监控 |
| DELETE | `/v1/monitors/{monitorId}` | 是，且需绑定用户 | 删除监控及历史 |
| PATCH | `/v1/monitors/{monitorId}/enabled` | 是，且需绑定用户 | 暂停或恢复监控 |
| GET | `/v1/monitors/{monitorId}/history` | 是，且需绑定用户 | 最近检测轮次 |
| GET | `/v1/monitors/{monitorId}/events` | 是，且需绑定用户 | 故障事件和通知状态 |

## 12. 版本兼容建议

- 固定使用 `v1` 基址，不拼接未公开路径；
- JSON 解析器应忽略未知字段，以便服务端向后兼容地增加信息；
- 不把错误文案、节点显示名称或结果字段顺序作为稳定协议；
- 在测试环境保存经过脱敏的真实响应样本，为自己的字段映射建立契约测试；
- 上线前再次核对[在线 API 文档](https://dnspup.com/api.html)和 `GET /v1/tools` 返回的实际权限。
