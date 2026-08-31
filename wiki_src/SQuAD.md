SQuAD はThe Stanford Question Answering Datasetの略で、span prediction taskと呼ばれる分類のデータセット。
[[BERT]]で使われている。

[arxiv: 1606.05250 SQuAD: 100,000+ Questions for Machine Comprehension of Text](https://arxiv.org/abs/1606.05250)

## Span Prediction Task

- 問い
- パッセージ
- 答えのspan

の３つで構成されていて、答えはパッセージの中の区間にある形式のQ and A。答えがいつもbegin とendのindexになる。