# dnspup 节点安装后的管理命令大全：飞牛、Linux、Windows、OpenWrt、iKuai 与 Docker

节点安装完成后，日常维护主要包括：查看运行状态、启动或停止节点、重启服务、查看日志，以及更新或卸载 Agent。本文整理 dnspup 节点在不同系统中的管理命令，命令均来自节点管理文档，适合收藏备用。

dnspup 官网提供在线 Ping、Tcping、网站测速、路由追踪、DNS 查询、IP 纯净度和 IPv6 检测等工具。节点 Agent 用于参与节点侧的网络探测任务，安装后请根据实际运行环境选择对应命令。

## 使用前须知

- Linux、OpenWrt、飞牛和 Docker 命令通常需要 root 权限；Windows 命令请使用“管理员身份运行”的 PowerShell。
- 更新命令会从 download.dnspup.com 下载 Agent，部分命令同时配置了备用下载地址。
- 卸载命令会删除 Agent、服务配置及相关运行目录；Windows 卸载流程还可能移除由 dnspup 管理的用户、OpenSSH 配置、计划任务和 Defender 排除项。确认不再使用节点后再执行。
- 执行长命令时请完整复制代码块内容，不要遗漏引号、分号或管道符。

## 一、飞牛（FnOS）

### 查看状态

    /usr/local/bin/appcenter-cli check dnspup-agent

### 更新 Agent

    set -eu; app_dest=/var/apps/dnspup-agent/target; pkg_etc=/var/apps/dnspup-agent/etc; pkg_var=/var/apps/dnspup-agent/var; agent_bin="$app_dest/bin/netprobe-agent"; agent_config="$pkg_etc/agent.json"; agent_pid="$(cat "$pkg_var/agent.pid")"; kill -0 "$agent_pid"; current_version="$("$agent_bin" --version)"; updater="$(mktemp /tmp/netprobe-fnos-manual-update.XXXXXX)"; trap 'rm -f "$updater"' EXIT INT TERM; cp "$agent_bin" "$updater"; chmod 0755 "$updater"; systemd-run --wait --property=KillMode=process "--setenv=TRIM_APPDEST=$app_dest" "--setenv=TRIM_PKGETC=$pkg_etc" "--setenv=TRIM_PKGVAR=$pkg_var" "$updater" --apply-update --server 'https://download.dnspup.com' --fallback-server 'https://dnspup-1391169346.cos.ap-hongkong.myqcloud.com' --target "$agent_bin" --report-config "$agent_config" --current-version "$current_version" --process-pid "$agent_pid" --pid-file "$pkg_var/agent.pid" --log-file "$pkg_var/agent.log"

### 停止、启动和重启

    # 停止
    /usr/local/bin/appcenter-cli stop dnspup-agent

    # 启动
    /usr/local/bin/appcenter-cli start dnspup-agent

    # 重启
    /usr/local/bin/appcenter-cli stop dnspup-agent && /usr/local/bin/appcenter-cli start dnspup-agent

### 查看日志

    tail -n 200 -f /var/apps/dnspup-agent/var/agent.log

### 卸载节点

    set -eu; cli=/usr/local/bin/appcenter-cli; [ -x "$cli" ]; "$cli" stop dnspup-agent >/dev/null 2>&1 || true; "$cli" uninstall dnspup-agent; status="$("$cli" check dnspup-agent 2>/dev/null || true)"; [ "$status" != Installed ]

## 二、Linux

### 查看状态

    sudo systemctl status --no-pager netprobe-agent.service

### 更新 Agent

    sudo sh -c 'set -eu; agent=""; for candidate in /usr/local/bin/netprobe-agent /opt/dnspup/bin/netprobe-agent /var/lib/dnspup/bin/netprobe-agent /etc/netprobe/bin/netprobe-agent; do if [ -x "$candidate" ]; then agent="$candidate"; break; fi; done; [ -n "$agent" ]; current_version="$($agent --version)"; exec "$agent" --apply-update --server "https://download.dnspup.com" --fallback-server "https://dnspup-1391169346.cos.ap-hongkong.myqcloud.com" --target "$agent" --current-version "$current_version"'

