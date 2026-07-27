[[CoverAndThomas]]の13.4より。

1977年の論文のLZ77 (Sliding Window)と1978年のLZ78 (ツリー）がある。分布が分かっていないケースの圧縮。[[データ圧縮]]

## Sliding Window Lempel-Ziv (LZ77)

i番目を考える。i番目から先の文字列を、i-1からWだけ戻ってる範囲（i-1-W）で探して、その位置P（iからどれだけ戻るか）と長さLを送る。
次はi+L+1から始める。

Wの範囲で一致する文字列が無ければそのまま文字を送る。

どちらのケースか表すフラグを1bit、それと一致があればP, L, 無ければCが送られる。

- (F, P, L)
- (F, C)

これがSliding WindowバージョンのLZ77。
オーバーラップするケースがあると言っているがその場合はオーバーラップした文字列は送られないのでは？という気もするがどうなっているのだろう？

[LZ77 and LZ78 - Wikipedia](https://en.wikipedia.org/wiki/LZ77_and_LZ78) を読むと、越えた分はそれまでのパターンを繰り返していくらしい。

これはgzipやpkzipで使われているとか。

## Tree-Structured Lempel-Ziv (LZ78)

そこまででてきたprefix+1文字、を送り続ける。prefixは先頭からのオフセット。ツリーを作る事に相当する。

Unixのcompressやgifで使われているとか。