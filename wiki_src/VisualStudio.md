[[Windows]]

## 同期実行ビジュアライザ

同期実行ビジュアライザは拡張機能。Concurrency Visualizerでインストール。

- [VS2022の同期実行ビジュアライザーが動かない時の対処 - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2023/10/19/vs2022_concurrency_visualizer.html)

RelWithDebInfoでビルドしたものに実行している＞同期実行ビジュアライザー

### The trace is corruptedと言われて表示出来ない

System.Threading.Tasks.Dataflowがロード出来ていないっぽい？

VSから プロジェクト＞NuGetパッケージの管理を選び、パッケージソースの設定からaddを選び、以下を入力して更新

- nuget.org
- https://api.nuget.org/v3/index.json

そしてSystem.Threading.Tasks.Dataflowをインストールしてみる。だめそう。

CVCollectionService.exe

**追記: 2024/12/24のExtensionのアップデートで治ったっぽい。**

## ファイルを開く

VSCodeのC-p相当の事は、C-1, C-r。

C-qしてC-tして、file:hogehoge.cとかでも良い。

## パフォーマンスプロファイラー

開始、を押すと「予期しない例外です。詳細についてはログを確認してください。」と出る。

「.NET デスクトップ開発」をインストールしたら起動するようになった。これは酷い…

[VS2022 Performance profiler "Unexpected exception" on start - Developer Community](https://developercommunity.visualstudio.com/t/VS2022-Performance-profiler-Unexpected-/10795500)