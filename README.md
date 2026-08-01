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
  从连通性、网站性能、DNS 与路由，到本地网络隐私与持续监控
</p>

<p align="center">
  <a href="https://dnspup.com"><img src="https://img.shields.io/badge/Website-dnspup.com-0969da?style=for-the-badge" alt="Website"></a>
  <img src="https://img.shields.io/badge/Probe_Nodes-200%2B-16a34a?style=for-the-badge" alt="200+ Probe Nodes">
  <img src="https://img.shields.io/badge/Network-IPv4_%2B_IPv6-7c3aed?style=for-the-badge" alt="IPv4 and IPv6">
  <img src="https://img.shields.io/badge/Mobile-Ready-0891b2?style=for-the-badge" alt="Mobile Ready">
</p>

<p align="center">
  <a href="https://dnspup.com/ping/">在线 Ping</a> ·
  <a href="https://dnspup.com/http/">网站测速</a> ·
  <a href="https://dnspup.com/website-check/">网站体检</a> ·
  <a href="https://dnspup.com/dns-propagation/">DNS 传播</a> ·
  <a href="https://dnspup.com/bgp-asn/">BGP/ASN</a> ·
  <a href="https://dnspup.com/ip-purity/">IP 纯净度</a>
</p>

---

## 平台简介

