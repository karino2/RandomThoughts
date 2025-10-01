<template><div><h1 id="jetpackcompose" tabindex="-1"><a class="header-anchor" href="#jetpackcompose"><span>JetpackCompose</span></a></h1>
<p>今後はJetpackComposeのサブWikiへ移していく（まだリンク貼れないのでそのうち貼る）</p>
<p>Jetpack Composeに関するメモ。</p>
<h3 id="dropdownmenu" tabindex="-1"><a class="header-anchor" href="#dropdownmenu"><span>DropdownMenu</span></a></h3>
<ul>
<li><a href="https://foso.github.io/Jetpack-Compose-Playground/material/dropdownmenu/" target="_blank" rel="noopener noreferrer">DropdownMenu - Jetpack Compose Playground</a></li>
<li><a href="https://developer.android.com/reference/kotlin/androidx/compose/material/package-summary#dropdownmenu" target="_blank" rel="noopener noreferrer">androidx.compose.material: Android Developers</a></li>
</ul>
<h3 id="columnのスクロールがあると、ソフトキーが出た時のadjustresizeがうまく機能しない" tabindex="-1"><a class="header-anchor" href="#columnのスクロールがあると、ソフトキーが出た時のadjustresizeがうまく機能しない"><span>Columnのスクロールがあると、ソフトキーが出た時のadjustResizeがうまく機能しない</span></a></h3>
<p><a href="https://issuetracker.google.com/issues/192043120" target="_blank" rel="noopener noreferrer">Text Field - Text goes below the IME [192043120] - Visible to Public - Issue Tracker</a></p>
<p>え？こんな重要なバグが治ってないまま放置されてるの！？と信じがたい気持ちだが、どうも治ってないっぽい。</p>
<h3 id="スクロールすると隠れるtopappbarの実装" tabindex="-1"><a class="header-anchor" href="#スクロールすると隠れるtopappbarの実装"><span>スクロールすると隠れるTopAppBarの実装</span></a></h3>
<p>デフォルトで無いの？とググると公式ドキュメントのnestedScrollがそれっぽい。TopAppBarの高さを判定するのがダサいが他は以前のViewの頃の実装とあまり変わらないな。</p>
<p><a href="https://developer.android.com/reference/kotlin/androidx/compose/ui/input/nestedscroll/package-summary" target="_blank" rel="noopener noreferrer">androidx.compose.ui.input.nestedscroll: Android Developers</a></p>
<h3 id="by-rememberを動かす為に必要なimport" tabindex="-1"><a class="header-anchor" href="#by-rememberを動かす為に必要なimport"><span>by rememberを動かす為に必要なimport</span></a></h3>
<p>毎回忘れるのでここにメモ。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">   var textState by remember { mutableStateOf("") }</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>みたいな表記をする時は、必要なimportが何故か自動でされない。
以下を手で足す必要がある。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">import androidx.compose.runtime.getValue</span>
<span class="line">import androidx.compose.runtime.setValue</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


