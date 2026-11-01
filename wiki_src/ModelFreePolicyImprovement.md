前回[[ModelFreePolicyEvaluation]]をやったので、次にPolicy Improvementを考えたい。

[Stanford CS234 Reinforcement Learning I Q learning and Function Approximation I 2024 I Lecture 4 - YouTube](https://www.youtube.com/watch?v=b_wvosA70f8&list=PLoROMvodv4rN4wG6Nk6sNpTEbuOSosZdX&index=4)

## Policy Improvementの難しさ

![imgs/CS234Lec4/0000.png](imgs/CS234Lec4/0000.png)

[[ModelFreePolicyEvaluation]]でポリシーの良さを評価する事は出来たが、
そのポリシーを改善していく方法を考えるとそんなに簡単では無い。

[[MarkovDecisionProcess]]の時のPolicy Improvementと同じように考えると、arg maxのQを求めたくなるが、モデルフリーの場合Policy Evaluationで求めたQはまだ試した事が無いactionについては知らないのでarg maxを求められない。

## Exploration

![imgs/CS234Lec4/0001.png](imgs/CS234Lec4/0001.png)

## ε-greedyポリシー

![imgs/CS234Lec4/0002.png](imgs/CS234Lec4/0002.png)

## ε-greedyポリシーでのPolicy Improvementの性質

![imgs/CS234Lec4/0003.png](imgs/CS234Lec4/0003.png)

## ε-greedyポリシーをControlに使う(MC Control)

![imgs/CS234Lec4/0004.png](imgs/CS234Lec4/0004.png)

## GLIEとε-greedyポリシーでのMC Controlの収束

![imgs/CS234Lec4/0005.png](imgs/CS234Lec4/0005.png)

## TDコントロール

![imgs/CS234Lec4/0006.png](imgs/CS234Lec4/0006.png)

[[TDLearning]]ではVを推計したが、Qを推計するにはアクションが必要となる。
良く使われるのは以下の二つ。

1. SARSA（オンポリシー手法の一つ）
2. Q-Learning（オフポリシー手法の一つ）

### SARSAアルゴリズム

![imgs/CS234Lec4/0007.png](imgs/CS234Lec4/0007.png)

### SARSAの収束の性質

![imgs/CS234Lec4/0008.png](imgs/CS234Lec4/0008.png)

### SARSAの収束の性質に関する研究の経緯

![imgs/CS234Lec4/0009.png](imgs/CS234Lec4/0009.png)

### オンポリシーとオフポリシー

![imgs/CS234Lec4/0010.png](imgs/CS234Lec4/0010.png)

## Q-learning、オフポリシーの手法

![imgs/CS234Lec4/0011.png](imgs/CS234Lec4/0011.png)

実際のアクションを行うbehaviorポリシーと、Qを推計する時のポリシーが異なり、
QのTDターゲットとする一つ次のstateのQのポリシーはarg max Qとする手法。

## Q-learningでのε-greedyの収束の性質

![imgs/CS234Lec4/0012.png](imgs/CS234Lec4/0012.png)

Robbins-Munro列については「SARSAの収束」を参照のこと。

## Value関数の近似（VFA）

![imgs/CS234Lec4/0013.png](imgs/CS234Lec4/0013.png)
![imgs/CS234Lec4/0014.png](imgs/CS234Lec4/0014.png)
![imgs/CS234Lec4/0015.png](imgs/CS234Lec4/0015.png)
![imgs/CS234Lec4/0016.png](imgs/CS234Lec4/0016.png)
![imgs/CS234Lec4/0017.png](imgs/CS234Lec4/0017.png)
![imgs/CS234Lec4/0018.png](imgs/CS234Lec4/0018.png)
![imgs/CS234Lec4/0019.png](imgs/CS234Lec4/0019.png)
![imgs/CS234Lec4/0020.png](imgs/CS234Lec4/0020.png)