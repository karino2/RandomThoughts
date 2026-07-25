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

一番最後の文字はS-typeと約束。

### LMS

iがS-typeでi-1がL-typeのiをLeft Most S-type, 略してLMSと言う。
また、この時 `S[i]` をLMS characterという。

### LMS-substring

iとjがLMSで、間がLMS characterで無い時、Si..jをLMS-substringと言う。

### アルゴリズムの概要（2のコード）

ポイントとしては、帰納的に、後ろから考える事。つまりCが成り立っていればDが成り立つ、を、「Cをどうやるかは置いといて」まずは理解する。
そしてこれを遡って最終的にAを考える、という順番になる。

それを踏まえて以下でSA-ISの概要をまとめると

- LMS Substringをソートする(2.4)
- ソートされた順番のindexを名前としてSを置き換えてS1にして、小さいS1についてSA-ISを再帰的に実行
  - 一番小さい時にSAを求める（これは単なるバケットソート）
- SA1からSAを求める (2.3)

となる。
最初に必要になるLMS Substringのソートが論文では最後にでてくるので読み方に注意が必要。

### Induced Sort

それぞれの手順で、Induced Sortというのが使われる。
これはバケットに従ってソートされた何かが入っている状態から始めて、その左隣を見てはバケットに順番に入れていくと自動的にソートされる、
というもの。アルファベットのバケットをイメージしつつ読んでいくと良い。

基本的な手順は以下になっている。

- ソートされたLMSが入っている（帰納的に考える！）
- 入っているものを順番に見ていって一文字左がLなら入れていく
  - ここまで見たものよりもLなので必ず今見ている所より後ろに入る
- 入っているものを逆順に見ていって一文字左がSなら入れていく

これで最終的にはLもSも全部ソートされた状態になる、というのがIndueced Sort。

これは、後述するSA1からSAを作る時も、LMS Substringをソートする時にも使われる。

[2段階ソート - Shogo Computing Laboratory](https://shogo82148.github.io/homepage/memo/algorithm/suffix-array/two-stage.html)の解説も参照の事。

### LMS Substringの名前づけ

LMS Substringが順番にソート出来ているとする。この順番を表すint値でLMS Substringを置き換えたもの（S1）はSより短くなる。
そしてこのS1のSuffix Arrayが求まると、ここからSのSuffix Arrayを求める事が出来る。（2.3 Inducing SA from SA1）

このソート「されているとする」というのがポイントで、ソートの問題は後ででてくるので、
説明を読む時は「ソートがされているとするなら」という気分で読んでいく必要がある。

このソートの順番での置き換えは記号が分かりにくいのも読みづらくしていると思う。

ソートがされているとするならその順番で置き換えたS1のSuffix Arrayを求める問題と、そのSA1からSAを求める問題に分ける事が出来る。

置き換えたS1のSuffix Arrayを求める問題は、再帰的に小さくしていけば、最終的には先頭の文字のバケットソートでソート出来る所に行き着く。

### 2.3 SA1からSAを作る

これもInduced Sortで作れる。SA1がバケットに正しく入っている前提でL-typeを入れていって、後ろからS-typeを入れていく。

### 2.4 LMS SubstringのソートにもInduced Sortを使う

2.4に、S-typeのバケットの方にLMS Substringを入れるとか後ろから見ていくとかいろいろトリックが書いてあって、
この通りにやるとLMS Substringも自動的にソートされるらしい。

ここはあんまり正確には理解してないが、ここまで読むとまぁできそうなのでいいかという気分になる。