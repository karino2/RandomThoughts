2nd edition。

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=karino203-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B01GVCRF6M&linkId=d2dca833fa0a87c0e0d251e0d9dcddbb"></iframe>

The Grammar of Graphicsが具体例が全然無くて理解しづらいため、先にggplot2のこの本を読む事に。
Springerの40%オフに釣られてpdfで2021年11月上旬に購入。

まだ2.6.3のあたりだが、やはり具体例がある方が圧倒的に分かりやすいよなぁ。

### 2章読み終わり（2021-11-16）

2章は簡単な例を一通り見るという章なのだが、使うだけならこれで十分だな、という気がする。
自分の目的はggplot2を使いたいのでは無くてGrammar of Graphicsを学びたいなのでここからが本番だが。

ただやはり具体例があるといいね。dataとvariableの関係とかやはり具体例が多い方が分かりやすい。

### 3章、4章読み終わり（2021-11-26）

3章は使う視点でのより詳細な機能説明。
ここまでで基本的な利用の情報が全て揃う感じ。

4章からはGrammarの解説。
やはり具体例をもとに話をするので圧倒的に分かりやすいな。
dataとaestheticsへのマッピングがdata frame 的なのを作って、それに対していろいろ操作してレイヤーが出来る、
というのが骨格っぽいな。

scalingは分かりにくいな。statistical transformationの前に実行される、とあるが、例えば算術平均とかscaleのあとに実行されちゃうの？
trainingとscalingはあとの章を読んでいくと分かるようになると期待。

## 5章、Layer

5つの構成要素

- data
- aesthetic mappings
- geom
- stat
- position adjustment

## 6章、Scale

スケールはデータの領域からaesceticの領域への関数との事。おぉ、そう聞くとcoordとの違いも分かるな。