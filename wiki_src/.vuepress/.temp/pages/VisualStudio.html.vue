<template><div><ul>
<li><a href="./Windows.html">Windows</a></li>
<li><a href="./VSCode.html">VSCode</a></li>
<li><a href="./vcpkg.html">vcpkg</a></li>
</ul>
<h2 id="同期実行ビジュアライザ" tabindex="-1"><a class="header-anchor" href="#同期実行ビジュアライザ"><span>同期実行ビジュアライザ</span></a></h2>
<p>同期実行ビジュアライザは拡張機能。Concurrency Visualizerでインストール。</p>
<ul>
<li><a href="https://karino2.github.io/2023/10/19/vs2022_concurrency_visualizer.html" target="_blank" rel="noopener noreferrer">VS2022の同期実行ビジュアライザーが動かない時の対処 - なーんだ、ただの水たまりじゃないか</a></li>
</ul>
<p>RelWithDebInfoでビルドしたものに実行している＞同期実行ビジュアライザー</p>
<h3 id="the-trace-is-corruptedと言われて表示出来ない" tabindex="-1"><a class="header-anchor" href="#the-trace-is-corruptedと言われて表示出来ない"><span>The trace is corruptedと言われて表示出来ない</span></a></h3>
<p>System.Threading.Tasks.Dataflowがロード出来ていないっぽい？</p>
<p>VSから プロジェクト＞NuGetパッケージの管理を選び、パッケージソースの設定からaddを選び、以下を入力して更新</p>
<ul>
<li>nuget.org</li>
<li>https://api.nuget.org/v3/index.json</li>
</ul>
<p>そしてSystem.Threading.Tasks.Dataflowをインストールしてみる。だめそう。</p>
<p>CVCollectionService.exe</p>
<p><strong>追記: 2024/12/24のExtensionのアップデートで治ったっぽい。</strong></p>
<h2 id="ファイルを開く" tabindex="-1"><a class="header-anchor" href="#ファイルを開く"><span>ファイルを開く</span></a></h2>
<p>VSCodeのC-p相当の事は、C-1, C-r。</p>
<p>C-qしてC-tして、file:hogehoge.cとかでも良い。</p>
<h2 id="パフォーマンスプロファイラー" tabindex="-1"><a class="header-anchor" href="#パフォーマンスプロファイラー"><span>パフォーマンスプロファイラー</span></a></h2>
<p>開始、を押すと「予期しない例外です。詳細についてはログを確認してください。」と出る。</p>
<p>「.NET デスクトップ開発」をインストールしたら起動するようになった。これは酷い…</p>
<p><a href="https://developercommunity.visualstudio.com/t/VS2022-Performance-profiler-Unexpected-/10795500" target="_blank" rel="noopener noreferrer">VS2022 Performance profiler &quot;Unexpected exception&quot; on start - Developer Community</a></p>
</div></template>


