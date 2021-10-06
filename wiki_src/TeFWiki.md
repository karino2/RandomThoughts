このWikiを作るのに使っている、自作のローカルWiki。mdのテキストファイルのWiki。
[[Electron]]版とAndroid版があって、Google Driveでデータを共有して使っている。サーバー要らず。

### 関連リンク

- [blog: TeFWiki：テキストファイルのmd+WikiLink](https://karino2.github.io/2021/04/17/tefwiki_ja.html)
   - [blog: TeFWiki、テキストファイルのWikiをElectronで作ってみる](https://karino2.github.io/2021/04/10/TeFWiki.html) 開発当初のブログ
- [github:TeFWiki-Electron](https://github.com/karino2/TeFWiki-Electron)
- [github:TeFWiki: TeFWiki for Android](https://github.com/karino2/TeFWiki/)
- [[Wikiとノート]]
- [[サブWiki]]

### コンセプト

- [github: TeFWiki-Electron/TeFWiki_concept.md](https://github.com/karino2/TeFWiki-Electron/blob/main/TeFWiki_concept.md)
- [blog: TeFWiki：テキストファイルのmd+WikiLink](https://karino2.github.io/2021/04/17/tefwiki_ja.html)

プレーンテキストのmdにwikilinkをつけた物でいいんじゃないか。
フォルダの中身をまるごとGoogle Driveに突っ込めば共有出来るような感じに。

データさえあれば、アプリは各環境で作ればいいだろう、と思う。

### 開発リンク

- [bulma](https://bulma.io/documentation/columns/)
- [nodejs: fs](https://nodejs.org/api/fs.html)
- [jaredsburrows/gradle-license-plugin: Gradle plugin that provides a task to generate a HTML license report of your project.](https://github.com/jaredsburrows/gradle-license-plugin)

### メモ

gradleのタスクでライセンス生成するとasset下が直接書き換わる。これにはbluma.cssが入らないので足す事。
