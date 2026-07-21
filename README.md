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

## 共享节点激励计划

[共享节点激励计划](https://dnspup.com/article/content-11.html) 邀请用户将闲置的 NAS、云服务器或个人电脑接入 dnspup 检测网络。设备具备真实有效的 IP 地址并能稳定运行即可申请，节点上线后可在个人中心查看节点与收益。

### 节点收益与资源占用

- 按节点有效在线时长结算，每个节点预计每月收益约 10～20 元
- 在线越稳定，结算收益越稳定
- 平均带宽占用低于 1 Mbps，通常不会影响设备正常使用

节点仅用于 ICMP、TCP、HTTP 和 traceroute 拨测，不进行数据转发、数据存储、IP 代理或数据提交，也不参与 PCDN 及其他业务。

### 如何参与

1. 打开 [dnspup 首页](https://dnspup.com)，点击右上方“习惯设置”
2. 注册并登录账户
3. 联系管理员索取领取码，并说明节点所在城市、运营商、系统配置、是否支持 IPv6，以及 IPv4 是公网路由还是普通 NAT 家庭宽带；无法判断时请提供到 `223.5.5.5` 的路由追踪截图
4. 在个人中心选择飞牛 fnOS、Linux 或 Windows，输入领取码并点击“领取安装资格”
5. 保存页面显示的一次性码，并按设备类型完成安装
6. 节点上线后返回个人中心查看节点与收益

| 设备类型 | 安装方式 |
| --- | --- |
| 飞牛 fnOS | 下载对应安装包，在应用中心选择“手动安装”，上传安装包后填写一次性码 |
| Linux | 领取安装资格后复制页面显示的命令，在 SSH 终端执行 |
| Windows | 领取安装资格后复制页面显示的命令，在 CMD 中执行 |

完整图文步骤请查看[共享节点激励计划原文](https://dnspup.com/article/content-11.html)。

### 接入须知

- 同一省份、同一运营商已有 3 个或以上公开可用节点时，将暂停接入；能提供当前尚未覆盖的省会城市和运营商节点不受此限制
- 宽带同时用于 PCDN 或类似高负载用途时不建议安装，以免影响带宽稳定性
- 节点用于网络诊断，请勿自行添加黑名单或网络策略限制，以免影响检测结果的客观性
- 安装问题请联系 [cooperate@mail.dnspup.com](mailto:cooperate@mail.dnspup.com)

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

The **Community Node Incentive Program** lets participants connect idle Linux servers, Windows computers, and fnOS NAS devices to the dnspup probe network. Nodes are used only for ICMP, TCP, HTTP, and traceroute probes, with average bandwidth usage below 1 Mbps. Estimated monthly earnings are CNY 10–20 per node based on effective online time.

Visit **[dnspup.com](https://dnspup.com)** to get started.

## 反馈与合作

发现问题、希望增加检测地区，或有节点与产品合作需求：

- 在本仓库提交 [Issue](https://github.com/mmyqf/dnspup/issues)
- 查看 [Releases](https://github.com/mmyqf/dnspup/releases) 获取计划公告
- 通过 [dnspup 官网](https://dnspup.com) 联系我们

## 关于本仓库

本仓库用于 dnspup 的产品介绍、共享节点激励计划公告、使用入口和问题反馈。平台业务代码未在本仓库中发布。

---

<p align="center">
  <a href="https://dnspup.com"><strong>立即使用 dnspup</strong></a>
</p>
