[[強化学習]]の[[ImitationLearning]]の一種。

[Stanford CS234 Reinforcement Learning I Offline RL 1 I 2024 I Lecture 8 - YouTube](https://www.youtube.com/watch?v=IEbuJtjqtMU&list=PLoROMvodv4rN4wG6Nk6sNpTEbuOSosZdX&index=8)

良くApprenticeship Learningとしても参照される手法だが、Apprenticeship LearningはInverse RLの事らしい。

## 元論文など

前後の流れが良く分からないので元論文を軽く確認する。

[ICML Apprenticeship Learning via Inverse Reinforcement Learning.pdf](https://icml.cc/Conferences/2004/proceedings/papers/335.pdf)

Holderの不等式はこちら＞[ヘルダーの不等式とその証明 - 数学の景色](https://mathlandscape.com/holder/)

## 概要

- Imitation Learningの問題設定（データ）
- 暗黙のRに従って行動するという前提（InverseRL）
- Linear Feature Reward

という仮定の元にRを再現する事と、そのRを使って良いポリシーを学習する事をあわせて考えると、
R自体の再現が完全でなくてもポリシーが十分に良いと保障出来るようなアルゴリズムが構築出来る。

## Feature Expectation

アルゴリズムで出てきた以下の式をFeature Expectionと呼ぶ。

Feature MatchingはFeature Expectationを一致させるようにウェイトのwを選び、そのRに対してRLでポリシーを学習する手法、と言える。

