[Mac](Mac)のプログラム言語。

- [Swift - Apple](https://www.apple.com/swift/)
- [【書籍】TheSwiftProgrammingLanguage](%E3%80%90%E6%9B%B8%E7%B1%8D%E3%80%91TheSwiftProgrammingLanguage)
上記の公式ページから、「The Swift Programming Language」という電子書籍がApple Book Storeから無料で読むことが出来る。
    - [The Swift Programming Language (5.10) - Documentation](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/) web版のリンクをこちらも貼っておく

## interop

- [Swift.org - Mixing Swift and C++](https://www.swift.org/documentation/cxx-interop/) C++ interop、experimentalっぽい。
- [Importing Objective-C into Swift - Apple Developer Documentation](https://developer.apple.com/documentation/swift/importing-objective-c-into-swift) SwiftからObjective-Cを呼ぶ

## Swift Concurrency

長くなったのでページを分ける。

[SwiftConcurrency](SwiftConcurrency)

## SwiftPM

Swiftのパッケージマネージャ。[Swift.org - Package Manager](https://www.swift.org/documentation/package-manager/)

Xcodeのプロジェクトは最初から対応が入っていて、右クリックから追加で追加出来る。
[Adding package dependencies to your app - Apple Developer Documentation](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app)

（公式のGetting Startedとだいぶ違うのでメモ）

## Logger

使ってるモジュールがめっちゃログ吐くので消し方を調べる。

[Debug with structured logging - WWDC23 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2023/10226/) この動画の最初の方の方法で十分な気がしてきた。

関係無いが、LLDBで `p 変数名` とか `po 変数名` でウォッチ出来るのは便利そうだな。Do What I Mean Printというコマンドがあってdwim-printと呼び、pがこのエイリアスになっているらしい。へー。

[Explore logging in Swift - WWDC20 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2020/10168/)

こちらはより基本的な使い方。non numericな値をstring interpolateで出すと、普段はprivacy的な削除で消されるらしい。publicとか指定しないとエンドユーザーの端末では見えないとか。
あとデバイスからのログの吸い出し方もこの動画で説明されている。

formatの話もある。

```
  logger.log("hogehoge \(seconds, format: .fixed(precision: 2))")
```

公式ドキュメント: [Logging - Apple Developer Documentation](https://developer.apple.com/documentation/os/logging)