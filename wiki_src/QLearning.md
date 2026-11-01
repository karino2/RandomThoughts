[[強化学習]]の[[ModelFreePolicyImprovement]]で[[TDLearning]]を使う時のオフポリシーの手法。

## Q-learningとは

![imgs/CS234Lec4/0011.png](imgs/CS234Lec4/0011.png)

実際のアクションを行うbehaviorポリシーと、Qを推計する時のポリシーが異なり、
QのTDターゲットとする一つ次のstateのQのポリシーはarg max Qとする手法。

## ε-greedyの収束の性質

![imgs/CS234Lec4/0012.png](imgs/CS234Lec4/0012.png)

Robbins-Munro列については[[SARSA]]の「収束の性質」を参照のこと。