[dnspup](https://dnspup.com) 将网络拨测、网站性能分析、DNS 与路由诊断、本地网络隐私检测、批量巡检和持续监控整合到一个平台。无需安装客户端，桌面端与手机端打开浏览器即可使用。

平台通过 200+ 个不同地区、不同运营商和海外线路的检测节点并行发起测试，帮助你判断问题来自 DNS、网络路由、端口、TLS、CDN、源站，还是当前本地网络环境。

<p align="center">
  <a href="https://dnspup.com">
    <img src="docs/images/dnspup-features-overview.png" alt="dnspup 全功能概览" width="760">
  </a>
</p>

## 核心优势

| 能力 | dnspup 提供的价值 |
| --- | --- |
| 多地区拨测 | 200+ 节点覆盖中国电信、中国联通、中国移动、多线、港澳台及海外线路 |
| 完整诊断链路 | 从 Ping、Tcping、HTTP、DNS 到 Traceroute、MTR、BGP/ASN，一次完成交叉定位 |
| 网站深度体检 | 分析 DNS、连接、TLS、首字节、下载耗时、安全响应头、DNSSEC 与邮件域名配置 |
| IPv4 与 IPv6 | 提供 IPv4、IPv6 下的 Ping、Tcping、网站测速与路由追踪能力 |
| 本地网络隐私 | 集成 IP 纯净度、出口一致性、WebRTC 泄露、DNS 泄露与浏览器指纹检测 |
| 运维效率 | 支持批量 Ping、批量 Tcping、批量 HTTP(S) 以及定时监控与故障通知 |
| 使用体验 | 无需安装，桌面端和手机端均可直接访问，结果按地区、线路和节点清晰展示 |

## 完整功能

### 连通性与网站性能

| 工具 | 主要用途 | 入口 |
| --- | --- | --- |
| 在线 Ping | 从多地区检测 ICMP 连通性、延迟、丢包与解析结果 | [开始 Ping](https://dnspup.com/ping/) |
| 在线 Tcping | 在禁 Ping 场景下检测 TCP 端口可达性与连接延迟 | [开始 Tcping](https://dnspup.com/tcping/) |
| 网站测速 | 分析 DNS、连接、TLS、重定向、首字节、下载与 HTTP 状态 | [开始测速](https://dnspup.com/http/) |
| FindPing | 在 IPv4、IP 范围或 CIDR 中快速查找可 Ping 地址 | [使用 FindPing](https://dnspup.com/find_ping/) |

### 路由与 DNS

| 工具 | 主要用途 | 入口 |
| --- | --- | --- |
| 路由追踪 | 从指定节点查看网络路径、跨网绕路与异常跳点 | [路由追踪](https://dnspup.com/traceroute/) |
| 在线 MTR | 持续观察链路节点、丢包率与延迟变化 | [开始 MTR](https://dnspup.com/mtr/) |
| DNS 记录查询 | 查询 A、AAAA、CNAME、MX、TXT、NS、PTR、SRV 等记录 | [DNS 查询](https://dnspup.com/dns/) |
| DNS 传播检测 | 比较多个检测节点返回的 DNS 答案，识别传播差异 | [传播检测](https://dnspup.com/dns-propagation/) |
| BGP/ASN 查询 | 查询路由归属、全球 Peer、Looking Glass 与路由安全证据 | [BGP/ASN 查询](https://dnspup.com/bgp-asn/) |

### 网站综合体检

| 检测项 | 说明 |
| --- | --- |
| 网站综合检测 | 集中检查 HTTP 安全响应头、TLS 证书、DNSSEC 与邮件域名配置 |
| TLS 证书 | 检查证书主体、有效期、协议与握手情况 |
| HTTP 安全响应头 | 检查常见浏览器安全策略与响应头配置 |
| DNSSEC | 核对域名 DNSSEC 配置与验证链状态 |
| 邮件域名配置 | 检查 MX、SPF 与 DMARC 配置 |

立即使用：[网站综合检测](https://dnspup.com/website-check/)

### 本地网络与隐私

| 工具 | 主要用途 | 入口 |
| --- | --- | --- |
| 本地网络检测 | 汇总 IPv4、IPv6、线路分流与当前网络环境 | [本地网络](https://dnspup.com/localhost/) |
| IP 纯净度 | 识别代理、VPN、Tor、数据中心与滥用风险信号 | [纯净度检测](https://dnspup.com/ip-purity/) |
| 出口检测 | 比较 HTTP、IPv6、WebRTC 与 DNS 所看到的网络出口 | [出口检测](https://dnspup.com/outbound/) |
| WebRTC 泄露 | 检查 ICE 候选中的公网、局域网与中继地址 | [WebRTC 检测](https://dnspup.com/webrtc-leak/) |
| DNS 泄露 | 核对 DNS 查询出口与当前 HTTP 出口是否一致 | [DNS 泄露检测](https://dnspup.com/dns-leak/) |
| 浏览器指纹 | 汇总 Canvas、WebGL、Audio 与设备环境特征 | [指纹检测](https://dnspup.com/fingerprint/) |

### 批量检测与持续监控

| 工具 | 主要用途 | 入口 |
| --- | --- | --- |
| 批量 Ping | 批量检查域名、IPv4、IP 范围与 CIDR 的连通性 | [批量 Ping](https://dnspup.com/batch_ping/) |
| 批量 Tcping | 批量检查目标端口的 TCP 可达性与延迟 | [批量 Tcping](https://dnspup.com/batch_tcping/) |
| 批量 HTTP(S) | 批量检查网站和接口的可用性 | [批量 HTTP(S)](https://dnspup.com/batch_http/) |
| 监控任务 | 定时执行 HTTP、Ping、Tcping、DNS 与 SSL 检测，记录可用率和故障事件 | [监控中心](https://dnspup.com/user/monitors/) |

### IPv6 工具

| 工具 | 入口 |
| --- | --- |
| IPv6 Ping | [开始检测](https://dnspup.com/ping_ipv6/) |
| IPv6 Tcping | [开始检测](https://dnspup.com/tcping_ipv6/) |
| IPv6 网站测速 | [开始检测](https://dnspup.com/http_ipv6/) |
| IPv6 路由追踪 | [开始检测](https://dnspup.com/traceroute_ipv6/) |

## 典型使用场景

- 网站访问慢，判断问题位于 DNS、CDN、源站还是运营商线路
- 服务器禁用 ICMP 后，通过 Tcping 检查业务端口
- 比较不同地区、不同运营商和海外线路的访问质量
- 排查跨网或跨境绕路、链路丢包与高延迟
- 检查 TLS 证书、HTTP 安全响应头、DNSSEC 和邮件域名配置
- 判断代理网络是否存在 IP、WebRTC 或 DNS 出口泄露
- 批量巡检域名、IP、端口、网站和接口，并持续记录可用率

## 快速开始

1. 打开 [dnspup.com](https://dnspup.com)
2. 选择需要的检测工具
3. 输入域名、IP、URL、端口或网段
4. 按需选择地区、运营商线路、节点与 DNS 服务器
5. 查看延迟、丢包、响应 IP、状态码、解析结果或路由路径

> 测试结果代表对应节点在测试时刻的网络状态。定位复杂问题时，建议结合 Ping、Tcping、DNS 查询、网站测速与路由追踪进行交叉判断。

## 共享节点激励计划

[共享节点激励计划](https://dnspup.com/article/content-11.html) 邀请用户将闲置的 NAS、云服务器或个人电脑接入 dnspup 检测网络。设备具备真实有效的 IP 地址并能稳定运行即可申请，节点上线后可在个人中心查看节点状态与收益。

- 按节点有效在线时长结算，每个节点预计每月收益约 10 至 20 元
- 平均带宽占用低于 1 Mbps，通常不会影响设备正常使用
- 支持飞牛 fnOS、Linux、Windows、OpenWrt、iKuai 与 Docker 环境
- 节点仅用于 ICMP、TCP、HTTP、DNS 和路由拨测
- 节点不进行数据转发、数据存储、IP 代理或 PCDN 业务

<details>
<summary><strong>查看参与步骤与接入须知</strong></summary>

### 如何参与

1. 打开 [dnspup 首页](https://dnspup.com)，注册并登录账户
2. 联系管理员索取领取码，并说明节点所在城市、运营商、系统配置、IPv6 支持情况和网络类型
3. 在个人中心选择设备系统，输入领取码并领取安装资格
4. 保存页面显示的一次性码，按照页面命令或安装包完成部署
5. 节点上线后返回个人中心查看节点状态与收益

### 接入须知

- 同一省份、同一运营商已有 3 个或以上公开可用节点时，将暂停接入；尚未覆盖的省会城市和运营商节点不受此限制
- 宽带同时用于 PCDN 或类似高负载用途时不建议安装，以免影响拨测稳定性
- 请勿自行添加黑名单或网络策略限制，以免影响检测结果的客观性
- 安装问题请联系 [cooperate@mail.dnspup.com](mailto:cooperate@mail.dnspup.com)

</details>

完整安装、状态检查、更新、启停、日志和卸载命令请查看[节点管理命令](docs/node-management-commands.md)。

## English Overview

**dnspup** is an all-in-one online network diagnostics platform for developers, website owners, and network operators. It combines 200+ multi-region probe nodes with Ping, Tcping, HTTP performance analysis, Traceroute/MTR, DNS propagation checks, BGP/ASN intelligence, website security checks, IPv6 diagnostics, privacy leak detection, batch testing, and continuous monitoring.

No client installation is required. Visit **[dnspup.com](https://dnspup.com)** from desktop or mobile to start testing.

## 反馈与合作

- 功能建议与问题反馈：[提交 Issue](https://github.com/mmyqf/dnspup/issues)
- 版本与计划公告：[查看 Releases](https://github.com/mmyqf/dnspup/releases)
- 节点与产品合作：[cooperate@mail.dnspup.com](mailto:cooperate@mail.dnspup.com)
- 在线使用：[dnspup.com](https://dnspup.com)

## 关于本仓库

本仓库用于 dnspup 的产品介绍、共享节点计划、使用文档、版本公告和问题反馈。平台业务代码未在本仓库中发布。

---

<p align="center">
  <a href="https://dnspup.com"><strong>立即使用 dnspup，快速看清网络状态</strong></a>
</p>
