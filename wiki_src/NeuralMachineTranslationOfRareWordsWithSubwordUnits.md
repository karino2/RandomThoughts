[[論文]], [[原論文から解き明かす生成AI]]

[arxiv:1508.07909 Neural Machine Translation of Rare Words with Subword Units](https://arxiv.org/abs/1508.07909)

NMTに[[サブワード分割]]を使おう、それにはBPEがいいぜ、という事を言った[[論文]]。最初に[[BPE]]をサブワード分割に使おうと言った論文。

## 単語

- transliteration: 音訳
- cognate: 同根語
- loanword: 借用語
- morpheme: 形態素
  - morphology: 《言語学》形態論
- affixation: 接辞添加
- OOV: Out of Vocabulary

character copyingは人名などの固有名詞を翻訳せずそのままコピーする事らしい。

## 対応したい事

優秀な人間の翻訳家がはじめて接した単語でも翻訳が容易なケースが結構あり、これをNMTでも出来るようにする方法を考えたい。
以下のようなものはまぁまぁそのまま翻訳出来るという観察がある。

- 固有名詞だがアルファベットが変わる、みたいなケース（Barck Obamaをバラク-オバマと翻訳する、みたいな）
- 同根語や借用語（claustrophobiaがドイツ語だとKlaustrophobieになる、とか）
- 複雑な形態素で構成された複合語や接辞添加された語など

これらは、未知の単語をsubwordに分割して学習すればNMTがルールを学習出来て、未知の単語への対応力が増すのではないか？というのが仮説。

また、NMTは語彙サイズとテキストサイズの両方が重要だが両者はトレードオフがあるので、この辺もいい感じにしたい。
語彙サイズを増やしすぎないためにたまにしか出ないrare wordをどうにかしたいというモチベーション。

## Byte Pair Encoding

二つの文字が頻出するペアの時には別のバイトを割り当ててそれを使う、という感じ。
例のコードは文字間に空白を開けたデータに対して適用してペアにしたら空白が除去される、というのを示している。
この例はどうなんだ？

基本的にはペアをカウントしていって、大きいペアを置き換える、をnum_mergesというパラメータの分だけ置き換える。

翻訳元と翻訳先を別々にBPEを求める方法と、両方を混ぜて一つのBPEを学習する方法（joint BPEと呼んでいる）を検討していて、
前者の方がvocabは小さくなるが、後者の方が分割に一貫性があるので対応を学習しやすいかも、と言っていて、
英語-ロシア語の翻訳の時にはキリル文字をラテン文字に音訳してBPEを学習したあとにそのBPEを音訳してロシア語の方のBPEを処理した、とか書いてある。

## 実験

実証的に試したいのは以下との事。

- rare wordや未知語に対しての翻訳を改善出来るか？
- サブワードへの分割手法ごとに、vocab size, text size, 翻訳品質 の良し悪しを比較

WMT 2015の 英語ー＞ドイツ語(420万センテンス） と 英語ー＞ロシア語（260万センテンス） らしい。

Unigram F1というのは、翻訳結果に出て来る単語がどのくらい解答文の単語と一致しているかを測る指標らしい。へー。

## C2-50k bigram

BPE以外の分割手法として翻訳まで評価しているのはバイグラムのみ。
バイグラムはシーケンス長(トークン数)が長くなってしまうので、
頻出50kの単語(short list)は分割しない、というワークアラウンドを入れている。

この場合shortlistに入っているがvocabに入っていない単語はどうなるんだろう？UNKが振られるのかな？
Table 1ではUnkは34になっているので違うか。
bigramの数は2万程度なのにshort list 5万を足すと6万9000になっているのだから、
vocabに足すのか。

## 分割手法の善し悪しはどうだろう？

バイグラムとBPEで翻訳品質を見ると、バイグラムの方がいいような…

shortlistの単語は一切学習できてないと思うと、なんかBPEのスコアも微妙だなぁ。

## コード読み

BPE関連のコードは公開もされているのでコードも読む（[[原論文から解き明かす生成AI]]でもコードの解説がそれなりにある）

### BPEのtoy(演習問題2.7)

[Colab: toy_bpe.ipynb](https://colab.research.google.com/drive/1F44GzumRxwYAjYkV5-LpMeEsvBYarCYY?usp=sharing)

vocabは空白が除去されたものになっている。これはもともとコーパスに空白区切りのこれらの単語が5回、2回、6回、3回あたえられた時にBPEを実行していくとどうなるか、という話だと思う。

何を理解してもらおうとしているかは正直良く分からない。

途中でestなどがサブワードとして扱われるのは正しそうにも見えるが、lowはサブワードとしてはなかなか使われない。それは`w@` (＜/w＞はこのWikiと相性悪いので単語の終わりはアットマークで代用)が一つとみなされてしまって、lowerのlowと同じに見えないから。
ただloは割と早い段階でサブワードと認識される。

`est@`がloよりも先にサブワードとして認識されるのはこのBPEのアルゴリズムの動きを理解する助けにはなる気がする。（BPEのBPEを置き換えるので二文字では無く3文字が置き換え対象になるメカニズム）。

あと単語の頻度に大きく依存するのもこのアルゴリズムからは予想出来る。

### learn_bpeのコード

抜粋しているコードは良く意味が分からないのでいろいろ見ていったが、結局最初から見ていく必要がありそう。

まずvocabが何か？を見ていみると、まずはvocabは単語をキーにして頻度をvalueとした辞書を作っている。
単純にファイルを開いて空白でsplitしていて、ファイルの方には文章のテキストが入っている（全部小文字っぽい）。

例えば以下か。

```python
vocab = {"the": 10, "a": 23, ...}
```

その後にこれを以下のように変更している。(is_byteは消してcharの方だけ残してる）

```python
    vocab = get_vocabulary(infile, is_dict, is_bytes, num_workers)
    vocab = dict([(tuple(x[:-1])+(x[-1]+'</w>',) ,y) for (x,y) in vocab.items()])
    sorted_vocab = sorted(vocab.items(), key=lambda x: x[1], reverse=True)
```

vocabはキーが

```python
('t' 'h' 'e@')
```

のタプルで、値は頻度のまま、となるか。
これがtoy_bpeと違うのが酷いなぁ。

ちなみに関数の引数側でvocabと呼んでいるものはだいたいsorted_vocab。

次にindices。これは以下でstatsを一緒に作っている。

```python
def get_pair_statistics(vocab):
    """Count frequency of all symbol pairs, and create index"""

    # data structure of pair frequencies
    stats = defaultdict(int)

    #index from pairs to words
    indices = defaultdict(lambda: defaultdict(int))

    for i, (word, freq) in enumerate(vocab):
        prev_char = word[0]
        for char in word[1:]:
            stats[prev_char, char] += freq
            indices[prev_char, char][i] += 1
            prev_char = char

    return stats, indices
```

`indices[pair]`でdictが返り、そのキーはそのbpeが登場したwordを表すsorted_vocabのindex。valueはそのword内に幾つ入っていたか。
結構ややこしいがだいたい分かった。

ちなみにstatsはペアのfreq。

次に本を読んでいて良くわからなかったのがbig_statsとstatsの関係。
なんかstatsが同じに見えるような？

と元コードを見るとforの最後が以下だ。

```python
        changes = replace_pair(most_frequent, sorted_vocab, indices, is_bytes)
        update_pair_statistics(most_frequent, changes, stats, indices)
        stats[most_frequent] = 0
        if not i % 100:
            prune_stats(stats, big_stats, threshold)
```

いやいや、ここ無いと分からんでしょ！？と思ってしまうが。0を入れる事でmost_frequentは取り除いている訳だな。

replace_pairは以下みたいな感じ（多少改変している）

```python
    iterator = indices[pair].items()
    for j, freq in iterator:
        if freq < 1:
            continue
        word, freq = vocab[j]
        new_word = split_char.join(word)
        new_word = pattern.sub(pair_str, new_word)
        new_word = tuple(new_word.split(split_char))

        vocab[j] = (new_word, freq)
        changes.append((j, new_word, word, freq))
```

new_wordはタプルをsplit_charでジョインしている。`t h e@`とかになる訳だな。
で、pair_strは例えば`he@`なら'h e@'とか空白でつなげたものになっていて、これを`he@`に置き換える。

そして最後にsplitするので、

`(t, he@)` というタプルになる訳か。

vocabがまずは文字ごとのタプルになって、その後にbpeで置き換えられていくんだな。ややこしい。

update_pair_staticsをちらっと見ると、これは`he@`とマージしたら`(t, h)`のペアの頻度を下げたりしている。
当然`t, he@`の頻度はその分あげるのだろう。

prune_statsを見る。

```python
def prune_stats(stats, big_stats, threshold):
    """Prune statistics dict for efficiency of max()

    The frequency of a symbol pair never increases, so pruning is generally safe
    (until we the most frequent pair is less frequent than a pair we previously pruned)
    big_stats keeps full statistics for when we need to access pruned items
    """
    for item,freq in list(stats.items()):
        if freq < threshold:
            del stats[item]
            if freq < 0:
                big_stats[item] += freq
            else:
                big_stats[item] = freq
```

freqがthreshold以下のものをbig_statsに移すとはこういう感じか。

statsから低頻度のものを一時移して高頻度だけのものを残し、その中でbpeの統計をとったり置き換えたりの処理をしていく。
statsやbig_statsはあくまで調べるbpであってvocabなどはそのまま全体を見ている。

大きい頻度のものが全部処理されてしまったりマージ処理の分かれ具合でthresholdより下になってしまったら、そもそもにbig_statsの方にもっと大きいものがあるはずなので全体を取り直してまた再計算しましょう、という事かな。マージ処理で減少するケースが本当にあるかどうかはコード動かしてみないと自信が持てないが。

まぁだいたいは理解したか。いやぁ、これは本文の解説はいまいちだな。演習問題を答えるにはちゃんと元ソースを読む必要があるので読めって事なんだろうが。

### encode関数

[Colab: bpe_toy.ipynb](https://colab.research.google.com/drive/1F44GzumRxwYAjYkV5-LpMeEsvBYarCYY?usp=sharing) に続きとして書く。

ちなみにサポートページの菊田さんの方が途中経過のprintがあってわかりやすい。

[原論文から解き明かす生成AI_演習問題2.9 - Colab](https://colab.research.google.com/drive/1wom259xtR1ZPnD-ACYqegL98J5euagGm?usp=sharing#scrollTo=2fkROcD_Cc4I)
