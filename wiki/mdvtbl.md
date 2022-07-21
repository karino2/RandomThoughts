[テーブルエディタ](テーブルエディタ.md)が欲しいと思って作ってみた。

- [karino2/mdvtbl: GUI markdown editor read from stdin and write to stdout.](https://github.com/karino2/mdvtbl)
- [blog: マークダウンのテーブルを編集するツールを考える](https://karino2.github.io/2022/02/14/table_editor_idea.html)
- [blog: mdvtblをリリース ー GUIのmdテーブルエディタ、stdin, stdoutでやりとり](https://karino2.github.io/2022/02/15/mdvtbl_release.html)

[photino](photino.md)と[editorjs](editorjs.md)で実装してみた。editorjsなかなか良いね。

### デプロイ手順

1. タグを打つ
2. build.shを実行
3. releasesにcdしてcopybin.shを実行
4. フォルダをほってmdvtblをmvしてzipしてgithubにアップ
5. あとは[homebrew](homebrew.md)のtapを更新
