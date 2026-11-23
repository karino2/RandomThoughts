[[強化学習]]の[[PolicySearch]]の[[PolicyGradient]]法で、時系列構造を考慮に入れる事を考える。[[REINFORCE]]と呼ばれる手法。

[Stanford CS234 Reinforcement Learning I Policy Search 2 I 2024 I Lecture 6 - YouTube](https://www.youtube.com/watch?v=8PwvNQ5WS-o&list=PLoROMvodv4rN4wG6Nk6sNpTEbuOSosZdX&index=6)

## 時系列構造を考慮に入れたPolicy Grad（REINFORCE）

[[PolicyGradient]]でやったLikelihoodレシオなどを用いた計算では、時系列構造が考慮に入っていない。
時系列構造を考慮に入れてVのgradを計算してみる。

![imgs/CS234Lec5/0014.png](imgs/CS234Lec5/0014.png)
![imgs/CS234Lec5/0015.png](imgs/CS234Lec5/0015.png)


## REINFORCE(モンテカルロポリシーGradient）

![imgs/CS234Lec5/0016.png](imgs/CS234Lec5/0016.png)

### Gが高varianceになる問題の二つの対策

Gはトラジェクトリー一つにつき一回計算する感じなので、varianceが高くなって収束までに大量のデータが必要となる。
この対策に二つの方法が考えられている。

- baseline
- MCリターンの代替を考える（Actor-Critic）

## baseline

![imgs/CS234Lec5/0017.png](imgs/CS234Lec5/0017.png)

### baselineはバイアスを生じさせない

![imgs/CS234Lec5/0018.png](imgs/CS234Lec5/0018.png)
![imgs/CS234Lec5/0019.png](imgs/CS234Lec5/0019.png)

### baselineの選択

![imgs/CS234Lec5/0020.png](imgs/CS234Lec5/0020.png)

## Actor-Critic

![imgs/CS234Lec5/0021.png](imgs/CS234Lec5/0021.png)

### CriticにTD構造を入れる

[[TDLearning]]の時のようにTD(0)構造を入れる。

![imgs/CS234Lec5/0022.png](imgs/CS234Lec5/0022.png)


## Generalized Advantage Estimator(GAE)

講義的には[[PPO]]の最後でやっていたが、内容はこっちなのでこっちに書く。

High-Dimensional Continuous Control Using Generalized Advantage Estimator (ICLR 2016 by Schulman et al.)

時系列構造を何期まで取り込むのかには、[[バイアスとバリアンス]]のトレードオフがある。
一期だけ取り込むTD(0)ではvarianceを下げる事が出来るがバイアスは大きくなる。

一方すべてを取り込むとモンテカルロになり、これは1サンプルではvarianceが大きくなる。

このバランスを取るために、TD(0)からモンテカルロまでの間を割引っぽく全部足したものを取り、これを最適化する、と考えると、
パラメータ一つで両者のバランスを調整出来るようになる。これがGAE。

![imgs/CS234Lec6_PPO/0010.png](imgs/CS234Lec6_PPO/0010.png)
![imgs/CS234Lec6_PPO/0011.png](imgs/CS234Lec6_PPO/0011.png)
