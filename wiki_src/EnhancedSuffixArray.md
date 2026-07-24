[[SuffixArray]]

PngNoteのノートはあとで埋める。

- [Enhanced Suffix Array.pdf](https://www.mi.fu-berlin.de/wiki/pub/ABI/RnaSeqP4/enhanced-suffix-array.pdf)
- [Replacing suffix trees with enhanced suffix arrays - ScienceDirect](https://www.sciencedirect.com/science/article/pii/S1570866703000650) 元論文

Suffix Arrayとlcptableをベースに追加的な線形時間で作れる補助データ構造を使う事で、Suffix Treeと同じオーダーの時間で検索等を実現出来る。
この補助データ構造とSuffix ArrayをあわせたものをEnhanced Suffix Arrayという。

Suffix Treeの効率的な保持方法と解釈する事が出来る。トラバースも配列を順番に見ていくだけで高速。

追加のテーブルとしてはlcptableが基本。＞[LCP array - Wikipedia](https://en.wikipedia.org/wiki/LCP_array)

以下では[Replacing suffix trees with enhanced suffix arrays - ScienceDirect](https://www.sciencedirect.com/science/article/pii/S1570866703000650)を読んでいったメモを中心にまとめる。

## Suffix Tree

PngNote1

## Suffix Array

PngNote2

## Repeat分析

MUMなど。

## lcpインターバルツリー

### アルゴリズム4.1、インターバルのレポート

より大きなlcpがでてくる都度スタックにpushしていき、より小さいlcpに出会ったらその一つ手前までをスタックトップのインターバルとして確定させていく。

Fig. 2に従いインターバルツリーを上から出力していこうと思うとこんなアルゴリズムになると思う。

### アルゴリズム4.4 ボトムアップトラバース

lcpテーブルを順番に見ていってスタックを使うだけで、ツリーのトラバースをしたのと同じ結果が得られる。
インターバルが確定した時にはその子どものリストを持つ形の処理は全てこれで行える。

## esaxxの引数

Sentence Pieceでは以下が使われている。[hillbig/esaxx: Automatically exported from code.google.com/p/esaxx](https://github.com/hillbig/esaxx)

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