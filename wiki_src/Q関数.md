[[強化学習]]のState Action Value関数の事。State Value関数は[[Value関数]]も参照の事。

![imgs/CS234Lec2/0007.png](imgs/CS234Lec2/0007.png)

State Value関数はstateに関しての将来の報酬の現在価値を計算したもの。
State Action Value関数は、stateとactionに関して、将来の報酬の現在価値を計算する訳だが、
actionは一回だけで以後は与えられたポリシーに従って計算する、というのがトリッキーな所か。