[[アルゴリズム]]

- [Suffix array - Wikipedia](https://en.wikipedia.org/wiki/Suffix_array)
- [[EnhancedSuffixArray]] SuffixArrayにlcpテーブルや追加のテーブルを持たせてSuffix Treeと同様の能力を与えたもの
- [1101.3448 Inducing the LCP-Array](https://arxiv.org/abs/1101.3448) SA-ISのついでにLCPテーブルも構築するもの

## SA-IS

以下の論文のアルゴリズムの略称。

[Linear Suffix Array Construction by Almost Pure Induced-Sorting - IEEE Conference Publication - IEEE Xplore](https://ieeexplore.ieee.org/document/4976463)

線形時間で作れてアルゴリズムもめちゃ短い。たくさん解説がある。

[SA-ISで高速にSuffix Arrayを構築する話【新歓ブログリレー 38日目】 - 東京科学大学デジタル創作同好会traP](https://trap.jp/post/953/) は例がある程度分かりやすい。

[SA-IS - Shogo Computing Laboratory](https://shogo82148.github.io/homepage/memo/algorithm/suffix-array/sa-is.html?ref=trap.jp) こちらは自然とソートされるメカニズムの解説が詳しい。

### S-typeとL-type

- S-type: i番目からのサフィックス ＜  i+1番目からのサフィックス
- L-type:  i番目からのサフィックス ＞ i+1番目からのサフィックス

### LMS

iがS-typeでi-1がL-typeのiをLeft Most S-type, 略してLMSと言う。
また、この時 `S[i]` をLMS characterという。

### LMS-substring

iとjがLMSで、間がLMS characterで無い時、Si..jをLMS-substringと言う。

### 基本的な手順

かなりトリッキーな性質をいろいろ使うので、細かく理解しないと本当の事は分からないが、おおまかな説明を書いておく（書いておかないとすぐ完全に忘れてしまうので）。

- S, Lを求める
- LMS Substringをバケットソートしてバケットのインデックスで置き換えたS1を作る
- S1をInduced SortしてSuffix Array、SA1を得る。
- SのSuffix ArrayをSA1から得る

それぞれそれなりに際どい話があるので理解するにはちゃんと論文を読む必要がある。

SA1からSAを出す所は、

- LMS suffixがsortされてればLをsortする事が出来る(Lemma 2.7)
- LがsortされていればS-typeをsort出来る(Lemma 2.5, 2.6)

という感じに帰納的になっていて、前の条件が満たされていれば次が出来る、という感じになっている。

さらにそれぞれが単に隣のタイプを見てルールに従って入れていくだけで自動的にソートされる、というような仕組みになっている（Induced Sort）

さらにSA1を作るための所もinduced sortに出来る、みたいなのがこの論文のキモなんだが、
LMS Substringをバケットソートしてでてくる順番の逆順に入れるとか、
それを先頭から見たり後ろから見たりして一つ隣をうまい事入れていくと、必要な前提が順番に埋まって全部sortされる、
みたいなトリックになっている。