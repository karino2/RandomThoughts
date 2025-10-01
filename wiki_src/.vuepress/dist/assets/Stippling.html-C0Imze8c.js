import{_ as n,c as a,a as e,o as i}from"./app-CHiHTJW6.js";const l="/assets/2025_0820_134151-DI1g7yQp.png",p="/assets/2025_0820_134327-DjLiVJLf.png",d="/assets/2025_0820_144940-Df86ZB73.png",c="/assets/2025_0820_210217-DGvIUb6G.png",r="/assets/2025_0820_210146-BgYFuqM6.png",t="/assets/2025_0820_211118-Dud42PcT.png",v="/assets/2025_0820_212046-CK3g7Y6Z.png",m={};function u(o,s){return i(),a("div",null,[...s[0]||(s[0]=[e('<p>[[CG]]</p><p>Wikipediaの日本語では<a href="https://ja.wikipedia.org/wiki/%E7%82%B9%E5%88%BB" target="_blank" rel="noopener noreferrer">点刻 - Wikipedia</a>となっている。 [[MFG]]でStipplingとか出来ないかなぁ、と思って情報を集めたり、実装のメモをしたりするページ。</p><p>[[MdImgr]]用のテンプレートを貼っておく。<code>![imgs/Stippling/$1](imgs/Stippling/$1)</code></p><h2 id="weighted-voronoi-centroidによるstippling" tabindex="-1"><a class="header-anchor" href="#weighted-voronoi-centroidによるstippling"><span>Weighted Voronoi Centroidによるstippling</span></a></h2><p>たぶん一番基礎となるImage Stipplingの論文は以下の2002のSecordの論文と思う。</p><p><a href="https://dl.acm.org/doi/abs/10.1145/508530.508537" target="_blank" rel="noopener noreferrer">Weighted Voronoi stippling - Proceedings of the 2nd international symposium on Non-photorealistic animation and rendering</a></p><p>母点が重心となっているようなボロノイ図を求めてその母点を使う、というアイデアに、 グレーの画像成分を重みとしてその重みも加味して重心を計算する事でグレーな所は母点同士が近くに寄り、 それ以外の所は離れる、というような結果となる。</p><p>これは繰り返し計算が必要で、また最初の開始点の分布によって収束が結構違うので、 この後に続く多くの研究でこの効率的な改善が行われた。</p><h3 id="適当に散らばった点" tabindex="-1"><a class="header-anchor" href="#適当に散らばった点"><span>適当に散らばった点</span></a></h3><p>このアイデアのポイントとしては、ボロノイ図の重心を使うと、ある程度規則的だけれど微妙にランダムっぽい点が作れる、というのがある。</p><p>これはbluenoiseと言われる性質を満たした他の分布でも良く、ポアソンディスクサンプリングなどが良く比較される。</p><h2 id="mfgでの実装アイデア" tabindex="-1"><a class="header-anchor" href="#mfgでの実装アイデア"><span>MFGでの実装アイデア</span></a></h2><p>Weighted Voronoi Centroidのような手法はどうしても何らかのクライテリアによるイテレーションが必要になってしまい、 GPUだけでは閉じない。</p><p>けれどフィルタとして実装するならもうちょっといろいろ工夫が出来るんじゃないか、という事でフィルタで似たような事をする方法を考えてみる。</p><h3 id="基本的なアイデア、グレーの重みで適当に散らばった点をサンプリング" tabindex="-1"><a class="header-anchor" href="#基本的なアイデア、グレーの重みで適当に散らばった点をサンプリング"><span>基本的なアイデア、グレーの重みで適当に散らばった点をサンプリング</span></a></h3><p>点を動かすのでは無く、最密の点から始めて、確率的にその点を消す感じで同じ事が出来ないか。</p><p>各点はその点より少し大きい格子の中に一つとして、どこに打つかは適当にランダムにずらす。 まずはホワイトノイズでずらしてしまおう。</p><p><img src="'+l+'" alt="imgs/Stippling/2025_0820_134151.png"></p><p>ランダムでずらすがこの度合いは格子を超えない程度にしておく。 こうする事で点と点が重なる事は防げる。</p><p>そしてその格子で点を打つかどうかは下のグレーの場の強さによって確率を調整した上で適当にランダムにサンプルする。 ただしランダムといっても近隣の複数の点で別々に同じ結果を計算出来る必要があるので、x, yを元にしたhashを使うのがいいだろう。 下図ではバツ印で消す点を表している。</p><p><img src="'+p+`" alt="imgs/Stippling/2025_0820_134327.png"></p><p>これでだいたい下の場の強さに応じて点の数が増えたり減ったりする点が打てるんじゃないか？</p><p>このアイデアだと</p><ol><li>最密の所でも格子の距離くらいあくので、あんまり暗く出来ないかもしれない</li><li>ホワイトノイズがどのくらいいまいちかはやってみないと分からない</li></ol><p>というあたりに不安もあるが、まずは実装してみて考えよう。</p><h3 id="グレースケール化" tabindex="-1"><a class="header-anchor" href="#グレースケール化"><span>グレースケール化</span></a></h3><p>まずはグレースケールの場を作るためにグレースケールにしよう。 [[MFG]]に書いたように、以下とする。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">@bounds(input_u8.extent(0), input_u8.extent(1))</span>
<span class="line">def grayT |x, y| {</span>
<span class="line">  to_xyza(input_u8(x, y)).y</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">def result_u8 |x, y| {</span>
<span class="line">  let gray = grayT(x, y)</span>
<span class="line">  [gray, gray, gray, 1.0] |&gt; lbgra_to_u8color(...)}</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>grayTはリニアライズされた色になるので、RGBに戻す時はgamma補正する（to_u8colorでは無くlbgra_to_u8colorを使うということ）。 本当はグレーを戻すのにRGB同じ数値では適切ではないが、これは動作確認なのでいいでしょう。</p><p>試してみると以下。</p><p><img src="`+d+`" alt="imgs/Stippling/2025_0820_144940.png"></p><p>結構綺麗にできているので良さそう。</p><h3 id="格子の中心に点を打つ" tabindex="-1"><a class="header-anchor" href="#格子の中心に点を打つ"><span>格子の中心に点を打つ</span></a></h3><p>点はとりあえず2x2ピクセルとしよう。上下左右に3pxずつあけるとすると、格子は8x8か？</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let GRID_SIZE = 8</span>
<span class="line">let inputEx = sampler&lt;input_u8&gt;(address=.ClampToEdge)</span>
<span class="line"></span>
<span class="line">def result_u8 |x, y| {</span>
<span class="line">  # 格子の左上</span>
<span class="line">  let goxy = [x, y]/GRID_SIZE</span>
<span class="line"></span>
<span class="line">  # 3x3の位置を左上に2x2のピクセルを打つ。</span>
<span class="line">  # 3x3の位置をgcxyと呼ぶ。</span>
<span class="line">  let gcxy = goxy*GRID_SIZE + [2, 2]</span>
<span class="line">  ifel (all([x, y] &gt;= gcxy) &amp;&amp; all([x, y] &lt; gcxy+[2, 2]),</span>
<span class="line">      u8[0, 0, 0, 0xff],</span>
<span class="line">       u8[0, 0, 0, 0])</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+c+`" alt="imgs/Stippling/2025_0820_210217.png"></p><p>なんかあってそうか。でもサイズ2はちょっと小さいな。スペース広すぎか。</p><p>まぁいい。これを少しずらす。</p><p>ハッシュは[[MFG]]に書いたPCGベースの奴でいいだろう（正直xorshiftとかxxHashでも十分良い気がしているが）。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">fn hash |i: i32| {</span>
<span class="line">  let state = u32(i) * 747796405u + 2891336453u</span>
<span class="line">  let word = xor((state &gt;&gt; ((state &gt;&gt; 28u) + 4u)), state) * 277803737u</span>
<span class="line">  i32(xor((word &gt;&gt; 22u), word))</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">fn hash_xy |x:i32, y:i32| {</span>
<span class="line">  hash(x + hash(y))</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">fn map_to_f32 |uval: i32| {</span>
<span class="line">  let inv = 1.0 / 4294967295.0</span>
<span class="line">  f32(u32(uval))*inv</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ずらすのは<code>-3</code>から+3まででいいのかな。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let GRID_SIZE = 8</span>
<span class="line">let POINT_SIZE = 2</span>
<span class="line">let SPACE=(GRID_SIZE-POINT_SIZE)/2</span>
<span class="line"></span>
<span class="line"># 中略</span>
<span class="line"></span>
<span class="line">  # -SPACEからSPACEの間にランダムにずらす。</span>
<span class="line">  # goxyに対応した乱数をハッシュで得る</span>
<span class="line">  let rand1 = hash_xy(*goxy)</span>
<span class="line">  let rand2 = hash(rand1)</span>
<span class="line">  # -0.5〜0.5の乱数</span>
<span class="line">  let rf1 = map_to_f32(rand1)-0.5</span>
<span class="line">  let rf2 = map_to_f32(rand2)-0.5</span>
<span class="line"></span>
<span class="line">  let offset = i32([rf1, rf2]*f32(2*SPACE))</span>
<span class="line">  let gcxy2 = gcxy+offset</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+r+`" alt="imgs/Stippling/2025_0820_210146.png"></p><p>ブルーノイズという感じはしないが、ランダム性は得られている。 あとはさらにもう一つ乱数を足して、これがグレーの値より大きければ点を打つか。</p><p>グレーの値は格子内の平均でいいかな。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">  let rf3 = hash(rand2) |&gt; map_to_f32(...)</span>
<span class="line"></span>
<span class="line">  let gavg = rsum(0..&lt;GRID_SIZE, 0..&lt;GRID_SIZE) |rx, ry| {</span>
<span class="line">    let pos = goxy*GRID_SIZE+[rx, ry]</span>
<span class="line">    grayEx(*pos)</span>
<span class="line">  } / f32(GRID_SIZE^2)</span>
<span class="line"></span>
<span class="line">  let survive = rf3 &lt; gavg  </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>これでどうだろう？</p><p><img src="`+t+`" alt="imgs/Stippling/2025_0820_211118.png"></p><p>スキマがあきすぎてわからんな。</p><p>とりあえずランダムにずらすとかやめて、隙間をもっと減らしてみよう。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let GRID_SIZE = 4</span>
<span class="line">let POINT_SIZE = 3</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+v+`" alt="imgs/Stippling/2025_0820_212046.png"></p><p>ロジックはあってそうだが、思ってたのと違うな。</p><h3 id="いまいちな結果の考察" tabindex="-1"><a class="header-anchor" href="#いまいちな結果の考察"><span>いまいちな結果の考察</span></a></h3><p>Weighted Voronoi CentroidによるImage Stipplingのサンプル結果などを眺めていて違いについて思うのは、 黒いところはくっつくくらいの密度にならないとそれっぽっくならない、という事。 いつもオーバーラップしないように、というのは正しくない。</p><p>もともとポアソンディスクサンプリングの説明でくっつかないようにサンプルするというような理解から入ったのでそういうものだと思っていたが、 imge stipplingの時にはくっつくくらいそばになるケースを作らないと駄目そうだ。</p><p>どちらかというとそういうサンプリングが効いてくるのは、濃度が薄いところである程度等間隔に出るというところに思う。</p><p>また、点はある程度大きい方がそれっぽい。</p><h3 id="example-basedな手法を調べる" tabindex="-1"><a class="header-anchor" href="#example-basedな手法を調べる"><span>Example-basedな手法を調べる</span></a></h3><p>以下の論文を読んでみる。</p><p><a href="https://dl.acm.org/doi/abs/10.1145/1809939.1809946" target="_blank" rel="noopener noreferrer">Example-based stippling using a scale-dependent grayscale process - Proceedings of the 8th International Symposium on Non-Photorealistic Animation and Rendering</a></p><p>これはdot placementにはOstromoukhov 2001のerror diffusionのモデルを使っているとの事。</p><p>グレーのところをトーンとか使って解決するのを期待していたが、そうでは無かった。</p><p>ただこの論文は人間がstipplingする時との違いを分析して話をするため、 どういう事を再現したいのかは理解が深まった。</p><p>そしてやはり濃度の薄いところを等間隔に点を打つ、というのが難しさだと理解。問題の理解が誤っていた。</p><h3 id="勘違いしていた事まとめ" tabindex="-1"><a class="header-anchor" href="#勘違いしていた事まとめ"><span>勘違いしていた事まとめ</span></a></h3><ul><li>この問題は濃度が薄いところで等間隔にサンプルするのが難しさで、点同士の距離が近すぎないように、という問題ではない</li><li>GPU的には間隔をあけているところと狭いところを領域が自然につながるように作るのが難しさ <ul><li>適当な範囲を決めればその内部の濃度をもとに格子間隔は決められるが分布に応じて連続的にそれを調整するのは難しい</li></ul></li></ul><p>という事でそもそもの自分の問題の理解が間違えていた。</p><p>ここまでの最終コードを書いておく。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">@title &quot;Stippling失敗&quot;</span>
<span class="line"></span>
<span class="line">fn hash |i: i32| {</span>
<span class="line">  let state = u32(i) * 747796405u + 2891336453u</span>
<span class="line">  let word = xor((state &gt;&gt; ((state &gt;&gt; 28u) + 4u)), state) * 277803737u</span>
<span class="line">  i32(xor((word &gt;&gt; 22u), word))</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">fn hash_xy |x:i32, y:i32| {</span>
<span class="line">  hash(x + hash(y))</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">fn map_to_f32 |uval: i32| {</span>
<span class="line">  let inv = 1.0 / 4294967295.0</span>
<span class="line">  f32(u32(uval))*inv</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">@bounds(input_u8.extent(0), input_u8.extent(1))</span>
<span class="line">def grayT |x, y| {</span>
<span class="line">  to_xyza(input_u8(x, y)).y</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">let GRID_SIZE = 8</span>
<span class="line">let POINT_SIZE = 6</span>
<span class="line">let SPACE=(GRID_SIZE-POINT_SIZE)/2</span>
<span class="line"></span>
<span class="line">let inputEx = sampler&lt;input_u8&gt;(address=.ClampToEdge)</span>
<span class="line">let grayEx = sampler&lt;grayT&gt;(address=.ClampToEdge)</span>
<span class="line"></span>
<span class="line">def result_u8 |x, y| {</span>
<span class="line">  # ifel( r &gt; 0.5, u8[0xff, 0xff, 0xff, 0xff], u8[0, 0, 0, 0xff])</span>
<span class="line"></span>
<span class="line">  let goxy = [x, y]/GRID_SIZE</span>
<span class="line">  # 3x3の位置を左上に2x2のピクセルを打つ。</span>
<span class="line">  # 3x3の位置をgcxyと呼ぶ。</span>
<span class="line">  let gcxy = goxy*GRID_SIZE + SPACE</span>
<span class="line">  </span>
<span class="line">  # -SPACEからSPACEの間にランダムにずらす。</span>
<span class="line">  # goxyに対応した乱数をハッシュで得る</span>
<span class="line">  let rand1 = hash_xy(*goxy)</span>
<span class="line">  let rand2 = hash(rand1)</span>
<span class="line">  # -0.5〜0.5の乱数</span>
<span class="line">  let rf1 = map_to_f32(rand1)-0.5</span>
<span class="line">  let rf2 = map_to_f32(rand2)-0.5</span>
<span class="line">  let rf3 = hash(rand2) |&gt; map_to_f32(...)</span>
<span class="line"></span>
<span class="line">  let gavg = rsum(0..&lt;GRID_SIZE, 0..&lt;GRID_SIZE) |rx, ry| {</span>
<span class="line">    let pos = goxy*GRID_SIZE+[rx, ry]</span>
<span class="line">    grayEx(*pos)</span>
<span class="line">  } / f32(GRID_SIZE^2)</span>
<span class="line"></span>
<span class="line">  let survive = rf3 &lt; gavg</span>
<span class="line">  # let survive = 1</span>
<span class="line"></span>
<span class="line">  let offset = i32([rf1, rf2]*f32(2*SPACE))</span>
<span class="line">  let gcxy2 = gcxy+offset</span>
<span class="line">  # let gcxy2 = gcxy</span>
<span class="line">  </span>
<span class="line">  ifel (all([x, y] &gt;= gcxy2) &amp;&amp; all([x, y] &lt; gcxy2+POINT_SIZE) &amp;&amp; survive,</span>
<span class="line">      u8[0, 0, 0, 0xff],</span>
<span class="line">      u8(vec4(0xff)))</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="新しいアイデア" tabindex="-1"><a class="header-anchor" href="#新しいアイデア"><span>新しいアイデア</span></a></h3><p>画面真っ黒に敷き詰めた状態から始めて、これをひっぱって伸ばすようなアプローチではどうだろう？ 左上から始めて移動距離のようなものを累積和で表していけば、結果の点の座標から元の座標のどこにマップされるかを各点が判断出来て、 それである程度連続に間隔が変化する点を打てるのではないか。</p><p>ただこの考えはここまで書いたコードと全然違うので一旦中断。</p><h3 id="ハーフトーンはどうだろう" tabindex="-1"><a class="header-anchor" href="#ハーフトーンはどうだろう"><span>ハーフトーンはどうだろう？</span></a></h3><p>ハーフトーンを作る方が簡単そうな上に使い道もありそう。[[ハーフトーン]]</p>`,75)])])}const b=n(m,[["render",u]]),h=JSON.parse('{"path":"/Stippling.html","title":"","lang":"en-US","frontmatter":{},"git":{"updatedTime":1755752775000,"contributors":[{"name":"Kazuma Arino","username":"","email":"hogeika2@gmail.com","commits":10}],"changelog":[{"hash":"69fc2156574b06c4329aeca071863afb8f95e682","time":1755752775000,"email":"hogeika2@gmail.com","author":"Kazuma Arino","message":"update"},{"hash":"06d4e0f613b85363c4b60aba6db89b8af5a99d3f","time":1755749149000,"email":"hogeika2@gmail.com","author":"Kazuma Arino","message":"update"},{"hash":"3d68dc965481be16059ee253cdd2a16dd45ccabe","time":1755745540000,"email":"hogeika2@gmail.com","author":"Kazuma Arino","message":"update"},{"hash":"41b6bcb101c2aa24b6d8684734c38356825202cd","time":1755695142000,"email":"hogeika2@gmail.com","author":"Kazuma Arino","message":"update"},{"hash":"0645a56b7443f5198f1b9e1d469dfdb825c102c8","time":1755691536000,"email":"hogeika2@gmail.com","author":"Kazuma Arino","message":"update"},{"hash":"8188e688e7740cbe29e560575e322156271f7ae2","time":1755687954000,"email":"hogeika2@gmail.com","author":"Kazuma Arino","message":"update"},{"hash":"76f83cc0570510cdde4bc4dfdc047afc0a129b88","time":1755674585000,"email":"hogeika2@gmail.com","author":"Kazuma Arino","message":"update"},{"hash":"1d609d0cb38053dc0b2b0adfd6348c1123289a29","time":1755671014000,"email":"hogeika2@gmail.com","author":"Kazuma Arino","message":"update"},{"hash":"59fefc987316ed62592a17c40c7e190038c8d510","time":1755666347000,"email":"hogeika2@gmail.com","author":"Kazuma Arino","message":"update"},{"hash":"c5cc6f1f9a97297b1a1f4b5036043c35b33d6b92","time":1755403564000,"email":"hogeika2@gmail.com","author":"Kazuma Arino","message":"update"}]},"filePathRelative":"Stippling.md"}');export{b as comp,h as data};
