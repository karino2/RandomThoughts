<template><div><h1 id="ハーフトーン" tabindex="-1"><a class="header-anchor" href="#ハーフトーン"><span>ハーフトーン</span></a></h1>
<p><a href="./CG.html">CG</a></p>
<p><a href="./Stippling.html">Stippling</a>を調べていて、ハーフトーンの方が<a href="./MFG.html">MFG</a>で作れそうだな、と思い、関連ページを作る。</p>
<p><a href="./MdImgr.html">MdImgr</a>のテンプレート<code v-pre>![imgs/Halftone/$1](imgs/Halftone/$1)</code></p>
<h2 id="リンク集" tabindex="-1"><a class="header-anchor" href="#リンク集"><span>リンク集</span></a></h2>
<ul>
<li><a href="https://www.shadertoy.com/view/XslGRM" target="_blank" rel="noopener noreferrer">Halftone</a> shadertoyにあった実装</li>
<li><a href="https://spencerszabados.github.io/blog/2022/bayer-dithering/" target="_blank" rel="noopener noreferrer">Bayer Dithering - Spencer Szabados</a> Bayer Dither</li>
<li><a href="https://bartwronski.com/2016/10/30/dithering-part-three-real-world-2d-quantization-dithering/" target="_blank" rel="noopener noreferrer">Dithering part three – real world 2D quantization dithering - Bart Wronski</a> bluenoiseとかinterleaved gradient noiseとか</li>
</ul>
<h2 id="mfgでの実装" tabindex="-1"><a class="header-anchor" href="#mfgでの実装"><span>MFGでの実装</span></a></h2>
<p>MFGで実装してみる。</p>
<h3 id="単にグレーの濃度を白黒の頻度で表すフィルタを作ってみる" tabindex="-1"><a class="header-anchor" href="#単にグレーの濃度を白黒の頻度で表すフィルタを作ってみる"><span>単にグレーの濃度を白黒の頻度で表すフィルタを作ってみる</span></a></h3>
<p>Stipplingとは違うが、単に2値トーン化として雑にランダムにサンプルするコードを作ってみるとどうだろう？
ようするに単なるハーフトーンの雑な実装だが。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">def result_u8 |x, y| {</span>
<span class="line">   let gray = grayT(x, y)</span>
<span class="line">   ifel(rand() &lt; gray, u8[0xff, 0xff, 0xff, 0xff], u8[0, 0, 0, 0xff])</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/imgs/Halftone/2025_0821_122411.png" alt="imgs/Halftone/2025_0821_122411.png"></p>
<p>けっこういいけど、これ、なんかガンマ補正してない時の暗くなるのと同じ結果に見えるな。
アルファをガンマ補正するのはどうなんだ問題と同じでしないのが正しい気もするけれど、
あえてやってみるとどうなるだろう？</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">def result_u8 |x, y| {</span>
<span class="line">   let lgray = grayT(x, y)</span>
<span class="line">   let gray = linear2gamma(lgray)</span>
<span class="line">   ifel(rand() &lt; gray, u8[0xff, 0xff, 0xff, 0xff], u8[0, 0, 0, 0xff])</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/imgs/Halftone/2025_0821_122722.png" alt="imgs/Halftone/2025_0821_122722.png"></p>
<p>やはりこっちの方が正しい気はするな。</p>
<p>拡大するとランダムさがトーンとして汚いので、やはりbluenoiseの方が良さそうではある。</p>
<p><img src="@source/imgs/Halftone/2025_0821_122841.png" alt="imgs/Halftone/2025_0821_122841.png"></p>
<p>ちょっとハーフトーンは面白そうだな。論文を調べてみてあとでページを分けよう。</p>
<h3 id="shadertoyの実装を移植してみる" tabindex="-1"><a class="header-anchor" href="#shadertoyの実装を移植してみる"><span>shadertoyの実装を移植してみる</span></a></h3>
<p>shadertoyでハーフトーンで眺めていて見つけた以下を移植してみる。</p>
<p><a href="https://www.shadertoy.com/view/XslGRM" target="_blank" rel="noopener noreferrer">Halftone</a></p>
<p>最初は理解せずに書いたが、理解してみるとcosの周期パターンにすぎない事に気づく。sindとかcosdはいらなかったな。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">@param_f32 threshold(SLIDER, label="閾値", init=0.6, min=0.0, max=1.0)</span>
<span class="line"></span>
<span class="line">let PI = 3.1415926</span>
<span class="line">let PI180 = PI / 180.0</span>
<span class="line"></span>
<span class="line">fn sind |a:f32| { sin(a*PI180) }</span>
<span class="line"></span>
<span class="line">fn cosd |a: f32| { cos(a*PI180) }</span>
<span class="line"></span>
<span class="line">fn added |sh: f32v2, sa:f32, ca:f32, c:f32v2, d:f32 | {</span>
<span class="line">  0.5 + 0.25 * cos((sh.x * sa + sh.y * ca + c.x) * d) + 0.25 * cos((sh.x * ca - sh.y * sa + c.y) * d)</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">def result_u8 |x, y| {</span>
<span class="line">   let dstCoord = f32([x, y])/input_u8.extent(0)</span>
<span class="line">   let rotationCenter = [0.5, 0.5]</span>
<span class="line">   let shift = dstCoord - rotationCenter</span>
<span class="line">   let dotSize = 3.0</span>
<span class="line">   let angle = 45.0</span>
<span class="line">   let rasterPattern = added(shift, sind(angle), cosd(angle), rotationCenter, PI / dotSize * 680.0)</span>
<span class="line">   let srcPixel = input_u8(x, y)</span>
<span class="line">        </span>
<span class="line">   let avg = to_xyza(srcPixel).y</span>
<span class="line">   let gray = (rasterPattern * threshold + avg - threshold) / (1.0 - threshold)</span>
<span class="line"></span>
<span class="line">    # check raster pattern</span>
<span class="line">    # let gray = rasterPattern</span>
<span class="line">    [*vec3(gray), 1.0] |> lbgra_to_u8color(...)</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>結果は以下。</p>
<p><img src="@source/imgs/Halftone/2025_0821_125719.png" alt="imgs/Halftone/2025_0821_125719.png"></p>
<p>おお、結構いい感じだな。</p>
<h3 id="bayerディザー" tabindex="-1"><a class="header-anchor" href="#bayerディザー"><span>Bayerディザー</span></a></h3>
<p>shadertoyのブレンディング式はどこから来ているのかなぁ、と調べていて、以下のブログに行き当たる。</p>
<p><a href="https://spencerszabados.github.io/blog/2022/bayer-dithering/" target="_blank" rel="noopener noreferrer">Bayer Dithering - Spencer Szabados</a></p>
<p>ここからどうやって探したのか思い出せないが、以下と同じtxtファイルのinternet archiveを参照しているページがあって、そこからDHALF.txtを読んだ。</p>
<p><a href="https://gist.github.com/robertlugg/f0b618587c2981b744716999573c5b65" target="_blank" rel="noopener noreferrer">DHALF.TXT</a></p>
<p>という事でこれを単純に実装してみる。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line"># bayer pattern</span>
<span class="line">def pattern by </span>
<span class="line">[</span>
<span class="line">    [ 0.0, 32.0,  8.0, 40.0,  2.0, 34.0, 10.0, 42.0], </span>
<span class="line">    [48.0, 16.0, 56.0, 24.0, 50.0, 18.0, 58.0, 26.0],  </span>
<span class="line">    [12.0, 44.0,  4.0, 36.0, 14.0, 46.0,  6.0, 38.0],  </span>
<span class="line">    [60.0, 28.0, 52.0, 20.0, 62.0, 30.0, 54.0, 22.0],</span>
<span class="line">    [ 3.0, 35.0, 11.0, 43.0,  1.0, 33.0,  9.0, 41.0],</span>
<span class="line">    [51.0, 19.0, 59.0, 27.0, 49.0, 17.0, 57.0, 25.0],</span>
<span class="line">    [15.0, 47.0,  7.0, 39.0, 13.0, 45.0,  5.0, 37.0],</span>
<span class="line">    [63.0, 31.0, 55.0, 23.0, 61.0, 29.0, 53.0, 21.0]  </span>
<span class="line">]</span>
<span class="line"></span>
<span class="line">let PATTERN_WIDTH = pattern.extent(0)</span>
<span class="line">let PAT_MAX = f32(PATTERN_WIDTH^2-1)</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">def result_u8 |x, y| {</span>
<span class="line">   let pxy = [x, y]%PATTERN_WIDTH</span>
<span class="line">   let pval = pattern(*pxy)/PAT_MAX</span>
<span class="line"></span>
<span class="line">   let level = input_u8(x, y) |> to_xyza(...).y</span>
<span class="line">   let gray = ifel(level > pval, 1.0, 0.0)   </span>
<span class="line"></span>
<span class="line">    [*vec3(gray), 1.0] |> lbgra_to_u8color(...)</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>超簡単。</p>
<p>適用した結果が以下。単なるグレースケールに見える。</p>
<p><img src="@source/imgs/Halftone/2025_0823_104152.png" alt="imgs/Halftone/2025_0823_104152.png"></p>
<p>でもアップにすると白黒2値だという事がわかる。</p>
<p><img src="@source/imgs/Halftone/2025_0823_104220.png" alt="imgs/Halftone/2025_0823_104220.png"></p>
<p>あまりにもグレースケールっぽくて面白さはなくなってしまうな。</p>
<p>カラー版もやってみよう。グローバル変数やパターンは白黒と一緒。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">def result_u8 |x, y| {</span>
<span class="line">   let pxy = [x, y]%PATTERN_WIDTH</span>
<span class="line">   let pval = pattern(*pxy)/PAT_MAX</span>
<span class="line"></span>
<span class="line">   let lbgra = input_u8(x, y) |> to_lbgra(...)</span>
<span class="line">   let lbgr_q = ifel(lbgra.xyz > pval , vec3(1.0), vec3(0.0))</span>
<span class="line"></span>
<span class="line">    [*lbgr_q, lbgra.w] |> lbgra_to_u8color(...)</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>これも簡単。
結果は以下。</p>
<p><img src="@source/imgs/Halftone/2025_0823_104949.png" alt="imgs/Halftone/2025_0823_104949.png"></p>
<p>なんか暗くなっちゃうな。このBayerパターンはガンマ補正の具合がいまいちなのではないか？</p>
<p>拡大すると以下。</p>
<p><img src="@source/imgs/Halftone/2025_0823_105025.png" alt="imgs/Halftone/2025_0823_105025.png"></p>
<p>昔のパソコンみたい。</p>
<h3 id="ブルーノイズでサンプリング" tabindex="-1"><a class="header-anchor" href="#ブルーノイズでサンプリング"><span>ブルーノイズでサンプリング</span></a></h3>
<p>ブルーノイズのテクスチャで単純にサンプリングする、というのも試してみよう。
と軽くPythonのvoid and clusterのコードで作ってみたが、512x512で２時間も掛かった…ちょっと1024x1024は作れないな。</p>
<p>とりあえず512x512でいいでしょう。
256x256をBGRAに4面パックする感じにしておく。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">def bluenoise by load("bluenoise512_packed.png")</span>
<span class="line"></span>
<span class="line">let T_SIZE=bluenoise.extent(0)</span>
<span class="line">let B_SIZE=T_SIZE*2</span>
<span class="line"></span>
<span class="line">def result_u8 |x, y| {</span>
<span class="line">   let txy = [x, y]%B_SIZE</span>
<span class="line">   let pxy = txy%T_SIZE</span>
<span class="line">   </span>
<span class="line">   let packed = bluenoise(*pxy)</span>
<span class="line"></span>
<span class="line">   let chxy = txy/T_SIZE # 0または1</span>
<span class="line">   let ch = chxy.y*2+chxy.x #0〜3 </span>
<span class="line">   </span>
<span class="line">   let gray = ifel(ch == 0, packed.x, ...)</span>
<span class="line">                     elif(ch == 1, packed.y, ...)</span>
<span class="line">                     elif(ch == 2, packed.z, packed.w)</span>
<span class="line"></span>
<span class="line">    # u8[*vec3(gray), 255]</span>
<span class="line"></span>
<span class="line">    let level = input_u8(x, y) |> to_xyza(...).y</span>
<span class="line">    ifel (f32(gray)/255.0 &lt; level,</span>
<span class="line">       u8(vec4(255)), u8[*vec3(0), 255]</span>
<span class="line">       )</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>まぁこんな感じで。</p>
<p><img src="@source/imgs/Halftone/2025_0823_230333.png" alt="imgs/Halftone/2025_0823_230333.png"></p>
<p>割と綺麗ではある。アップにすると512x512の境界が意外と目立ってしまうが。</p>
<p>写真に使うと良く論文とかにある感じになって良いね。</p>
<p><img src="@source/imgs/Halftone/2025_0823_230411.png" alt="imgs/Halftone/2025_0823_230411.png"></p>
<p>なかなか勉強にはなる。</p>
<h3 id="interleaved-gradient-noiseでサンプリング" tabindex="-1"><a class="header-anchor" href="#interleaved-gradient-noiseでサンプリング"><span>Interleaved gradient noiseでサンプリング</span></a></h3>
<p>bluenoiseはちょっと手間なので代わりは無いかな、と探していたら、Interleaved gradient noiseというのが勧められていた。</p>
<p><a href="https://bartwronski.com/2016/10/30/dithering-part-three-real-world-2d-quantization-dithering/" target="_blank" rel="noopener noreferrer">Dithering part three – real world 2D quantization dithering - Bart Wronski</a></p>
<p>試してみよう。</p>
<p>上記ブログの式は良く意味が分からないのでオリジナルのスライドを見ると、以下の式が書いてある。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">float3 magic = float3( 0.06711056, 0.00583715, 52.9829189 );</span>
<span class="line">return -scale + 2.0 * scale * frac( magic.z * frac( dot( sv_position, magic.xy ) ) );</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>ふむふむ。scaleは良くわからんがこんな感じか？</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">def result_u8 |x, y| {</span>
<span class="line">   let scale = 1.0</span>
<span class="line">   let magic = [0.06711056, 0.00583715, 52.9829189]</span>
<span class="line">   let fxy = f32([x, y])</span>
<span class="line">   let gray = -scale + 2.0*scale*fract(magic.z*fract(dot(fxy, magic.xy)))</span>
<span class="line">  </span>
<span class="line">   [*vec3(gray), 1.0] |> lbgra_to_u8color(...)</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>結果は以下。</p>
<p><img src="@source/imgs/Halftone/2025_0828_114840.png" alt="imgs/Halftone/2025_0828_114840.png"></p>
<p>それっぽいノイズになったな。
サンプルしてみよう。</p>
<p><img src="@source/imgs/Halftone/2025_0828_115040.png" alt="imgs/Halftone/2025_0828_115040.png"></p>
<p>悪くないな。写真でも試してみよう。</p>
<p><img src="@source/imgs/Halftone/2025_0828_115350.png" alt="imgs/Halftone/2025_0828_115350.png"></p>
<p>なんか写真は白いな。いまいち。</p>
<h2 id="循環パターンいろいろ" tabindex="-1"><a class="header-anchor" href="#循環パターンいろいろ"><span>循環パターンいろいろ</span></a></h2>
<p>ordered ditherは循環パターンと適当に補完すると面白い効果が出る、という事の一種に思う。
そこで循環パターンをいろいろ考える。</p>
<h3 id="sincosパターン" tabindex="-1"><a class="header-anchor" href="#sincosパターン"><span>sincosパターン</span></a></h3>
<p>shadertoyにあったコードはいろいろ複雑だが、結局整理すると単なるsinとcosの循環パターンと同じになる（オフセットが違うが）</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">let PI = 3.1415926</span>
<span class="line"></span>
<span class="line">fn sincos_pat |sh: f32v2, pscale:f32 | {</span>
<span class="line">  let dir = [cos(PI/4.0), sin(PI/4.0)]</span>
<span class="line">  let ortho = [dir.y, -dir.x]</span>
<span class="line">  0.5 + 0.25 * cos(dot(sh, dir) * pscale) + 0.25 * cos(dot(sh, ortho) * pscale)</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">def result_u8 |x, y| {</span>
<span class="line">   let dstCoord = f32([x, y])/input_u8.extent(0)</span>
<span class="line">   let dotSize = 6.0</span>
<span class="line">   let pscale =  2.0*PI / dotSize * 680.0</span>
<span class="line"></span>
<span class="line">   let gray = sincos_pat(dstCoord, pscale)</span>
<span class="line">   [*vec3(gray), 1.0] |> lbgra_to_u8color(...)</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>パターンとしては0.0から1.0で、sinとcosを斜めに進めるのを足し合わせる感じになっている。</p>
<p><img src="@source/imgs/Halftone/2025_0826_115232.png" alt="imgs/Halftone/2025_0826_115232.png"></p>
<p>このパターンは、循環しているいい感じのパターンなら他でも良さそう。
という事で他のパターンも考えてみよう。</p>
<h3 id="円のパターン" tabindex="-1"><a class="header-anchor" href="#円のパターン"><span>円のパターン</span></a></h3>
<p>こういう感じの円はどうだろう？</p>
<p><img src="@source/imgs/Halftone/2025_0826_115410.png" alt="imgs/Halftone/2025_0826_115410.png"></p>
<p>中心のあたりが黒くて円周のあたりで白になるようなもの。円周のサイズは格子サイズの半分か1/4がいいかな。
適当に試して見てみよう。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">fn circle_pat |sh: f32v2, pscale: f32| {</span>
<span class="line">   let gsize = 6.0</span>
<span class="line">   let sxy = sh*pscale</span>
<span class="line">   let cxy = round(sxy/gsize)*gsize</span>
<span class="line">   let rxy = sxy - cxy</span>
<span class="line">   smoothstep(gsize/6.0, gsize/2.0, length(rxy))</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/imgs/Halftone/2025_0826_123315.png" alt="imgs/Halftone/2025_0826_123315.png"></p>
<p>まぁ書いた通りではある。smothstepは適当にそれっぽい放射状になるようにしている。</p>
<h3 id="円の外周パターン" tabindex="-1"><a class="header-anchor" href="#円の外周パターン"><span>円の外周パターン</span></a></h3>
<p>円の外周を4つ張り合わせたような、ひし形みたいなパターンも良くあるよな。
円の白と黒を逆にしてsmoothstepを逆にすればいいと思うんだが。</p>
<p>えーと、以下の式だよな。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">   smoothstep(gsize/6.0, gsize/2.0, length(rxy))</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>lengthをgsize/2.0-lengthにして、smoothstepを適当に調整すればいいか。</p>
<p>いろいろ出力を見つつ調整して以下になる。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">   smoothstep(0.0, gsize/8.0, gsize/2.0-0.8*length(rxy))</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>関数全体ではこんな感じ。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">fn inv_circle_pat |sh: f32v2, pscale: f32| {</span>
<span class="line">   let gsize = 6.0</span>
<span class="line">   let sxy = sh*pscale</span>
<span class="line">   let cxy = round(sxy/gsize)*gsize</span>
<span class="line">   let rxy = sxy - cxy</span>
<span class="line">   smoothstep(0.0, gsize/8.0, gsize/2.0-0.8*length(rxy))</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/imgs/Halftone/2025_0826_132629.png" alt="imgs/Halftone/2025_0826_132629.png"></p>
<p>イメージしていたものにはなった。</p>
</div></template>


