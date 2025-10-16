[[Android]]のオープンソースのアプリをホストしているStore的なもの。

- [Inclusion How-To - F-Droid - Free and Open Source Android App Repository](https://f-droid.org/docs/Inclusion_How-To/)
  - [CONTRIBUTING.md · master · F-Droid / Data · GitLab](https://gitlab.com/fdroid/fdroiddata/blob/master/CONTRIBUTING.md#metadata-preparation-with-fdroidserver)
- [F-Droidにアプリを登録してみた #Android - Qiita](https://qiita.com/wa2c/items/4a4b5096eed4ee3a0dee) ちょっと古めなので基本的な流れを知るくらいで、実際の作業は公式ドキュメントに沿ったほうが良さそう。

[[バイク整備記録]]をF-Droidに登録してみたいな。

## てきすとTLを試しに登録してみる 2025-10-16 (木)

とりあえず一番単純なアプリ、[[てきすとTL]]を試しに登録してみる。
まずはライブラリとかを一通りアップデートする事から。

そのあとは以下を順番に見ていく。

[Inclusion How-To - F-Droid - Free and Open Source Android App Repository](https://f-droid.org/docs/Inclusion_How-To/)

なんか読めというドキュメントが大量にあってそりゃ無理よ、って感じなので適当に飛ばして先に進む。
GitLabのアカウントが必要らしいが、GitHubでログイン、でそれっぽいアカウントが出来たっぽいのでそれで進む。

次にF-Droid serverが必要、とあるが、インストールへのリンクがないので適当にググって以下へ。

[Installing the Server and Repo Tools - F-Droid - Free and Open Source Android App Repository](https://f-droid.org/docs/Installing_the_Server_and_Repo_Tools/#homebrew)

brew installで入るっぽい。

で、fdroiddataというレポジトリをforkしてcloneする、とのこと。結構時間がかかるので他の事をして待つ。

次にfdroiddataのディレクトリにcdして、以下を実行。

```
$ fdroid import --url https://github.com/karino2/TextTL/ --subdir app
```

で出来たファイルを見たが問題は無さそう。

という事で次はビルドらしい。

```
$ fdroid rewritemeta io.github.karino2.texttl
$ fdroid checkupdates io.github.karino2.texttl
2025-10-16 21:53:02,359 ERROR: ビルドのメタデータのgitリポジトリにcommitされていない変更があります！
```

おや、エラーと言われた。そしてエラーメッセージが日本語なのでググってもひっっからない…

エラーメッセージから見ると、どうもさっきimportで作ったymlをコミットしてないといけないっぽい。
手順には書いてないがコミットしてみよう。（ブランチは切ってある）

```
$ git add metadata/io.github.karino2.texttl.yml
$ git commit -m "New app: TextTL"
$ fdroid checkupdates io.github.karino2.texttl
2025-10-16 22:09:30,006 INFO: io.github.karino2.texttlを処理
2025-10-16 22:09:42,412 ERROR: 環境変数{env: serverwebroot}が未設定です！
2025-10-16 22:09:42,412 ERROR: serverwebroot: has blank value!
```

えー、知らないよ…

Geminiに聞いたら、ダミーを設定しろ、と言ってきた。ほんとかな…
少しググったがわからなかったのでgeminiに従う。

```
$  export serverwebroot="/tmp/fdroid/repo"
$ fdroid checkupdates io.github.karino2.texttl
```

お、うまくいった。次はlintをしろと言っているな。

```
 % fdroid lint io.github.karino2.texttl
io.github.karino2.texttl: カテゴリーが設定されていません
io.github.karino2.texttl: 予期されていないライセンスタグ「Unknown」です！https://spdx.org/license-list から、FSFまたはOSIにより認証されたタグのみを使用してください
```

おや、レポジトリにLICENSEファイルあるはずだが。Metadataのリファレンスは読んでおけというドキュメントの中にあったな。以下か。

[Build Metadata Reference - F-Droid - Free and Open Source Android App Repository](https://f-droid.org/docs/Build_Metadata_Reference/)

他人のymlを参考に手直していおく。
lintも通った。良さそう。

次はビルド。

```
% fdroid build -v -l  io.github.karino2.texttl
```

