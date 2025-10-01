<template><div><h1 id="swift" tabindex="-1"><a class="header-anchor" href="#swift"><span>Swift</span></a></h1>
<p><a href="./Mac.html">Mac</a>のプログラム言語。</p>
<ul>
<li><a href="https://www.apple.com/swift/" target="_blank" rel="noopener noreferrer">Swift - Apple</a></li>
<li><a href="./【書籍】TheSwiftProgrammingLanguage.html">【書籍】TheSwiftProgrammingLanguage</a>
上記の公式ページから、「The Swift Programming Language」という電子書籍がApple Book Storeから無料で読むことが出来る。
<ul>
<li><a href="https://docs.swift.org/swift-book/documentation/the-swift-programming-language/" target="_blank" rel="noopener noreferrer">The Swift Programming Language (5.10) - Documentation</a> web版のリンクをこちらも貼っておく</li>
</ul>
</li>
</ul>
<h2 id="interop" tabindex="-1"><a class="header-anchor" href="#interop"><span>interop</span></a></h2>
<ul>
<li><a href="https://www.swift.org/documentation/cxx-interop/" target="_blank" rel="noopener noreferrer">Swift.org - Mixing Swift and C++</a> C++ interop、experimentalっぽい。</li>
<li><a href="https://developer.apple.com/documentation/swift/importing-objective-c-into-swift" target="_blank" rel="noopener noreferrer">Importing Objective-C into Swift - Apple Developer Documentation</a> SwiftからObjective-Cを呼ぶ</li>
</ul>
<h2 id="swift-concurrency" tabindex="-1"><a class="header-anchor" href="#swift-concurrency"><span>Swift Concurrency</span></a></h2>
<p>長くなったのでページを分ける。</p>
<p><a href="./SwiftConcurrency.html">SwiftConcurrency</a></p>
<h2 id="swiftpm" tabindex="-1"><a class="header-anchor" href="#swiftpm"><span>SwiftPM</span></a></h2>
<p>Swiftのパッケージマネージャ。<a href="https://www.swift.org/documentation/package-manager/" target="_blank" rel="noopener noreferrer">Swift.org - Package Manager</a></p>
<p>Xcodeのプロジェクトは最初から対応が入っていて、右クリックから追加で追加出来る。
<a href="https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app" target="_blank" rel="noopener noreferrer">Adding package dependencies to your app - Apple Developer Documentation</a></p>
<p>（公式のGetting Startedとだいぶ違うのでメモ）</p>
<h2 id="logger" tabindex="-1"><a class="header-anchor" href="#logger"><span>Logger</span></a></h2>
<p>使ってるモジュールがめっちゃログ吐くので消し方を調べる。</p>
<p><a href="https://developer.apple.com/videos/play/wwdc2023/10226/" target="_blank" rel="noopener noreferrer">Debug with structured logging - WWDC23 - Videos - Apple Developer</a> この動画の最初の方の方法で十分な気がしてきた。</p>
<p>関係無いが、LLDBで <code v-pre>p 変数名</code> とか <code v-pre>po 変数名</code> でウォッチ出来るのは便利そうだな。Do What I Mean Printというコマンドがあってdwim-printと呼び、pがこのエイリアスになっているらしい。へー。</p>
<p><a href="https://developer.apple.com/videos/play/wwdc2020/10168/" target="_blank" rel="noopener noreferrer">Explore logging in Swift - WWDC20 - Videos - Apple Developer</a></p>
<p>こちらはより基本的な使い方。non numericな値をstring interpolateで出すと、普段はprivacy的な削除で消されるらしい。publicとか指定しないとエンドユーザーの端末では見えないとか。
あとデバイスからのログの吸い出し方もこの動画で説明されている。</p>
<p>formatの話もある。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">  logger.log("hogehoge \(seconds, format: .fixed(precision: 2))")</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>公式ドキュメント: <a href="https://developer.apple.com/documentation/os/logging" target="_blank" rel="noopener noreferrer">Logging - Apple Developer Documentation</a></p>
</div></template>


