[[強化学習]]で良く扱う過程。マルコフ性については[[強化学習の用語定義]]参照。

- [Stanford CS234 Reinforcement Learning I Introduction to Reinforcement Learning I 2024 I Lecture 1 - YouTube](https://www.youtube.com/watch?v=WsvFL-LjA6U)
- [Stanford CS234 Reinforcement Learning I Tabular MDP Planning I 2024 I Lecture 2 - YouTube](https://www.youtube.com/watch?v=gHdsUUGcBC0&list=PLoROMvodv4rN4wG6Nk6sNpTEbuOSosZdX&index=3)

## MDPの定義

[[強化学習の用語定義]]にあるSequential Decision Processのうち、マルコフassumptionの成り立つもの。

## MDPの例

![imgs/CS234Intro/0006.png](imgs/CS234Intro/0006.png)

## Markov Reward Process (MRP)
![imgs/CS234Intro/0009.png](imgs/CS234Intro/0009.png)

## 無限地平でのMRP

![imgs/CS234Lec2/0000.png](imgs/CS234Lec2/0000.png)

### Vを求める（DPによるiterativeな算出）

Value State関数を求める。[[リターンとバリュー関数]]のバリュー関数。

![imgs/CS234Lec2/0001.png](imgs/CS234Lec2/0001.png)

## 無限地平のMDP

MRPはMDP+actionなので前のMRPの続きとしてMDPを考える。

![imgs/CS234Lec2/0002.png](imgs/CS234Lec2/0002.png)

### ポリシーを足すとMRPになる

![imgs/CS234Lec2/0003.png](imgs/CS234Lec2/0003.png)

ポリシーを足すとRとPにそれを取り込む事が出来て、そうしたRとPを持つMRPと考える事が出来る。
すろと先に見たVの算出方法が使える。

### ポリシーの評価

あるポリシーがどのくらい良いものか、という事を評価するには、Vを求めれば良い。

![imgs/CS234Lec2/0004.png](imgs/CS234Lec2/0004.png)

### 最適なポリシーを求める（MDP Control）ための前準備

あるポリシーがどのくらい良いか、という評価の方法は分かった。
次に最適なポリシーを探索する方法を考える。

実際の計算に入る前に、以下の二つの事実を考慮に入れておくと良い（後で証明する）

無限地平のMDPでは、

- 最適なVがユニークに存在する
- 最適なポリシーはdeterministicになる。

![imgs/CS234Lec2/0005.png](imgs/CS234Lec2/0005.png)

### Policy Iteration（PI）

最適なポリシーをPIで求める。

![imgs/CS234Lec2/0006.png](imgs/CS234Lec2/0006.png)

このPolicy improvementについて以下に見ていく。

### Q関数

![imgs/CS234Lec2/0007.png](imgs/CS234Lec2/0007.png)

[[Q関数]]

### Policy Improvementの手順

![imgs/CS234Lec2/0008.png](imgs/CS234Lec2/0008.png)

### Policy Improvementは実際に何をやっているか？

![imgs/CS234Lec2/0009.png](imgs/CS234Lec2/0009.png)

----

![imgs/CS234Lec2/0010.png](imgs/CS234Lec2/0010.png)
![imgs/CS234Lec2/0011.png](imgs/CS234Lec2/0011.png)
![imgs/CS234Lec2/0012.png](imgs/CS234Lec2/0012.png)
![imgs/CS234Lec2/0013.png](imgs/CS234Lec2/0013.png)
![imgs/CS234Lec2/0014.png](imgs/CS234Lec2/0014.png)
![imgs/CS234Lec2/0015.png](imgs/CS234Lec2/0015.png)
![imgs/CS234Lec2/0016.png](imgs/CS234Lec2/0016.png)
![imgs/CS234Lec2/0017.png](imgs/CS234Lec2/0017.png)
![imgs/CS234Lec2/0018.png](imgs/CS234Lec2/0018.png)