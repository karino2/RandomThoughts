[[BERT]]にいろんな[[PositionEmbeddings]]を試してみて結果を見る[[論文]]

- [On Position Embeddings in BERT - OpenReview](https://openreview.net/forum?id=onxoVA9FxMw)

## Span prediction

[[SQuAD]]に詳細があるように、パッセージの一部が回答になるようなQ and A。

## 検討する性質

### Monotonicity

一般に、
二つの位置が離れると二つの位置のembeddingsのsimilarityが下がる、
という性質はorder preservationとして調べられてきた。

我々はその特殊なケースとして位置が自然数であらわされるケースにだけ関心があるので、
order preservationの特殊なケースとしてのmonotonicityを定義してそれを考える。

- mがnより大きい
- xと