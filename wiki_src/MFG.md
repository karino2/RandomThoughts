[[技術的なメモ]]、[[CG]]

私（karino2）が仕事で作っているGPU用フィルタ記述言語。

- 公式ページ [MFG - Modern Filter-language for GPU / MFG Studio](https://modernfilterlanguageforgpu.org/)
- ドキュメントトップ [MFG/docs/ja/README.md at main · karino2/MFG](https://github.com/karino2/MFG/blob/main/docs/ja/README.md)
- [MFGプログラムシリーズ - YouTube](https://www.youtube.com/playlist?list=PL3J_mLcl4YCf1AHEjZO4PjdaIexukpb6e)

## グレースケール

良く使うのでコードを書いておく。

[[【書籍】PrinciplesOfDigitalImageProcessing]]の一冊目のp202とp203に以下のweightが載っている。

- `(0.299, 0.587, 0.114)` テレビの信号処理で提案されて業界で良く使われているもの
- `(0.215, 0.7154, 0.072)` ITU-BT.709の推奨、この本の他の場所ではこれを使っている

どちらもlineariseしたあとに使う。

また、lineariseする前に使う近似weightがVol 2.のp111, 6.17に書いてあって、それは

- `(0.309, 0.609, 0.082)` 

となっている。

また、[[【書籍】OpenGL4ShadingLanguageCook]]のサンプルコードでは、例えばEdge Detectionのフィルタのluminanceは以下のベクトルをかけて求めている。

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

上記の式で計算するのもそんなに大変ではないが、とりあえずこれを評価して駄目だった事はない。

## ハッシュ

この論文が素晴らしく良くまとまっている。

[Hash Functions for GPU Rendering (JCGT)](https://jcgt.org/published/0009/03/02/)

2次元で使うならPCGかな。`hash(x + hash(y))` とするのがperlinノイズで使っていた手法とか。
MFGはハットが累乗に使われているのでxorが関数なのに注意。

```
fn hash |i: i32| {
  let state = u32(i) * 747796405u + 2891336453u
  let word = xor((state >> ((state >> 28u) + 4u)), state) * 277803737u
  i32(xor((word >> 22u), word))
}

fn hash_xy |x:i32, y:i32| {
  hash(x + hash(y))
}
```

ちなみにuint32を0.0〜1.0にマップするには以下が良いとか。（関数の外はi32で統一、という方針に従い、i32で渡してu32にキャストして計算している）

```
fn map_to_f32 |uval: i32| {
  let inv = 1.0 / 4294967295.0
  f32(u32(uval))*inv
}

let tmp2 = map_to_f32(0xf0ffffff)
@print_expr(tmp2)

```