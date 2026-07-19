<p align="center">
  <a href="https://dnspup.com">
    <img src="https://dnspup.com/images/dnspup-logo.png" alt="dnspup" width="420">
  </a>
</p>

<h1 align="center">dnspup</h1>

<p align="center">
  面向站长、开发者与网络运维人员的一站式在线网络检测平台
</p>

<p align="center">
  <a href="https://dnspup.com"><img src="https://img.shields.io/badge/Website-dnspup.com-0969da?style=for-the-badge" alt="Website"></a>
  <a href="https://dnspup.com/ping/"><img src="https://img.shields.io/badge/Online-Ping-16a34a?style=for-the-badge" alt="Online Ping"></a>
  <a href="https://dnspup.com/http/"><img src="https://img.shields.io/badge/Website-Speed_Test-f59e0b?style=for-the-badge" alt="Website Speed Test"></a>
</p>

## dnspup 是什么？

[dnspup](https://dnspup.com) 提供在线 Ping、Tcping、网站测速、路由追踪、DNS 查询、IPv6 检测和网站综合检测。通过不同地区与网络线路的测试节点，帮助你快速判断问题来自 DNS、网络路由、端口、TLS、CDN 还是源站。

无需安装客户端，打开浏览器即可开始检测。

## 在线工具

| 工具 | 用途 | 立即使用 |
| --- | --- | --- |
| 在线 Ping | 检查 ICMP 连通性、延迟与丢包 | [开始 Ping](https://dnspup.com/ping/) |
| 在线 Tcping | 检查指定 TCP 端口是否可达 | [开始 Tcping](https://dnspup.com/tcping/) |
| 网站测速 | 分析 DNS、连接、TLS、首字节和下载耗时 | [开始测速](https://dnspup.com/http/) |
| 路由追踪 / MTR | 定位路由跳点、绕路和丢包位置 | [路由追踪](https://dnspup.com/traceroute/) |
| DNS 查询 | 查询 A、AAAA、CNAME、MX、TXT、NS 等记录 | [DNS 查询](https://dnspup.com/dns/) |
| 网站综合检测 | 检查安全响应头、TLS、DNSSEC、SPF 与 DMARC | [网站检测](https://dnspup.com/website-check/) |
| FindPing | 查找更适合目标网络的测试节点 | [使用 FindPing](https://dnspup.com/find_ping/) |
| IPv6 工具 | 从 IPv6 节点执行 Ping、Tcping 和路由测试 | [IPv6 Ping](https://dnspup.com/ping_ipv6/) |

## 全民共享计划

全民共享计划邀请用户把自己拥有并有权管理的闲置设备接入 dnspup 测试网络。节点保持有效在线并完成平台分配的网络检测任务后，用户可以在个人中心实时查看节点状态、本期与累计在线时长、计费标准、预估收益和结算记录。

适合接入的设备包括闲置 VPS、Windows 个人电脑、Linux 主机和飞牛 fnOS NAS。

### 当前支持的平台

| 设备类型 | 支持平台 | 架构 |
| --- | --- | --- |
| VPS / 云服务器 | Linux + systemd | x86_64、ARM64 |
| 个人电脑 / 服务器 | Windows 10、Windows Server 2016 或更新版本 | x86_64 |
| NAS | 飞牛 fnOS | x86_64、ARM64 |

> 群晖、威联通、Docker 和 macOS 暂未在公开安装入口中列为正式支持平台。请勿使用未经验证的安装方式。

### 如何参与

1. 在 [dnspup](https://dnspup.com) 注册并登录账户
2. 获取管理员发放的全民共享计划领取码
3. 在个人中心的“添加节点”区域输入领取码并领取安装资格
4. 选择飞牛 fnOS、Linux 或 Windows
5. 复制平台生成的一次性安装命令，或下载对应的 fnOS 安装包
6. 在自己拥有并有权管理的设备上完成安装
7. 节点上线后，在个人中心实时查看状态、在线时长、预估收益和结算记录

领取码绑定当前账户，每个领取码用于安装一个节点。成功安装后一次性凭据自动失效。

### 收益与结算

- 预估收益根据节点的有效在线时长和平台当前计费标准计算
- 节点单独配置的计费标准优先于平台统一标准
- 个人中心会显示本期在线、累计在线、预估收益和已结算金额
- 结算周期结束且达到最低有效在线时长后，才可以提交提现申请
- 提现申请需要平台审核，最终金额以结算记录为准
- 平台不承诺固定收益；网络质量、在线稳定性、有效任务和规则调整都会影响结果

### 安装前须知

- 只能安装在你拥有或已获得明确授权的设备与网络中
- 请确认 VPS、宽带和机房服务商允许相关网络检测流量
- 节点会消耗少量 CPU、内存、网络连接和带宽
- 不要公开安装命令、领取码或 Token；它们属于节点接入凭据
- 如凭据疑似泄露，应立即撤销并重新生成
- 不再参与时，请卸载 Agent 并撤销节点 Token

## 适合这些场景

- 网站打开慢，判断问题在 DNS、CDN、源站还是运营商线路
- 服务器禁用 ICMP 后，通过 Tcping 检查业务端口
- 比较不同地区、不同运营商访问网站的速度
- 排查跨境网络绕路、丢包和高延迟
- 检查域名解析、IPv6、TLS 证书和邮件安全配置
- 批量巡检域名、IP、端口与 HTTP 服务

## 快速开始

1. 打开 [dnspup.com](https://dnspup.com)
2. 选择需要的检测工具
3. 输入域名、IP、URL 或端口
4. 选择地区和运营商线路
5. 查看延迟、丢包、响应 IP、状态码及路由结果

> 测试结果代表对应节点在测试时刻的网络状态。定位复杂问题时，建议结合 Ping、Tcping、DNS 查询和路由追踪交叉判断。

## English

**dnspup** is an online network diagnostics platform for developers, website owners, and network operators. It provides multi-region Ping, Tcping, website speed testing, traceroute/MTR, DNS lookup, IPv6 diagnostics, and website security checks.

The **Community Sharing Program** lets participants connect authorized idle Linux VPSs, Windows computers, and fnOS NAS devices to the dnspup probe network. Participants can monitor node status, effective online time, estimated earnings, and settlement records from their account dashboard.

Visit **[dnspup.com](https://dnspup.com)** to get started.

## 反馈与合作

发现问题、希望增加检测地区，或有节点与产品合作需求：

- 在本仓库提交 [Issue](https://github.com/mmyqf/dnspup/issues)
- 查看 [Releases](https://github.com/mmyqf/dnspup/releases) 获取计划公告
- 通过 [dnspup 官网](https://dnspup.com) 联系我们

## 关于本仓库

本仓库用于 dnspup 的产品介绍、全民共享计划公告、使用入口和问题反馈。平台业务代码未在本仓库中发布。

---

<p align="center">
  <a href="https://dnspup.com"><strong>立即使用 dnspup</strong></a>
</p>
