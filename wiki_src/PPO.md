[[強化学習]]の[[PolicySearch]]でポリシースペースで離れすぎないように制約を入れたもの。

- [Stanford CS234 Reinforcement Learning I Policy Search 2 I 2024 I Lecture 6 - YouTube](https://www.youtube.com/watch?v=8PwvNQ5WS-o&list=PLoROMvodv4rN4wG6Nk6sNpTEbuOSosZdX&index=6)
- [Stanford CS234 Reinforcement Learning I Policy Search 3 I 2024 I Lecture 7 - YouTube](https://www.youtube.com/watch?v=4ngb0IZTg8I&list=PLoROMvodv4rN4wG6Nk6sNpTEbuOSosZdX&index=7)

Telescoping sum: nまでの和が、それぞれ打ち消し合って最初と最後だけ残るような奴。

## GAE

High-Dimensional Continuous Control Using Generalized Advantage Estimator (ICLR 2016 by Schulman et al.)

## PPOまとめ

- data efficiencyの改善: 新しいポリシーから追加のデータを集める前に複数のgradient stepを進める場合がある
- monotonic improvementのlikelihoodの改善のためにclipを使ったりする
- 局所最適への収束
- 実装が簡単、ChatGPTなどでも使われてる
