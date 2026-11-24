[[強化学習]]の[[ImitationLearning]]の一種。

- [Stanford CS234 Reinforcement Learning I Policy Search 3 I 2024 I Lecture 7 - YouTube](https://www.youtube.com/watch?v=4ngb0IZTg8I&list=PLoROMvodv4rN4wG6Nk6sNpTEbuOSosZdX&index=8)
- [ICML Apprenticeship Learning via Inverse Reinforcement Learning.pdf](https://icml.cc/Conferences/2004/proceedings/papers/335.pdf) 元論文
- Holderの不等式はこちら＞[ヘルダーの不等式とその証明 - 数学の景色](https://mathlandscape.com/holder/)

良くこの論文はApprenticeship Learningとしても参照される手法だが、Apprenticeship LearningはImitation Learningの事らしい。

## 概要

- Imitation Learningの問題設定（データ）
- 暗黙のRに従って行動するという前提（InverseRL）
- Linear Feature Reward

という仮定の元にRを再現する事と、そのRを使って良いポリシーを学習する事をあわせて考えると、
R自体の再現が完全でなくてもポリシーが十分に良いと保障出来るようなアルゴリズムが構築出来る。

## Feature Expectation

アルゴリズムで出てきた以下の式をFeature Expectionと呼ぶ。

Feature MatchingはFeature Expectationを一致させるようにウェイトのwを選び、そのRに対してRLでポリシーを学習する手法、と言える。

