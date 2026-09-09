[[Transformer]]の構成要素の1ブロック。Decoderは間にクロスアテンションが入るので少し追加があるが、基本的にはこのブロックがTransformerの本質。

![imgs/TransformerBlock/0000.png](imgs/TransformerBlock/0000.png)

図のマルチヘッドへの入力が３つに分かれているのはQ, K, Vの3つの事。

## マルチヘッドアテンション

Transformerブロックでは、[[セルフアテンション]]をマルチヘッド化している。

マルチヘッドとは、$W_Q$, $W_K$, $W_V$を8個（H=8）に分離して、それぞれセルフアテンションを計算して、最後にそれをまとめて次へ送る。
次元がややこしいので以下にメモしておく。

入力の次元 $d_{model}=512$ で、Wのアウトプットの方はQ, K, V共通で全て 64。

ようするに512次元の入力を、64次元の出力にするWを8つ用意して、掛ける。[[Transformer]]論文の図のLinearがこれ。

![imgs/Transformer/0000.png](imgs/Transformer/0000.png)

全ての位置の入力に対して同じWを掛ける。Q, K, Vそれぞれに別々のWを掛ける（論文の3.2.2に説明がある)。

### アテンションのスケーリング

Transformerブロックのマルチヘッドアテンションでは、（Q, K, Vに一般化した）[[アテンション]]の$QK^T$を $\sqrt{d_{key}}$ で割っている。

$$
Attn(Q, K, T) = sfmax(\frac{QK^T}{\sqrt{d_{key}}})V
$$

dが大きいとアテンションの入力が大きくなって内積スコアのアテンションは学習が進みづらいから、との事。
内積の分散はdが大きくなるほど大きくなるので、その分を割り引く。

これをScaled dot attentionとか呼んでいて、マルチヘッドの中の各アテンションにはこれを使っている。

この辺の話は[[SoftMax]]の方に、大きい勾配でうんぬん、という計算をしているので参照されたし。

### 次のレイヤーとのつなぎ

マルチヘッドのアテンションをconcatしてWを掛けたものをそのまま次の入力へと渡している。
アテンションを元になにかをする、というよりはアテンション自身の値をそのまま次にわたす（といっても$W_V$を掛けているのでそこで値用の変換をしている訳だが）。

## FFのコネクション

以下のdense_relu_denseが呼ばれそう。

