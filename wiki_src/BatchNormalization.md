バッチ正規化とも言う。[[原論文から解き明かす生成AI]]の[[LayerNormalization]]の項ででてきたのでメモしておく。

書籍、[[深層学習]]のp136 （4.3.4）をベースに書く。

多層のニューラルネットにおいて、途中の層は前の層の変化に追従する事ばかりに学習の労力が割かれてなかなか学習が進まない問題（内部共変量シフト）が起こる事が知られていて、それに対する対策。

ミニバッチごとに平均と分散を割り引いた入力を入れるように変更する手法。

![imgs/BatchNorm/0000.png](imgs/BatchNorm/0000.png)

[[LayerNormalization]]との比較で調べていた感じ、どうもベータとガンマはベクトルでガンマとの積はelement-wiseっぽい。以下のWikipediaでもkの添字がある。

[Batch normalization - Wikipedia](https://en.wikipedia.org/wiki/Batch_normalization)

$\sigma^2$ もベクトルで2乗は要素ごとに計算するっぽい。えー、この表記だと2乗ノルムだと思うよ〜。

### LayerNormlizationとの比較

ミニバッチ単位で計算するのでバッチが必要だ、というのは大前提として。

[[LayerNormalization]]との比較としては、こちらは$\mu$がベクトルで要素ごとに別々というのはちょっと注目したい所。

また、inference時には平均の計算は不要というのも速度という点では意外と良いらしい。