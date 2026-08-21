[[機械翻訳]]にRNNでは無くCNNを使う事を提唱した[[論文]]

- [arxiv:1705.03122 Convolutional Sequence to Sequence Learning](https://arxiv.org/abs/1705.03122)
- [fairseq/fairseq/models/fconv.py at 3d262bb25690e4eb2e7d3c1309b1e9c406ca4b99 · facebookresearch/fairseq](https://github.com/facebookresearch/fairseq/blob/3d262bb25690e4eb2e7d3c1309b1e9c406ca4b99/fairseq/models/fconv.py#L33) 実装はこれか。
   - [fairseq/fairseq/modules/learned_positional_embedding.py at main · facebookresearch/fairseq](https://github.com/facebookresearch/fairseq/blob/main/fairseq/modules/learned_positional_embedding.py#L15) positional embeddingは学習しているな(sinの奴も入っているが）。位置のindexに対してembedを学習する感じ（Wを掛けて使う感じ）っぽい。これでいいのでは、という気はするな。

## Transformerを踏まえた特徴

Transformerへとつながる数々のアイデアがある。

- Positional embedding
- Multi step attention

初期化は結構大変そう。

## ノーテーション

![imgs/ConvS2S/0000.png](imgs/ConvS2S/0000.png)

## CNNブロック

![imgs/ConvS2S/0002.png](imgs/ConvS2S/0002.png)

これをconvolutionしていく。

## Encoder-Decoderの概略

![imgs/ConvS2S/0003.png](imgs/ConvS2S/0003.png)

cがAttention。Decoderの各レイヤにある。

### アテンション

![imgs/ConvS2S/0004.png](imgs/ConvS2S/0004.png)


dはhと$g_i$の線形和（decoder state summaryと呼んでいる）。このdecoderの状態要約とzの関係で求めるアテンションとなる。