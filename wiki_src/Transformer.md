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

[[セルフアテンション]]と[[LayerNormalization]]とFFNの組み合わせになっている。

- [[Transformerブロック]]
  - [[セルフアテンション]]
  - [[LayerNormalization]]

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