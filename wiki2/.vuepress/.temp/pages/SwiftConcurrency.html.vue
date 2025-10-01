<template><div><h1 id="swiftconcurrency" tabindex="-1"><a class="header-anchor" href="#swiftconcurrency"><span>SwiftConcurrency</span></a></h1>
<p><a href="./Swift.html">Swift</a>のasyncとかawaitの話。</p>
<p>なんかGCDと結構別物っぽいので真面目に勉強する。</p>
<ul>
<li><a href="https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency/" target="_blank" rel="noopener noreferrer">Concurrency - Documentation</a></li>
<li><a href="https://developer.apple.com/documentation/swift/concurrency" target="_blank" rel="noopener noreferrer">Concurrency - Apple Developer Documentation</a> こっちはクラスリファレンス、大した情報は無いが存在を知る事はできる。</li>
</ul>
<h2 id="wwdcの動画で入門" tabindex="-1"><a class="header-anchor" href="#wwdcの動画で入門"><span>WWDCの動画で入門</span></a></h2>
<p>適当にググって以下を見つける</p>
<ul>
<li><a href="https://towardsdev.com/swift-concurrency-deep-dive-1-gcd-vs-async-await-280ac5df7c76" target="_blank" rel="noopener noreferrer">Swift Concurrency Deep Dive [1] — GCD vs async/await - by Enebin - Towards Dev</a></li>
</ul>
<p>このブログからWWDCの動画が参照されている。やはりWWDC動画から見る方がいいか、と結論づけ、WWDCの動画を見ていく。</p>
<h2 id="wwdcのasync-awaitの入門-meet-async-await-in-swift-wwdc21" tabindex="-1"><a class="header-anchor" href="#wwdcのasync-awaitの入門-meet-async-await-in-swift-wwdc21"><span>WWDCのAsync, awaitの入門（Meet async/await in Swift WWDC21）</span></a></h2>
<ul>
<li><a href="https://developer.apple.com/videos/play/wwdc2021/10132/" target="_blank" rel="noopener noreferrer">Meet async/await in Swift - WWDC21 - Videos - Apple Developer</a></li>
</ul>
<p>前半はasyncとawaitとは、的な話で、この範囲だと他の言語との違いは特になし。awaitにtryをつける場合がある、くらいか。</p>
<p>後半22分くらいから実際に使う場合の話が出てきて、await使うにはasyncコンテキストの中じゃないといけない、
とかいう話が出てくる。そのためにはTaskというものの中で使う、とか。
ただTaskの話の詳細はあまり出てこない。main threadで実行したいとかそういう話は別動画っぽいか？（タイトル的にはこれか？<a href="https://developer.apple.com/videos/play/wwdc2021/10134/" target="_blank" rel="noopener noreferrer">Explore structured concurrency in Swift - WWDC21 - Videos - Apple Developer</a>）</p>
<p>28分くらいからnon asyncなものをasyncでラップするためのwithCheckedThrowingContinuationの話が出てくる。
これがCPSのクロージャーを引数に取るasync関数になっていて、completionのハンドラとしてこれを呼べば良い。
この辺は特に分からない事も無いが、try版と例外投げない版の２つがあるところはSwift特有か。</p>
<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift"><pre v-pre><code class="language-swift"><span class="line">   <span class="token keyword">typealias</span> <span class="token class-name">PostContinuation</span> <span class="token operator">=</span> <span class="token class-name">CheckedContinuation</span><span class="token operator">&lt;</span><span class="token punctuation">[</span><span class="token class-name">Post</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token class-name">Error</span><span class="token operator">></span></span>
<span class="line">   <span class="token keyword">return</span> <span class="token keyword">try</span> <span class="token keyword">await</span> withCheckedThrowingContinuation <span class="token punctuation">{</span> <span class="token punctuation">(</span>continuation<span class="token punctuation">:</span> <span class="token class-name">PostContinuation</span><span class="token punctuation">)</span> <span class="token keyword">in</span> </span>
<span class="line">    <span class="token operator">...</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CheckedContinuationの最初の型引数はgenericsになっているのかな。
２つ目の引数のErrorはSwiftのErrorプロトコルで中身は空か。 <a href="https://docs.swift.org/swift-book/documentation/the-swift-programming-language/errorhandling/" target="_blank" rel="noopener noreferrer">Error Handling - Documentation</a></p>
<p>このcontinuationはresumeというメソッドを呼ぶ事になる。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">   if let error = error {</span>
<span class="line">      continuation.resume(throwing: error)</span>
<span class="line">   } else {</span>
<span class="line">      continuation.resume(returning: posts)</span>
<span class="line">   }</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>この辺は通い慣れた道だな。</p>
<p>この動画から参照されている動画で気になるもの</p>
<ul>
<li><a href="https://developer.apple.com/videos/play/wwdc2021/10133" target="_blank" rel="noopener noreferrer">Protect mutable state with Swift actors - WWDC21 - Videos - Apple Developer</a></li>
<li><a href="https://developer.apple.com/videos/play/wwdc2021/10134/" target="_blank" rel="noopener noreferrer">Explore structured concurrency in Swift - WWDC21 - Videos - Apple Developer</a></li>
<li><a href="https://developer.apple.com/videos/play/wwdc2021/10019/" target="_blank" rel="noopener noreferrer">Discover concurrency in SwiftUI - WWDC21 - Videos - Apple Developer</a></li>
<li><a href="https://developer.apple.com/videos/play/wwdc2021/10146/" target="_blank" rel="noopener noreferrer">What’s new in AVFoundation - WWDC21 - Videos - Apple Developer</a></li>
<li><a href="https://developer.apple.com/videos/play/wwdc2021/10054/" target="_blank" rel="noopener noreferrer">What's new in AppKit - WWDC21 - Videos - Apple Developer</a></li>
<li><a href="https://developer.apple.com/videos/play/wwdc2021/10254/" target="_blank" rel="noopener noreferrer">Swift concurrency: Behind the scenes - WWDC21 - Videos - Apple Developer</a></li>
</ul>
<h2 id="what-s-new-in-avfoundation-wwdc21" tabindex="-1"><a class="header-anchor" href="#what-s-new-in-avfoundation-wwdc21"><span>What’s new in AVFoundation - WWDC21</span></a></h2>
<p><a href="https://developer.apple.com/videos/play/wwdc2021/10146/" target="_blank" rel="noopener noreferrer">What’s new in AVFoundation - WWDC21 - Videos - Apple Developer</a> を見る。
これはやりたい事には必要ないのだけれど、AV Foundation関連を見て慣れておこうかな、という事で。</p>
<h3 id="enumの引数で返りの型が決まる" tabindex="-1"><a class="header-anchor" href="#enumの引数で返りの型が決まる"><span>enumの引数で返りの型が決まる？</span></a></h3>
<p>4:40あたりに以下のようなコード例があった。</p>
<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift"><pre v-pre><code class="language-swift"><span class="line"> <span class="token keyword">let</span> <span class="token punctuation">(</span>duration<span class="token punctuation">,</span> tracks<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">try</span> <span class="token keyword">await</span> assert<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token punctuation">.</span>duration<span class="token punctuation">,</span> <span class="token punctuation">.</span>tracks<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>durationはCMTime、tracksはAVAssetTracks型だという。これってloadのシグニチャはどうなっているのだろう？
AVAssetではなくAVAsynchronousKeyValueLoadingというところにあるな。</p>
<p><a href="https://developer.apple.com/documentation/avfoundation/avasynchronouskeyvalueloading/3747327-load?language=objc" target="_blank" rel="noopener noreferrer">load(<em>:</em>😃 - Apple Developer Documentation</a></p>
<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift"><pre v-pre><code class="language-swift"><span class="line"><span class="token keyword">func</span> <span class="token function-definition function">load</span><span class="token operator">&lt;</span><span class="token class-name">A</span><span class="token punctuation">,</span> <span class="token class-name">B</span><span class="token operator">></span><span class="token punctuation">(</span></span>
<span class="line">    <span class="token omit keyword">_</span> propertyA<span class="token punctuation">:</span> <span class="token class-name">AVAsyncProperty</span><span class="token operator">&lt;</span><span class="token keyword">Self</span><span class="token punctuation">,</span> <span class="token class-name">A</span><span class="token operator">></span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token omit keyword">_</span> propertyB<span class="token punctuation">:</span> <span class="token class-name">AVAsyncProperty</span><span class="token operator">&lt;</span><span class="token keyword">Self</span><span class="token punctuation">,</span> <span class="token class-name">B</span><span class="token operator">></span></span>
<span class="line"><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token keyword">throws</span> <span class="token operator">-></span> <span class="token punctuation">(</span><span class="token class-name">A</span><span class="token punctuation">,</span> <span class="token class-name">B</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>なるほど、.durationや.tracksには戻りの型も型情報に入っているのだな。
でもenumでそんな事出来るのか？durationの定義はこれか？</p>
<p><a href="https://developer.apple.com/documentation/avfoundation/avpartialasyncproperty/3816112-duration" target="_blank" rel="noopener noreferrer">duration - Apple Developer Documentation</a></p>
<p>あら、enumではなくてstatic変数なのか。これ、なんで.でアクセス出来るんだろう？</p>
<p>この機能は「Implicit Member Expression」<a href="https://docs.swift.org/swift-book/documentation/the-swift-programming-language/expressions/#Implicit-Member-Expression" target="_blank" rel="noopener noreferrer">Expressions - Documentation</a>が正式な名前らしい。
enumはいいとして、enum以外の推論ルールはどうなっているのだろう？
ドキュメントには「such as an enumeration case or a type method」と書いてあるが、後者の推論がどういう時に出来るのかは良く分からない。</p>
<p>感じとしては、メソッドコールの時の引数はそのターゲットの型のstatic変数も探してくれるって感じのようだが、ドキュメント内でそれに言及している箇所は見つからない。うーん。
型が決まっている時はその型のstatic変数を探してくれるってのは良く見るので、たぶんその派生ではあると思うが。</p>
<p>関係無いがこの動画でenumをいーにゅーむと発音したりtupleをとゅーぷると発音すると知る。</p>
<h3 id="avvideocompositing" tabindex="-1"><a class="header-anchor" href="#avvideocompositing"><span>AVVideoCompositing</span></a></h3>
<p><a href="https://developer.apple.com/videos/play/wwdc2021/10146/" target="_blank" rel="noopener noreferrer">What’s new in AVFoundation - WWDC21 - Videos - Apple Developer</a> の13分あたりに動画のcomposite関連のコード片がある。
ただしこれは本当にコードの一部だけで全体としてどうしたらいいかは良く分からない。
この辺やりたい時に参考にしたいかもしれないのでここにメモを残しておく。</p>
<h2 id="explore-structured-concurrency-in-swift" tabindex="-1"><a class="header-anchor" href="#explore-structured-concurrency-in-swift"><span>Explore structured concurrency in Swift</span></a></h2>
<p>Task周りとかをもう少し知りたいな、と思い、もうちょっと詳しそうな動画に進む。
次はこの動画。</p>
<p><a href="https://developer.apple.com/videos/play/wwdc2021/10134/" target="_blank" rel="noopener noreferrer">Explore structured concurrency in Swift - WWDC21 - Videos - Apple Developer</a></p>
<p>でも最初のところはいわゆる構造化プログラム（gotoじゃなくてループとif使っていこうな）の類推としてのconcurrencyの話で、
async await素晴らしいな、という事しか言ってなさそうな雰囲気。もう少し聞いていこう。</p>
<p>お、5分くらいからTaskの話が始まった。この動画で合ってたっぽいな。</p>
<h3 id="async-let" tabindex="-1"><a class="header-anchor" href="#async-let"><span>async let</span></a></h3>
<p>7:00くらいにasync letの話。ふむふむ。async letはその変数をアクセスするまで並列に動き、変数を使うところで<code v-pre>await 変数名</code>とするところでCPSのブロックが作られる訳か。
これが一番単純な、Taskが生成されるケースかな。</p>
<h3 id="withthrowingtaskgroupで複数同時実行" tabindex="-1"><a class="header-anchor" href="#withthrowingtaskgroupで複数同時実行"><span>withThrowingTaskGroupで複数同時実行</span></a></h3>
<p>14:20くらいからwithThrowingTaskGroupの話が始まる。</p>
<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift"><pre v-pre><code class="language-swift"><span class="line"><span class="token keyword">try</span> <span class="token keyword">await</span> <span class="token function">withThrowingTaskGroup</span><span class="token punctuation">(</span>of<span class="token punctuation">:</span> <span class="token class-name">Void</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> group <span class="token keyword">in</span> </span>
<span class="line">    <span class="token keyword">for</span> id <span class="token keyword">in</span> ids <span class="token punctuation">{</span></span>
<span class="line">        group<span class="token punctuation">.</span><span class="token keyword">async</span> <span class="token punctuation">{</span></span>
<span class="line">           thumbnails<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">try</span> <span class="token keyword">await</span> <span class="token function">fetchOneThumbnail</span><span class="token punctuation">(</span>withID<span class="token punctuation">:</span> id<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>withThrowingTaskGroupは、groupを引数に取るクロージャを引数にする。
group.asyncでタスクを同時に走らせる。いわゆるparだな。</p>
<p>groupの下にTaskがぶら下がりタスクツリーとなる。groupがスコープから消える時に全部をawaitする感じらしい。</p>
<p>17:02 thumbnailsにレースコンディションがあるので以下のようにするべき、とか。</p>
<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift"><pre v-pre><code class="language-swift"><span class="line"><span class="token keyword">try</span> <span class="token keyword">await</span> <span class="token function">withThrowingTaskGroup</span><span class="token punctuation">(</span>of<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">UIImage</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">self</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> group <span class="token keyword">in</span> </span>
<span class="line">    <span class="token keyword">for</span> id <span class="token keyword">in</span> ids <span class="token punctuation">{</span></span>
<span class="line">        group<span class="token punctuation">.</span><span class="token keyword">async</span> <span class="token punctuation">{</span></span>
<span class="line">           <span class="token keyword">return</span> <span class="token keyword">try</span> <span class="token keyword">await</span> <span class="token function">fetchOneThumbnail</span><span class="token punctuation">(</span>withID<span class="token punctuation">:</span> id<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">for</span> <span class="token keyword">try</span> <span class="token keyword">await</span> <span class="token punctuation">(</span>id<span class="token punctuation">,</span> thumbnail<span class="token punctuation">)</span> <span class="token keyword">in</span> group <span class="token punctuation">{</span></span>
<span class="line">        thumbnails<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">=</span> thumbnail</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>withThrowingTaskGroupの引数に型を指定する（.selfとはなんだろう？）、そしてgroup.asyncからはその型をreturnする。
その後でgroupにtry awaitで値を取り出す。</p>
<h3 id="キャンセルとstructured-task" tabindex="-1"><a class="header-anchor" href="#キャンセルとstructured-task"><span>キャンセルとstructured task</span></a></h3>
<p>structured taskは、終わる時は子供も全部終わる。ツリーとしては、子供のノードがすべて終わって始めて親のノードが終わる。</p>
<p>キャンセルはcooperativeで、</p>
<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift"><pre v-pre><code class="language-swift"><span class="line"><span class="token keyword">try</span> <span class="token class-name">Task</span><span class="token punctuation">.</span><span class="token function">checkCancellation</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>でチェックする。または <code v-pre>Task.isCancelled</code> でbooleanでチェック出来る。</p>
<h3 id="taskとunstructured-concurrency" tabindex="-1"><a class="header-anchor" href="#taskとunstructured-concurrency"><span>Taskとunstructured concurrency</span></a></h3>
<p>21:00あたりでTaskを使った話が出てくる。これはスコープ内で終わらないようなケース。
asyncじゃないコンテキストから実行する時などに使う。
キャンセレーションやエラーなどのporpagateを手でやってやる必要がる（Taskオブジェクトが帰ってきてそれで行う）</p>
<p>なお、Task.detachedでunstructureよりさらに独立で、Actorやpriorityなどが共有されないタスクが作られるとか。Actorはまだ出てきてないので他の動画を見る必要がありそう。</p>
<h3 id="structured-concurrencyの元ネタはpythonのtrioらしい" tabindex="-1"><a class="header-anchor" href="#structured-concurrencyの元ネタはpythonのtrioらしい"><span>Structured Concurrencyの元ネタはPythonのTrioらしい</span></a></h3>
<p><a href="./Python.html">Python</a>に関連リンクを置いておく。</p>
<h2 id="protect-mutable-state-with-swift-actors-wwdc21" tabindex="-1"><a class="header-anchor" href="#protect-mutable-state-with-swift-actors-wwdc21"><span>Protect mutable state with Swift actors - WWDC21</span></a></h2>
<p>という事で次はActorを説明しているらしい以下を見る。</p>
<p><a href="https://developer.apple.com/videos/play/wwdc2021/10133" target="_blank" rel="noopener noreferrer">Protect mutable state with Swift actors - WWDC21 - Videos - Apple Developer</a></p>
<p>6:00くらいからActorの話が始まるな。これは知らない概念だ。</p>
<p>普通にクラスのように書いて、外からアクセスする時はawaitで呼ぶと、クラスとしてはJavaのsynchronizedのように動いているように見えるが、ブロックじゃなくてyieldする感じか。</p>
<p>nonisolatedとかSendableとかいろいろ追加の要素があって、コンパイラがチェックしてくれる。
賢いけれど、かなり複雑だよなぁ。</p>
<h3 id="コップ本のactorを読み直す" tabindex="-1"><a class="header-anchor" href="#コップ本のactorを読み直す"><span>コップ本のactorを読み直す</span></a></h3>
<p>Actorってscalaにあったよなぁ、と昔読んだコップ本の該当章を軽く見直す。
Scalaのactorは、actorごとに独自のスレッドを持ち、actor間のやりとりはメッセージというので行い、
メッセージはactor側ではreceiveというメソッドで取り出して処理する。</p>
<p>actor内はいつも同一のスレッドとなる事で、lockなどが不要になり、一方で状態を複数のスレッドで共有出来るようになる、という仕組みか。
なんかこういう話だったな。
kotlinも初期の頃はこういうのあったよな。最近は使わなくなったが。</p>
<p>Swiftのactorも本質的には似ていて、actorの内部では排他制御がなされていて同時に動くメソッドは一つになる。
一方で外部からの呼び出しとの境界はメッセージでは無くawaitになる。
そしてactorごとに独自のスレッドがある訳では無い。
さらにactorというのが言語要素であるので、
外部からメソッドを呼び出す時にはmutable stateに触るかどうかにコンパイラのチェックが入るため、
安全に部分的に外部から触る（Equaitableなどの外部のプロトコルにconformする場合など）事が可能になる。</p>
<h3 id="sendableのプロトコルのコンパイラチェック" tabindex="-1"><a class="header-anchor" href="#sendableのプロトコルのコンパイラチェック"><span>Sendableのプロトコルのコンパイラチェック</span></a></h3>
<p>Sendableのプロトコルにconformすると共有出来るようになり、それがあるか無いかのチェックがコンパイラによって行われる、というの、
Swift的だよな。</p>
<p>特別なプロトコルをコンパイラが認識していて、特定のプロトコルだけ行われるチェックがある。</p>
<p>これがSwiftの強力さでもある一方で、こういう機能がユーザーが作れないなにかで実現されているの、なんとかならないのかなぁ、という気もしてしまう。</p>
<p>actorの仕組みを実現するためにここまでいろいろな要素が必要で、それぞれをコンパイラがいろいろチェックする必要があるの、
どうしても抵抗がある。
まぁC#の初期の心理的抵抗と一緒で、慣れてしまえばそういうものと思えるようになるのかもしれないが。</p>
<p>最後に参照されてた動画メモ</p>
<p><a href="https://developer.apple.com/videos/play/wwdc2021/10194/" target="_blank" rel="noopener noreferrer">Swift concurrency: Update a sample app - WWDC21 - Videos - Apple Developer</a></p>
<h3 id="actorについてはだいたい理解出来た" tabindex="-1"><a class="header-anchor" href="#actorについてはだいたい理解出来た"><span>actorについてはだいたい理解出来た</span></a></h3>
<p>結構重要な概念だが、この動画でだいたい理解出来たな。</p>
<h2 id="swift-concurrency-behind-the-scenes-wwdc21" tabindex="-1"><a class="header-anchor" href="#swift-concurrency-behind-the-scenes-wwdc21"><span>Swift concurrency: Behind the scenes - WWDC21</span></a></h2>
<p>だいぶ理解が進んだのでbehind the sceneの動画を見る。</p>
<p><a href="https://developer.apple.com/videos/play/wwdc2021/10254/" target="_blank" rel="noopener noreferrer">Swift concurrency: Behind the scenes - WWDC21 - Videos - Apple Developer</a></p>
<p>理解は深まったが、それほど新しい話は無いな。priorityの所は良く分からなかった（どうやってキューの先頭に持ってきてるんだ？とか）。</p>
<p>自分が以前やった<a href="https://karino2.github.io/2021/03/05/future_for_parallel.html" target="_blank" rel="noopener noreferrer">並列プログラムから見たFuture</a>あたりの話と似ているよね。
違いはfutureの場合はfutureを実行しているスレッドが遊ぶケースでもactorなら同じスレッドを使えるケースがあるというあたりか。
この辺はAppleは本当に良く分かってるよなぁ。</p>
<h2 id="クリスラトナーのconcurrency-manifesto" tabindex="-1"><a class="header-anchor" href="#クリスラトナーのconcurrency-manifesto"><span>クリスラトナーのConcurrency Manifesto</span></a></h2>
<p>ググってたら見つけた。</p>
<p><a href="https://gist.github.com/lattner/31ed37682ef1576b16bca1432ea9f782" target="_blank" rel="noopener noreferrer">Swift Concurrency Manifesto</a></p>
<p>actorの話とかが結構語られている。</p>
<p>基本的な使い方は先ほどの<a href="https://developer.apple.com/videos/play/wwdc2021/10133" target="_blank" rel="noopener noreferrer">Protect mutable state with Swift actors - WWDC21 - Videos - Apple Developer</a> の方で理解しているという前提で、もう少し背後にある考えなどをここには書いてみたい。</p>
<h3 id="gcdの延長としてのactor" tabindex="-1"><a class="header-anchor" href="#gcdの延長としてのactor"><span>GCDの延長としてのactor</span></a></h3>
<p>リソースごとにDispatchQueueを持つ、というデザインの延長としてactorがある。
延長というからには違いがある訳で、どこが違うかというと、
DispatchQueueはそれが保護するリソースとDispatchQueueの関係がimplicitでコンパイラがチェックしてくれなかった。</p>
<p>actorは特定のデータを特定の（論理）スレッドからだけ触る、という事を明示的に表現出来るようになっていて、
コンパイラがチェックしてくれる。</p>
<p>また次のそれ以前のactorとの違いにもつながるが、引数に渡したりreturnで値を返すときに共有されてしまうデータについて、
それが安全であるかどうかをコンパイラがチェック出来るようにするための第一歩でもある。</p>
<h3 id="swiftのactorとそれ以前のactorの違い" tabindex="-1"><a class="header-anchor" href="#swiftのactorとそれ以前のactorの違い"><span>Swiftのactorとそれ以前のactorの違い</span></a></h3>
<p>Swiftのactorで解決したかった問題としては</p>
<ul>
<li>値をreturnしたい</li>
<li>引数をdeep copyしたくない</li>
</ul>
<p>の２つが大きい。
この時にshared mutable stateが意図せず漏れ出してしまうのは防ぎたい。</p>
<p>一方で幾つかの注意深く設計された、スレッドセーフなオブジェクトは共有されて良い。
あるオブジェクトが共有されて良いか駄目かを表す概念がSendableで、actorの境界とSendableの組み合わせで、
安全であると同時に一部を効率のために限定された形で共有する事を許す、というのが可能になっている。
これはasync/awaitとも良く組み合わさり、開発者がより柔軟にトレードオフを選択出来るactorモデルとなっている。</p>
<h3 id="pythonのtrioによるstructured-concurrency" tabindex="-1"><a class="header-anchor" href="#pythonのtrioによるstructured-concurrency"><span>Pythonのtrioによるstructured concurrency</span></a></h3>
<p>上記のマニフェストのコメントでリンクが貼られていたので見てみる。<a href="./Python.html">Python</a>に続く。</p>
<h2 id="update-a-sample-app-の動画" tabindex="-1"><a class="header-anchor" href="#update-a-sample-app-の動画"><span>Update a sample app の動画</span></a></h2>
<p>もうだいたい理解したので作業を開始しようと思ったら意外と手が動かなかったので、
既存のサンプルをSwift Concurrencyバージョンに直す、という以下の動画を見る事に。</p>
<p><a href="https://developer.apple.com/videos/play/wwdc2021/10194/" target="_blank" rel="noopener noreferrer">Swift concurrency: Update a sample app - WWDC21 - Videos - Apple Developer</a></p>
<p><code v-pre>@MainActor</code>はclassにつけるattributeなの、なんか違和感あるよなぁ。これはactorのattributeじゃないのかしら？</p>
<h3 id="見ようと思っていた動画は一通り見た" tabindex="-1"><a class="header-anchor" href="#見ようと思っていた動画は一通り見た"><span>見ようと思っていた動画は一通り見た</span></a></h3>
<p>だいぶ理解が進んだので書いてみようと思う。AppKitの奴をまだ見てないが、そこはいいだろう。</p>
<h2 id="global-actorについて調べる" tabindex="-1"><a class="header-anchor" href="#global-actorについて調べる"><span>Global Actorについて調べる</span></a></h2>
<p><code v-pre>@MainActor</code>みたいなのは自分のactorでも作れないのかな？と思いドキュメントを見ても良く分からないのでググっていたら、
これはGlobal Actorという話らしく、そのプロポーザルが見つかったのでこれを読む。</p>
<p><a href="https://github.com/apple/swift-evolution/blob/main/proposals/0316-global-actors.md" target="_blank" rel="noopener noreferrer">swift-evolution/proposals/0316-global-actors.md at main · apple/swift-evolution</a></p>
<p>こういうの、公式ドキュメントからリンクしてよ、って思うんだが。公式ドキュメントのプロトコルはあった。 <a href="https://developer.apple.com/documentation/swift/globalactor" target="_blank" rel="noopener noreferrer">GlobalActor - Apple Developer Documentation</a></p>
<p>ようするに、</p>
<ul>
<li>GlobalActorプロトコルにconformする
<ul>
<li>staticなsharedを定義すれば良さそう（ActorTypeはinferされそう）</li>
</ul>
</li>
<li><code v-pre>@globalActor</code> attributeをつける</li>
</ul>
<p>をすれば、以後はattributeとして使えそう。へー。</p>
<p>associatedtypeのinferenceでググって以下を見つける。 <a href="https://forums.swift.org/t/recent-improvements-to-associated-type-inference/70265" target="_blank" rel="noopener noreferrer">Recent improvements to associated type inference - Development / Compiler - Swift Forums</a></p>
<p>globalActorの例も見つけた。 <a href="https://swiftwithmajid.com/2024/03/12/global-actors-in-swift/" target="_blank" rel="noopener noreferrer">Global actors in Swift - Swift with Majid</a></p>
<h2 id="meet-asyncsequence-wwdc21" tabindex="-1"><a class="header-anchor" href="#meet-asyncsequence-wwdc21"><span>Meet AsyncSequence - WWDC21</span></a></h2>
<p>AsyncSequenceを使いたくなったので動画を見る。</p>
<p><a href="https://developer.apple.com/videos/play/wwdc2021/10058/" target="_blank" rel="noopener noreferrer">Meet AsyncSequence - WWDC21 - Videos - Apple Developer</a></p>
<p>AsyncStreamで自分のAsyncSequenceを作れるのね。</p>
<h3 id="continuationを外に保持する" tabindex="-1"><a class="header-anchor" href="#continuationを外に保持する"><span>continuationを外に保持する</span></a></h3>
<p>AsyncStreamにわたすクロージャにcontinuationが渡ってくるが、これを外に保持することで外で使うことが出来るっぽい。
以下のモチベーションの所にそのやり方と、これが普通のやり方だがキモいのでもっといいやり方を提案する、みたいな話がある。
モチベーションの方は短くて良いコード例となっている。</p>
<p><a href="https://github.com/swiftlang/swift-evolution/blob/main/proposals/0388-async-stream-factory.md" target="_blank" rel="noopener noreferrer">swift-evolution/proposals/0388-async-stream-factory.md at main · swiftlang/swift-evolution</a></p>
<p>以下のスレッドも同じ話がある。</p>
<p><a href="https://forums.swift.org/t/unlike-other-continuations-in-swift-asyncstream-continuation-supports-escaping/53254/5" target="_blank" rel="noopener noreferrer">“Unlike other continuations in Swift, AsyncStream.Continuation supports escaping.” - Using Swift - Swift Forums</a></p>
<p>ちなみにプロポーザルのmakeStreamはすでに入っているっぽい。<a href="https://developer.apple.com/documentation/swift/asyncstream/makestream(of:bufferingpolicy:)" target="_blank" rel="noopener noreferrer">makeStream(of:bufferingPolicy:) - Apple Developer Documentation</a></p>
</div></template>


