[[自作アプリ]]

- [MDDeck - Google Play のアプリ](https://play.google.com/store/apps/details?id=io.github.karino2.mddeck)
   - [karino2/MDDeck: MDDeck for android.](https://github.com/karino2/MDDeck/tree/main)
- [karino2/MDDeck_Electron: MDDeck, Electron version.](https://github.com/karino2/MDDeck_Electron) PC版
- [MDDeckというアプリを作ってリリースしました！ - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2024/01/06/mddeck_release.html)

## あらすじ

仕事のメモは[[TeFWiki]]を使っているのだが、情報として残したい訳ではないとりあえずのメモでいちいち置く場所とかを考えるのがかったるい。
mdでGitHubのissueみたいに足していけるのが欲しい。

[[てきすとでっき]]とすごく似ているが、コンフリクトせず、1セル1ファイルのmd。
[[てきすとTL]]のmd版という感じ。

似たようなアプリ三つも作るのはどうなんだとも思うが、まぁいい。PC版は[[Electron]]で作った。

## 仕様

[[てきすとTL]]と同じ感じだがmdなところが違うだけ。

## 現状と雑感 - 2024-01-06 (土)

Electron版、Android版ともに一通り完成してリリース作業を終えた。

やはりコンフリクトを気にせずに追加出来るのは[[てきすとでっき]]より良いし、
セルの境界がファイルなのも分かりやすい。

流れていってしまうのがどうなのかは現時点ではまだ分からない。もう少し使い続けて考えたい。

## 開発メモ

ビルド周りは[[てきすとでっき]]参照。

## Android版メモ

- [commonmark/commonmark-java: Java library for parsing and rendering CommonMark (Markdown)](https://github.com/commonmark/commonmark-java) JetBrainsの[JetBrains/markdown: Markdown parser written in kotlin](https://github.com/JetBrains/markdown)はリストの終わりの処理とかがバグってるのでcommon markに乗り換え
- [Qawaz/compose-code-editor: Display & Edit code with syntax highlighting in jetpack compose](https://github.com/Qawaz/compose-code-editor)

ドキュメントには2.0.3がAndroid用っぽく見えるが、v3.1.1にもAndroidっぽい対応が入っている。しかもKotlinとかはv2.0.3には入ってないのでこれを使ってみる。

settings.gradle.ktsに以下のjitpackの行を追加

```kotlin
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        maven(url = "https://jitpack.io")
    }
}
```

build.gradleに以下を追加

```kotlin
    implementation("com.github.Qawaz.compose-code-editor:codeeditor-android:v3.1.1")
```

## 古くなった内容

最初は[[Deno]]と[[WebUI]]を使っていたがElectronに乗り換えたDenoとWebUIの頃のメモを以下に残しておく。

- [karino2/MDDeck_WebUI: MDDeck, desktop version (WebUI and Deno).](https://github.com/karino2/MDDeck_WebUI) 
  - [GitHub - denoland/deno-gfm: Server-side GitHub Flavored Markdown rendering for Deno](https://github.com/denoland/deno-gfm) task listサポートができないか？
  - micromark、いいかも。[GitHub - micromark/micromark-extension-gfm: micromark extension to support GFM (GitHub Flavored Markdown)](https://github.com/micromark/micromark-extension-gfm)
      - コードハイライトはクライアントサイドでやれとの事 [Getting code fence language via custom plugin · micromark · Discussion #159 · GitHub](https://github.com/orgs/micromark/discussions/159)
      - starry-nightへのリンクが紹介されているがこれでよいかも。 [GitHub - wooorm/starry-night: Syntax highlighting, like GitHub](https://github.com/wooorm/starry-night#example-using-starry-night-on-the-client)

### micromark

公式READMEにあるように

```
import {micromark} from 'https://esm.sh/micromark@3'
import {gfm, gfmHtml} from 'https://esm.sh/micromark-extension-gfm@3'
```

としたら、Extensionの型がmicromark-util-typesが1.0と2.0が違っていて合わない、と言われる。

仕方ないのでgfmを2.0.3にしたところ、今度は

```
error: Uncaught ReferenceError: document is not defined
    at https://esm.sh/v135/parse-entities@3.1.0/denonext/decode-entity.js:2:7
```

と言われる。

結局gfmを3にして型のエラーを無視して実行したら動いた…＞コンパイルで怒られたのでgfmを2に戻した。doucmentどうこうは言われなくなった（なんで？）
