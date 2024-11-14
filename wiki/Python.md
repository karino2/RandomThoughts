[プログラム言語](%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%A0%E8%A8%80%E8%AA%9E)

みんなだいすきPython。

## 整数を32bitの16進数にする

ちょろっとした確認で良くやりたくなるが、負数はちょっと面倒がある。

[how to convert negative integer value to hex in python - Stack Overflow](https://stackoverflow.com/questions/7822956/how-to-convert-negative-integer-value-to-hex-in-python)

基本的には`2**32-1`でアンドを取ればいい。

```python
hex(-3 & (2**32-1))
'{:#x}'.format(-3 & (2**32-1))
```

## TrioとStructured Concurrency

[SwiftConcurrency](SwiftConcurrency)のクリスラトナーのマニフェストのコメントにリンクされていたので見てみる。

- [Nathaniel J. Smith - Trio: Async concurrency for mere mortals - PyCon 2018 - YouTube](https://www.youtube.com/watch?v=oLkfnc_UMcE)
- [Notes on structured concurrency, or: Go statement considered harmful — njs blog](https://vorpus.org/blog/notes-on-structured-concurrency-or-go-statement-considered-harmful/)

ゆとりなのでとりあえず動画から。

ようするに複数のコルーチンをグルーピングする仕組みとスコープを組み合わせるという話だな。
Kotlinなんかはデフォルトでそうなのでどこが新しいのか一瞬分からなかったが。

### Python InvokeのWindowsでの実行

[Windows](Windows)参照