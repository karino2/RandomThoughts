[技術的なメモ](%E6%8A%80%E8%A1%93%E7%9A%84%E3%81%AA%E3%83%A1%E3%83%A2)、[CG](CG)

私（karino2）が仕事で作っているGPU用フィルタ記述言語。

- 公式ページ [MFG - Modern Filter-language for GPU / MFG Studio](https://modernfilterlanguageforgpu.org/)
- ドキュメントトップ [MFG/docs/ja/README.md at main · karino2/MFG](https://github.com/karino2/MFG/blob/main/docs/ja/README.md)
- [MFGプログラムシリーズ - YouTube](https://www.youtube.com/playlist?list=PL3J_mLcl4YCf1AHEjZO4PjdaIexukpb6e)

## グレースケール

良く使うのでコードを書いておく。

[【書籍】PrinciplesOfDigitalImageProcessing](%E3%80%90%E6%9B%B8%E7%B1%8D%E3%80%91PrinciplesOfDigitalImageProcessing)の一冊目のp202とp203に以下のweightが載っている。

- `(0.299, 0.587, 0.114)` テレビの信号処理で提案されて業界で良く使われているもの
- `(0.215, 0.7154, 0.072)` ITU-BT.709の推奨、この本の他の場所ではこれを使っている

どちらもlineariseしたあとに使う。

また、lineariseする前に使う近似weightがVol 2.のp111, 6.17に書いてあって、それは

- `(0.309, 0.609, 0.082)` 

となっている。

また、[【書籍】OpenGL4ShadingLanguageCook](%E3%80%90%E6%9B%B8%E7%B1%8D%E3%80%91OpenGL4ShadingLanguageCook)のサンプルコードでは、例えばEdge Detectionのフィルタのluminanceは以下のベクトルをかけて求めている。

- `(0.2126, 0.7152, 0.0722)`

これはITU-BT.709の推奨と似た数値なのでlineariseしないと駄目な気がするが、ホスト側でしているのかな？

### MFGのとりあえずのコード

とりあえずは以下のようにするのが一番良いか。

```
  let gray = to_xyza(input_u8(x, y)).y
```

動作確認としては以下。

```
def result_u8 |x, y| {
  let gray = to_xyza(input_u8(x, y)).y
  [gray, gray, gray, 1.0] |> to_u8color(...)
}
```