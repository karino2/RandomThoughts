[[技術的なメモ]]

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

その後は

settings.jsonに以下を書くらしい。

```
  "lazyjp.apiKey": "ollama",
  "lazyjp.apiUrl": "http://localhost:11434/v1",
  "lazyjp.model": "gemma4:e2b"
```