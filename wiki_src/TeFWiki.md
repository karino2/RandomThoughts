このWikiを作るのに使っている、自作のローカルWiki。mdのテキストファイルのWiki。
[[Electron]]版とAndroid版があって、Google Driveでデータを共有して使っている。サーバー要らず。

### 関連リンク

- [blog: TeFWiki：テキストファイルのmd+WikiLink](https://karino2.github.io/2021/04/17/tefwiki_ja.html)
   - [blog: TeFWiki、テキストファイルのWikiをElectronで作ってみる](https://karino2.github.io/2021/04/10/TeFWiki.html) 開発当初のブログ
- [github:TeFWiki-Electron](https://github.com/karino2/TeFWiki-Electron)
- [github:TeFWiki: TeFWiki for Android](https://github.com/karino2/TeFWiki/)
- [[Wikiとノート]]
- [[サブWiki]]
- [[講義ノート]]

### コンセプト

- [github: TeFWiki-Electron/TeFWiki_concept.md](https://github.com/karino2/TeFWiki-Electron/blob/main/TeFWiki_concept.md)
- [blog: TeFWiki：テキストファイルのmd+WikiLink](https://karino2.github.io/2021/04/17/tefwiki_ja.html)

プレーンテキストのmdにwikilinkをつけた物でいいんじゃないか。
フォルダの中身をまるごとGoogle Driveに突っ込めば共有出来るような感じに。

データさえあれば、アプリは各環境で作ればいいだろう、と思う。

### サーバーでは無くフォルダsyncの意義

TeFWikiはサーバーを持たない。プレーンなフォルダをクラウドストレージ（やsyncthingsなど）で共有するだけ。
これはパーソナルなメモを保存するのにより適切と思う。

サーバーよりもクラウドストレージの方がデータの流出の可能性はずっと低いだろう。
それはサーバーがそのサービス用に作られるのに対し、クラウドストレージはもっと長い間開発と運用がされていて、セキュリティもずっと高い基準で運営されている事、サービスの性質として一般への公開がメインの仕事に入っていないのでよりセキュアに作りやすいという本質的な事情もあると思う。

サーバーはサービスを運営している人がprivacy policyを変えたり変な広告を入れたり、バグを入れたりして、乗り換えたくなるような事情がたびたび発生する。
特にメモのように長生きするものは、必ずサービスの寿命よりも長生きする。
その都度メモを全部きっちり削除して乗り換え先に全部いい感じに乗り換えるのは結構かったるい。

フォルダのsyncならアカウントを新たにつくる必要も無いし、クラウドストレージをのりかえる時もそのまま乗り換え出来るし、
将来クラウドストレージと違う技術になってもきっとフォルダをそのまま移動する方法は有り続けるだろう。

### アプリで無くファイルが主役

TeFWikiは[Obsidian](https://obsidian.md/)とコンセプト的には近いと思うし、実際Obsidanがもっと小さくてオープンソースでいい感じのモバイルアプリを提供していたら、自分で作らなかったかもしれない。
実際Obsidanでも良いと思う。

ただ根本的な所で違うな、と思うのは、Obsidanがプラグインという仕組みでアプリの中に世界を構築していこう、という所。
これは商売しようとしているのでこうなるのは理解出来る。

TeFWikiは逆に、ファイルを作りブラウズする為のアプリであって、それ以外の機能はこのアプリの外に作っていく事を期待して、
TeFWiki自体は必要最小限の機能に留めようとしている。
TeFWikiのファイルはTeFWIki以外のアプリやUnixコマンドなどでも作り編集されていく事を期待している。

実際自分はjekyllのブログのファイルをハードリンクで貼ってTeFWIkiのデータにしていたりもするし、
[[いつなに]]も勝手にマークダウンを編集していく。
また、マークダウンのエディタとしても外部エディタとして[[MDTouch]]（PCでは[[MDMinaosi]]）をちょくちょく使っている。

例えばPC側はelispやvim scriptの拡張で同じデータを作っていっても、問題無くAndroid版アプリと組み合わせて使える、
というような、開かれたメモ環境を指向している。

アプリの中にいろんな機能を実装していくんじゃなくて、プレーンなファイルとディレクトリがあって、
それに対していろんなアプリを作っていく、という、よりUnix的なアプローチになっている。
これは、メモのファイルはTeFWikiよりも長生きする、という信念のもと、メモがTeFWikiに依存するのでは無く、TeFWikiはメモを作り出す為に今たまたま使っているアプリに過ぎない、というスタンスの違い。
この辺はコンセプトのリンク先にも書いてある。

### 開発リンク

- [bulma](https://bulma.io/documentation/columns/)
- [nodejs: fs](https://nodejs.org/api/fs.html)
- [jaredsburrows/gradle-license-plugin: Gradle plugin that provides a task to generate a HTML license report of your project.](https://github.com/jaredsburrows/gradle-license-plugin)

### メモ

gradleのタスクでlicenseReleaseReportを実行してライセンス生成するとasset下が直接書き換わる。これにはbluma.cssなどが入らないのでimgs/js_licenses.txtの中身を足す事。
