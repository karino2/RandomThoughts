<template><div><p><a href="./自作アプリ.html">自作アプリ</a></p>
<ul>
<li><a href="https://github.com/karino2/BikeSeibiMemo" target="_blank" rel="noopener noreferrer">karino2/BikeSeibiMemo: Android bike maintenance memo tool.</a></li>
</ul>
<p>GBからっぽい時代の車両整備記録というアプリを気に入って使っていたのだが、メニューが出なくなった結果機種変更で乗り換え出来ず。
まぁ寿命か。</p>
<p>他のアプリを見るがデータを移行する手段がなさそうなので、自分で似たようなのを作る事にする。
SAFで直接csvを読み書きする感じで。
ただ項目はバイクに合わせて手直しするかな。</p>
<h2 id="コンセプト" tabindex="-1"><a class="header-anchor" href="#コンセプト"><span>コンセプト</span></a></h2>
<p>他のアプリからの乗り換えを前提とするアプリ。他のアプリのデータをexportして、適当にCSVで編集をしてこのアプリに合わせて移行する感じで、
CSVのフォーマットを単純かつオープンに保つ。</p>
<h2 id="csvフォーマット" tabindex="-1"><a class="header-anchor" href="#csvフォーマット"><span>CSVフォーマット</span></a></h2>
<p>カテゴリは以下</p>
<div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt"><pre v-pre><code class="language-kotlin"><span class="line">    <span class="token function">GAS</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function">OIL</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function">TIRE</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function">FILTER</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function">INSURANCE</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 車両整備記録アプリと揃えるため7にしておく。</span></span>
<span class="line">    <span class="token function">OTHER</span><span class="token punctuation">(</span><span class="token number">99</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5, 6は無い。</p>
<p>一行は以下。</p>
<table>
<thead>
<tr>
<th>year</th>
<th>month</th>
<th>date</th>
<th>category</th>
<th>liter</th>
<th>price</th>
<th>runningDistance</th>
<th>memo</th>
</tr>
</thead>
<tbody>
<tr>
<td>2023</td>
<td>12</td>
<td>23</td>
<td>1</td>
<td>4.35</td>
<td>573</td>
<td>32685</td>
<td>ガソリンの例</td>
</tr>
<tr>
<td>2023</td>
<td>12</td>
<td>25</td>
<td>2</td>
<td></td>
<td>2300</td>
<td>32790</td>
<td>オイル交換の例</td>
</tr>
</tbody>
</table>
<p>literはガソリン以外だと空。monthやdayは1始まりな事に注意（0じゃありません）。</p>
<h2 id="メモ" tabindex="-1"><a class="header-anchor" href="#メモ"><span>メモ</span></a></h2>
<ul>
<li><a href="https://github.com/patrykandpatrick/vico" target="_blank" rel="noopener noreferrer">patrykandpatrick/vico: A light and extensible chart library for Android.</a></li>
</ul>
<h2 id="開発日記" tabindex="-1"><a class="header-anchor" href="#開発日記"><span>開発日記</span></a></h2>
<h3 id="_2024-01-13-土" tabindex="-1"><a class="header-anchor" href="#_2024-01-13-土"><span>2024-01-13 (土)</span></a></h3>
<p>アイコンも描いて、燃費はグラフでは無くてリストで十分か、という事でLazyColumnで表示するようにしたら、まぁこれでいいか、という感じの出来にはなった。
ひとまず完成でいいかな。
Playに公開するほどでも無いかな、という事でとりあえずデバッグ版を使い続けよう。</p>
<h3 id="_2024-01-07-日" tabindex="-1"><a class="header-anchor" href="#_2024-01-07-日"><span>2024-01-07 (日)</span></a></h3>
<p>編集も出来て、入力途中の燃費やガソリン単価の表示も追加した。これでグラフ以外はだいたい乗り換え前のアプリと同じ機能が出来たかな。</p>
<h3 id="_2024-01-04-木" tabindex="-1"><a class="header-anchor" href="#_2024-01-04-木"><span>2024-01-04 (木)</span></a></h3>
<p>給油の入力のActivityがとりあえず出来た。validationはまだ。validationはつけておきたい。まだ保存はしてない。</p>
<h3 id="_2024-01-02-火" tabindex="-1"><a class="header-anchor" href="#_2024-01-02-火"><span>2024-01-02 (火)</span></a></h3>
<p>csvのロードとサマリーページが完成。あとは入力と一覧を作ればとりあえずドッグフードは出来る。次にバイクにガソリン入れるまでにそこまで完成させなくては。</p>
</div></template>


