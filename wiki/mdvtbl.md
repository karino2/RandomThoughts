[テーブルエディタ](%E3%83%86%E3%83%BC%E3%83%96%E3%83%AB%E3%82%A8%E3%83%87%E3%82%A3%E3%82%BF)が欲しいと思って作ってみた。

- [karino2/mdvtbl: GUI markdown editor read from stdin and write to stdout.](https://github.com/karino2/mdvtbl)
- [blog: マークダウンのテーブルを編集するツールを考える](https://karino2.github.io/2022/02/14/table_editor_idea.html)
- [blog: mdvtblをリリース ー GUIのmdテーブルエディタ、stdin, stdoutでやりとり](https://karino2.github.io/2022/02/15/mdvtbl_release.html)

[photino](photino)と[editorjs](editorjs)で実装してみた。editorjsなかなか良いね。

### デプロイ手順

1. タグを打つ
2. build.shを実行
3. releasesにcdしてcopybin.shを実行
4. フォルダをほってmdvtblをmvしてzipしてgithubにアップ
5. あとは[homebrew](homebrew)のtapを更新
