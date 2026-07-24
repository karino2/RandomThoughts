[[アルゴリズム]]

- [Suffix array - Wikipedia](https://en.wikipedia.org/wiki/Suffix_array)
- [[EnhancedSuffixArray]] SuffixArrayにlcpテーブルや追加のテーブルを持たせてSuffix Treeと同様の能力を与えたもの
- [1101.3448 Inducing the LCP-Array](https://arxiv.org/abs/1101.3448) SA-ISのついでにLCPテーブルも構築するもの

## SA-IS

以下の論文のアルゴリズムの略称。

[Linear Suffix Array Construction by Almost Pure Induced-Sorting - IEEE Conference Publication - IEEE Xplore](https://ieeexplore.ieee.org/document/4976463)

線形時間で作れてアルゴリズムもめちゃ短い。たくさん解説がある。

[SA-ISで高速にSuffix Arrayを構築する話【新歓ブログリレー 38日目】 - 東京科学大学デジタル創作同好会traP](https://trap.jp/post/953/) は良く書けていると思う。

### S-typeとL-type

- S-type: i番目からのサフィックス ＜  i+1番目からのサフィックス
- L-type:  i番目からのサフィックス ＞ i+1番目からのサフィックス

### LMS

iがS-typeでi-1がL-typeのiをLeft Most S-type, 略してLMSと言う。
また、この時 `S[i]` をLMS characterという。

### LMS-substring

iとjがLMSで、間がLMS characterで無い時、Si..jをLMS-substringと言う。

