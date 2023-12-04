みんな大好きgit。

### レポジトリにあるファイルをローカルで変更するがgit statusとかには出さない

update-indexでassume-unchangedを指定する。

```
$ git update-index --assume-unchanged .vscode/c_cpp_properties.json
```

### CI用などに空コミット

```
$ git commit --allow-empty -m "CIトラブルのため空コミット"
```

### ブランチマネージメント

とりあえずリンクを貼っておく場所。

- [Traunkベース: Introduction](https://trunkbaseddevelopment.com/)