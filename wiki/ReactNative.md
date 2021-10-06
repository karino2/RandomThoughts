

ReactNativeはどうなんだろう？

----

### Mac版開発日記

[ReactNative for Mac, Get Started with macOS](https://microsoft.github.io/react-native-windows/docs/rnm-getting-started)

試していくと、最後の

```
npx react-native run-macos
```

で、hellorn has not been registeredとかいうエラーが出る。
ぐぐったらSOが引っかかるが、条件が違いそう（これはexpoというのを使ってるケース？） [Invariant Violation: “main” has not been registered](https://stackoverflow.com/questions/62649381/invariant-violation-main-has-not-been-registered)

とりあえずindex.jsでconsole.logした所、registerComponentまでは呼ばれているように見えるな。

Call StackをタップしたらVSCodeでAppRegistry.jsを開き、問題の所に入ってくるappKeyとrunnablesを出力した所、
appKeyは`hellorn`となっているが、runnablesのキーは`HelloRN`になっている。

app.jsonのnameを`hellorn`に変更してみた。

お、起動したヽ(´ー｀)ノ

よしよし、次は何したらいいかな、とMacのAPIのドキュメント見ても何も無い。
何も無いのか？と思ったが、メニューはなんか出てるんだよな。

XCodeのプロジェクトを開いたら、普通のアプリのプロジェクトっぽく実行出来る。お、これでいいんじゃね？

試しにWebViewを入れてみよう。

[https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md)

動いた。リリースビルドしてみよう。

ビルド結果はどこに出来るんだ？

`/Users/ユーザー名/Library/Developer/Xcode/DerivedData/hellorn-bddcuuqiauaopbgsggswiccvfkgm/` の下にあるっぽいな。

よし、見つけた。バイナリは12.6MB。まぁ100MBよりは小さいな。


### Bulma試行錯誤

assetExtsにcssが無いよ、とか言われる。

[https://github.com/highcharts/highcharts-react-native](https://github.com/highcharts/highcharts-react-native)

この辺を参考にresolverとか追記してみたらエラーは消えたが効いて無さそう？

[https://github.com/react-native-webview/react-native-webview/issues/1012](https://github.com/react-native-webview/react-native-webview/issues/1012)

単にnpm installすれば良い、という訳では無さそうだなぁ。

[Improving Communication Between React Native WebViews and the Webpages they Render](https://medium.com/react-native-training/improving-communication-between-react-native-webviews-and-the-webpages-they-render-792c8f7db3e5)