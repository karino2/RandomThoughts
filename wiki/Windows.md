Windows上の環境設定のメモなど。そのうちまとめてブログにしたい。

## VSCode関連

### PowerShell for VS 2022をVSCodeのintegrated terminalにする

settings.jsonに以下を書く。

```
    "terminal.integrated.profiles.windows": {
        "Developer PowerShell for VS 2022": {
            "source": "PowerShell",
            "icon": "terminal-powershell",
            "path": "{env:windir}\\SysWOW64\\WindowsPowerShell\\v1.0\\powershell.exe",
            "args": [
                "-noe",
                "-c",
                "&{Import-Module 'C:/Program Files/Microsoft Visual Studio/2022/Community/Common7/Tools/Microsoft.VisualStudio.DevShell.dll'; Enter-VsDevShell 9725add0 -SkipAutomaticLocation -DevCmdArguments '-arch=x64 -host_arch=x64'}"
            ]
        },
...
```