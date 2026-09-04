[[BatchNormalization]]からヒントを得て、同様の平均と分散の割引を単一のベクトルの次元側でやる手法。

バイアスとゲインは学習パラメータ。

- [arxiv:1607.06450 Layer Normalization](https://arxiv.org/abs/1607.06450) 元論文

[[原論文から解き明かす生成AI]]の3.4 (式3.17）にも解説がある。

基本的には[[BatchNormalization]]の $\mu$ と $\sigma$ を、各iの $d_{model}$ 側に足して求めたもので代用する。