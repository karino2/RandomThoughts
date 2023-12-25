[[自作アプリ]]

- [karino2/MDDeck_WebUI: MDDeck, desktop version (WebUI and Deno).](https://github.com/karino2/MDDeck_WebUI)

## あらすじ

仕事のメモは[[TeFWiki]]を使っているのだが、情報として残したい訳ではないとりあえずのメモでいちいち置く場所とかを考えるのがかったるい。
mdでGitHubのissueみたいに足していけるのが欲しい。

[[てきすとでっき]]とすごく似ているが、コンフリクトせず、1セル1ファイルのmd。
[[てきすとTL]]のmd版という感じ。

似たようなアプリ三つも作るのはどうなんだとも思うが、まぁいい。

[[WebUI]]と[[Deno]]で作る。

## 仕様

[[てきすとTL]]と同じ感じだがmdなところが違うだけ。

## 現状

2023-12-25現在。

Windowsはコンパイルしたexeはnode_module下に必要なファイルがないとか言われて動かない（ただし初回ディレクトリ選ぶところだけdeno runで実行すれば、あとはexeで作業は出来る）。
Macはなんかディレクトリ選ぶところも動いている。

セルを追加したり編集したりといった基本機能は動いている。

## 開発メモ

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

## Android版メモ

- [Qawaz/compose-code-editor: Display & Edit code with syntax highlighting in jetpack compose](https://github.com/Qawaz/compose-code-editor)