[tensor2tensor/tensor2tensor/layers/common_layers.py at master · tensorflow/tensor2tensor](https://github.com/tensorflow/tensor2tensor/blob/master/tensor2tensor/layers/common_layers.py?utm_source=chatgpt.com)

denseは以下っぽい。

[tf.keras.layers.Dense  -  TensorFlow v2.16.1](https://www.tensorflow.org/api_docs/python/tf/keras/layers/Dense?utm_source=chatgpt.com)

Noteの所に、rankが2以上だとlast axisだけをdotすると書いてあるのでd_modelに対してだけdotするという事で良さそうかな。
入力は(バッチ, token列, d_model)というテンソルだろう。

数式にすると以下か。（[[原論文から解き明かす生成AI]]の3.18が見やすいので真似する）
$$
FFN(\bm{x}) = W_2 \cdot max(\bm{0}, W_1 \bm{x} + \bm{b}_1) + \bm{b}_2
$$

## Residual Connection

ResNetなどと同様に、レイヤーをバイパスした値と結果を足す。図のAddしてNormのうちのAddの部分。

## Layer Normalization

[[LayerNormalization]]

### 入力の所はnormalizeされないのでは？という疑問

論文の図によると最初はLayer Normしてないように見えるが、これだと内積では絶対値に引きずられてcos距離にならず、アテンションとしては微妙なのでは？と思った疑問。

２つ目以降はLayerNormが入るので1にノーマライズされている入力になるから内積でcos距離のようなものになる。

ChaatGPTに聞いたら、先にLayerNormを置くPre-LN Transformerというのがあって、そっちの方が最近は主流との事。

Pre-LNの方が良いのでは、という理論的な話をしている論文は以下。

[On Layer Normalization in the Transformer Architecture](https://proceedings.mlr.press/v119/xiong20b.html?utm_source=chatgpt.com)

学習が簡単になる、という話だが、自分の直感の、ノルムに引きずられる分をembeddingとかWが学習するのが無駄に大変という話とも整合的に思う。

この論文は既にあるPre-LNの理論的な裏付けであって、最初にPre-LN Transformerを使ったのはこの論文では無い。
最初に使われたのは以下の論文のよう。

 [arxiv: 1809.10853 Adaptive Input Representations for Neural Language Modeling](https://arxiv.org/abs/1809.10853)

ただこれには「we apply layer normalization
before the self-attention and FFN blocks instead of after, as we find it leads to more effective training.」とあるだけで、何故か、みたいな話はあまり無さそう。


## パラメータ数

[[原論文から解き明かす生成AI]]（や元のTransformer論文）には計算量の話があるが、
現代的な視点ではパラメータ数の方が興味が湧く所だろう（2026年現在ではメモリがかなり厳しいので）。

という事でここではTransformerブロックのパラメータ数の概算を見ておく。

### Transformerブロックのパラメータ数

MultiHeadと[[LayerNormalization]]とFFNで出来ている。LayerNormは大したこと無いので無視しよう。また多くの演算はW+Bの形式になるがWが512x512の時Bは512のオーダーなので、Wだけ見ていけば丼勘定としては十分。

![imgs/SelfAttention/0003.png](imgs/SelfAttention/0003.png)
![imgs/SelfAttention/0004.png](imgs/SelfAttention/0004.png)

という事で2Mi個くらい。

### Fully-connectedなパーセプトロンのパラメータ数

セルフアテンションとConvやRNNの比較は論文や[[原論文から解き明かす生成AI]]にあるが、
この辺は当時の状況からの比較であって、今から新しくこの辺を学ぶ人にとっては不要に難しい比較に思う。

素人の視点としては、Fully-connectedなパーセプトロンとの違いを見てみるのが教育的だろう。
パラメータ数というのが一番大きな違いの出る所なので、パーセプトロンのパラメータ数を見ておく。

なお、TransformerブロックのFFNはpoint wiseであり、こちらはFully connectedなケースの比較となる。両者はパラメータ数としては月とすっぽんなのが以下で分かる。

一つのoutputにつき、トークン数、トークンの次元を512とする。

一つのトークンあたり、512次元のアウトプットを出すには512x512となる。
一つのアウトプットにつき512トークンを足し合わせるのだから、それが512個必要になる。

![imgs/SelfAttention/0002.png](imgs/SelfAttention/0002.png)

これが512個あるのだから、全体では512の4乗で、だいたい64G個（64Billion）となる。

### Transformerブロックとの比較

という事で、

- パーセプトロン: 64Gi 個
- Transformerブロック: 2Mi 個

ほどの違い（32*1024倍）がある。全然違う。64Bは現在的には頑張ればいけるのでは？と思うかもしれないが、1層でこれである。
レイヤーを深くする方がうまく学習しやすいのは初期のディープラーニングの頃から言われている事なのでこの差はでかい。
また、学習のしやすさも段違いである。

なお、パラメータ数を直感的に感じるには、どの行列は同じものを掛けているかに注目すると良い。

![imgs/SelfAttention/0005.png](imgs/SelfAttention/0005.png)


## 計算量の比較

論文のセクション4や[[原論文から解き明かす生成AI]]に話題があるが、少し自分でも計算してみる。

### 内積とWとの積

まず大前提として、

- 内積
- Wとベクトルの積

の計算量から見る。

内積はO(d)となる。
Wとの積は出力の次元によるが、入力と同じ次元を出力するのが基本とすると$O(d^2)$

![imgs/SelfAttention/0006.png](imgs/SelfAttention/0006.png)
![imgs/SelfAttention/0007.png](imgs/SelfAttention/0007.png)

マルチヘッドではd/8を8個出すので、d/8のケースも考えておくと、計算量は1/8だが、オーダーとしては結局d/8の項はdとなる。512程度でビッグO記法はどうなんだ、という話でもある。

Q, K, VにWを掛ける計算は全て同じような演算なので、KWだけ考えておくと上記のようになる。

### マルチヘッドアテンションのQ, K, V

マルチヘッドのQ, K, VにWを掛ける計算は先にも述べた通りビッグO記法では定数倍は影響が無いが、厳密に考えても1/8したものが8個あるのでやはり通常のアテンションと同じくらいになる。

K, VとWとの積の計算量は、上の図でも書いたように、KとVは行列との積がn個あると解釈して、$O(nd^2)$となる。

QとWの積は、アテンションの種類によってQがベクトル1つかn個かの違いがある。

- クロスアテンション(Qはベクトル1つ）: $O(d^2)$
- セルフアテンション(Qはベクトルn個）: $O(nd^2)$

これらがアテンションの入力を作るのに必要な計算量で、この後にこれらの結果を使ってアテンションを計算する計算量が掛かる。

### アテンションの計算量

![imgs/SelfAttention/0008.png](imgs/SelfAttention/0008.png)

### FFNの計算量

![imgs/SelfAttention/0009.png](imgs/SelfAttention/0009.png)

### Trasnformerブロック全体

以上をまとめると以下のようになる。

![imgs/SelfAttention/0010.png](imgs/SelfAttention/0010.png)

### Convの計算量

比較のため、1次元Convolutionの計算量も見ておく。カーネルサイズは便宜上5としておく（k=5）。なお、[[ConvS2S]]はk=3なのでもっと小さい。

テンソルは慣れないと分かりにくいので、dxdの行列を5個持っている、として計算すると良い。
一つのdxd行列との積の計算量が$O(d^2)$で、それがk個ある。

![imgs/SelfAttention/0011.png](imgs/SelfAttention/0011.png)

なお、convolutionはinputの個数だけこの演算を行うので、最後にn倍する事に注意。

### r個にrestrictしたケースの計算量等（演習3.6）

[[原論文から解き明かす生成AI]]の演習3.6に、アテンションを近隣のrに絞った場合の計算をせよ、というのがあるのでやってみる。

![imgs/SelfAttention/0012.png](imgs/SelfAttention/0012.png)

最大パス長は、nの間の相互作用を得られるまでに何層つなげるか、という事だと思う。
微妙な話ではあるが、一層でr個分の相互作用があると思うと、n/r 個のレイヤーを積み重ねれば一応つながるという話だろう。
softmaxがrの端をちゃんと考慮に入れるかどうかは自明では無いので正直n/r個のレイヤーを重ねてもn離れた相互作用を計算出来るかは微妙だが。