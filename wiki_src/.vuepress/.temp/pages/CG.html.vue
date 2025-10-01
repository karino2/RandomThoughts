<template><div><ul>
<li>[[技術的なメモ]]</li>
<li>[[MFG]]</li>
<li>[[Metal]]</li>
<li>[[ガンマ補正]]</li>
<li><a href="https://www.reddit.com/r/GraphicsProgramming/comments/olbkpi/are_there_any_books_on_shaders/" target="_blank" rel="noopener noreferrer">Are there any books on shaders? : r/GraphicsProgramming</a></li>
<li><a href="https://www.youtube.com/playlist?list=PLGmrMu-IwbguU_nY2egTFmlg691DN7uE5" target="_blank" rel="noopener noreferrer">ShaderToy Tutorials - YouTube</a></li>
<li><a href="https://www.shadertoy.com/" target="_blank" rel="noopener noreferrer">Shadertoy BETA</a></li>
<li><a href="https://www.youtube.com/watch?v=DREz3n7gZPw" target="_blank" rel="noopener noreferrer">XDC 2022 - Implementing the graphics pipeline on compute - Erik Faye-Lund - YouTube</a></li>
<li>[[【書籍】PrinciplesOfDigitalImageProcessing]]</li>
<li>[[【書籍】OpenGL4ShadingLanguageCook]]</li>
<li>[[【書籍】HLSLシェーダーの魔導書]]</li>
<li><a href="https://stackoverflow.com/questions/23319289/is-there-a-good-glsl-hash-function" target="_blank" rel="noopener noreferrer">math - Is there a good GLSL hash function? - Stack Overflow</a> シェーダーでのハッシュ関数。randでは無くハッシュが欲しい事もあるんだよな。
<ul>
<li><a href="https://jcgt.org/published/0009/03/02/" target="_blank" rel="noopener noreferrer">Hash Functions for GPU Rendering (JCGT)</a> リンクされてたこの論文は決定版ではないか。</li>
</ul>
</li>
<li>[[Stippling]]</li>
<li>[[ハーフトーン]]</li>
</ul>
<h2 id="gpuでのpath描画" tabindex="-1"><a class="header-anchor" href="#gpuでのpath描画"><span>GPUでのPath描画</span></a></h2>
<p>misreading chatで紹介していたエピソードが興味深かったので、関連論文を読みたい。</p>
<p><a href="https://misreading.chat/2022/11/01/103-gpu-accelerated-path-rendering/" target="_blank" rel="noopener noreferrer">103: GPU-Accelerated Path Rendering – Misreading Chat</a></p>
<h3 id="gpuを使って曲線を描く-2005-msr" tabindex="-1"><a class="header-anchor" href="#gpuを使って曲線を描く-2005-msr"><span>GPUを使って曲線を描く (2005 MSR)</span></a></h3>
<p><a href="https://www.microsoft.com/en-us/research/publication/resolution-independent-curve-rendering-using-programmable-graphics-hardware/" target="_blank" rel="noopener noreferrer">Resolution Independent Curve Rendering using Programmable Graphics Hardware - Microsoft Research</a>を読んでみる。</p>
<p>パラメトリックに記述された曲線をx, yの表現に直す事でGPUで描くというもの。ある種の曲線は放物線を変換したものとして表現出来る事を使う事で、GPUで高速に描けるとか。</p>
<ul>
<li>conic section 円錐曲線（円錐の断面）</li>
</ul>
<p>3章でquadraticなケースを、4章でqubicなケースをやっていて、3の冒頭がquadraticの場合の本体に思う。基本的なアイデアとしては任意のx, yをu, vスペースに射影して式1の正負で塗り分ける、という事だと思う。</p>
<p>shader toyの以下 <a href="https://www.shadertoy.com/view/flG3Rt" target="_blank" rel="noopener noreferrer">Bezier quadratic (Loop/Blinn)</a> を見ると、barycentricというの以外はだいたいここに書いてあるのと同じ事をしているように見える。
三角形の重心座標、というのがあるのかな。
ググってみて以下に当たる。</p>
<p><a href="https://manabitimes.jp/math/805" target="_blank" rel="noopener noreferrer">三角形の重心座標とその応用 - 高校数学の美しい物語</a></p>
<p>ふむふむ。
重心座標を求めて、それをd, e, fの係数に使っている。
ちょっと良く分からないな。</p>
<p>もうちょっと論文に沿って考えてみよう。
まずuvスペースで曲線の中を塗る事は、式1が負の所に点を打てば良いだろう。</p>
<p>元のスペースはb0, b1, b2の三点から、このuvスペースへの変換を考えれば良い。
b0を0, 0に変換して、b0b1を(1/2, 0)に、b0b2を(1, 1)に変換すればいいのか？</p>
<p>お、分かってきたぞ。b0, b1, b2の三角形の中のある点Pを、対応するuvの三角形の中のどの辺になるか、というのを考えるのに重心座標を使うのか。
そしてbの方の三角形の比をuvの方の三角形の方でも使うと対応する三角形の位置が分かるんだな。
これは自明では無いが、まぁ感覚的にはなるんだろう。
厳密にはb0b1とb0b2の線形和で点Pを表して、この係数をスケールしてやれば同じ話にできそうだが、
それと重心座標系は同じような事をやってそうに思う。</p>
<p>まぁ向きとか全部場合分けしないとちゃんとは分からないが、たぶん依存しないんだろう。</p>
<p>よし、shader toyのコードはだいぶ理解出来た。</p>
<p>さらに <a href="https://developer.nvidia.com/gpugems/gpugems3/part-iv-image-effects/chapter-25-rendering-vector-art-gpu" target="_blank" rel="noopener noreferrer">Chapter 25. Rendering Vector Art on the GPU - NVIDIA Developer</a> を読んでいた所、もっと理解が深まった。</p>
<p>ようするに単純に３つのコントロールポイントのvertexにu, vのそれぞれ(0, 0), (1/2, 0), (1, 1)を入れてやると、フラグメントシェーダーの方ではその対応する値が降ってくるので、単にuとvの計算をするだけで勝手に色が濡れる、という事の模様。</p>
<p>なるほど、これは賢い！uvとの変換を自分でするんじゃなくて、補間結果が勝手に変換された事になるんだな。</p>
<h2 id="gpuを使って三角形を描く" tabindex="-1"><a class="header-anchor" href="#gpuを使って三角形を描く"><span>GPUを使って三角形を描く</span></a></h2>
<p><a href="https://www.shadertoy.com/view/lsBfRc" target="_blank" rel="noopener noreferrer">Buffer pass bloom</a>　を見ていたら、三角形を以下で描いていた。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">float getTriangle(vec2 p, vec2 rp){</span>
<span class="line">    p *= vec2(iResolution.x, iResolution.y);</span>
<span class="line">    p /= max(iResolution.x, iResolution.y);</span>
<span class="line">    </span>
<span class="line">    p -= rp;</span>
<span class="line"></span>
<span class="line">    vec3 color = vec3(0.0);</span>
<span class="line">    float d = 0.0;</span>
<span class="line"></span>
<span class="line">    // Remap the space to -1. to 1.</span>
<span class="line">    p = p *2.-1.;</span>
<span class="line"></span>
<span class="line">    // Number of sides of your shape</span>
<span class="line">    int N = 3;</span>
<span class="line"></span>
<span class="line">    // Angle and radius from the current pixel</span>
<span class="line">    float a = atan(p.x,p.y)+PI;</span>
<span class="line">    float r = TWO_PI/float(N);</span>
<span class="line"></span>
<span class="line">    // Shaping function that modulate the distance</span>
<span class="line">    d = cos(floor(.5+a/r)*r-a)*length(p);</span>
<span class="line"></span>
<span class="line">    return 1.0-step(.12,d);</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最後のcosの中が良く分からない。イメージとしては三角形の各辺に垂線をおろして、それが一定の距離以下、という事で描いているんじゃなかろうか、と思うのだが。
軽く封筒の裏計算をしてみた所、シータの3つの範囲で場合分けが必要に思えるが、そうした事をしていない。floorでそういう小細工をしているんじゃないか。</p>
<p>場合分けは、0から2piで見ると、以下の３つで必要になる。</p>
<ul>
<li>0〜pi/2と11pi/6〜2pi ...  - pi/6</li>
<li>pi/2〜7pi/6 ... -5pi/6</li>
<li>7pi/6〜11pi/6 ... -3pi/2</li>
</ul>
<p>右側は引く数字。2pi/3ずつ増えていく。なるほど。シータに2piを掛けたものを3で割って、一周を３つの区画に分けているのか。
ちゃんと計算はしてないがなりそうだな。</p>
<h3 id="gpuで正方形" tabindex="-1"><a class="header-anchor" href="#gpuで正方形"><span>GPUで正方形</span></a></h3>
<p>上記三角形と同じ所に以下があった。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">float getSquare(vec2 p, vec2 rp){</span>
<span class="line">    p *= vec2(iResolution.x, iResolution.y);</span>
<span class="line">    p /= max(iResolution.x, iResolution.y);</span>
<span class="line">        </span>
<span class="line">    p += rp;</span>
<span class="line">    vec2 bl = step(abs(p * 2.0 - 1.0),vec2(0.2));</span>
<span class="line">    float rt = bl.x * bl.y;</span>
<span class="line">    </span>
<span class="line">	return rt;</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>こちらは難しくは無いが、へーって感じするよね。xとyの中心からの距離を出して、step関数を使って掛け算する。</p>
<h2 id="oklabカラースペース" tabindex="-1"><a class="header-anchor" href="#oklabカラースペース"><span>OKlabカラースペース</span></a></h2>
<p>[[【書籍】PrinciplesOfDigitalImageProcessing]]にはCIELabやCIELuvが解説されていたが、それの改善版としてOKlabというのがあるらしい。lは小文字か。</p>
<p><a href="https://bottosson.github.io/posts/oklab/" target="_blank" rel="noopener noreferrer">A perceptual color space for image processing</a></p>
<p>計算は割と簡単だな。xyzへの変換も3x3の行列になっているので、掛けた結果の行列をあらかじめ求めておけば単なる行列適用と簡単な指数乗の組み合わせで求められる。いいね。</p>
<h2 id="xyzとsrgbの変換" tabindex="-1"><a class="header-anchor" href="#xyzとsrgbの変換"><span>xyzとsRGBの変換</span></a></h2>
<p>まず[[ガンマ補正]]してから計算する。</p>
<ul>
<li>[[【書籍】PrinciplesOfDigitalImageProcessing]] の2冊目（Core Algorithm）の6.3.1 (p107)から詳しい解説がある。</li>
<li><a href="https://fujiwaratko.sakura.ne.jp/infosci/colorspace/colorspace2_e.html" target="_blank" rel="noopener noreferrer">Color space conversion (2)</a></li>
<li><a href="https://en.wikipedia.org/wiki/SRGB" target="_blank" rel="noopener noreferrer">sRGB - Wikipedia</a></li>
<li><a href="http://www.brucelindbloom.com/index.html?Eqn_RGB_to_XYZ.html" target="_blank" rel="noopener noreferrer">Bruce Lindbloom: RGB to XYZ</a></li>
</ul>
</div></template>


