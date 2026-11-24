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

## Feature Matching（Apprenticeship Learning）

良くApprenticeship Learningとしても参照される手法だが、Apprenticeship LearningはInverse RLの事らしい。

前後の流れが良く分からないので元論文を軽く確認する。

[ICML Apprenticeship Learning via Inverse Reinforcement Learning.pdf](https://icml.cc/Conferences/2004/proceedings/papers/335.pdf)

Holderの不等式はこちら＞[ヘルダーの不等式とその証明 - 数学の景色](https://mathlandscape.com/holder/)

- Imitation Learningの問題設定（データ）
- 暗黙のRに従って行動するという前提（InverseRL）
- Linear Feature Reward

という仮定の元にRを再現する事と、そのRを使って良いポリシーを学習する事をあわせて考えると、
R自体の再現が完全でなくてもポリシーが十分に良いと保障出来るようなアルゴリズムが構築出来る。

### Feature Expectation

アルゴリズムで出てきた以下の式をFeature Expectionと呼ぶ。

Feature MatchingはFeature Expectationを一致させるようにウェイトのwを選び、そのRに対してRLでポリシーを学習する手法、と言える。

## Maximum Entropy Inverse RL

[Maximum Entropy Inverse Reinforcement Learning - AAAI08-227.pdf](https://cdn.aaai.org/AAAI/2008/AAAI08-227.pdf)