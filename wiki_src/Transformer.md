[[機械翻訳]]の決定版。[[機械学習]]。別名: [[AttentionIsAllYouNeed]]

- [arxiv:1706.03762 Attention Is All You Need](https://arxiv.org/abs/1706.03762)という[[論文]]で提唱された。
- [The Annotated Transformer](https://nlp.seas.harvard.edu/annotated-transformer/)
- [[原論文から解き明かす生成AI]]の3章にも詳しい
- [Attention is All You Needのメモ - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2018/06/01/217.html) 大した事書いてないが。

[[ConvS2S]]の進化版と考えられる。Convの代わりに[[セルフアテンション]]を使うという発明。

## PositionEmbeddings

[[PositionEmbeddings]]へ。

## アテンション

[[アテンション]]


### 演習3.5 softmaxが値の大きい所で誤差伝搬の勾配が小さくなるのを確認せよ（スケールの理由）

[[原論文から解き明かす生成AI]]の演習3.5。

![imgs/Transformer/0001.png](imgs/Transformer/0001.png)
![imgs/Transformer/0002.png](imgs/Transformer/0002.png)

こんな考察のもとに、attentionに渡す値のスケールをdの影響分割り引く事にしているらしい。

## Transformerのブロック構成

マルチヘッドアテンションとLayerNormとFFNの組み合わせになっている。

### マルチヘッドアテンション

マルチヘッドの所についてのメモ。
Q, K, Vを8個（H=8）に分離する訳だが、
次元とかがややこしいので。

入力の次元 $d_{model}=512$ で、Wのアウトプットの方はQ, K, V共通で全て 64。

ようするに512次元の入力を、64次元の出力にするWを8つ用意して、掛ける。図のLinearがこれ。

![imgs/Transformer/0000.png](imgs/Transformer/0000.png)

全ての位置の入力に対して同じWを掛ける。Q, K, Vそれぞれに別々のWを掛ける（論文の3.2.2に説明がある)。

### FFのコネクション

以下のdense_relu_denseが呼ばれそう。

[tensor2tensor/tensor2tensor/layers/common_layers.py at master · tensorflow/tensor2tensor](https://github.com/tensorflow/tensor2tensor/blob/master/tensor2tensor/layers/common_layers.py?utm_source=chatgpt.com)

denseは以下っぽい。

[tf.keras.layers.Dense  -  TensorFlow v2.16.1](https://www.tensorflow.org/api_docs/python/tf/keras/layers/Dense?utm_source=chatgpt.com)

Noteの所に、rankが2以上だとlast axisだけをdotすると書いてあるのでd_modelに対してだけdotするという事で良さそうかな。
入力は(バッチ, token列, d_model)というテンソルだろう。

計算量は[[セルフアテンション]]の方で計算した。

### アテンションの取り込み方

マルチヘッドのアテンションをconcatしてWを掛けたものをそのまま次の入力へと渡している。

## セルフアテンションとマルチヘッドアテンション

他からもリンクしたい事があるのでページを分ける。

[[セルフアテンション]]

## マスクと3つのアテンション

アテンションの使われ方が3つあり、decoderのセルフアテンションだけmaskが必要、みたいな話が論文と本に書いてあるので、
この３つのアテンションの使われ方を見ておく。

### エンコーダーのセルフアテンション

![imgs/Transformer/0003.png](imgs/Transformer/0003.png)

### クロスアテンション

![imgs/Transformer/0004.png](imgs/Transformer/0004.png)

これは通常の[[アテンション]]になる。[[ConvS2S]]などと同じもの。
dを使うが、クエリに使うdは一つだけ（図ではiとしているが、実際はt-1期のもの）なのに注意。

### デコーダーのセルフアテンション

これだけ未来のdが登場しうるのでマスクが必要。

![imgs/Transformer/0005.png](imgs/Transformer/0005.png)
