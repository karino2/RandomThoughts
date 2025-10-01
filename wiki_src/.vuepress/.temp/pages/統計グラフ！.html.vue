<template><div><p>karino2が調べた経済などの統計データを表示するアプリ。正式名称は「スマホに統計のグラフが降ってくる！」</p>
<ul>
<li><a href="https://play.google.com/store/apps/details?id=com.livejournal.karino2.tobinq.app&amp;pcampaignid=web_share" target="_blank" rel="noopener noreferrer">play: スマホに統計のグラフが降ってくる！</a></li>
<li><a href="https://karino2.livejournal.com/253085.html" target="_blank" rel="noopener noreferrer">「スマホに統計のグラフが降ってくる！」で遊んでみよう - 南よ! 海の見える方! — LiveJournal</a></li>
</ul>
<p>内部的にはRのサブセットのスクリプトとテキストの解説が降ってきて、それを元にグラフを書いて表示するような作りになっている。
データはgoogle spread sheetsにまとめている。</p>
<h2 id="更新手順" tabindex="-1"><a class="header-anchor" href="#更新手順"><span>更新手順</span></a></h2>
<ol>
<li>spread sheetのデータを更新</li>
<li>チャートをDebug＞Admin＞共有 でgithub pagesのimages下のものを更新</li>
<li>scripts.jsonをjson_edit.htmlにロードしてコメントなどを書き換えてscripts.jsonを保存（Command+K、Command+Fでフォーマット）</li>
<li>npm run generateでhtmlを生成</li>
<li>gitにコミットしてpush</li>
</ol>
<hr>
<p>スクリプト集</p>
<h3 id="高齢者の労働参加率と労働力人口比率" tabindex="-1"><a class="header-anchor" href="#高齢者の労働参加率と労働力人口比率"><span>高齢者の労働参加率と労働力人口比率</span></a></h3>
<p>高齢者の労働参加率を求めた時に、労働力人口の比率と違うか？と思って調べてみた。あまり変わらなかった。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">urlL &lt;- Qurl("年齢階級別就業者数")</span>
<span class="line">dfL &lt;- read.csv(urlL)</span>
<span class="line">urlWP &lt;- Qurl("年齢階級別労働力人口")</span>
<span class="line">dfWP &lt;- read.csv(urlWP)</span>
<span class="line">#</span>
<span class="line">sumMonths &lt;- function(total) {</span>
<span class="line"> n &lt;- (length(total)/12)</span>
<span class="line"> y &lt;- 1:n</span>
<span class="line"> for(i in 1:n) { b &lt;- (12*(i-1))+1; e &lt;- (12*(i-1))+12; y[i] &lt;- mean(total[b:e]) }</span>
<span class="line"> y</span>
<span class="line">}</span>
<span class="line">#</span>
<span class="line">calcRatio &lt;- function(df) {</span>
<span class="line">  ytotal &lt;- sumMonths(df[["男女計: Total"]])</span>
<span class="line">  yover &lt;- sumMonths(df[["男女計: 65歳以上"]])</span>
<span class="line">  yratio &lt;- 100*yover/ytotal  </span>
<span class="line">  yratio</span>
<span class="line">}</span>
<span class="line"># 1968〜2022（2023は途中まで）</span>
<span class="line">Lratio &lt;- calcRatio(dfL)</span>
<span class="line"># 1973〜2022（2023は途中まで）</span>
<span class="line">WPratio &lt;- calcRatio(dfWP)</span>
<span class="line">Lratio2 &lt;- Lratio[6:length(Lratio)]</span>
<span class="line">length(Lratio2)</span>
<span class="line">#length(WPratio)</span>
<span class="line">#plot(1973:(1973+(length(Lratio2)-1)), Lratio2, main="65歳以上の労働力人口と労働参加率（%）", ylim=c(0,20), type="b")</span>
<span class="line">#lines(1973:(1973+(length(WPratio)-1)), WPratio, type="b")</span>
<span class="line">#legend(2000, 0, c("65歳以上労働参加率", "65歳以上労働力人口比率"))</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>単体</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">url &lt;- Qurl("年齢階級別労働力人口")</span>
<span class="line">df &lt;- read.csv(url)</span>
<span class="line">sumMonths &lt;- function(total) {</span>
<span class="line">n &lt;- (length(total)/12)</span>
<span class="line">y &lt;- 1:n</span>
<span class="line">for(i in 1:n) { b &lt;- (12*(i-1))+1; e &lt;- (12*(i-1))+12; y[i] &lt;- mean(total[b:e]) }</span>
<span class="line">y</span>
<span class="line">}</span>
<span class="line">ytotal &lt;- sumMonths(df[["男女計: Total"]])</span>
<span class="line">yover &lt;- sumMonths(df[["男女計: 65歳以上"]])</span>
<span class="line">yratio &lt;- 100*yover/ytotal</span>
<span class="line"># 1973〜2022 (2023は10月まで）</span>
<span class="line">plot(1973:(1973+(length(yratio)-1)), yratio, main="65歳以上の労働力人口（%）", ylim=c(0,20), type="b")</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_15歳以上人口に占める65歳以上人口の割合" tabindex="-1"><a class="header-anchor" href="#_15歳以上人口に占める65歳以上人口の割合"><span>15歳以上人口に占める65歳以上人口の割合</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">url &lt;- Qurl("人口")</span>
<span class="line">pop &lt;- read.csv(url)</span>
<span class="line">url &lt;- Qurl("人口推計")</span>
<span class="line">popFuture &lt;- read.csv(url)</span>
<span class="line">#</span>
<span class="line">years &lt;- c(pop[["Year"]], popFuture[["Year"]])</span>
<span class="line">olds &lt;- c(pop[["65歳以上（老年人口）"]], popFuture[["65歳以上（老年人口）"]])</span>
<span class="line">products &lt;- c(pop[["15～64（生産年齢人口）"]], popFuture[["15～64（生産年齢人口）"]])</span>
<span class="line">total &lt;- olds+products</span>
<span class="line">ratio &lt;- (100*olds)/total</span>
<span class="line">#</span>
<span class="line">plot(years, ratio, ylab="%",main="15歳以上年齢に占める65歳以上人口の比率", type="b")</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cpiから前年比に" tabindex="-1"><a class="header-anchor" href="#cpiから前年比に"><span>CPIから前年比に</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">url &lt;- Qurl("CPI")</span>
<span class="line">df &lt;- read.csv(url)</span>
<span class="line">years &lt;- df[["Year"]]</span>
<span class="line">cpis &lt;- df[["All items"]]</span>
<span class="line"></span>
<span class="line">yearNum &lt;- length(years)</span>
<span class="line">ratio &lt;- 100*cpis[2:yearNum]/cpis[1:(yearNum-1)]</span>
<span class="line">plot(years[2:yearNum],ratio,ylim=c(90,130), main="CPIの前年比の推移（％）", xlab="年度", ylab="前年比", type="b")</span>
<span class="line">legend(2000, 100000, c("CPI"))</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>このページの存在を忘れててもう一度書き直してしまったのでそちらも残しておく。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">url &lt;- Qurl("CPI")</span>
<span class="line">df &lt;- read.csv(url)</span>
<span class="line">years = df[["Year"]]</span>
<span class="line">cpis = df[["All items"]]</span>
<span class="line"></span>
<span class="line">ynum = length(years)</span>
<span class="line">y1 = years[2:ynum]</span>
<span class="line">cpiDiff = 100*cpis[2:ynum]/cpis[1:(ynum-1)]-100</span>
<span class="line">plot(y1, cpiDiff,ylim=c(-5,25), main="CPIの増分の推移", xlab="年度", ylab="%", type="b")</span>
<span class="line">lines(y1, rep(0, length(y1)))</span>
<span class="line">lines(y1, rep(5, length(y1)))</span>
<span class="line">legend(2000, 100000, c("CPI", "0", "5"))</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="古い話題" tabindex="-1"><a class="header-anchor" href="#古い話題"><span>古い話題</span></a></h2>
<p>以下は古い話題。</p>
<h2 id="バックエンドをgithub-pagesに変更したい-した" tabindex="-1"><a class="header-anchor" href="#バックエンドをgithub-pagesに変更したい-した"><span>バックエンドをgithub pagesに変更したい（した）</span></a></h2>
<p>現状統計グラフ！は、バックエンドにjson engineとgoogle spread sheetを使っている。
前者は単にjsonを吐いたりwebのリンク先urlを作っているだけなので、<a href="./GithubPages.html">GithubPages</a>に乗り換えたい。
たまに触っては意外とTODOが多くて手がつかずに撤退、を繰り返しているので、少しここに作業メモを書いていく。</p>
<p>やる事</p>
<ol>
<li>jsonをgithub pagesに置いてIf-Modified-Sinceとかがどう出るかを調査</li>
<li>OkHttp3でIf-Modified-Sinceの使い方などを調べる</li>
<li>jsonを編集するアプリをElectronあたりで作る</li>
<li>jsonからhtmlを生成する静的ジェネレータスクリプトを作る</li>
<li>アプリの方のリンク先などを変える</li>
</ol>
<p>3が面倒でやる気を失ったが、そもそも単にhtmlでどうだろう？
結構良い感じになった。これでいいや。</p>
<p>あとは4を作ればやる気になるかなぁ。ただその前に1を調べる方がいいか。</p>
<p>If-Modified-Sinceは普通に動いている。これで良さそう。</p>
<p>あとは4のサイトを生成する所だけやったらアプリ側を変えようか、という気分になった。</p>
<p><a href="./TypeScript.html">TypeScript</a>の勉強も兼ねてやって4をやってみたらあっさり出来る。やりたい事が片付けられた、というのは印象良いね。
TypeScriptは別の言語というよりはJSにtype annotation入れてるだけって感じで、ほとんど学ばなくても使い始める事は出来るな。</p>
<p>という事で1, 3, 4が終わった。あとは2と5だけだな。</p>
<ul>
<li>OkHttp3でIf-Modified-Sinceの使い方などを調べる</li>
<li>アプリの方のリンク先などを変える</li>
</ul>
<p><a href="https://square.github.io/okhttp/recipes/#accessing-headers-kt-java" target="_blank" rel="noopener noreferrer">Recipes - OkHttp</a></p>
<h3 id="_2023-08-20-日" tabindex="-1"><a class="header-anchor" href="#_2023-08-20-日"><span>2023-08-20 (日)</span></a></h3>
<p>アプリ側を一通り対応して、一つ統計データも更新してみた。
画像共有が動かなくなって対応に苦戦する。</p>
<p>これまではexternal storageにフォルダをほってそこにpngファイルを吐き出し、それをcontent dbに突っ込んだ結果のurlをACTION_SENDのEXTRA_STREAMにくっつけて送っていた。
だがこのexternal storageに書くのができなくなって、DownloadsとかPicturesとかにしか書けなくなった。まぁそれはいい。</p>
<p>で、Downloadsに書いてそれをcontent dbに突っ込んだ結果のurlを同様に渡すと、どうも受け取る側が開けない。
うーん、公式のドキュメントだと以下が該当する所か？ <a href="https://developer.android.com/training/secure-file-sharing" target="_blank" rel="noopener noreferrer">Sharing files  -  Android Developers</a></p>
<p>見てみると何故か途中からインテントを受け取る側のFileProviderの書き方になって、単に送るケースが良くわからない。
仕方ないのでFileProviderのコードを読んでいると、どうもdata下に保存してあるという前提でパスの前半と一致しているかチェックしているな。
つまりDownloads下に置いて共有するケースだとFileProviderは使えないっぽい。</p>
<p>うーん、まぁ画像共有はadmin業務として自分だけが使う機能なので、どうでも良い所ではあるが。</p>
<p>とりあえず<code v-pre>context.getFilesDir()</code>の下にディレクトリほって共有用のファイルを置く事にする。
ついでにintentに<code v-pre>intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);</code> もしておいた。
この辺はいろいろ試していたら動いたので、このフラグがいるかは試してないが、まぁいい。</p>
<p>という事で無事共有は動いた。それにしてもAndroid 11はなかなか酷い事になっているな。これだけの変更をしておきながら、標準的なケースで現行機種と将来の機種の両方に対応する推奨方法がどこにも書いていないというのはさすがにダメなんじゃないか。
さすがにもうちょっとしたらまともな対応をするだろうと思ってあまり近づかないでおきたい所。</p>
</div></template>


