<template><div><p>静的サイトジェネレータ。</p>
<p><a href="https://www.11ty.dev/docs/" target="_blank" rel="noopener noreferrer">Overview — Eleventy</a></p>
<p>なんか公式ページが見づらいが、システムとしては悪くない気がする。mdとLiquid使えばいいかなぁ、とか思っていた所、
テンプレートシステムにはnunjucksというのを使っている例が多い。</p>
<p><a href="https://mozilla.github.io/nunjucks/getting-started.html" target="_blank" rel="noopener noreferrer">Nunjucks</a></p>
<p>ほえ〜、軽く見たら、なんかこれでもいいんじゃないかな、という気はした。新しいのわざわざ覚えるの？という気もするけれど。</p>
<p>なんか一回この辺で何か作ってみようかな。
公式ドキュメントのソースは以下か。</p>
<p><a href="https://github.com/11ty/11ty-website/tree/main" target="_blank" rel="noopener noreferrer">11ty/11ty-website: Documentation site for the Eleventy static site generator.</a></p>
<h2 id="あらすじ" tabindex="-1"><a class="header-anchor" href="#あらすじ"><span>あらすじ</span></a></h2>
<p>最近、[[GithubPages]]でいろいろやる時に、ローカルのnodeでいろいろと前処理をする事が多い。
でも結局ローカルでいろいろとビルドして生成するなら、ローカルでhtmlを生成するもっとシンプルなシステムで良いのでは無いか、という気はしていた。</p>
<p>で、見つけたのがこの11ty。</p>
<p>そのうち試してみたい。</p>
<h2 id="触ったメモ" tabindex="-1"><a class="header-anchor" href="#触ったメモ"><span>触ったメモ</span></a></h2>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ npm init -y</span>
<span class="line">$ npm install @11ty/eleventy</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>YAMLの追加</p>
<p><a href="https://www.11ty.dev/docs/data-custom/" target="_blank" rel="noopener noreferrer">Custom Data File Formats — Eleventy</a></p>
</div></template>


