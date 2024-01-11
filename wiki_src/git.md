みんな大好きgit。

## レポジトリにあるファイルをローカルで変更するがgit statusとかには出さない

update-indexでassume-unchangedを指定する。

```
$ git update-index --assume-unchanged .vscode/c_cpp_properties.json
```

## CI用などに空コミット

```
$ git commit --allow-empty -m "CIトラブルのため空コミット"
```

## ブランチマネージメント

とりあえずリンクを貼っておく場所。

- [Traunkベース: Introduction](https://trunkbaseddevelopment.com/)

## gitkのソース

gitの一部に入っている模様。tcl/tk（wish）。

- [git/gitk-git at master · git/git](https://github.com/git/git/tree/master/gitk-git)

ちょっといじりたいと思ったが、なかなか気力がわかないな。
誰か[[WebUI]]で同じの作って。

## gitのクライアントいろいろ

- [Introduction · Tig - Text-mode interface for Git](https://jonas.github.io/tig/) ncursesのUI。生きていけそうではあるがショートカットとか覚えるのがだるい
- [PowerShell Gallery - Git/Git.ps1 1.1.4.11](https://www.powershellgallery.com/packages/Tecman.Tfs.Tools/1.1.4.11/Content/Git%5CGit.ps1) powershellでちょっとした事、checkoutとかはこれを参考に自分のを作るのがいいかも。

### git-guiメモ

git本家のソースツリーに含まれている、tcl/tkで書かれたgit-gui。ステージングは割と良い。足りない機能を以下にメモしていく。

- 全ファイルをステージング
- ファイルのrevert（Hunkのrevertはある）
- リモートのチェックアウト