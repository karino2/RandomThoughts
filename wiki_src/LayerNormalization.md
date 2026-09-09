[[BatchNormalization]]からヒントを得て、同様の平均と分散の割引を単一のベクトルの次元側でやる手法。[[Transformer]]で使われる。

バイアスとゲインは学習パラメータ。

- [arxiv:1607.06450 Layer Normalization](https://arxiv.org/abs/1607.06450) 元論文

[[原論文から解き明かす生成AI]]の3.4 (式3.17）にも解説がある。

基本的には[[BatchNormalization]]の $\mu$ と $\sigma$ を、各iの $d_{model}$ 側に足して求めたもので代用する。

![imgs/LayerNorm/0000.png](imgs/LayerNorm/0000.png)

ここで[[BatchNormalization]]では $\sigma$ も $\mu$ もベクトルだったが、LayerNormalizationは要素方向にとるのでスカラーになる事に注意。

## Batch Normalizationとどっちを使うべきか？

Layer NormalizationはもともとRNNのようにバッチという概念が中間層に使えないものに使う技法として開発されたが、
[[Transformer]]とかにも使われている。

どうもTransformerではそのままBNに置き換えるとパフォーマンスが悪い事は知られているよう。

[arxiv:2003.07845 PowerNorm: Rethinking Batch Normalization in Transformers](https://arxiv.org/abs/2003.07845)

一方Vision Transformerなどでは工夫したBNの方がいいという話もあるとか。

[SLAB: Efficient Transformers with Simplified Linear Attention and Progressive Re-parameterized Batch Normalization](https://arxiv.org/html/2405.11582v2)

LayerNormの元論文の6.7にCNNでの比較があり、通常のCNNではbatch normalizationの方が良いとか。

それは境界のそばのフィーチャーは0に近いなど、同じレイヤーでも場所によって統計が大きく違うという、
Layer Normalizeに不向きな偏りがあるからではないか、とか書いてある。

この辺はいろいろ研究の余地もあるようで、[arxiv:2201.03545 A ConvNet for the 2020s](https://arxiv.org/abs/2201.03545)などではLayer Normalizationの方が良くなるような構造もあるとか。
