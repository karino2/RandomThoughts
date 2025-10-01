<template><div><h1 id="mdvtbl" tabindex="-1"><a class="header-anchor" href="#mdvtbl"><span>mdvtbl</span></a></h1>
<p><a href="./テーブルエディタ.html">テーブルエディタ</a>が欲しいと思って作ってみた。</p>
<ul>
<li><a href="https://github.com/karino2/mdvtbl" target="_blank" rel="noopener noreferrer">karino2/mdvtbl: GUI markdown editor read from stdin and write to stdout.</a></li>
<li><a href="https://karino2.github.io/2022/02/14/table_editor_idea.html" target="_blank" rel="noopener noreferrer">blog: マークダウンのテーブルを編集するツールを考える</a></li>
<li><a href="https://karino2.github.io/2022/02/15/mdvtbl_release.html" target="_blank" rel="noopener noreferrer">blog: mdvtblをリリース ー GUIのmdテーブルエディタ、stdin, stdoutでやりとり</a></li>
</ul>
<p><a href="./photino.html">photino</a>と<a href="./editorjs.html">editorjs</a>で実装してみた。editorjsなかなか良いね。</p>
<h3 id="デプロイ手順" tabindex="-1"><a class="header-anchor" href="#デプロイ手順"><span>デプロイ手順</span></a></h3>
<ol>
<li>タグを打つ</li>
<li>build.shを実行</li>
<li>releasesにcdしてcopybin.shを実行</li>
<li>フォルダをほってmdvtblをmvしてzipしてgithubにアップ</li>
<li>あとは<a href="./homebrew.html">homebrew</a>のtapを更新</li>
</ol>
</div></template>


