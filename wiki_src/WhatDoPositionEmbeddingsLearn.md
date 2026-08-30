[[PositionEmbeddings]]の[[論文]]。

- [arxiv:2010.04903 What Do Position Embeddings Learn? An Empirical Study of Pre-Trained Language Model Positional Encoding](https://arxiv.org/abs/2010.04903)

Pre-trainedモデルのpositional embeddingsが実際に何を学習しているかとか、様々なNLPタスクへのパフォーマンスの影響を実証的に調べる。

## 実験対象

- BERTのEncoder
- RoBERTaのEncoder
- GPT-2のDecoder
- sinusodial (Transformerの、学習ではない算術式）

## 4.1.1 絶対位置の逆写像の線形回帰

それぞれのembeddingの値から絶対位置への逆写像を線形回帰で作ってみる、という実験。
GPT-2は1024トークンを512に揃えるべく再学習したとか。

結果はテーブル1（以下に転載）。

| PE | MAE |
| ---- | ----|
| BERT | 34.14 |
| RoBERTa | 6.06 |
| GPT-2 | 1.03 |
| sinusoid | 0.0 |

## 4.1.2 相対位置の大小のロジスティック回帰

相対位置、つまり距離の逆写像が分かるか、という問題は、試したら全然わからないというのが答えらしい（詳細は載ってない）。

そこでもっと簡単な、どちらのトークンが先にでているか、というのを判定するロジスティック回帰を試してみた、というのが実験4.1.2で、結果は以下のテーブル2。

| PE | Error Rate |
| ---- | ----|
| BERT | 19.72% |
| RoBERTa | 7.23% |
| GPT-2 | 1.56% |
| sinusoid | 5.08% |
