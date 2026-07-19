[[アルゴリズム]]

- [Suffix array - Wikipedia](https://en.wikipedia.org/wiki/Suffix_array)

## Enhanced Suffix Array

Sentence Piece読んでいるとなんかSAの他にLとかRが出てきて何これ？ってなるので調べたら、どうもこれはEnhanced Suffix Arrayというものらしい。

[Enhanced Suffix Array.pdf](https://www.mi.fu-berlin.de/wiki/pub/ABI/RnaSeqP4/enhanced-suffix-array.pdf)

元論文はこれか。

[Replacing suffix trees with enhanced suffix arrays - ScienceDirect](https://www.sciencedirect.com/science/article/pii/S1570866703000650)

アイデアとしては、Suffix Arrayに追加のテーブルを幾つか持つ事で、Suffix Treeと同じアルゴリズム的性能を実現する、というもの。
Suffix Treeの効率的な保持方法と解釈する事が出来る。

追加のテーブルとしてはlcptableが基本。＞[LCP array - Wikipedia](https://en.wikipedia.org/wiki/LCP_array)

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