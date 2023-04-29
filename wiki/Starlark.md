Bazelで使われている、Pythonサブセット方言的な言語。goとかrustの実装もあるらしい。

- [bazelbuild/starlark: Starlark Language](https://github.com/bazelbuild/starlark)
- [bazel/src/main/java/net/starlark/java at master · bazelbuild/bazel](https://github.com/bazelbuild/bazel/tree/master/src/main/java/net/starlark/java) ソースコード、jarになってない…
- [Starlark language - Bazel main](https://docs.bazel.build/versions/main/skylark/language.html)

bazelのコードを持ってきて上記ディレクトリ下で.javaでwcしたら21835行だって。なかなか小さいね。

ライセンスはbazelと同じだろうから、Apache 2.0か。いいね。

### jarは無いらしい

- [java - How do I include a Skylark configuration parser in my application? - Stack Overflow](https://stackoverflow.com/questions/49108709/how-do-i-include-a-skylark-configuration-parser-in-my-application)
- [Spin the Java Starlark interpreter into a stand-alone library · Issue #2367 · bazelbuild/bazel](https://github.com/bazelbuild/bazel/issues/2367)

### Androidでビルドしてみる

starlarkフォルダ下を持ってくればAndroidで動くのかしら？ちょっと実験。
タグ 6.0.0-pre.20211019.1 を持ってきて試してみる。

src/main/java/netの下をそのまま何も考えずに適当なAndroidプロジェクトのsrc下にコピーしてみる。

なんか動かしてみよう。
それっぽいクラスを探してgrepしてたら、test下にExamples.javaがあるな。これのevalExprを真似してみよう。

なんかImmutableListが無いとか言われるな。namespaceはcom.google.common.collectの下か。
Guavaか？

[google/guava: Google core libraries for Java](https://github.com/google/guava)

を見て、以下を加えてみる。

```
  implementation("com.google.guava:guava:31.0.1-android")
```

次はcom.google.auto.value.AutoValueが無いとか言われた。

[auto/index.md at master · google/auto](https://github.com/google/auto/blob/master/value/userguide/index.md)

ここを参考に

```
    api      "com.google.auto.value:auto-value-annotations:${autoValueVersion}"
    annotationProcessor "com.google.auto.value:auto-value:${autoValueVersion}"
```

と書いてみた。ちなみにautoValueVersionは1.8.2にした。

今度はjavax.annotation.processingが無いと言われる。

[pengrad/jdk9-deps: Build Android and Dagger with JDK9+](https://github.com/pengrad/jdk9-deps)

これか？以下を追加。

```
compileOnly 'com.github.pengrad:jdk9-deps:1.0'
```

変わらず。そういう問題じゃないらしい。
なんかこれいるのか？独自のannotation processorっぽいが、これって第三者がJavaのクラス作ってstarlarkから触る為のものではなかろうか。
という事でとりあえずファイルの拡張子を.txtに変更して無視する。

次は`ImmutableList.toImmutableList()`が無いと言われる。stream APIって奴か。Androidではこの辺どうなっているんだろう。
でも使っているところ、単にexceptionのメッセージ作るだけだな。これなら適当にでっちあげればいい気もする。
`Collectors.toList()`に置き換え。

これで動いた。

Files API回りでOreoからのものを使っているっぽいのでminSDKを26にあげる。
手元のタブレットはNなので動かないが、タブレットで使いたい訳じゃないからいいか。

### powerが無い

[Add `**` power operator · Issue #190 · bazelbuild/starlark](https://github.com/bazelbuild/starlark/issues/190)

電卓の用途にはいまいちだな。ちょっといじって足せるか調べてみよう。

parseBinOpExpressionのあたりか。STAR_STARというトークン自体はあるので、precedanceに足してこの辺いじればいけるか？

## 拡張子は.starか

[added .star to extensions by dainikkal · Pull Request #128 · bazelbuild/vscode-bazel](https://github.com/bazelbuild/vscode-bazel/pull/128)