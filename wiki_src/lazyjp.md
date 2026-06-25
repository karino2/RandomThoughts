[[技術的なメモ]], [[VSCode]]

ローマ字全部LLMに投げて変換するやつ、試してみようと思ったらVSCode拡張のlazyjpというのが一番ちゃんと使えそう。

[raspy135/lazyjp-vscode](https://github.com/raspy135/lazyjp-vscode)

API Keyをセットすると書いてあるがそんなの持ってないのでGemmaで使いたい、と思ったら試したと言っている人が居るので出来るっぽい。
自分もやってみよう。

## ollamaのセットアップ

```
$ brew install ollama
```

サービスの立ち上げは以下らしい。

```
$ brew services start ollama
```

Gemma4 e2b(23億パラメータとか）を以下で試す。なお、120億パラメータはgemma4:12bらしい。

```
$ ollama run gemma4:e2b
```

7.2GBのダウンロードとか…

VSCode側ではCmd+pでlazyjpとするとSet API Keyというのがあるので、これを選んで`ollama`を入れるらしい。


settings.jsonに以下を書くらしい。

```
  "lazyjp.apiKey": "ollama",
  "lazyjp.apiUrl": "http://localhost:11434/v1",
  "lazyjp.model": "gemma4:e2b"
```

これと同じになるように、Code＞Preferences＞Setttingsからlazyjpで検索してそれっぽいもので埋める。

## 終わり方

ollamaからの終わりは/exit

```
>>> /exit
```

あとは

```
brew services stop ollama
```

で良い。

## 使ってみた感想、e2bでは全然駄目

無事動いた。

ローマ字を入れてCmd+Alt+Jで行単位で変換出来るが、誤変換が多すぎてまったく使い物にならない。しかも遅すぎる。
e2bじゃ駄目だな。

## e4bで試した、全然違う日本語出す！ 2026-06-25 (木)

e4bで試してみた所、入力したのと全く違う文を出す！

入力したのは以下。

```
korehatesutodesu. nihonngogadounyuuryokudekikriunokatamesitemitaitoomoimasu.
mecyaosoikedonanikahahyoujidekita.tadasikuugoiteirukana?
```

- 「これはテストです。日本語がどう入力できるのかためしてみたいと思います。」
- 「めっちゃ遅いけど何かは入力出来た。正しく動いているかな？」

```
これテストです。日本語がどんな入出力できるか試してみたいと思います。
めちゃくちゃに具合でも悪いのかな？大丈夫？
```