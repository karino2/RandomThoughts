<template><div><ul>
<li><a href="./CG.html">CG</a></li>
<li><a href="./【書籍】PrinciplesOfDigitalImageProcessing.html">【書籍】PrinciplesOfDigitalImageProcessing</a> 1巻、Fundamental Techniquesの4.7（p77）にガンマ補正の話</li>
<li><a href="https://www.youtube.com/watch?v=LKnqECcg6Gw" target="_blank" rel="noopener noreferrer">Computer Color is Broken - YouTube</a> ガンマ補正について分かりやすいyoutube動画</li>
<li><a href="https://www.jstage.jst.go.jp/article/iieej/35/6/35_6_935/_pdf" target="_blank" rel="noopener noreferrer">sRGB色空間と国際標準化.pdf</a> jstageのpdf。キャノンと三菱電機の人が書いてて良く書けている。</li>
</ul>
<p><a href="./【書籍】PrinciplesOfDigitalImageProcessing.html">【書籍】PrinciplesOfDigitalImageProcessing</a>の話をベースにいろいろ書き足していく。（以下では「教科書」といったらこの本）</p>
<p>ガンマ補正はどちらが補正されていてどれが元の値かよくわからなくなるので以下にメモを書いておく。</p>
<p>カメラなどのセンサーの受け取る強度と人の目の知覚は異なる。
そこで画像データなどはセンサーの強度ではなく、それをガンマ補正した値を保存している。
つまり画像ファイルなどのRGB値 = ガンマ補正されたsRGB値 = non linearなsRGB値。</p>
<p>これは教科書p85のTable 4.1のsRGBのパラメータでガンマ補正されている。</p>
<p>画像処理をする場合はこれをlinearな強度に戻して（=逆ガンマ補正）、処理をして、結果をガンマ補正する必要がある。</p>
<h2 id="a0とa0-sの値の違い" tabindex="-1"><a class="header-anchor" href="#a0とa0-sの値の違い"><span>a0とa0*sの値の違い</span></a></h2>
<p>a0の値として教科書では0.00304が使われているが、<a href="https://en.wikipedia.org/wiki/SRGB" target="_blank" rel="noopener noreferrer">sRGB - Wikipedia</a>などでは場合分けを 0.0031308で行っている。
どういう事だろう？</p>
<p><a href="https://www.jstage.jst.go.jp/article/iieej/35/6/35_6_935/_pdf" target="_blank" rel="noopener noreferrer">sRGB色空間と国際標準化.pdf</a>の付録にこの違いについて書かれている。計算の丸め誤差らしい。</p>
<p><code v-pre>a0</code>, <code v-pre>a0*s</code>は、以下の２つの流儀があり、どちらも使われているらしい。</p>
<ul>
<li>教科書: (0.00304, 0.03929)</li>
<li>別計算: (0.0031308, 0.04045)</li>
</ul>
<p>別計算の方がIEC 61966-2-1には書かれているらしく、web上では別計算の方が多い気がする。</p>
<p>以下、これらのパラメータを元にガンマ補正と逆ガンマ補正の式を以下に書いておく。
これは教科書の式4.33、4.35にテーブル4.1の値や上記のパラメータを入れたもの。</p>
<p>疑似コードは適当にベクトル演算されるとする（シェーダーみたいな感じに）。</p>
<h3 id="教科書でのガンマ、逆ガンマ補正" tabindex="-1"><a class="header-anchor" href="#教科書でのガンマ、逆ガンマ補正"><span>教科書でのガンマ、逆ガンマ補正</span></a></h3>
<p>逆ガンマ補正（画像ファイルから線形に戻す）</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">if(rgb &lt;= 0.03929) { rgb/12.9231  } else {  ((rgb+0.055)/1.055)^2.4 }</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>ガンマ補正（最後に画像ファイルに戻す時）</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">if(rgb &lt;= 0.00304) {  rgb*12.9231 } else { 1.055*rgb^(1/2.4) - 0.055 }</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>1/2.4は0.417の近似値も使われる。</p>
<h3 id="別計算-webでよくある-パラメータでのガンマ補正" tabindex="-1"><a class="header-anchor" href="#別計算-webでよくある-パラメータでのガンマ補正"><span>別計算（webでよくある）パラメータでのガンマ補正</span></a></h3>
<p>逆ガンマ補正（画像ファイルから線形に戻す）</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">if(rgb &lt;= 0.04045) { rgb/12.9231  } else {  ((rgb+0.055)/1.055)^2.4 }</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>ガンマ補正（最後に画像ファイルに戻す時）</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">if(rgb &lt;= 0.0031308) {  rgb*12.9231 } else { 1.055*rgb^(1.0/2.4) - 0.055 }</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="srgbのlinearとnon-linearの具体的な値のテーブル" tabindex="-1"><a class="header-anchor" href="#srgbのlinearとnon-linearの具体的な値のテーブル"><span>sRGBのlinearとnon linearの具体的な値のテーブル</span></a></h2>
<p><a href="./【書籍】PrinciplesOfDigitalImageProcessing.html">【書籍】PrinciplesOfDigitalImageProcessing</a>の2冊目、Core Algorithmの6.3.4 p 110のTable 6.5に、linearとnon linearの50%グレーなどの時の値がある。検算に良さそうなのでメモしておく。</p>
</div></template>


