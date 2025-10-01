<template><div><p>MDTouchはブロック単位で編集するAndroid用マークダウンエディタのアプリ。Jetpack Composeで書いている。</p>
<ul>
<li><a href="https://play.google.com/store/apps/details?id=io.github.karino2.mdtouch" target="_blank" rel="noopener noreferrer">MDTouch - Apps on Google Play</a></li>
<li><a href="https://github.com/karino2/MDTouch" target="_blank" rel="noopener noreferrer">github: MDTouch</a> ソースコード</li>
<li>[[MDMinaosi]] PC版の類似の自作アプリ。</li>
</ul>
<p>機能的には[[MDMinaosi]]のほぼAndroid版という感じだが、タッチで使うので意味合いが違ってくる部分が結構ある。
違う事をしようとして結果として同じ機能になっている、という感じ。</p>
<p>[[TeFWiki]]のexternal editorとして使っている。</p>
<h3 id="思想とコンセプト" tabindex="-1"><a class="header-anchor" href="#思想とコンセプト"><span>思想とコンセプト</span></a></h3>
<p>カーソルの移動というのは非常にタッチと相性が悪い。使っていて気持ちよく使えない。
だから移動はカーソルでは無く、通常のリストビューのような形でスクロールするのを主体とする。</p>
<p>編集は特定のブロックをタッチすると、そこだけテキストエリアとしてソースが表示されて編集する。
こうする事でカーソルの移動はテキストエリア内だけの狭い範囲だけで良くなる。
また、ソースを直接編集する事で細かく選択するというタッチに向いていない操作をする事無く、太字にしたりイタリックにしたり出来る。</p>
<p>タッチは範囲の選択とかカーソルの移動などという細かい操作には向かないので、タッチ向けのエディタはそういう操作はなるべく行わずに編集が行えるべきだ。</p>
<p>また、追記はアプリを立ち上げてすぐにテキストエリアに入力してAddボタンを押すだけで行え、何かを選択したり移動したりする必要は無い。
これはちょっとした時に立ち上げて少し思いついた事を書き足して、また違う事をする、
というスマホで良くあるシチュエーションを優先している為。SNSへの投稿と同じ手軽さでテキストを追記出来る。</p>
<p>また、MDTouchは単一のファイルを編集するエディタであって、ドキュメントマネージメントシステムでは無い。
ファイル自身はアプリは管理せず、あくまで既に存在しているファイルを編集する一外部アプリに過ぎないようにしてある。
これは気軽にファイラーやGoogleDriveから使えるシンプルなマークダウンエディタとして使う事を想定している。</p>
<p>既存の多くのマークダウンエディタはドキュメントを抱え込む形のドキュメントマネージメントシステムのような構造になってしまっていて、PCなどの外部と手軽にやりとり出来るというマークダウンの良さを損ねてしまっていると思ってこうした。</p>
<p>実際自分は、[[TeFWiki]]のexternal editorとして使っている。</p>
<h3 id="jetpack-composeを使ったネイティブのmarkdown-view" tabindex="-1"><a class="header-anchor" href="#jetpack-composeを使ったネイティブのmarkdown-view"><span>Jetpack Composeを使ったネイティブのMarkdown View</span></a></h3>
<p>ユーザー視点ではどうでもいい事だけれど、Jetpack Composeを使ったMarkdown表示のネイティブ実装が含まれている。
WebView使ってません。パーサーもjetbrainのマークダウンパーサー使ってます。</p>
<p>まぁまぁ真面目に実装しているので、ちゃんと切り出せば需要はありそう（だけれど切り出すのは面倒なのでしない）。</p>
</div></template>


