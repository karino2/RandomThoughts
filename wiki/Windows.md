- [NuGet](NuGet)
- [DirectCompute](DirectCompute)
- [ノートPC](%E3%83%8E%E3%83%BC%E3%83%88PC)
- [ミニPC](%E3%83%9F%E3%83%8BPC)
- [VSCode](VSCode)
- [VisualStudio](VisualStudio)

Windows上の環境設定のメモなど。そのうちまとめてブログにしたい。

## 最初のセットアップ

- chocolateyをインストール ... [Chocolatey Software - Installing Chocolatey](https://chocolatey.org/install)
- choco install cmake
- choco install qtcreator
- choco install vscode
- choco install git
- choco install lazygit

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

なお、VisualStudioの中では、プロジェクトのプロパティのC/C++の中の全般に「複数プロセッサによるコンパイル」という項目があり、
同じ効果ではないだろうがなんか並列にはなる。

Directory.Build.propsを作れば

- [C++ build throughput investigation and tune up - C++ Team Blog](https://devblogs.microsoft.com/cppblog/cpp-build-throughput-investigation-and-tune-up/)
   - [Customize your build by folder or solution - MSBuild - Microsoft Learn](https://learn.microsoft.com/en-us/visualstudio/msbuild/customize-by-directory?view=vs-2022)


```
<Project>
   <ItemDefinitionGroup>
    <ClCompile>
      <MultiProcessorCompilation>true</MultiProcessorCompilation>
    </ClCompile>
    <!--  カスタムビルドの方の設定、こっちはあんま意味ない気がするが。 -->
    <CustomBuild>
      <BuildInParallel>true</BuildInParallel>
    </CustomBuild>
  </ItemDefinitionGroup>
</Project>
```


## PowerShellのこまごまとしたこと

```
PS> notepad $PROFILE
PS> echo $env:APPDATA
PS> $env:PATH
PS> $env:PATH.Split(";")
```

久しぶりに使おうとして忘れているもの。 Out-GridView。

## Python Invokeの実行

[Python](Python)

```
$ python -m invoke --list
```

などとpythonコマンド越しに実行するのが楽そう。

## 書籍： Concurrent Programming on Windows

[【書籍】ConcurrentProgrammingOnWindows](%E3%80%90%E6%9B%B8%E7%B1%8D%E3%80%91ConcurrentProgrammingOnWindows)

## リモートデスクトップにログイン出来ない

「お使いの資格情報は機能しませんでした」と表示され接続されない。いろいろ調査した結果、
ホストマシンに一度MSアカウントとしてログインし直す必要がある模様。＞[Microsoftアカウントでのリモートデスクトップ接続に苦労した話 #Windows - Qiita](https://qiita.com/sfjwr/items/037aabef2c5637fe0e51)

PINを忘れた場合で途中までログインしてPINをリセットしますか？というところでキャンセルしたらログインしたとみなされたっぽく、解決した。