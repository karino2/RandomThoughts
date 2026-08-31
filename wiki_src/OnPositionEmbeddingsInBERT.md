[[BERT]]にいろんな[[PositionEmbeddings]]を試してみて結果を見る[[論文]]。

- [On Position Embeddings in BERT - OpenReview](https://openreview.net/forum?id=onxoVA9FxMw)

[[WhatDoPositionEmbeddingsLearn]]が微妙だったので他のも見てみようと思って見かけた論文。
いろいろなPEに対して3つの数学的性質がどのくらい満たされているのかを調べたり、BERTにつなげてSQuADやGLUEがどのくらいのスコアになるかを調べたりする。

## Span prediction

[[SQuAD]]に詳細があるように、パッセージの一部が回答になるようなQ and A。

## 調べる対象のPosition Embeddings

- Fully learnable APE （[[ConvS2S]]のもの）
- Fixed sinusoidal APE ([[Transformer]]のもの)
- Learnable sinusoidal APE (この論文が提案するもの、sinusoidalのwを学習）
- Fully learnable RPE (relativeな奴だけを入れる奴）
- Fixed sinusoidal RPE
- Learnable sinusoidal RPE (この論文が提案するもの、sinusoidalのwを学習）


## 検討する性質

- Monotonicity
- Translation Invariance
- Symmetry

について、いろいろなembeddingsがどうなっているかを見ていく。

![imgs/OnPositionEmbeddings/0000.png](imgs/OnPositionEmbeddings/0000.png)

## Sinusoidal PE

Trans InvとSymmetryは解析的に示せる。

![imgs/OnPositionEmbeddings/0001.png](imgs/OnPositionEmbeddings/0001.png)

Monotonicityは一般には近い所でしか成り立っていない。

## Identical Word Probing

入力トークンを全部同じ単語にして、最初のレイヤーのアテンションの重みを計算する。
これをいろいろな単語（ランダムに選んだ300単語）で求めて平均すると単語の影響をならした位置だけの効果が期待出来ると期待して、この値をいろいろ調べる。

また、この値といろいろなタスクのスコアの相関などを求めたりもしている。

## 実証実験

PEをいろいろ変えて、Huggingfaceをfine tuneして[[SQuAD]]と[[GLUE]]を評価している。

GLUEはFully learnable APE(BERTやConvS2Sなど)が一番良いとか（駄目じゃん）。
SQuADはlearnable sin APEが良いと言っているが結構微妙。

## 雑感

[[WhatDoPositionEmbeddingsLearn]]よりは実験の設計は知りたい事に近いと思う。
結果を見ると理論的な分析はあんまり説得力が無いなぁ、と思うが、
PEの違いがどのくらいあるのかを見るには良い論文とは思う。

span predictionはPEが無いとスコアがめちゃ下がるので、PE自体は必要なんだな、と説得はされる。