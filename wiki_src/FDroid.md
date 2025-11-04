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

なんかすぐ終わってしまったが、バイナリは出来てなさそうだな。

どうも.ymlのBuildセクションをテンプレートを参考に手直ししろ、という事らしい。
disableの行を消せばだいたいいいかな。

で、実行。

```
2025-10-16 23:21:59,108 ERROR: Could not build app io.github.karino2.texttl: OSError while trying to execute /usr/local/Cellar/fdroidserver/2.4.2/libexec/lib/python3.14/site-packages/gradlew-fdroid clean: [Errno 2] No such file or directory: '/usr/local/Cellar/fdroidserver/2.4.2/libexec/lib/python3.14/site-packages/gradlew-fdroid'
```

えー、知らないよ…
とりあえずuninstallしてinstallしなおすか。結果変わらず。うーん。

ググってみたら以下がひっかかる。

[F-Droid / gradlew-fdroid · GitLab](https://gitlab.com/fdroid/gradlew-fdroid)

とりあえずこのシェルスクリプトを該当フォルダに置いて見るか。

お、なんかビルドされたっぽい。
ただビルドは成功したっぽいがそのあとのフェースでエラーになってるな。

```
2025-10-16 23:36:59,824 INFO: Scanning source for common problems...
2025-10-16 23:36:59,831 DEBUG: scanner is configured to use signature data from: 'suss'
2025-10-16 23:36:59,832 DEBUG: 'https://fdroid.gitlab.io/fdroid-suss/suss.json'をダウンロードしています
2025-10-16 23:37:01,062 DEBUG: write 'suss.json' to cache
2025-10-16 23:37:01,064 DEBUG: 次のsuss.jsonキャッシュの更新まで23:59:59.995536
2025-10-16 23:37:01,110 ERROR: Found usual suspect 'com.android.application.*8.13.0' at build.gradle
2025-10-16 23:37:01,122 INFO: Removing gradle-wrapper.jar at gradle/wrapper/gradle-wrapper.jar
2025-10-16 23:37:01,125 ERROR: Could not build app io.github.karino2.texttl: スキャン時に1個のエラーが発生したためビルドできません
```

なんだろう？issueを検索すると、二ヶ月前に直した形跡があるな。

[Build fails due to com.android.application.*8.12.0 flagged by scanner [ com.maazm7d.quickse ] (#3601) · Issue · fdroid/fdroiddata](https://gitlab.com/fdroid/fdroiddata/-/issues/3601)

そして今のバージョンは6月にリリースされてるっぽいな。うーん、まだ入ってないということか？
いや、リンク先を見たらまだopenだな、これ。

[aapt2 fails to run on the buildserver - AGP 8.12.0-alpha07 is latest compatible (#593) · Issue · fdroid/admin](https://gitlab.com/fdroid/admin/-/issues/593)

うーん、今日のところはこのくらいにしておいてやるか。

### Dockerを試してみる 2025-10-18 (土)

少し時間をあけて冷静に考えた所、Mac版は面倒そうなのでDocker版を使おう、と思い立つ。

公式リンクから辿って以下。

[F-Droid / docker-executable-fdroidserver · GitLab](https://gitlab.com/fdroid/docker-executable-fdroidserver)

Build your appのセクションを見ると、以下を実行すればいいか？

```
docker run --rm -v $ANDROID_HOME:/opt/android-sdk -v $(pwd):/repo -e ANDROID_HOME:/opt/android-sdk registry.gitlab.com/fdroid/docker-executable-fdroidserver:master build io.github.karino2.texttl:1 -v
```

無事動いてそうだが、同じエラーになった。

```
2025-10-18 02:06:06,319 ERROR: Found usual suspect 'com.android.application.*8.13.0' at build.gradle
```

これは駄目そうだがfdroidserverのセットアップ周りの問題がない分docker imageの方が良さそうだな。

### usual suspectのエラーを真面目に解決

ちょっと真面目にこのエラーを調べてみた。以下のissueがそれなんだが、長くてわかりにくい。

[aapt2 fails to run on the buildserver - AGP 8.12.0-alpha07 is latest compatible (#593) · Issue · fdroid/admin](https://gitlab.com/fdroid/admin/-/issues/593)

どうも特定のgradleとAGPのバージョンの組み合わせはエラーになっていて、一時的に古いAGPを使え、という事っぽい。
そしてそのためにはとりあえずsedを使え、と言っている。

grepで他の人がどうやってるかを見る。

```
cd metadata
grep "8\.13" *.yml
```

どうも関連する所を見ると以下っぽいか？

```
prebuild: sed -i -e 's/8.13.0/8.11.1/' ../build.gradle
```

相対パスがどこをさしているのかとか良くわからないが、とりあえずymlにコピペしてみるか。

おぉ、ビルド通った。これで良さそう。

### dockerで手順をちゃんと進めてみる

ビルドが出来たので最初からやっていこう。
以下のドキュメントのBuilding itをもう一度進めてみる。

[CONTRIBUTING.md · master · F-Droid / Data · GitLab](https://gitlab.com/fdroid/fdroiddata/blob/master/CONTRIBUTING.md)

とりあえずlintをもう一回やってみたらいいかな。dockerでのlintは以下か？

```
docker run --rm -v $ANDROID_HOME:/opt/android-sdk -v $(pwd):/repo -e ANDROID_HOME:/opt/android-sdk registry.gitlab.com/fdroid/docker-executable-fdroidserver:master lint io.github.karino2.texttl -v
```

問題無さそうね。＞問題あったっぽいがなんか表示されてなかった（なんで？）

次はこれを自分のforkにpushして、Common steps for both methodsのセクションを進める感じか。
ブランチをpushしてみよう。

そしてgitlabのCI/CDセクションを見る、か。左側のペイン（隠れているが右上のボタンで開けた）でBuildの下のpipelinesを見る。

おや、failしている。git labでaccountをverifyしろ、とか言われているな。したような気がするが…

Verify My Accountというボタンがあるので押して見ると、電話番号を入力させられてSMSが来た。これはやってないな。

verifyしたので再実行しようとしたがやり方が良くわからんな。New Pipelineというのを選んでinputを入れろというのを何もせずにNewを選んだら、なんかいろいろ走り出した。

無事パスしたが、MR作ろうとしたらこのコミットのCIのfailアイコンが目立って感じ悪いので、メッセージだけ少し修正してforce pushでやりなおし。

### MRを作っての印象

- リモートのmasterをforkのmasterにsyncし忘れてpullを試していた
- MRのCIでlintが何故か失敗した（なぜforkで成功しているのかは良くわからない。prebuildの位置を変えろと言ってきたので直す）
- fastlaneでのビルドは必須ではないがMRのテンプレートでstrongly recommendedとされていた（次は試したい）

### fastlane対応 2025-10-19 (日)

MRのフィードバックでfastlaneを追加してね、とだけ帰ってきた。必須では無いんじゃなの？という気もするが、
やりとりするよりもfastlaneを加える方が早そう。

実質必須だと思っておく方が良さそうだ。

まずbrew installでfastlaneを入れる。（追記：この辺は不要だった）

[fastlane docs](https://docs.fastlane.tools/)

で、次はfastlane initをすればいいっぽいか。

[Setup - fastlane docs](https://docs.fastlane.tools/getting-started/android/setup/)

なぜかパッケージ名が全然違うものが出てきたので自分のものを入れる。

Google Playにアップロードするならauth系の情報が必要だ、と言われるが、それはやらないのでスルー。

で、終わってみたが、生成されたタスクが以下の３つ。

- テストを走らせる
- Crashlytics Betaにsubmit
- Google Playにsubmit

どれも必要そうには見えない。fastlaneで何をしろ、というのだろう？

すでにサブミットされているアプリを見てみると、以下のようになっている。

[super-productivity/fastlane at master · johannesjo/super-productivity](https://github.com/johannesjo/super-productivity/tree/master/fastlane)

FastfileもAppfileも無いな。

少しググってみて、以下の２つにたどり着く

- [Fastlane file structure ($1895688) · Snippets · GitLab](https://gitlab.com/-/snippets/1895688)
- [Fastlane · Wiki · IzzyOnDroid / repo · GitLab](https://gitlab.com/IzzyOnDroid/repo/-/wikis/Fastlane)

後者の記述は詳しいが、ようするにmetadataだけで良さそうに読める。
とりあえずfastfileとappfileを削除してmetadataを作ってみよう。

```
% cd fastlane
% mkdir -p metadata/android/en-US
% cd metadata/android/en-US
```

で、それっぽいのを一通り埋めたが、このあとどうしたらいいんだ？

docker imageでvalidatio出来そうか。以下を実行。

```
% docker run --rm --workdir /app --mount type=bind,source="$(pwd)",target=/app \
   ashutoshgngwr/validate-fastlane-supply-metadata:v1 -fastlane-path ./fastlane
```

いくつかすぐに分かるミスが出てきたのでそれを直し、最後に以下が残る。

```
fastlane/metadata/android/en-US/images/phoneScreenshots/1.png: 'max:min' edge radio should be at most 2.0: got=2.22
fastlane/metadata/android/en-US/images/phoneScreenshots/2.png: 'max:min' edge radio should be at most 2.0: got=2.22
```

なんで俺のスマホのスクショじゃ駄目なん？とりあえず幅を広げて2:1くらいにして無事パス。

### fastlane関連で必要な事

ようするにF-Droidで公開されるページのデータだけが必要っぽい。
という事でfastlaneのインストールは不要な気がする。

単にfastlane/metadata下を他の人を参考に作り、dockerのlsupply-metadataという奴で確認すれば十分っぽい。

### TextTLがマージされる 2025-11-04 (火)

先ほど無事マージされた。FDroidのサイトにはまだ無さそうだが。

[New app: TextTL (!28307) · マージリクエスト · F-Droid / Data · GitLab](https://gitlab.com/fdroid/fdroiddata/-/merge_requests/28307)

全て不備を直してreview-requestedのラベルが付いたのが10月19日で、2週間くらいでマージされた。
作業の多くは結局FDroidのページに表示される情報を揃えることなので、やってみるとリリース作業はそんなに大変ではないな。

今後はFDroidに置いていこう。

