[[機械翻訳]]の決定版。[[機械学習]]。別名: [[AttentionIsAllYouNeed]]

- [arxiv:1706.03762 Attention Is All You Need](https://arxiv.org/abs/1706.03762)という[[論文]]で提唱された。
- [The Annotated Transformer](https://nlp.seas.harvard.edu/annotated-transformer/)
- [[原論文から解き明かす生成AI]]の3章にも詳しい
- [Attention is All You Needのメモ - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2018/06/01/217.html) 大した事書いてないが。

[[ConvS2S]]の進化版と考えられる。

## PositionEmbeddings

[[PositionEmbeddings]]へ。

## アテンション

[[アテンション]]

### 演習 3.4 QとかKを書き下してアテンションの式になるのを確認

[[原論文から解き明かす生成AI]]の演習3.4。

図

### 演習3.5 softmaxが値の大きい所で誤差伝搬の勾配が小さくなるのを確認せよ

[[原論文から解き明かす生成AI]]の演習3.5。


## マルチヘッドアテンション

マルチヘッドの所についてのメモ。
Q, K, Vを8個（H=8）に分離する訳だが、
次元とかがややこしいので。

入力の次元 $d_{model}=512$ で、Wのアウトプットの方はQ, K, V共通で全て 64。

ようするに512次元の入力を、64次元の出力にするWを8つ用意して、掛ける。図のLinearがこれ。

図1

全ての位置の入力に対して同じWを掛ける。Q, K, Vそれぞれに別々のWを掛ける（論文の3.2.2に説明がある)。

## FFのコネクション

以下のdense_relu_denseが呼ばれそう。

[tensor2tensor/tensor2tensor/layers/common_layers.py at master · tensorflow/tensor2tensor](https://github.com/tensorflow/tensor2tensor/blob/master/tensor2tensor/layers/common_layers.py?utm_source=chatgpt.com)

denseは以下っぽい。

[tf.keras.layers.Dense  -  TensorFlow v2.16.1](https://www.tensorflow.org/api_docs/python/tf/keras/layers/Dense?utm_source=chatgpt.com)

Noteの所に、rankが2以上だとlast axisだけをdotすると書いてあるのでd_modelに対してだけdotするという事で良さそうかな。
入力は(バッチ, token列, d_model)というテンソルだろう。

## アテンションの取り込み方

マルチヘッドのアテンションをconcatしてWを掛けたものをそのまま次の入力へと渡している。

## Fully-connectedなパーセプトロンとのパラメータ数の比較

セルフアテンションとConvやRNNの比較は論文や[[原論文から解き明かす生成AI]]にあるが、
この辺は当時の状況からの比較であって、今から新しくこの辺を学ぶ人にとっては不要に難しい比較に思う。

素人の視点としては、Fully-connectedなパーセプトロンとの違いを見てみるのが教育的だろう。

### Fully-connectedなパーセプトロン

一つのoutputにつき、トークン数、トークンの次元を512とする。

一つのトークンあたり、512次元のアウトプットを出すには512x512となる。
一つのアウトプットにつき512トークンを足し合わせるのだから、それが512個必要になる。

図

これが512個あるのだから、全体では512の4乗で、だいたい64G個（64Billion）となる。

### Transformerブロック

MultiHeadとLayerNormとFFNで出来ている。LayerNormは大したこと無いので無視しよう。また多くの演算はW+Bの形式になるがWが512x512の時Bは512のオーダーなので、Wだけ見ていけば丼勘定としては十分。

図

という事で、64Giと2Mi、くらいの差（32*1024倍）がある。