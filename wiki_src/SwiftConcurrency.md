[[Swift]]のasyncとかawaitの話。

なんかGCDと結構別物っぽいので真面目に勉強する。

- [Concurrency - Documentation](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency/)
- [Concurrency - Apple Developer Documentation](https://developer.apple.com/documentation/swift/concurrency) こっちはクラスリファレンス、大した情報は無いが存在を知る事はできる。

## WWDCの動画で入門

適当にググって以下を見つける

- [Swift Concurrency Deep Dive [1] — GCD vs async/await - by Enebin - Towards Dev](https://towardsdev.com/swift-concurrency-deep-dive-1-gcd-vs-async-await-280ac5df7c76)

このブログからWWDCの動画が参照されている。やはりWWDC動画から見る方がいいか、と結論づけ、WWDCの動画を見ていく。

## WWDCのAsync, awaitの入門（Meet async/await in Swift WWDC21）

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

## What’s new in AVFoundation - WWDC21

[What’s new in AVFoundation - WWDC21 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2021/10146/) を見る。
これはやりたい事には必要ないのだけれど、AV Foundation関連を見て慣れておこうかな、という事で。

### enumの引数で返りの型が決まる？

4:40あたりに以下のようなコード例があった。

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
型が決まっている時はその型のstatic変数を探してくれるってのは良く見るので、たぶんその派生ではあると思うが。

関係無いがこの動画でenumをいーにゅーむと発音したりtupleをとゅーぷると発音すると知る。

### AVVideoCompositing

[What’s new in AVFoundation - WWDC21 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2021/10146/) の13分あたりに動画のcomposite関連のコード片がある。
ただしこれは本当にコードの一部だけで全体としてどうしたらいいかは良く分からない。
この辺やりたい時に参考にしたいかもしれないのでここにメモを残しておく。

## Explore structured concurrency in Swift

Task周りとかをもう少し知りたいな、と思い、もうちょっと詳しそうな動画に進む。
次はこの動画。

 [Explore structured concurrency in Swift - WWDC21 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2021/10134/)

でも最初のところはいわゆる構造化プログラム（gotoじゃなくてループとif使っていこうな）の類推としてのconcurrencyの話で、
async await素晴らしいな、という事しか言ってなさそうな雰囲気。もう少し聞いていこう。

お、5分くらいからTaskの話が始まった。この動画で合ってたっぽいな。

### async let

7:00くらいにasync letの話。ふむふむ。async letはその変数をアクセスするまで並列に動き、変数を使うところで`await 変数名`とするところでCPSのブロックが作られる訳か。
これが一番単純な、Taskが生成されるケースかな。

### withThrowingTaskGroupで複数同時実行

14:20くらいからwithThrowingTaskGroupの話が始まる。

```swift
try await withThrowingTaskGroup(of: Void.self) { group in 
    for id in ids {
        group.async {
           thumbnails[id] = try await fetchOneThumbnail(withID: id)
        }
    }
}
```

withThrowingTaskGroupは、groupを引数に取るクロージャを引数にする。
group.asyncでタスクを同時に走らせる。いわゆるparだな。

groupの下にTaskがぶら下がりタスクツリーとなる。groupがスコープから消える時に全部をawaitする感じらしい。

17:02 thumbnailsにレースコンディションがあるので以下のようにするべき、とか。

```swift
try await withThrowingTaskGroup(of: (String, UIImage).self) { group in 
    for id in ids {
        group.async {
           return try await fetchOneThumbnail(withID: id)
        }
    }
    for try await (id, thumbnail) in group {
        thumbnails[id] = thumbnail
    }
}
```

withThrowingTaskGroupの引数に型を指定する（.selfとはなんだろう？）、そしてgroup.asyncからはその型をreturnする。
その後でgroupにtry awaitで値を取り出す。

### キャンセルとstructured task

structured taskは、終わる時は子供も全部終わる。ツリーとしては、子供のノードがすべて終わって始めて親のノードが終わる。

キャンセルはcooperativeで、

```swift
try Task.checkCancellation()
```

でチェックする。または `Task.isCancelled` でbooleanでチェック出来る。

### Taskとunstructured concurrency

21:00あたりでTaskを使った話が出てくる。これはスコープ内で終わらないようなケース。
asyncじゃないコンテキストから実行する時などに使う。
キャンセレーションやエラーなどのporpagateを手でやってやる必要がる（Taskオブジェクトが帰ってきてそれで行う）

なお、Task.detachedでunstructureよりさらに独立で、Actorやpriorityなどが共有されないタスクが作られるとか。Actorはまだ出てきてないので他の動画を見る必要がありそう。

### Structured Concurrencyの元ネタはPythonのTrioらしい

[[Python]]に関連リンクを置いておく。

## Protect mutable state with Swift actors - WWDC21

という事で次はActorを説明しているらしい以下を見る。

[Protect mutable state with Swift actors - WWDC21 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2021/10133) 

6:00くらいからActorの話が始まるな。これは知らない概念だ。

普通にクラスのように書いて、外からアクセスする時はawaitで呼ぶと、クラスとしてはJavaのsynchronizedのように動いているように見えるが、ブロックじゃなくてyieldする感じか。

nonisolatedとかSendableとかいろいろ追加の要素があって、コンパイラがチェックしてくれる。
賢いけれど、かなり複雑だよなぁ。

### コップ本のactorを読み直す

Actorってscalaにあったよなぁ、と昔読んだコップ本の該当章を軽く見直す。
Scalaのactorは、actorごとに独自のスレッドを持ち、actor間のやりとりはメッセージというので行い、
メッセージはactor側ではreceiveというメソッドで取り出して処理する。

actor内はいつも同一のスレッドとなる事で、lockなどが不要になり、一方で状態を複数のスレッドで共有出来るようになる、という仕組みか。
なんかこういう話だったな。
kotlinも初期の頃はこういうのあったよな。最近は使わなくなったが。

Swiftのactorも本質的には似ていて、actorの内部では排他制御がなされていて同時に動くメソッドは一つになる。
一方で外部からの呼び出しとの境界はメッセージでは無くawaitになる。
そしてactorごとに独自のスレッドがある訳では無い。
さらにactorというのが言語要素であるので、
外部からメソッドを呼び出す時にはmutable stateに触るかどうかにコンパイラのチェックが入るため、
安全に部分的に外部から触る（Equaitableなどの外部のプロトコルにconformする場合など）事が可能になる。

### Sendableのプロトコルのコンパイラチェック

Sendableのプロトコルにconformすると共有出来るようになり、それがあるか無いかのチェックがコンパイラによって行われる、というの、
Swift的だよな。

特別なプロトコルをコンパイラが認識していて、特定のプロトコルだけ行われるチェックがある。

これがSwiftの強力さでもある一方で、こういう機能がユーザーが作れないなにかで実現されているの、なんとかならないのかなぁ、という気もしてしまう。

actorの仕組みを実現するためにここまでいろいろな要素が必要で、それぞれをコンパイラがいろいろチェックする必要があるの、
どうしても抵抗がある。
まぁC#の初期の心理的抵抗と一緒で、慣れてしまえばそういうものと思えるようになるのかもしれないが。

最後に参照されてた動画メモ

[Swift concurrency: Update a sample app - WWDC21 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2021/10194/)

### actorについてはだいたい理解出来た

結構重要な概念だが、この動画でだいたい理解出来たな。

## Swift concurrency: Behind the scenes - WWDC21

だいぶ理解が進んだのでbehind the sceneの動画を見る。

[Swift concurrency: Behind the scenes - WWDC21 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2021/10254/)

理解は深まったが、それほど新しい話は無いな。priorityの所は良く分からなかった（どうやってキューの先頭に持ってきてるんだ？とか）。

自分が以前やった[並列プログラムから見たFuture](https://karino2.github.io/2021/03/05/future_for_parallel.html)あたりの話と似ているよね。
違いはfutureの場合はfutureを実行しているスレッドが遊ぶケースでもactorなら同じスレッドを使えるケースがあるというあたりか。
この辺はAppleは本当に良く分かってるよなぁ。

## クリスラトナーのConcurrency Manifesto

ググってたら見つけた。

[Swift Concurrency Manifesto](https://gist.github.com/lattner/31ed37682ef1576b16bca1432ea9f782)

actorの話とかが結構語られている。

基本的な使い方は先ほどの[Protect mutable state with Swift actors - WWDC21 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2021/10133) の方で理解しているという前提で、もう少し背後にある考えなどをここには書いてみたい。

### GCDの延長としてのactor

リソースごとにDispatchQueueを持つ、というデザインの延長としてactorがある。
延長というからには違いがある訳で、どこが違うかというと、
DispatchQueueはそれが保護するリソースとDispatchQueueの関係がimplicitでコンパイラがチェックしてくれなかった。

actorは特定のデータを特定の（論理）スレッドからだけ触る、という事を明示的に表現出来るようになっていて、
コンパイラがチェックしてくれる。

また次のそれ以前のactorとの違いにもつながるが、引数に渡したりreturnで値を返すときに共有されてしまうデータについて、
それが安全であるかどうかをコンパイラがチェック出来るようにするための第一歩でもある。

### Swiftのactorとそれ以前のactorの違い

Swiftのactorで解決したかった問題としては

- 値をreturnしたい
- 引数をdeep copyしたくない

の２つが大きい。
この時にshared mutable stateが意図せず漏れ出してしまうのは防ぎたい。

一方で幾つかの注意深く設計された、スレッドセーフなオブジェクトは共有されて良い。
あるオブジェクトが共有されて良いか駄目かを表す概念がSendableで、actorの境界とSendableの組み合わせで、
安全であると同時に一部を効率のために限定された形で共有する事を許す、というのが可能になっている。
これはasync/awaitとも良く組み合わさり、開発者がより柔軟にトレードオフを選択出来るactorモデルとなっている。

### Pythonのtrioによるstructured concurrency

上記のマニフェストのコメントでリンクが貼られていたので見てみる。[[Python]]に続く。

## Update a sample app の動画

もうだいたい理解したので作業を開始しようと思ったら意外と手が動かなかったので、
既存のサンプルをSwift Concurrencyバージョンに直す、という以下の動画を見る事に。

[Swift concurrency: Update a sample app - WWDC21 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2021/10194/)

`@MainActor`はclassにつけるattributeなの、なんか違和感あるよなぁ。これはactorのattributeじゃないのかしら？

### 見ようと思っていた動画は一通り見た

だいぶ理解が進んだので書いてみようと思う。AppKitの奴をまだ見てないが、そこはいいだろう。

## Global Actorについて調べる

`@MainActor`みたいなのは自分のactorでも作れないのかな？と思いドキュメントを見ても良く分からないのでググっていたら、
これはGlobal Actorという話らしく、そのプロポーザルが見つかったのでこれを読む。

[swift-evolution/proposals/0316-global-actors.md at main · apple/swift-evolution](https://github.com/apple/swift-evolution/blob/main/proposals/0316-global-actors.md)

こういうの、公式ドキュメントからリンクしてよ、って思うんだが。公式ドキュメントのプロトコルはあった。 [GlobalActor - Apple Developer Documentation](https://developer.apple.com/documentation/swift/globalactor)

ようするに、

- GlobalActorプロトコルにconformする
   - staticなsharedを定義すれば良さそう（ActorTypeはinferされそう）
- `@globalActor` attributeをつける

をすれば、以後はattributeとして使えそう。へー。

associatedtypeのinferenceでググって以下を見つける。 [Recent improvements to associated type inference - Development / Compiler - Swift Forums](https://forums.swift.org/t/recent-improvements-to-associated-type-inference/70265)

globalActorの例も見つけた。 [Global actors in Swift - Swift with Majid](https://swiftwithmajid.com/2024/03/12/global-actors-in-swift/)