<template><div><p>[[Electron]]</p>
<ul>
<li><a href="https://webui.me/" target="_blank" rel="noopener noreferrer">公式</a></li>
<li>[[MDDeck]]はWebUIで作ってみた。</li>
</ul>
<h2 id="始め方" tabindex="-1"><a class="header-anchor" href="#始め方"><span>始め方</span></a></h2>
<p>新規にプロジェクトを作るときに微妙にやることが多いのでメモしておく。</p>
<h3 id="ディレクトリ構成" tabindex="-1"><a class="header-anchor" href="#ディレクトリ構成"><span>ディレクトリ構成</span></a></h3>
<p>以下のようなディレクトリ構成にする</p>
<ul>
<li>main.ts</li>
<li>client/
<ul>
<li>main.html</li>
<li>client.js</li>
</ul>
</li>
<li>.vscode/</li>
</ul>
<p>これはVSCodeでmain.ts側ではDenoのモードにしたいが、client.js側ではVSCodeのJavaScriptのモードにしたいため。</p>
<h3 id="denoのワークスペースとして初期化" tabindex="-1"><a class="header-anchor" href="#denoのワークスペースとして初期化"><span>Denoのワークスペースとして初期化</span></a></h3>
<p>VSCodeでディレクトリを開く。
コマンドパレットから Deno: Initialize Workspace Configuration を選ぶ。</p>
<h3 id="settings-jsonでclient以下をdenoモードから除外する" tabindex="-1"><a class="header-anchor" href="#settings-jsonでclient以下をdenoモードから除外する"><span>settings.jsonでclient以下をDenoモードから除外する</span></a></h3>
<p>settings.jsonに以下を追加</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">    "deno.disablePaths": ["./client"],</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="launch-jsonを作る" tabindex="-1"><a class="header-anchor" href="#launch-jsonを作る"><span>launch.jsonを作る</span></a></h3>
<p>Run and Debugパネルのcreate a launch.json fileをクリックして Denoを選ぶ。なんか出てこないときはmain.tsを開いてやるといいかも。</p>
<h3 id="初期のコンテンツ" tabindex="-1"><a class="header-anchor" href="#初期のコンテンツ"><span>初期のコンテンツ</span></a></h3>
<p>main.ts</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code class="language-javascript"><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> WebUI <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"https://deno.land/x/webui/mod.ts"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> myHtml <span class="token operator">=</span> <span class="token keyword">await</span> Deno<span class="token punctuation">.</span><span class="token function">readTextFile</span><span class="token punctuation">(</span><span class="token string">"client/main.html"</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> myWindow <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">myWindow<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span>myHtml<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">await</span> WebUI<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main.html</p>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html"><pre v-pre><code class="language-html"><span class="line"><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ja-JP<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Main html<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>webui.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>client/client.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span></span>
<span class="line">        Hello</span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="しばらく触っての雑感-2023-12-28-木" tabindex="-1"><a class="header-anchor" href="#しばらく触っての雑感-2023-12-28-木"><span>しばらく触っての雑感 - 2023-12-28 (木)</span></a></h3>
<p>[[MDDeck]]をWebUIで作ってみて使っているが、Mac版はなんかしばらく放っておくと勝手に終了してしまう。
何が原因か分からないが不便なのでElectronで作り直そうかなぁ、という感じ。</p>
<p>あとDockがChromeになるのだけれどこれをクリックすると新規Chromeが立ち上がってしまってWebUIアプリをアクティブにする都度毎回空のChromeウィンドウを消さないといけないのがだるい。
全体的にMacでの体験が悪いか。</p>
<p>作りたいものは現時点でも作れるし、将来的にプラットフォームごとにWebViewをラップした専用簡易ブラウザみたいなのを作れば実用になりそうで、
そうした変更はアプリ側には手を入れる必要は無いので、
将来性に期待が出来そうなら作っておくのはありかもしれない。</p>
<p>あと、短寿命なツール（起動してなにかやって終了）というものなら現時点でも使える。
開発開始が単なるライブラリ程度の感覚で始められるのでElectronよりは気軽。</p>
</div></template>


