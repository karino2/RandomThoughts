[[ModelFreePolicyImprovement]]より。Value Function ApproximationでVFA。

## モチベーション

![imgs/CS234Lec4/0013.png](imgs/CS234Lec4/0013.png)

## オラクルありのケース

![imgs/CS234Lec4/0014.png](imgs/CS234Lec4/0014.png)

## オラクルをModel FreeのPolicy Evaluationで代用

[[ModelFreePolicyEvaluation]]でやったMCとTDをオラクルの代わりに使う。

TDでVFAする時にQでは無くVを学習しているのは、TDのケースではTD targetsの作り方にMCよりも自由度があっていろいろなケースが考えられるので、
まずはVを学習する話をしている。

![imgs/CS234Lec4/0015.png](imgs/CS234Lec4/0015.png)

## VFAとコントロール

[[SARSA]]や[[QLearning]]でTDターゲットを作り、通常のMSEの最小化で更新していく。

![imgs/CS234Lec4/0016.png](imgs/CS234Lec4/0016.png)

## Deadly Triadが収束を妨げる

![imgs/CS234Lec4/0017.png](imgs/CS234Lec4/0017.png)

## DQNs

[[DQN]]
