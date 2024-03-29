- [[NuGet]]
- [[DirectCompute]]
- [[ノートPC]]
- [[ミニPC]]

Windows上の環境設定のメモなど。そのうちまとめてブログにしたい。

## 最初のセットアップ

- chocolateyをインストール ... [Chocolatey Software - Installing Chocolatey](https://chocolatey.org/install)
- choco install cmake
- choco install qt5-default
- choco install qtcreator
- choco install vscode

qt5-defaultはMINGWなのでVSの拡張は使えない、と言われてqtcreatorをインストールすることに。

## WSLのパス

`\\wsl.localhost\Ubuntu\home\karino2\bin` などのようにwsl.localhostで触れる。Windows側は/mnt/c以下

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

### msbuildでC++をパラレルビルドするのはUseMultiToolTask

似たよなオプションがいろいろあるが、C++でninjaの-jみたいな事をしたい場合は`/p:UseMultiToolTask=true`

## PowerShellのこまごまとしたこと

```
PS> notepad $PROFILE
PS> echo $env:APPDATA
PS> $env:PATH
```

久しぶりに使おうとして忘れているもの。 Out-GridView。

## 書籍： Concurrent Programming on Windows

[[【書籍】ConcurrentProgrammingOnWindows]]