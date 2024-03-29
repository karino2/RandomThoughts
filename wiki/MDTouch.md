MDTouchはブロック単位で編集するAndroid用マークダウンエディタのアプリ。Jetpack Composeで書いている。

- [MDTouch - Apps on Google Play](https://play.google.com/store/apps/details?id=io.github.karino2.mdtouch)
- [github: MDTouch](https://github.com/karino2/MDTouch) ソースコード
- [MDMinaosi](MDMinaosi) PC版の類似の自作アプリ。

機能的には[MDMinaosi](MDMinaosi)のほぼAndroid版という感じだが、タッチで使うので意味合いが違ってくる部分が結構ある。
違う事をしようとして結果として同じ機能になっている、という感じ。

[TeFWiki](TeFWiki)のexternal editorとして使っている。

### 思想とコンセプト

カーソルの移動というのは非常にタッチと相性が悪い。使っていて気持ちよく使えない。
だから移動はカーソルでは無く、通常のリストビューのような形でスクロールするのを主体とする。

編集は特定のブロックをタッチすると、そこだけテキストエリアとしてソースが表示されて編集する。
こうする事でカーソルの移動はテキストエリア内だけの狭い範囲だけで良くなる。
また、ソースを直接編集する事で細かく選択するというタッチに向いていない操作をする事無く、太字にしたりイタリックにしたり出来る。

タッチは範囲の選択とかカーソルの移動などという細かい操作には向かないので、タッチ向けのエディタはそういう操作はなるべく行わずに編集が行えるべきだ。

また、追記はアプリを立ち上げてすぐにテキストエリアに入力してAddボタンを押すだけで行え、何かを選択したり移動したりする必要は無い。
これはちょっとした時に立ち上げて少し思いついた事を書き足して、また違う事をする、
というスマホで良くあるシチュエーションを優先している為。SNSへの投稿と同じ手軽さでテキストを追記出来る。

また、MDTouchは単一のファイルを編集するエディタであって、ドキュメントマネージメントシステムでは無い。
ファイル自身はアプリは管理せず、あくまで既に存在しているファイルを編集する一外部アプリに過ぎないようにしてある。
これは気軽にファイラーやGoogleDriveから使えるシンプルなマークダウンエディタとして使う事を想定している。

既存の多くのマークダウンエディタはドキュメントを抱え込む形のドキュメントマネージメントシステムのような構造になってしまっていて、PCなどの外部と手軽にやりとり出来るというマークダウンの良さを損ねてしまっていると思ってこうした。

実際自分は、[TeFWiki](TeFWiki)のexternal editorとして使っている。

### Jetpack Composeを使ったネイティブのMarkdown View

ユーザー視点ではどうでもいい事だけれど、Jetpack Composeを使ったMarkdown表示のネイティブ実装が含まれている。
WebView使ってません。パーサーもjetbrainのマークダウンパーサー使ってます。

まぁまぁ真面目に実装しているので、ちゃんと切り出せば需要はありそう（だけれど切り出すのは面倒なのでしない）。