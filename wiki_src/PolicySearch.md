[[強化学習]]のPolicy Search。SC234のLec 5からの内容。

[Stanford CS234 Reinforcement Learning I Policy Search 1 I 2024 I Lecture 5 - YouTube](https://www.youtube.com/watch?v=L6OVEmV3NcE&list=PLoROMvodv4rN4wG6Nk6sNpTEbuOSosZdX&index=5)

## これまでの内容との比較

これまでの強化学習のアルゴリズムは以下を全て含む

- Optimization
- Delayed Consequences
- Exploration
- Generalization

だがそもそもそんな複雑な枠組みでなくやれないか？
例えばPolicyを単にOnline Optimizationとして得られないか？というのがモチベーション。

前回までで、[[Value関数]]やState-Action Value関数を関数近似することを学んだ（[[Value関数の関数近似]]）。
そしてポリシーはこれらのValue関数からε-greedyなどで得られた。

今回はポリシーを直接パラメトライズして、Value関数が最大になるパラメータを求めることでポリシーを得る、という方法を考える。

![imgs/CS234Lec5/0000.png](imgs/CS234Lec5/0000.png)

### 今回のポリシーはstochastic

前回まではε-greedyなどはdeterministic policyだったが、今回考えるポリシーは基本的にはstochasticなもの。

## 例: Aliased Gridworld

二つの区別出来ない状態があると、deterministic policyでは上手く行かないので、これまでのValue-Basedなやり方は上手く行かない。

Policy-Basedなやり方なら、最適なポリシーを学習しうる。


![imgs/CS234Lec5/0001.png](imgs/CS234Lec5/0001.png)
![imgs/CS234Lec5/0002.png](imgs/CS234Lec5/0002.png)
![imgs/CS234Lec5/0003.png](imgs/CS234Lec5/0003.png)
![imgs/CS234Lec5/0004.png](imgs/CS234Lec5/0004.png)
![imgs/CS234Lec5/0005.png](imgs/CS234Lec5/0005.png)
![imgs/CS234Lec5/0006.png](imgs/CS234Lec5/0006.png)
![imgs/CS234Lec5/0007.png](imgs/CS234Lec5/0007.png)
![imgs/CS234Lec5/0008.png](imgs/CS234Lec5/0008.png)
![imgs/CS234Lec5/0009.png](imgs/CS234Lec5/0009.png)
![imgs/CS234Lec5/0010.png](imgs/CS234Lec5/0010.png)
![imgs/CS234Lec5/0011.png](imgs/CS234Lec5/0011.png)
![imgs/CS234Lec5/0012.png](imgs/CS234Lec5/0012.png)
![imgs/CS234Lec5/0013.png](imgs/CS234Lec5/0013.png)
![imgs/CS234Lec5/0014.png](imgs/CS234Lec5/0014.png)
![imgs/CS234Lec5/0015.png](imgs/CS234Lec5/0015.png)
![imgs/CS234Lec5/0016.png](imgs/CS234Lec5/0016.png)
![imgs/CS234Lec5/0017.png](imgs/CS234Lec5/0017.png)
![imgs/CS234Lec5/0018.png](imgs/CS234Lec5/0018.png)
![imgs/CS234Lec5/0019.png](imgs/CS234Lec5/0019.png)
![imgs/CS234Lec5/0020.png](imgs/CS234Lec5/0020.png)
![imgs/CS234Lec5/0021.png](imgs/CS234Lec5/0021.png)
![imgs/CS234Lec5/0022.png](imgs/CS234Lec5/0022.png)