### 停止、启动和重启

    # 停止
    sudo systemctl stop netprobe-agent.service

    # 启动
    sudo systemctl start netprobe-agent.service

    # 重启并检查状态
    sudo systemctl restart netprobe-agent.service && sudo systemctl status --no-pager netprobe-agent.service

### 查看日志

    sudo journalctl -u netprobe-agent.service -n 200 --no-pager

### 卸载节点

    set -eu; sudo -v; sudo systemctl disable --now netprobe-agent.service 2>/dev/null || true; sudo rm -f /etc/systemd/system/netprobe-agent.service; sudo systemctl daemon-reload; sudo rm -rf /etc/netprobe /usr/local/bin/netprobe-agent /opt/dnspup/bin/netprobe-agent /var/lib/dnspup/bin/netprobe-agent ~/.netprobe; if [ -f /etc/ssh/sshd_config ]; then sudo sed -i '/# BEGIN DNSPUP MANAGED USER/,/# END DNSPUP MANAGED USER/d' /etc/ssh/sshd_config; sudo sshd -t && (sudo systemctl reload sshd.service 2>/dev/null || sudo systemctl reload ssh.service 2>/dev/null || true) || true; fi; sudo rm -f /etc/sudoers.d/dnspuproot; id dnspuproot >/dev/null 2>&1 && sudo userdel -r -f dnspuproot 2>/dev/null || true; [ ! -e /etc/systemd/system/netprobe-agent.service ] && [ ! -e /usr/local/bin/netprobe-agent ] && [ ! -e /opt/dnspup/bin/netprobe-agent ] && [ ! -e /var/lib/dnspup/bin/netprobe-agent ] && [ ! -d /etc/netprobe ]

## 三、Windows

以下命令请在管理员 PowerShell 中执行。

### 查看状态

    Get-Service -Name 'NetProbeAgent'

