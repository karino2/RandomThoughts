[[原論文から解き明かす生成AI]]

- [google/sentencepiece: Unsupervised text tokenizer for Neural Network-based text generation.](https://github.com/google/sentencepiece)
- [[論文]] [arxiv:1808.06226 SentencePiece: A simple and language independent subword tokenizer and detokenizer for Neural Text Processing](https://arxiv.org/abs/1808.06226)


[[EnhancedSuffixArray]]を先に勉強する。[[Heap]]も復習。ついでに[[SuffixArray]]も復習。

## BPEのトレーニングのコード読み

[[原論文から解き明かす生成AI]]の問題が2問ほどこれに言及していたので読む。bpe_model_trainer.ccのTrainer::Trainあたり。

###  センテンス周辺の型の確認

SentenceとSentencesの型は以下。

```cpp
  using Sentence = std::pair<std::string, int64_t>;
  using Sentences = std::vector<Sentence>;
```
int64_tが何なのかは知らないが、とりあえずSentenceはstringだと思っておこう。（追記：freqの計算から予想すると同じ文が何回かあったらそのカウントが入る感じか？）

sentences_はSetences型なので、だいたい文字列のベクトル。

### シンボル周辺の型の確認

Symbolは複雑なので適当に抜粋。

```cpp
  // Symbol represents a character or symbol bigram.
  struct Symbol {
    const Symbol* left = nullptr;    // left symbol in bigram
    const Symbol* right = nullptr;   // right symbol in bigram
    string_util::UnicodeText chars;  // all flattend chracter sequence

    // Position list. Use set so that we can keep the order of occurrence.
    // See EncodePos/DecodePos.
    absl::btree_set<uint64_t> positions;
   // ... いろいろ省略 ...
};
```

bigramのシンボルで、それは左と右がそれぞれさらにバイグラムに再帰的になっている構造になっている。
バイグラムじゃない場合はleftもrightもnullでcharsにだけ入る感じになっている。

ファクトリでキャッシュされて同じ文字列からは同じシンボルになるようになっている。

symbols_は以下。

```cpp
  // Sentences. symbols_[sid][index] stores a symbol in sentence_[sid][index].
  std::vector<std::vector<Symbol*>> symbols_;
```

sidはSentencesのインデックスか。だいたい文字列だったので文字列を渡して一文字ずつsymbols_に入れる所から始まる感じだ。

### Main Loopの手前までの流れ

1. Sentencesの中のセンテンスを一文字ずつシンボルとしてsymbols_に入れていく
2. 全バイグラムをpq（priority queue,ようするに[[Heap]]）に入れる
    - 同じシンボルを一回だけ足すように、全バイグラムを作って見つつはじめて作ったものだけvectorに入れておいて最後にまとめて追加している。
    - freqもpositionsから計算する

これでMainLoopが始まる。対象はpqでfreqの順番に取り出す。

### Main Loopの流れ

以下を繰り返す。

1. pqから再頻出のシンボルを取る
2. final_pieces_に入れてpqから取り除く
3. AcceptSymbolを呼ぶ
4. pending_queueにあるもののfreqを再計算してpqに入れる
    - ここのpending_queueはAcceptSymbolで新しく作られたペアがあれば入る

AcceptSymbolは後で読む。
ただここまでで、センテンスというのをSymbolの配列として扱って、これを差し替えてマージ処理を行っているのが予想出来る。

### AcceptSymbol

まずはコードの冒頭のコメントと大枠のfor文の確認から。

```cpp
absl::Status Trainer::AcceptSymbol(Symbol* symbol) {
  // Add new bigrams which are created after symbol replacement.
  // We do not need to scan all characters, but scan the neighbors in
  // best_symbol.
  for (const uint64_t& encoded_pos : symbol->positions) {
  }
}
```

symbolを新しくマージした時の処理をしていて、for文はこのsymbolの現れる所を見ていっている。
オーバーラップのケースとかいろいろ考えるとややこしさもあるが、細かい事は今回は置いとこう。

ループの中では、主に以下をいろいろする。

```cpp
    // We have three bigrams [prev, left], [left, right], [right, next],
    // which are affected with this symbol replacement.
```

left, rightをマージする時は、以下のようになる

- `[prev, left]`と`[right, next]`のペアがなくなる
    - 既存のペアのfreqをリセットして再計算させる（減るだけなのでフラグを建ててpqからpopされるまで遅延）
-  `[prev, lr]` と `[lr, right]` が出来る

positionを抜くのかと思ったが、コードを見るとそういう事はしていない。symbolsのindexの所のペアが変わるので、
freqを再計算する時に右隣が自分のペアじゃなくなっていたらそこでpositionsからlazyにeraseしていた。

eraseなんて大丈夫？と見てみるとpositionsはbtree_setだそうで。

### 雑に計算量を考えてみる

最初にバイグラムをqueueに入れる所で、バイグラムの個数はN/2なのでO(N)。priority queueはinsertはO(log N)なんだが、ツリーのサイズが最初は小さいのでちゃんと評価するとO(N)（[[Heap]]の方に教科書の参照あり）、