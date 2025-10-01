<template><div><h1 id="reactnative" tabindex="-1"><a class="header-anchor" href="#reactnative"><span>ReactNative</span></a></h1>
<p>ReactNativeはどうなんだろう？</p>
<hr>
<h3 id="mac版開発日記" tabindex="-1"><a class="header-anchor" href="#mac版開発日記"><span>Mac版開発日記</span></a></h3>
<p><a href="https://microsoft.github.io/react-native-windows/docs/rnm-getting-started" target="_blank" rel="noopener noreferrer">ReactNative for Mac, Get Started with macOS</a></p>
<p>試していくと、最後の</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">npx react-native run-macos</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>で、hellorn has not been registeredとかいうエラーが出る。
ぐぐったらSOが引っかかるが、条件が違いそう（これはexpoというのを使ってるケース？） <a href="https://stackoverflow.com/questions/62649381/invariant-violation-main-has-not-been-registered" target="_blank" rel="noopener noreferrer">Invariant Violation: “main” has not been registered</a></p>
<p>とりあえずindex.jsでconsole.logした所、registerComponentまでは呼ばれているように見えるな。</p>
<p>Call StackをタップしたらVSCodeでAppRegistry.jsを開き、問題の所に入ってくるappKeyとrunnablesを出力した所、
appKeyは<code v-pre>hellorn</code>となっているが、runnablesのキーは<code v-pre>HelloRN</code>になっている。</p>
<p>app.jsonのnameを<code v-pre>hellorn</code>に変更してみた。</p>
<p>お、起動したヽ(´ー｀)ノ</p>
<p>よしよし、次は何したらいいかな、とMacのAPIのドキュメント見ても何も無い。
何も無いのか？と思ったが、メニューはなんか出てるんだよな。</p>
<p>XCodeのプロジェクトを開いたら、普通のアプリのプロジェクトっぽく実行出来る。お、これでいいんじゃね？</p>
<p>試しにWebViewを入れてみよう。</p>
<p><a href="https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md" target="_blank" rel="noopener noreferrer">https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md</a></p>
<p>動いた。リリースビルドしてみよう。</p>
<p>ビルド結果はどこに出来るんだ？</p>
<p><code v-pre>/Users/ユーザー名/Library/Developer/Xcode/DerivedData/hellorn-bddcuuqiauaopbgsggswiccvfkgm/</code> の下にあるっぽいな。</p>
<p>よし、見つけた。バイナリは12.6MB。まぁ100MBよりは小さいな。</p>
<h3 id="bulma試行錯誤" tabindex="-1"><a class="header-anchor" href="#bulma試行錯誤"><span>Bulma試行錯誤</span></a></h3>
<p>assetExtsにcssが無いよ、とか言われる。</p>
<p><a href="https://github.com/highcharts/highcharts-react-native" target="_blank" rel="noopener noreferrer">https://github.com/highcharts/highcharts-react-native</a></p>
<p>この辺を参考にresolverとか追記してみたらエラーは消えたが効いて無さそう？</p>
<p><a href="https://github.com/react-native-webview/react-native-webview/issues/1012" target="_blank" rel="noopener noreferrer">https://github.com/react-native-webview/react-native-webview/issues/1012</a></p>
<p>単にnpm installすれば良い、という訳では無さそうだなぁ。</p>
<p><a href="https://medium.com/react-native-training/improving-communication-between-react-native-webviews-and-the-webpages-they-render-792c8f7db3e5" target="_blank" rel="noopener noreferrer">Improving Communication Between React Native WebViews and the Webpages they Render</a></p>
</div></template>