### 更新 Agent

    & { $ErrorActionPreference='Stop'; [Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; $installer=Join-Path $env:TEMP ('netprobe-install-'+[guid]::NewGuid().ToString('N')+'.ps1'); $installerSignature=$installer+'.sig'; $releaseKeyModulus='raWRiKxl/KoqJfHg9qYPFqWUcggWzNiQxN9ZmrveOmZgEn6kxWTlxl9kKAmhUdxX9dMwXTuhqoo4iyKttXnXB2778H+z+8le7LzmEGiQh+dxts4+S/CHcWs3g3zNFdfKWM+t9Nmp/GwuYyRQhysHldLshBIsgLxZVGAJL+4H4uDdMy6kPLce4ebKM1DfuBuXPcn6i9piSPNNKVMgaVXvm2XKinMMOgqzm7A+LXIuV90Wlb+lTJCKpSRTPporjcr0QBem5Bwz07vgOe1c7bu1twUyKC/b4b8FQDs9Mk98C2z6kW+eewjK63xnkEcRnOvPAFbZMipC4LNCBq1v7yK3KFJBj8/TPb0t2m8mC1LjI9aZ8RQbFbS4VfKVDiJ/HbdBciRM72/bVZJku1FVwhtPwFVqpBvMC9iHHJsADth6oE3cOV7sJmjC+uK1F4kuFIbBt4nwgPWmgAq5Q5jX2in23+lWVWqN8YhiU2wcizyIcHgHUd20+lh2GwV6ZPhWkmXB'; $releaseKeyExponent='AQAB'; function Test-ReleaseSignature([string]$ContentPath,[string]$SignaturePath) { $parameters=New-Object Security.Cryptography.RSAParameters; $parameters.Modulus=[Convert]::FromBase64String($releaseKeyModulus); $parameters.Exponent=[Convert]::FromBase64String($releaseKeyExponent); $rsa=New-Object Security.Cryptography.RSACryptoServiceProvider; $sha256=[Security.Cryptography.SHA256]::Create(); try { $rsa.ImportParameters($parameters); return $rsa.VerifyData([IO.File]::ReadAllBytes($ContentPath),$sha256,[IO.File]::ReadAllBytes($SignaturePath)) } finally { $sha256.Dispose(); $rsa.Dispose() } }; try { $downloadErrors=@(); foreach ($source in @('https://download.dnspup.com/downloads/install.ps1','https://dnspup-1391169346.cos.ap-hongkong.myqcloud.com/downloads/install.ps1')) { try { Invoke-WebRequest -UseBasicParsing -Uri $source -OutFile $installer -TimeoutSec 180; if ((Get-Item -LiteralPath $installer).Length -le 0) { throw 'empty response' }; $verified=$false; foreach ($signatureSource in @('https://download.dnspup.com/downloads/install.ps1.sig','https://dnspup-1391169346.cos.ap-hongkong.myqcloud.com/downloads/install.ps1.sig')) { try { Invoke-WebRequest -UseBasicParsing -Uri $signatureSource -OutFile $installerSignature -TimeoutSec 180; if (Test-ReleaseSignature $installer $installerSignature) { $verified=$true; break }; throw 'signature mismatch' } catch { Remove-Item -LiteralPath $installerSignature -Force -ErrorAction SilentlyContinue } }; if (-not $verified) { throw 'installer signature could not be verified' }; break } catch { $downloadErrors += ($source + ': ' + $_.Exception.Message); Remove-Item -LiteralPath $installer,$installerSignature -Force -ErrorAction SilentlyContinue } }; if (-not (Test-Path -LiteralPath $installer)) { throw ('Could not download a verified NetProbe installer from any source: ' + ($downloadErrors -join ' | ')) }; & powershell.exe -NoProfile -NonInteractive -ExecutionPolicy Bypass -File $installer -RecoveryOnly; if ($LASTEXITCODE -ne 0) { throw "NetProbe installer exited with code $LASTEXITCODE" } } finally { Remove-Item -LiteralPath $installer,$installerSignature -Force -ErrorAction SilentlyContinue } }

### 停止、启动和重启

    # 停止
    Stop-Service -Name 'NetProbeAgent'

    # 启动
    Start-Service -Name 'NetProbeAgent'

    # 重启并检查状态
    Restart-Service -Name 'NetProbeAgent' -Force; Get-Service -Name 'NetProbeAgent'

### 查看日志

    Get-Content -LiteralPath (Join-Path $env:ProgramData 'dnspup\agent.log') -Tail 200 -Wait

### 卸载节点

卸载命令会清理 Windows 服务、dnspup 数据目录、节点用户、OpenSSH 相关配置、计划任务及由 Agent 创建的 Defender 排除项。请先确认机器上没有依赖这些配置的其他业务，再执行原始卸载脚本。

    $lifecycleMutex = New-Object Threading.Mutex($false, 'Global\dnspup-NetProbe-Agent-Lifecycle-v1'); $lifecycleLockHeld = $false; try { try { if (-not $lifecycleMutex.WaitOne([TimeSpan]::FromMinutes(15))) { throw 'Timed out waiting for the NetProbe Agent lifecycle lock' } } catch [Threading.AbandonedMutexException] {}; $lifecycleLockHeld = $true; $ErrorActionPreference = 'Stop'; $installDir = Join-Path $env:ProgramData 'dnspup'; $controlDir = Join-Path $env:ProgramData 'dnspup-agent-control'; $statePath = Join-Path $installDir 'system-state.json'; $openSSHMarker = Join-Path $installDir 'openssh.managed'; $managedMarker = Join-Path $controlDir 'dnspuproot.managed'; $defenderSchema = 'dnspup-defender-exclusions-v1'; $defenderMainMarker = Join-Path $installDir 'defender-exclusions.managed.json'; $defenderCleanupMarker = Join-Path $controlDir 'defender-exclusions.cleanup.json'; $defenderAllowedPaths = @((Join-Path $installDir 'netprobe-agent.exe'),(Join-Path $installDir 'netprobe-agent.exe.previous'),(Join-Path $controlDir 'update-helper.exe'),(Join-Path $controlDir 'uninstall-helper.exe'),(Join-Path $controlDir 'update-candidate.exe')); function Test-SystemOwnedProtectedPath([string]$path,[string]$pathType) { if (-not (Test-Path -LiteralPath $path -PathType $pathType)) { return $false }; $item=Get-Item -LiteralPath $path -Force; if (($item.Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0) { return $false }; try { $acl=Get-Acl -LiteralPath $path; $owner=$acl.GetOwner([Security.Principal.SecurityIdentifier]).Value; return $owner -eq 'S-1-5-18' -and $acl.AreAccessRulesProtected } catch { return $false } }; function Test-ManagedUserMarker { if (-not (Test-SystemOwnedProtectedPath $controlDir 'Container') -or -not (Test-SystemOwnedProtectedPath $managedMarker 'Leaf')) { return $false }; try { $actual=[IO.File]::ReadAllBytes($managedMarker); $expected=[Text.Encoding]::UTF8.GetBytes('dnspup-managed-windows-user-v1'); if ($actual.Length -ne $expected.Length) { return $false }; for ($index=0; $index -lt $expected.Length; $index++) { if ($actual[$index] -ne $expected[$index]) { return $false } }; return $true } catch { return $false } }; function Read-DefenderOwnershipMarker([string]$markerPath,[string]$parentPath) { if (-not (Test-SystemOwnedProtectedPath $parentPath 'Container') -or -not (Test-SystemOwnedProtectedPath $markerPath 'Leaf')) { return @() }; try { $marker=Get-Content -LiteralPath $markerPath -Raw | ConvertFrom-Json; $properties=@($marker.PSObject.Properties.Name | Sort-Object); if ($properties.Count -ne 2 -or $properties[0] -cne 'paths' -or $properties[1] -cne 'schema' -or [string]$marker.schema -cne $defenderSchema) { return @() }; $validated=@{}; foreach ($path in @($marker.paths)) { if ($path -isnot [string] -or [string]::IsNullOrWhiteSpace($path)) { return @() }; $allowed=$defenderAllowedPaths | Where-Object { [string]::Equals($_,$path,[StringComparison]::OrdinalIgnoreCase) } | Select-Object -First 1; if (-not $allowed -or $validated.ContainsKey($allowed.ToLowerInvariant())) { return @() }; $validated[$allowed.ToLowerInvariant()]=$allowed }; return @($validated.Values) } catch { return @() } }; $ownedExclusions=@{}; foreach ($path in @(Read-DefenderOwnershipMarker $defenderMainMarker $installDir)) { $ownedExclusions[$path.ToLowerInvariant()] = $path }; foreach ($path in @(Read-DefenderOwnershipMarker $defenderCleanupMarker $controlDir)) { $ownedExclusions[$path.ToLowerInvariant()] = $path }; foreach ($task in @('dnspup NetProbe Agent Watchdog','dnspup NetProbe Agent Startup','dnspup NetProbe Agent Logon')) { schtasks.exe /Delete /TN $task /F 2>$null | Out-Null }; Remove-ItemProperty -Path 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run' -Name 'dnspup NetProbe Agent Recovery' -ErrorAction SilentlyContinue; Stop-Service -Name 'NetProbeAgent' -Force -ErrorAction SilentlyContinue; sc.exe delete 'NetProbeAgent' 2>$null | Out-Null; if (Test-ManagedUserMarker) { if (Get-Command Remove-LocalUser -ErrorAction SilentlyContinue) { Remove-LocalUser -Name 'dnspuproot' -ErrorAction SilentlyContinue } else { net.exe user 'dnspuproot' /delete 2>$null | Out-Null }; Remove-Item -LiteralPath $managedMarker -Force -ErrorAction SilentlyContinue }; $sshConfig = Join-Path $env:ProgramData 'ssh\sshd_config'; if (Test-Path -LiteralPath $sshConfig) { $content = Get-Content -LiteralPath $sshConfig -Raw; $content = [regex]::Replace($content, '(?ms)\r?\n?# BEGIN DNSPUP MANAGED USER.*?# END DNSPUP MANAGED USER\r?\n?', [Environment]::NewLine); [IO.File]::WriteAllText($sshConfig, $content, (New-Object Text.UTF8Encoding($false))); Restart-Service -Name 'sshd' -Force -ErrorAction SilentlyContinue }; netsh.exe advfirewall firewall delete rule name='dnspup NetProbe OpenSSH' | Out-Null; if (Test-Path -LiteralPath $openSSHMarker) { $managedOpenSSH = (Get-Content -LiteralPath $openSSHMarker -Raw).Trim(); if ($managedOpenSSH -eq 'capability') { Remove-WindowsCapability -Online -Name 'OpenSSH.Server~~~~0.0.1.0' -ErrorAction SilentlyContinue | Out-Null } elseif ($managedOpenSSH -eq 'fallback') { Stop-Service -Name 'sshd' -Force -ErrorAction SilentlyContinue; sc.exe delete 'sshd' | Out-Null; Remove-Item -LiteralPath (Join-Path $env:ProgramFiles 'OpenSSH') -Recurse -Force -ErrorAction SilentlyContinue } }; if (Test-Path -LiteralPath $statePath) { $state = Get-Content -LiteralPath $statePath -Raw | ConvertFrom-Json; foreach ($setting in @($state.settings)) { powercfg.exe /setacvalueindex $state.activeScheme $setting.subgroup $setting.setting ([int64]$setting.ac) | Out-Null; powercfg.exe /setdcvalueindex $state.activeScheme $setting.subgroup $setting.setting ([int64]$setting.dc) | Out-Null }; if ($state.hibernateKnown) { if ([int]$state.hibernateEnabled -gt 0) { powercfg.exe /hibernate on | Out-Null } else { powercfg.exe /hibernate off | Out-Null } }; powercfg.exe /setactive $state.activeScheme | Out-Null; foreach ($desktop in @($state.desktops)) { New-Item -Path $desktop.path -Force | Out-Null; foreach ($property in @($desktop.properties)) { if ($property.existed) { New-ItemProperty -Path $desktop.path -Name $property.name -Value ([string]$property.value) -PropertyType String -Force | Out-Null } else { Remove-ItemProperty -Path $desktop.path -Name $property.name -ErrorAction SilentlyContinue } } } }; for ($attempt = 0; $attempt -lt 20 -and (Get-Service -Name 'NetProbeAgent' -ErrorAction SilentlyContinue); $attempt++) { Start-Sleep -Milliseconds 500 }; if (Get-Service -Name 'NetProbeAgent' -ErrorAction SilentlyContinue) { throw 'NetProbeAgent service still exists after uninstall' }; if (Test-Path -LiteralPath $installDir) { Remove-Item -LiteralPath $installDir -Recurse -Force -ErrorAction Stop }; if (Test-Path -LiteralPath $installDir) { throw 'Agent install directory still exists after uninstall' }; if ($ownedExclusions.Count -gt 0) { if (-not (Get-Command Remove-MpPreference -ErrorAction SilentlyContinue)) { throw 'Windows Defender cleanup command is unavailable' }; foreach ($path in $ownedExclusions.Values) { Remove-MpPreference -ExclusionPath $path -ErrorAction Stop } }; Remove-Item -LiteralPath $defenderMainMarker,$defenderCleanupMarker -Force -ErrorAction SilentlyContinue; if (Test-Path -LiteralPath $controlDir) { Remove-Item -LiteralPath $controlDir -Recurse -Force -ErrorAction Stop }; } finally { if ($lifecycleLockHeld) { $lifecycleMutex.ReleaseMutex() }; $lifecycleMutex.Dispose() }

## 四、OpenWrt

### 查看状态

    /etc/init.d/netprobe-agent running

### 更新 Agent

    set -eu; agent=/usr/local/bin/netprobe-agent; [ -x "$agent" ]; current_version="$($agent --version)"; exec "$agent" --apply-update --server 'https://download.dnspup.com' --fallback-server 'https://dnspup-1391169346.cos.ap-hongkong.myqcloud.com' --target "$agent" --current-version "$current_version"

### 停止、启动和重启

    # 停止
    /etc/init.d/netprobe-agent stop

    # 启动
    /etc/init.d/netprobe-agent start

    # 重启并检查状态
    /etc/init.d/netprobe-agent restart && /etc/init.d/netprobe-agent running

### 查看日志

    logread -e netprobe-agent -f

### 卸载节点

    set -eu; /etc/init.d/netprobe-agent stop >/dev/null 2>&1 || true; /etc/init.d/netprobe-agent disable >/dev/null 2>&1 || true; rm -f /etc/init.d/netprobe-agent /usr/local/bin/netprobe-agent /usr/local/bin/netprobe-agent.previous; rm -rf /etc/netprobe; [ ! -e /etc/init.d/netprobe-agent ] && [ ! -e /usr/local/bin/netprobe-agent ] && [ ! -d /etc/netprobe ]

## 五、iKuai

iKuai 环境使用 Docker 运行节点，并通过 DNSPUP_AGENT_PLATFORM=ikuai 指定平台。
命令中的镜像版本 `1.5.54` 为原文档记录的版本；后续如官方发布新标签，请按实际版本替换。

### 查看状态

    docker ps --filter name=^/dnspup-agent$

### 更新 Agent

    docker pull 'ghcr.io/dnspupdns/dnspup:1.5.54' && docker rm -f dnspup-agent && docker run -d --name dnspup-agent --restart unless-stopped --network host --cap-drop ALL --cap-add NET_RAW --security-opt no-new-privileges:true --read-only --tmpfs /tmp -e DNSPUP_AGENT_PLATFORM='ikuai' -v dnspup-agent-data:/var/lib/dnspup-agent 'ghcr.io/dnspupdns/dnspup:1.5.54'

### 停止、启动和重启

    # 停止
    docker stop dnspup-agent

    # 启动
    docker start dnspup-agent

    # 重启并检查状态
    docker restart dnspup-agent && docker ps --filter name=^/dnspup-agent$

### 查看日志

    docker logs --tail 200 -f dnspup-agent

### 卸载节点

    docker rm -f dnspup-agent

## 六、通用 Docker

适用于未使用 iKuai 平台参数的 Docker 部署。
命令中的镜像版本 `1.5.54` 为原文档记录的版本；后续如官方发布新标签，请按实际版本替换。

### 查看状态

    docker ps --filter name=^/dnspup-agent$

### 更新 Agent

    docker pull 'ghcr.io/dnspupdns/dnspup:1.5.54' && docker rm -f dnspup-agent && docker run -d --name dnspup-agent --restart unless-stopped --network host --cap-drop ALL --cap-add NET_RAW --security-opt no-new-privileges:true --read-only --tmpfs /tmp -v dnspup-agent-data:/var/lib/dnspup-agent 'ghcr.io/dnspupdns/dnspup:1.5.54'

### 停止、启动和重启

    # 停止
    docker stop dnspup-agent

    # 启动
    docker start dnspup-agent

    # 重启并检查状态
    docker restart dnspup-agent && docker ps --filter name=^/dnspup-agent$

### 查看日志

    docker logs --tail 200 -f dnspup-agent

### 卸载节点

    docker rm -f dnspup-agent

## 常见排查顺序

遇到节点离线或状态异常时，可以按下面顺序处理：

1. 先执行“查看状态”，确认服务、容器或 init 脚本是否仍在运行。
2. 查看最近 200 行日志，重点关注网络连接、权限和更新失败信息。
3. 尝试重启节点，再次检查状态。
4. 只有在确认安装损坏或不再需要节点时，才执行更新或卸载命令。

命令执行后如果仍无法恢复，建议在论坛反馈时同时提供：运行环境、状态命令输出、最近日志，以及是否刚执行过更新或系统升级。请注意隐藏公网 IP、Token 和其他敏感信息。

---

原文整理：飞牛节点机器管理命令文档  
项目官网：https://dnspup.com/
