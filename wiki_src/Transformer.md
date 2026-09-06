[[機械翻訳]]の決定版。[[機械学習]]。別名: [[AttentionIsAllYouNeed]]

- [arxiv:1706.03762 Attention Is All You Need](https://arxiv.org/abs/1706.03762)という[[論文]]で提唱された。
- [The Annotated Transformer](https://nlp.seas.harvard.edu/annotated-transformer/)
- [[原論文から解き明かす生成AI]]の3章にも詳しい
- [Attention is All You Needのメモ - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2018/06/01/217.html) 大した事書いてないが。

[[ConvS2S]]の進化版と考えられる。Convの代わりに[[セルフアテンション]]を使うという発明。

## PositionEmbeddings

[[PositionEmbeddings]]へ。

## アテンション

- [[アテンション]]
  - [[SoftMax]]

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

i番目のクエリに対してキー側にi+1番目以降のdが登場しているのに注目。eは先があってもいいがdはまだ知らない答えに相当するからまずい。

## Decoderのクロスアテンション部分

Decoderは真ん中にクロスアテンションのMultiHead attentionが入る。

[The Annotated Transformer](https://nlp.seas.harvard.edu/annotated-transformer/)のDecoderLayerを見ると、

```python
 x = self.sublayer[1](x, lambda x: self.src_attn(x, m, m, src_mask))
```

となっていて、src_attnはMultiHeadedAttentionになっていて、$W_Q, W_K, W_V$がx, m, mにそれぞれ掛けられる模様。
mはエンコーダーの最終出力(memory)。

### クロスアテンションをMultiHeadにする意義があるのか？（答. むしろクロスヘッドこそすべきらしい）

クロスアテンションは従来の[[アテンション]]とほぼ同じなのでマルチヘッドにする必要は無いのでは？とChatGPTに聞いたら以下の論文を紹介してくれた。

[arxiv: 1905.10650 Are Sixteen Heads Really Better than One?](https://arxiv.org/abs/1905.10650)

自分の直感とは逆に、むしろクロスアテンションの方がマルチヘッド化は効くらしい。

じゃあRNNもそうなのでは？とChatGPTに聞いたらRNNは文脈ベクトルを持つ分この効果は弱くなるのではないか、との事。
真偽は試してみないとなんともいえないが、ありそうな話ではある。