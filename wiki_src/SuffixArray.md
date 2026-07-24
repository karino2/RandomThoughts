[[アルゴリズム]]

- [Suffix array - Wikipedia](https://en.wikipedia.org/wiki/Suffix_array)
- [[EnhancedSuffixArray]] SuffixArrayにlcpテーブルや追加のテーブルを持たせてSuffix Treeと同様の能力を与えたもの

## SA-IS

以下の論文のアルゴリズムの略称。

[Linear Suffix Array Construction by Almost Pure Induced-Sorting - IEEE Conference Publication - IEEE Xplore](https://ieeexplore.ieee.org/document/4976463)

線形時間で作れてアルゴリズムもめちゃ短い。たくさん解説がある。

### S-typeとL-type

- S-type: i番目からのサフィックス ＜  i+1番目からのサフィックス
- L-type:  i番目からのサフィックス ＞ i+1番目からのサフィックス

### LMS

iがS-typeでi-1がL-typeのiをLeft Most S-type, 略してLMSと言う。
また、この時 `S[i]` をLMS characterという。

### LMS-substring

iとjがLMSで、間がLMS characterで無い時、Si..jをLMS-substringと言う。

