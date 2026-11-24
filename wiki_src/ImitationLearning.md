[[強化学習]]

[Stanford CS234 Reinforcement Learning I Policy Search 3 I 2024 I Lecture 7 - YouTube](https://www.youtube.com/watch?v=4ngb0IZTg8I&list=PLoROMvodv4rN4wG6Nk6sNpTEbuOSosZdX&index=7) の後半から。

例えば人間のエキスパートなどがstateとactionの系列を提供出来るが（デモンストレーション）、rewardは無い、というような場合に、
この系列を真似するという学習。

## Behavioral Cloning

単純に教師あり学習としてポリシーを学習。

## Inverse RL

stateとactionの系列からRを再現する、という手法。暗黙のRがあって、それを元に行動している、と想定して、このRを復元する、という考え。

### Linear Feature Reward

フィーチャーの線形和の形を仮定したモデル。

### Feature Matching（Apprenticeship Learning）

[[FeatureMatching]]

## Maximum Entropy Inverse RL

[[MaximumEntropyInverseRL]]
