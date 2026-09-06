# Node.js 服务端接入示例

该示例演示如何在测速站后端保存 dnspup Customer API 凭证，并通过自己的 `/api/speed-test` 接口提交 HTTP 探测。它使用 Node.js 18 及以上版本的内置 API，无需安装第三方依赖。

## 运行

```bash
DNSPUP_API_KEY='your-api-key' \
DNSPUP_API_SECRET='your-api-secret' \
npm start
```

服务默认只监听 `127.0.0.1:3000`。另开终端调用：

```bash
curl -fsS -X POST \
  -H 'Content-Type: application/json' \
  -d '{"target":"https://example.com","ipVersion":"4"}' \
  'http://127.0.0.1:3000/api/speed-test'
```

如需指定节点，将 `GET /v1/nodes` 返回且已由业务允许的节点 ID 放入 `nodeIds`：

```json
{
  "target": "https://example.com",
  "ipVersion": "4",
  "nodeIds": ["node-id-from-v1-nodes"]
}
```

## 测试

```bash
npm test
```

## 生产使用前

此目录是集成示例，不是完整的公网 API 网关。部署前至少应增加：

- 用户或租户鉴权；
- 共享存储支持的频率限制和业务配额；
- 允许的目标、节点、端口和探测类型策略；
- 请求审计、敏感字段脱敏、指标和告警；
- 反向代理的 TLS、请求体上限和总超时；
- 对重复请求的短期缓存或去重。

dnspup API 会对受限目标进行服务端校验，调用方仍应根据自己的业务规则缩小允许范围。域名来源白名单还需要请求级 HMAC 签名，本示例适用于绑定固定公网 IP 的凭证。

完整说明见[API 接入指南](../../docs/customer-api-integration.md)。
