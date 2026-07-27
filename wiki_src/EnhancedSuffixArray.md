[[SuffixArray]], [[原論文から解き明かす生成AI]], [[アルゴリズム]]

- [Enhanced Suffix Array.pdf](https://www.mi.fu-berlin.de/wiki/pub/ABI/RnaSeqP4/enhanced-suffix-array.pdf)
- [Replacing suffix trees with enhanced suffix arrays - ScienceDirect](https://www.sciencedirect.com/science/article/pii/S1570866703000650) 元論文

Suffix Arrayとlcptableをベースに追加的な線形時間で作れる補助データ構造を使う事で、Suffix Treeと同じオーダーの時間で検索等を実現出来る。
この補助データ構造とSuffix ArrayをあわせたものをEnhanced Suffix Arrayという。

Suffix Treeの効率的な保持方法と解釈する事が出来る。トラバースも配列を順番に見ていくだけで高速。

追加のテーブルとしてはlcptableが基本。＞[LCP array - Wikipedia](https://en.wikipedia.org/wiki/LCP_array)

以下では[Replacing suffix trees with enhanced suffix arrays - ScienceDirect](https://www.sciencedirect.com/science/article/pii/S1570866703000650)を読んでいったメモを中心にまとめる。

## Suffix Tree

![imgs/EnhancedSuffixArray/0000.png](imgs/EnhancedSuffixArray/0000.png)

## Suffix Array

![imgs/EnhancedSuffixArray/0001.png](imgs/EnhancedSuffixArray/0001.png)

lcpテーブルはSA-ISを変更して同時に作る事が出来るらしい。

[arxiv:1101.3448 Inducing the LCP-Array](https://arxiv.org/abs/1101.3448)


## Repeat分析

![imgs/EnhancedSuffixArray/0002.png](imgs/EnhancedSuffixArray/0002.png)

### lcpインターバル

![imgs/EnhancedSuffixArray/0003.png](imgs/EnhancedSuffixArray/0003.png)

![imgs/EnhancedSuffixArray/0004.png](imgs/EnhancedSuffixArray/0004.png)

例

### MUM

![imgs/EnhancedSuffixArray/0005.png](imgs/EnhancedSuffixArray/0005.png)

![imgs/EnhancedSuffixArray/0006.png](imgs/EnhancedSuffixArray/0006.png)

## lcpインターバルツリー

![imgs/EnhancedSuffixArray/0007.png](imgs/EnhancedSuffixArray/0007.png)

### アルゴリズム4.1、インターバルのレポート

より大きなlcpがでてくる都度スタックにpushしていき、より小さいlcpに出会ったらその一つ手前までをスタックトップのインターバルとして確定させていく。

Fig. 2に従いインターバルツリーを上から出力していこうと思うとこんなアルゴリズムになると思う。

### アルゴリズム4.4 ボトムアップトラバース

lcpテーブルを順番に見ていってスタックを使うだけで、ツリーのトラバースをしたのと同じ結果が得られる。
インターバルが確定した時にはその子どものリストを持つ形の処理は全てこれで行える。

## トップダウンとchildtab

![imgs/EnhancedSuffixArray/0008.png](imgs/EnhancedSuffixArray/0008.png)

![imgs/EnhancedSuffixArray/0009.png](imgs/EnhancedSuffixArray/0009.png)

### childtabの構築

![imgs/EnhancedSuffixArray/0010.png](imgs/EnhancedSuffixArray/0010.png)

![imgs/EnhancedSuffixArray/0011.png](imgs/EnhancedSuffixArray/0011.png)

### childtabを用いた子どものリストアップ

![imgs/EnhancedSuffixArray/0012.png](imgs/EnhancedSuffixArray/0012.png)

![imgs/EnhancedSuffixArray/0013.png](imgs/EnhancedSuffixArray/0013.png)


## esaxxの引数

[[原論文から解き明かす生成AI]]で出てくるSentence Pieceでは、以下が使われている。[hillbig/esaxx: Automatically exported from code.google.com/p/esaxx](https://github.com/hillbig/esaxx)

引数は[esaxx/esa.hxx#L94-L110](https://github.com/hillbig/esaxx/blob/master/esa.hxx#L94C1-L110C4)に解説があるが、

```cpp
/**
 * @brief Build an enhanced suffix array of a given string in linear time
 * For an input text T, esaxx() builds an enhancd suffix array in linear time. 
 * i-th internal node is represented as a triple (L[i], R[i], D[i]); 
 *   L[i] and R[i] is the left/right boundary of the suffix array as SA[L[i]....R[i]-1]
 *   D[i] is the depth of the internal node
 * The number of internal node is at most N-1 and return the actual number by 
 * @param T[0...n-1]  The input string. (random access iterator)
 * @param SA[0...n-1] The output suffix array (random access iterator)
 * @param L[0...n-1]  The output left boundary of internal node (random access iterator)
 * @param R[0...n-1]  The output right boundary of internal node (random access iterator)
 * @param D[0...n-1]  The output depth of internal node (random access iterator)
 * @param n The length of the input string
 * @param k The alphabet size
 * @pram nodeNum The output the number of internal node
 * @return 0 if succeded, -1 or -2 otherwise 
 */
```

Depthとは何なのか、とか解説が無くて、
トリプレットはchildtabともちょっと違いそう。

出力結果やコードを眺めた印象だと、
lcpインターバルツリーの各ノードを表していそう。

i番目のノードがLiからRi-1までで、Diが共通prefixの長さになってそう。

ここからどうやって子ノードを探したりするのかは良く分からない。
Riは単調増加していて、同じRiに対してはLiは単調に減少しているので、
同じRiの狭いインターバルから広いインターバルに並んでいる。

たぶんツリー構造を復活させるルールがあるんだろうけれど、Sentence Pieceではそういう性質は使っていないので、知らなくてもSentence Pieceの理解には問題無い。上記の意味さえ理解しておけばコードは読めるし、これらがリニアタイムで構築出来るのも特に分からない事は無いだろう。

単に辿っていけばインターバルツリーのボトムアップトラバーサルにはなりそうで、親子関係は分かるはずなので、一回なめればトップダウン構造も再現できそうではある。

enumSubstring.cppをいじって配列を出してみた。
大したコードでは無いが将来再現したくなった時のために一応貼っておく。＞[gist: buildEsa.cpp](https://gist.github.com/karino2/e22da339a5eab350f450f1e6f6809ab0)

上記のノートのコドン配列だと以下。

```
$ cat codon.txt
acaaacatat
$ ./buildEsa < codon.txt
    n:10
alpha:256
 Suffix Array:
i	SA	L	R	D	substring:
--------------------------------
0	2	0	2	2	aaacatat
1	3	2	4	3	aacatat
2	0	4	6	2	acaaacatat
3	4	0	6	1	acatat
4	8	6	8	2	at
5	6	8	10	1	atat
6	1	0	10	0	caaacatat
7	5	2	1	0	catat
8	9	0	1	0	t
9	7	1	0	0	tat
```

SAとsubstringは通常のsuffix arrayなのでいいだろう。

上記のSuffixツリーのノートと比べながら、上の行から順番に解釈していく。

1行目はLが0, Rが2なので、0から2-1、つまり0から1までが、プレフィクス2だけ共通、つまりこの場合は `lcptab[1] = 2` という事だろう。これはaaacatatとaacatatは先頭の2文字のaaだけ共通、という事。

2行目はLが2, Rが4でDが3なので、2から4-1、つまり2から3が、3文字共通、つまり`lcptab[3]=3`。acaaacatatとacatatは先頭のacaだけ共通、という事。

3行目も同様に4から5がatだけ共通

4行目は0から５がaだけ共通。

lcpインターバルツリーの下のインターバルから順番に書かれていて、その親は次に来る、という形式になっている。

2段階の子どもがaしか無いのがややこしくしているな。tの子どもも二段階にしてみよう。適当に末尾に足しただけなのでコドンとしては意味をなしてないが。

```
% cat codon2.txt
acaaacatatacta
% ./buildEsa < codon2.txt
    n:14
alpha:256
 Suffix Array:
i	SA	L	R	D	substring:
--------------------------------
0	13	1	3	2	a
1	2	3	5	3	aaacatatacta
2	3	3	6	2	aacatatacta
3	0	6	8	3	acaaacatatacta
4	4	0	8	1	acatatacta
5	10	8	10	2	acta
6	8	8	11	1	atacta
7	6	11	14	2	atatacta
8	1	0	14	0	caaacatatacta
9	5	2	2	0	catatacta
10	11	1	2	0	cta
11	12	0	1	0	ta
12	9	2	0	0	tacta
13	7	2	0	0	tatacta
```

ツリーを描いてみると以下か？

![imgs/EnhancedSuffixArray/0014.png](imgs/EnhancedSuffixArray/0014.png)

注意する点

- 最後の数字だけはSAの値で置き換えているのに注意
   - lcpインターバルツリーとして読むならiの値のままの方が分かりやすいのだが、Suffixツリーの定義では無くなってしまうので。
- lcpインターバルはRi-1なので1引いている
- 表を中間ノードだけを入れたテーブルとみなしてツリーの左下の（中間ノードの中で）一番子どもから順番に辿っていくと表と対応している
   - 1..2, 3..4, 3..5, 6..7, 0..7
   - 子どもが揃ったら親に行く
   - 兄弟に移る時はその一番子どもから始まる（Forestのtrailingだけ追うようなもの [Forest: An Introduction](https://stlab.cc/2020/12/01/forest-introduction.html)）
   - Dはdepthと書いてあるがやはりlcp-intarvalのl値と解釈する方が正しそう（少なくともツリーの深さにはなっていない、taのノード参照）

やはりlcpインターバルツリーを再現しているデータ構造にはなっている。

トップダウントラバースは追加のデータ構造が必要そうだ。

LCPテーブル自体は返してないが（途中の計算で出しているのに…）、lcpインターバルツリーのl値は分かるのだから一回なめれば復元は出来る。
