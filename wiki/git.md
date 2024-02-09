みんな大好きgit。

## 外部リンク

- [git rebaseでコミットをまとめたり分割する #Git - Qiita](https://qiita.com/kzmasa/items/b430bc528d117a7a4493) rebase -i のedit

## レポジトリにあるファイルをローカルで変更するがgit statusとかには出さない

update-indexでassume-unchangedを指定する。

```
$ git update-index --assume-unchanged .vscode/c_cpp_properties.json
```

## CI用などに空コミット

```
$ git commit --allow-empty -m "CIトラブルのため空コミット"
```

## HEADのファイルのハッシュ値を取得

git rev-parseというコマンドを使う。

```
$ git rev-parse HEAD:some_dir/some_file.txt
```

## ブランチマネージメント

とりあえずリンクを貼っておく場所。

- [Traunkベース: Introduction](https://trunkbaseddevelopment.com/)

## gitkのソース

gitの一部に入っている模様。tcl/tk（wish）。

- [git/gitk-git at master · git/git](https://github.com/git/git/tree/master/gitk-git)

ちょっといじりたいと思ったが、なかなか気力がわかないな。
誰か[WebUI](WebUI)で同じの作って。

## gitのクライアントいろいろ

- [Introduction · Tig - Text-mode interface for Git](https://jonas.github.io/tig/) ncursesのUI。生きていけそうではあるがショートカットとか覚えるのがだるい
- [PowerShell Gallery - Git/Git.ps1 1.1.4.11](https://www.powershellgallery.com/packages/Tecman.Tfs.Tools/1.1.4.11/Content/Git%5CGit.ps1) powershellでちょっとした事、checkoutとかはこれを参考に自分のを作るのがいいかも。

### git-guiメモ

git本家のソースツリーに含まれている、tcl/tkで書かれたgit-gui。ステージングは割と良い。足りない機能を以下にメモしていく。

- 全ファイルをステージング
- ファイルのrevert（Hunkのrevertはある）
- リモートのチェックアウト

## 入門

公式で配ってる[Git - Book](https://git-scm.com/book/en/v2) Pro Gitという本がとても良く書けているが、
本格的に勉強する用の本なので、入門者に薦めるのはちょっと気がひける。

入門者にとりあえずこれ見て、というには何がいいだろう？と思い、ググってよさそうだったものを貼っておく。

- [【超入門】初心者のためのGitとGitHubの使い方 - RAKUS Developers Blog - ラクス エンジニアブログ](https://tech-blog.rakus.co.jp/entry/20200529/git) なかなかちょうど良いかもしれない
- [Git でのバージョン コントロールの概要 - Training - Microsoft Learn](https://learn.microsoft.com/ja-jp/training/paths/intro-to-vc-git/) 演習形式で進められるのがよさそう。
    - [Git 入門 - Training - Microsoft Learn](https://learn.microsoft.com/ja-jp/training/modules/intro-to-git/) ローカルの基本で終わってしまうが、その範囲なら良い
    - [Git でブランチとマージを使用してコードを編集する - Training - Microsoft Learn](https://learn.microsoft.com/ja-jp/training/modules/branch-merge-git/) なかなか良い
    - [Git および GitHub の Microsoft Learn ドキュメントの基礎 - Contributor guide - Microsoft Learn](https://learn.microsoft.com/ja-jp/contribute/content/git-github-fundamentals) リンク集的になかなか良い
- [Hello World - GitHub Docs](https://docs.github.com/ja/get-started/quickstart/hello-world) GitHub中心だがGitHub側の入門には良いかも。

Microsoft Learnはなかなか良い気がする。