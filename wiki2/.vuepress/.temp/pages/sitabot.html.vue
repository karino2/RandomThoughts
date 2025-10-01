<template><div><h1 id="sitabot" tabindex="-1"><a class="header-anchor" href="#sitabot"><span>sitabot</span></a></h1>
<p><a href="https://github.com/raito417/mistodon-sitabot" target="_blank" rel="noopener noreferrer">raito417/mistodon-sitabot</a></p>
<h2 id="sitabotいじり" tabindex="-1"><a class="header-anchor" href="#sitabotいじり"><span>sitabotいじり</span></a></h2>
<p>ちょっとPRでも送ろうと作業する。その作業メモ</p>
<h3 id="dockerfile" tabindex="-1"><a class="header-anchor" href="#dockerfile"><span>Dockerfile</span></a></h3>
<p>デプロイして動かす気は無いけどライブラリは入れておきたいという事でDockerfileを作る事から。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ docker build -t arino/sitabot .</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>実行</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">docker run -it --rm -v $(pwd):/work arino/sitabot bash</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


