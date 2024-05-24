[[Mac]]のプログラム言語。

- [Swift - Apple](https://www.apple.com/swift/)
- [[【書籍】TheSwiftProgrammingLanguage]]
上記の公式ページから、「The Swift Programming Language」という電子書籍がApple Book Storeから無料で読むことが出来る。
    - [The Swift Programming Language (5.10) - Documentation](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/) web版のリンクをこちらも貼っておく

## interop

- [Swift.org - Mixing Swift and C++](https://www.swift.org/documentation/cxx-interop/) C++ interop、experimentalっぽい。
- [Importing Objective-C into Swift - Apple Developer Documentation](https://developer.apple.com/documentation/swift/importing-objective-c-into-swift) SwiftからObjective-Cを呼ぶ

## Swift Concurrency

なんかGCDと結構別物っぽいので真面目に勉強する。

- [Concurrency - Documentation](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency/)
- [Swift Concurrency Deep Dive [1] — GCD vs async/await - by Enebin - Towards Dev](https://towardsdev.com/swift-concurrency-deep-dive-1-gcd-vs-async-await-280ac5df7c76)

後者のブログからWWDCの動画が参照されている。やはりWWDC動画から見る方がいいか。

### WWDCのAsync, awaitの入門

- [Meet async/await in Swift - WWDC21 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2021/10132/)

前半はasyncとawaitとは、的な話で、この範囲だと他の言語との違いは特になし。awaitにtryをつける場合がある、くらいか。

後半22分くらいから実際に使う場合の話が出てきて、await使うにはasyncコンテキストの中じゃないといけない、
とかいう話が出てくる。そのためにはTaskというものの中で使う、とか。
ただTaskの話の詳細はあまり出てこない。main threadで実行したいとかそういう話は別動画っぽいか？（タイトル的にはこれか？[Explore structured concurrency in Swift - WWDC21 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2021/10134/)）

28分くらいからnon asyncなものをasyncでラップするためのwithCheckedThrowingContinuationの話が出てくる。
これがCPSのクロージャーを引数に取るasync関数になっていて、completionのハンドラとしてこれを呼べば良い。
この辺は特に分からない事も無いが、try版と例外投げない版の２つがあるところはSwift特有か。

```swift
   typealias PostContinuation = CheckedContinuation<[Post], Error>
   return try await withCheckedThrowingContinuation { (continuation: PostContinuation) in 
    ...
   }
```

CheckedContinuationの最初の型引数はgenericsになっているのかな。
２つ目の引数のErrorはSwiftのErrorプロトコルで中身は空か。 [Error Handling - Documentation](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/errorhandling/)

このcontinuationはresumeというメソッドを呼ぶ事になる。

```
   if let error = error {
      continuation.resume(throwing: error)
   } else {
      continuation.resume(returning: posts)
   }
```

この辺は通い慣れた道だな。

この動画から参照されている動画で気になるもの

- [Protect mutable state with Swift actors - WWDC21 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2021/10133) 
- [Explore structured concurrency in Swift - WWDC21 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2021/10134/)
- [Discover concurrency in SwiftUI - WWDC21 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2021/10019/)
- [What’s new in AVFoundation - WWDC21 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2021/10146/)
- [What's new in AppKit - WWDC21 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2021/10054/)
- [Swift concurrency: Behind the scenes - WWDC21 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2021/10254/)

### enumの引数で返りの型が決まる？

[What’s new in AVFoundation - WWDC21 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2021/10146/) の4:40あたりに以下のようなコード例があった。

```swift
 let (duration, tracks) = try await assert.load(.duration, .tracks)
```

durationはCMTime、tracksはAVAssetTracks型だという。これってloadのシグニチャはどうなっているのだろう？
AVAssetではなくAVAsynchronousKeyValueLoadingというところにあるな。

[load(_:_:) - Apple Developer Documentation](https://developer.apple.com/documentation/avfoundation/avasynchronouskeyvalueloading/3747327-load?language=objc)

```swift
func load<A, B>(
    _ propertyA: AVAsyncProperty<Self, A>,
    _ propertyB: AVAsyncProperty<Self, B>
) async throws -> (A, B)
```

なるほど、.durationや.tracksには戻りの型も型情報に入っているのだな。
でもenumでそんな事出来るのか？durationの定義はこれか？

[duration - Apple Developer Documentation](https://developer.apple.com/documentation/avfoundation/avpartialasyncproperty/3816112-duration)

あら、enumではなくてstatic変数なのか。これ、なんで.でアクセス出来るんだろう？

この機能は「Implicit Member Expression」[Expressions - Documentation](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/expressions/#Implicit-Member-Expression)が正式な名前らしい。
enumはいいとして、enum以外の推論ルールはどうなっているのだろう？
ドキュメントには「such as an enumeration case or a type method」と書いてあるが、後者の推論がどういう時に出来るのかは良く分からない。

感じとしては、メソッドコールの時の引数はそのターゲットの型のstatic変数も探してくれるって感じのようだが、ドキュメント内でそれに言及している箇所は見つからない。うーん。