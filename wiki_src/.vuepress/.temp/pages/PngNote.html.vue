<template><div><p>karino2が作っているONYX BOOX Note3用のノートアプリ。
ただAndroid用のブランチも一応ある。</p>
<ul>
<li><a href="https://github.com/karino2/PngNote" target="_blank" rel="noopener noreferrer">github: PngNote</a></li>
<li><a href="https://www.reddit.com/r/Onyx_Boox/comments/p5hygq/pngnote_for_boox_note_app_for_boox_device_only/" target="_blank" rel="noopener noreferrer">redditのPngNoteのスレ</a> 割とメインでやっている場所</li>
<li><a href="https://karino2.github.io/2021/07/23/pngnote_for_boox.html" target="_blank" rel="noopener noreferrer">blog: PngNote for BOOX開発記</a></li>
<li><a href="https://karino2.github.io/2021/08/19/pngnoteloupe.html" target="_blank" rel="noopener noreferrer">blog: PngNoteLoupe</a> Android用の拡大機能のプロトタイプ</li>
<li><a href="./GithubPagesGallery.html">GithubPagesGallery</a>を公開に使っている。</li>
</ul>
<h3 id="コンセプト" tabindex="-1"><a class="header-anchor" href="#コンセプト"><span>コンセプト</span></a></h3>
<ul>
<li>BOOXのNote3でペンが快適に使える事</li>
<li>単なるpngの連番ファイルとディレクトリ</li>
<li>低機能で使っていて迷う所が無いような選択肢の少ないUI</li>
<li>講義ノートなどを取るのに特化した機能＞<a href="./講義ノート.html">講義ノート</a></li>
</ul>
<h3 id="雑感" tabindex="-1"><a class="header-anchor" href="#雑感"><span>雑感</span></a></h3>
<p>BOOX Note3のペンは非常に良い。
普通のデジタイザみたいに描いている所との距離を感じず、直接表面に描いているような感覚になっている。ペン先も細かいし。</p>
<p>画面の大きさと相まって、紙のノートに非常に近い感じで使えるようになっている。ここまで紙のノートっぽく使えるデバイスは初めてなんじゃないか。
まだ微妙に実際のノートより字が大きくなりがちなので完璧に紙のノートより優れているとは言えないが、
自分的にはもうこれでいいか、と思える程度には紙のノートに近い。</p>
<p>一方でBOOX Note3のサイズでもようやくギリギリ、という感じなので、まだ8インチでは紙のノートは置き換えできないなぁ、と思う。</p>
<p>また、PngNoteの余計な機能はつけない、という方針はかなりうまく行っている気がする。
モードの切り替え的な事はやはりノートを取るのには邪魔だよな。
なにもないページに自由に描き始められる感じが凄く気分が良い。
この気分の良さは損なわないように機能追加はやっていきたいな。</p>
<h3 id="ペンサイズの変更-予定" tabindex="-1"><a class="header-anchor" href="#ペンサイズの変更-予定"><span>ペンサイズの変更（予定）</span></a></h3>
<p>現状はペンサイズが変更できないが、対応しても良い気はしている。
お絵かきアプリならスライダで変更出来るようにする所だが、ノートの場合、細い線に戻す時に太さが違うと気になるので、
あまりスライダというのは気乗りしない。ホバーで出るブラシカーソルも無いし。消しゴムはスライダでもいい気もするが。</p>
<p>考えているのは、3種類くらいの太さのペンを用意して、それをポップアップリスト的なので選ばせる、というもの。
ただ、これをカスタマイザブルにしようかなぁ、と思っている。
pen_settings.txtというファイルがあったらその中身をパースしてそれを使う、みたいな。</p>
<p>今考えているのは、ARGBと太さと、消しゴムとペンの種別、そしてリスト上に表示するラベルをセミコロン区切りとかでいいかなぁ、と思っているがどうだろう？</p>
<p>これなら、カラーの機種でカラーで半透明のマーカーみたいなのを作りたい、という人でも使えるし、
紙ノートにおける三色ボールペン的な感覚で気分良く使えるんじゃないか。</p>
<p>消しゴムは指定できなくても良さそうだが、どうせペンを選べるようにすれば消しゴム対応も大差無く出来るし、細い消しゴムと太い消しゴムはたまに欲しくもなるからやっておいてもいいかなぁ、とは思っている。</p>
<p>ただペンは自分は欲しいと思った事無いんだよなぁ。要るかなぁ。</p>
<p>メモ: 点線を入れるなら、</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">DashPathEffect</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>を使う。</p>
<p>例えば以下でどうだろう？</p>
<p>基本は</p>
<ul>
<li>ラベル</li>
<li>種別</li>
<li>ARGB</li>
<li>太さ</li>
</ul>
<p>をセミコロン区切り。種別がeの時は太さだけ、種別がd（点線）の時はこれにさらにDashPathEffectにわたすパラメータ2つが最後に加わる。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">ペン;p;255,0,0,0;12.8</span>
<span class="line">赤;p;255,255,0,0;12.8</span>
<span class="line">青;p;255,0,0,255;12.8</span>
<span class="line">太ペン;p;255,0,0,0;20</span>
<span class="line">マーカー;p;128,255,148,224;20</span>
<span class="line">点線;d;255,0,0,0;20;10.0,20.0</span>
<span class="line">消しゴム;e;20</span>
<span class="line">消しゴム（細）;e;8.0</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="バックグラウンド画像機能" tabindex="-1"><a class="header-anchor" href="#バックグラウンド画像機能"><span>バックグラウンド画像機能</span></a></h3>
<p>現状、フォルダにbackground.pngというファイルがあると、それをそのノートのバックグラウンドとして描画する。
罫線の機能を実現するために実装した機能だが、ToDoリストなどでも使えるように、とは考えている。</p>
<p>なお、現状はbackground.pngを置くUIは無い。自分で画像を用意して手で置く。
自分はこれを使っている。 <a href="https://github.com/karino2/PngNote/blob/main/images/background.png" target="_blank" rel="noopener noreferrer">https://github.com/karino2/PngNote/blob/main/images/background.png</a></p>
<h3 id="github-pagesへの公開" tabindex="-1"><a class="header-anchor" href="#github-pagesへの公開"><span>github pagesへの公開</span></a></h3>
<p>公開には<a href="./GithubPagesGallery.html">GithubPagesGallery</a>を使っている。</p>
</div></template>


