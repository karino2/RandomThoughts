[[書籍]]

- [amazon: 原論文から解き明かす生成AI](https://amzn.to/4voWeSZ)
- [原論文から解き明かす生成AIのサポートページ](https://github.com/yoheikikuta/support-genAI-book)
- [[一人読書会ライブ]] まずはこの本を題材にやってるのでリンク貼っておく。

菊田先生のありがたい本。


## 読み始め　2026-06-01 (月)

買ってはいたのだが機械学習系の仕事も離れていたし、という事で読んでいなかった。
無職になったのでなんか教科書っぽいものとか読みたいな、と思っていたので、この本を読んでみる。
あまりこの辺に関わる事は無さそうな気もするが、
直接役に立たない事を学ぶのが無職の本懐というものだろう、ということで。

まずは第一章の最初の方を読む程度。

## 1章のメモ 2026-06-09 (火)

### 自分の力で論文を読み解くための技術

- 議論が成立する条件を確認する
- 具体例を構成する
  - 評価指標の具体例
      - パープレキシティの例
      - 演習問題1.1, accuracy, precision, recall
  - 主張を確認するための具体例
     - back propagationの計算量
     - 生成AIを実際に触ってみて確認
  - 仮定が成り立たない例を考える
     - Markovじゃないとは
     - 次トークン予測がうまくいきにくい例とは
- 実装を読み解いて理解を深める
- 重要な参考文献は踏み込んで調べる
  - ハブ
  - データセット
  - 教科書はどうか？
- アウトプットする事で理解を深める
  - 他人に内容を説明
  - github issueに読んだメモを書く
  - ライブはどうか？

単語

- hypotenuse: 斜辺
- right triangle: 直角三角形
- inscribed circle: 内接円

### 自分以外の力

- 少人数で深く議論する
- 論文の著者に直接質問する
- ウェブ上で議論する
- 生成AIを使う

### ノーテーション

Pは珍しい。logは自然対数。Cover and Thomasやサイコロ本は2を前提にした話が多いので注意が必要。

### Universal Approximation Theorem

普遍性定理。

えーと、これか？ [Cybenko: Approximation by superpositions of a sigmoidal... - Google Scholar](https://scholar.google.com/scholar?oi=bibs&hl=ja&cluster=7998114008152383322)

superpositionは重ね合わせだそうで。

ヒルベルトの13番目のプログラムでKolmogorovがすべてのn変数連続関数は1変数の関数の有限の重ね合わせで表せる、みたいな事が言及されているな。
これか？

[Kolmogorov–Arnold representation theorem - Wikipedia](https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Arnold_representation_theorem)

Rieszの表現定理とか昔やった気がするが何も覚えてないな。

と数学のフォルダを漁っていたら、買ったまま積ん読だった以下がでてきた。

[amazon: 関数解析 共立数学講座 ](https://amzn.to/4w09aiD)

いい機会なのでこれの最初の方でも読んでみるかなぁ。Rieszの定理は8章だ…

### 証明のあらすじ

大まかにあらすじくらいは理解した。

**Discriminatory**

どんなyやθを持ってきても定義の積分が0になる　＝＞ 測度0 を言えるシグマ。

**証明のあらすじ**

Gの形でシグマの線形和を作って、これが稠密である事を証明する。
あらすじとしては稠密でないなら分離するような汎関数が作れて、これがdiscriminatoryの仮定に矛盾する、という話と、
シグモイド関数がdiscriminatoryだ、という二段構えの証明。

後者はシグモイド関数のパラメータの所に極端なものをいろいろ入れる事で非ゼロ測度があるなら切り出す事が出来るという感じ。

**証明から受ける印象**

これは級数の誤差が減っていく、系の証明では無いので、Nを大きくしていくと誤差が減っていくという事は言えない。
だから例えば誤差を0.1以下にしたい、みたいな時にNをどんどん大きくしていくとだんだんと小さくなって目的の誤差の範囲に抑えられたら操作をやめる、
みたいな事を出来るとは言っていない。

あくまでそういうGが存在する、と言っているだけ。

だから実用的には2層のニューラルネットでもノードが多ければ任意の連続関数を近似出来る、という言い方は誤解がある気がする。
どこかにはそういうニューラルネットが存在する、といっているだけ。
Nを増やせば誤差が減っていくという事を言っていないので、適当な所で妥協する余地が無い。

テイラー展開みたいにだんだんと誤差が減っていくという事が言えれば任意の連続関数をノードを増やせば近似出来ると言ってしまえると思うんだが。

### Perplexity

[[サイコロ本]]と[[CoverAndThomas]]を復習する。

導出にAsymptotic Equipartition Propertyが使われてる…（Cover and Thomasの3章のテーマ）

### 実装を読む、の正規表現

使う方は以下で、

[gpt-2/src/encoder.py at 9b63575ef42771a015060c964af2c3da4cf7c8ab · openai/gpt-2](https://github.com/openai/gpt-2/blob/9b63575/src/encoder.py#L98C25-L98C32)

該当箇所のコードを抜き出すと以下になっている（self.patが本文ででてきた正規表現）

```python
for token in re.findall(self.pat, text):
    token = ''.join(self.byte_encoder[b] for b in token.encode('utf-8'))
    bpe_tokens.extend(self.encoder[bpe_token] for bpe_token in self.bpe(token).split(' '))
```

self.bpeを読まないと詳しい事は分からないが、tokenごとに別のbpeとなるようにしている、という理解でいいのかな。

### 1章感想ライブ 2026-06-12 (金) 20時

iLMiNAでライブしてみる試み。どう進めるかはあんまり考えてないが先頭からぱらぱら見つつ思った事とか計算したりとかそういうの。
なんか名前が欲しいな。一人読書会ライブ、とかか？

やってみた所、1.2.2.1までで結構な時間になったので次回は別の日に（Perplexityの手前まで）。

感想: [一人読書会ライブ - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2026/06/13/self_bookreading_live.html)

[[一人読書会ライブ]]

### 1章感想ライブ続き 2026-06-14 (日)

[一人読書会ライブ: 原論文から解き明かす生成AI、1.2.2.2から - YouTube](https://www.youtube.com/watch?v=PR8iWLJLZi0&list=PL3J_mLcl4YCfAUWElMC438W6SDbIoZRg9&index=3)

## 2章 2026-06-13 (土)

### 分布仮説の論文読み

[Contextual correlates of synonymy - Communications of the ACM](https://dl.acm.org/doi/abs/10.1145/365628.365657?download=true) 分布仮説の論文はこれかな？

abstractから。

Hypothesis: 単語Aの文脈と単語Bの文脈で共通の単語の割合いは、単語AとBの意味の類似度の関数である。

同じ所が本の方でも抜き出されているな。synonymyは意味の類似度の事のよう。
synonymは類義語とか同義語みたいな意味だったかな？

この論文ではfirst-orderのassocicationで意味の類似度が示される(indicated)と仮定して進める。

morphemses: 形態素

### 4つのコンテキスト

4つのcontextというのが挙げられているが、良くわからない。

1. sentenceの中の単語
2. sentenceの中でLorge Magazine Countによる特定の範囲の頻度の全てのcontent word(wordとの違いは？)
3. 各sentenceで文法的な枠組みでもっともtheme wordと近い全てのcontent word
4. そのthemeと関連がもっとも深いと判断された全ての単語

content wordとwordが出てくるが違いが良くわからん。
geminiに聞いたらcontent wordはいわゆる内容語で冠詞とか前置詞をとりのぞいたものらしい。

Lorge Magazine Countは雑誌を対象にした常用語の出現頻度調査らしい。

### 実験手順

実験手順もなんか複雑だな。

最初は以下のように書いてあるが、

- 65ペアを作る(どうやって？)
- 全スリップを渡してそれを類似度順にならべて、その後0.0から4.0までのスコアをつけてもらう

その後に二つのグループの話が出てきて上との関係が良くわからない。

Group I

- 15被験者
- 2週間の間をあけて2つのセッションに参加
- 最初のセッションは48ペアについて類似度を判定してもらう、この48のうち36ペアは65ペアに含まれる
- 次のセッションでは65ペアについて類似度を判定してもらう

product moment correlationは積率相関係数でピアオンの相関係数の事っぽい。

この36ペアについて、最初と次のセッションの間のproduct moment correlationを求める事で、
intra subject reliabilityが計算出来る、といっている。

このsubjectは被験者の意味か。時間をあけて、他のに混ぜてもどのくらいこの類似度は同じ値(一貫している)か？という事だな。

Group IIは二番目のセッションだけやってもらった。
Group Iとはとても一致していたので2セッションに分けた弊害はあまりなさそう、という事か。

Generation of the Corpusのパラグラフでは65のtheme pairsには48の名詞があると言っている。
ペアには重複する単語があるので48個という事かな。

AとBはテーマペアがそれぞれになるように適当に選んだのかな。
AとBで別の被験者を使って例文を作ってもらう。
AとBで分けたのは同じ人であるがゆえの疑似相関を避けたかったとか。