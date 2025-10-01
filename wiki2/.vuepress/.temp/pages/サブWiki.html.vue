<template><div><h1 id="サブwiki" tabindex="-1"><a class="header-anchor" href="#サブwiki"><span>サブWiki</span></a></h1>
<p><a href="./TeFWiki.html">TeFWiki</a>の機能。</p>
<h3 id="関連リンク" tabindex="-1"><a class="header-anchor" href="#関連リンク"><span>関連リンク</span></a></h3>
<ul>
<li><a href="https://karino2.github.io/2021/09/26/TeFWiki_subdir_support.html" target="_blank" rel="noopener noreferrer">blog: TeFWikiのサブディレクトリ対応</a></li>
<li><a href="https://github.com/karino2/TeFWiki-Electron/blob/main/TeFWiki_concept.md" target="_blank" rel="noopener noreferrer">github: TeFWiki-Electron/TeFWiki_concept.md</a> 英語での簡単な説明</li>
<li><a href="./Wikiとノート.html">Wikiとノート</a>と<a href="./講義ノート.html">講義ノート</a></li>
<li><a href="./GitWiki.html">GitWiki</a></li>
<li><a href="./サブWikiをTeFWIkiの外部機能に出来ないか.html">サブWikiをTeFWIkiの外部機能に出来ないか</a></li>
<li><a href="https://karino2.github.io/2022/03/21/subwiki_retrospective.html" target="_blank" rel="noopener noreferrer">blog: サブWikiの振り返り</a> 概ね成功したアイデアだったと言って良さそう</li>
</ul>
<h3 id="公開しているサブwiki" tabindex="-1"><a class="header-anchor" href="#公開しているサブwiki"><span>公開しているサブWiki</span></a></h3>
<p><a href="./サブWikiリンク.html">サブWikiリンク</a>にまとめた。</p>
<h3 id="サブwikiの公開方法" tabindex="-1"><a class="header-anchor" href="#サブwikiの公開方法"><span>サブWikiの公開方法</span></a></h3>
<p><a href="./サブWikiの公開手順.html">サブWikiの公開手順</a></p>
<h3 id="サブwikiとは" tabindex="-1"><a class="header-anchor" href="#サブwikiとは"><span>サブWikiとは？</span></a></h3>
<p>TeFWikiにはサブWikiという機能がある。
サブWikiは複数の独立した子Wikiをつくる機能。</p>
<p>WikiLinkにスラッシュが入っていると、そのスラッシュの前をサブWikiの名前として扱い、そのリンクを辿ったあとはそのサブWiki内に居るという前提で処理が行われる。</p>
<p>そのサブWiki内では通常のWikiLinkはすべてそのサブWiki内のリンクとして扱われる。
Recent ChangesもそのサブWiki内のWikiNameのみを表示する。</p>
<p>例えば「RandomThoughts/TeFWiki」というWikiLinkがあったら、RandomThoughtsというサブWikiのTeFWikiというWikiNameだとみなす。
そのリンクを辿ると、このサブWIkiの中に入ったという認識で処理が行われる。
この中でHomeというWikiLinkがあれば、それは「RandomThoughts/Home」として扱われる。
親のWikiのHomeを参照する方法は無い事に注意。</p>
<p>サブWikiから親への移動はパンくずメニューのみ。</p>
<p>実装としては、RandomThoughtsというフォルダが掘られて、その中のWikiとして振る舞う。</p>
<h3 id="wikiの部分公開はまるごと公開じゃないとうまく行かない" tabindex="-1"><a class="header-anchor" href="#wikiの部分公開はまるごと公開じゃないとうまく行かない"><span>Wikiの部分公開はまるごと公開じゃないとうまく行かない</span></a></h3>
<p>パーソナルなWikiには、住所とか電話番号とか家賃の振込先とか、細々とした個人情報がたくさん入る。
一方で自作アプリについての話など、公開したい情報もたくさん入る。
このWikiの一部をどう公開するか？というのがサブWiki機能開発の発端。</p>
<p>以前<a href="https://karino2.github.io/2021/05/05/gwiki_tefwiki.html" target="_blank" rel="noopener noreferrer">GitHubのWIkiでTeFWikiの一部を公開する</a>でページごとに公開非公開を分けようとしていたが、
公開が面倒で結局公開しなくなってしまう。</p>
<p>Wikiでは新しいページやリンクをどんどん気軽に作れるのが命なので、作ったページをいちいち公開するかどうか判断して公開する作業をするのはうまく行かない。
また、大きく整理している時に、どのリンクは公開されていてどのリンクは公開されてないかとかを考えながら整理するのはあまりうまく行かない。</p>
<p>やはりWikiは、リンクのネットワークまで含めてまるごと公開されないと意味が無い。
また、整理する時に幾つ新しいページを作ったかなんて考えたくないので、そういうのは勝手に全部公開される、という風になっている必要がある。</p>
<p>一方で個人情報とかは公開したくないし、うっかりそういうのが事故で公開されそうになっていると、
安心して個人情報を書いたりしづらい。公開したくないものが公開されないと確信を持って書いていけるようになっている必要がある。
カード引き落とし用の口座が何月何日にいくらで、何ヶ月後にお金を足さなきゃいけない、とか、
家賃などの毎月送金する相手の口座の情報とか、親族の誕生日やら通院の予定やら、公開したくない情報もたくさんある。
公開する気の無いものが間違って公開されない、という安心感が無いと、テキストファイルのメモのように書いていけない。</p>
<p>以上の事から、公開される部分とされない部分を独立したWikiとしてきっちり分ける必要がある、というのが自分の結論。
公開する範囲をサブWikiとして独立させて、それを公開する。これならフォルダをまるごと公開すればページを増やしても勝手に公開されるし、公開される方のサブWikiと公開されない方のサブWiki（または公開されない親Wiki）のどちらに書いているかは誤解なく書いていてわかるので、
個人情報などが誤って公開される事も無い。</p>
<p>このどちらのWikiに現在書いているかをわかりやすくする為に、あえてサブWiki間の移動はかったるくなっている。
これは適切なトレードオフで、必要な事だと思っている。</p>
<h3 id="講義のノートをサブwikiとして公開する" tabindex="-1"><a class="header-anchor" href="#講義のノートをサブwikiとして公開する"><span>講義のノートをサブWIkiとして公開する</span></a></h3>
<p>また、サブWikiはedXで生物関連の講義ノートを作るために考えた機能でもある。
講義ローカルの、ページ数が比較的少なく、講義を受け終わったらある程度フリーズされるような細かい単位のWikiを作りたい。
この辺の事は<a href="./Wikiとノート.html">Wikiとノート</a>に書いた。</p>
<h3 id="何故ネームスペースじゃなくてサブwikiなのか" tabindex="-1"><a class="header-anchor" href="#何故ネームスペースじゃなくてサブwikiなのか"><span>何故ネームスペースじゃなくてサブWikiなのか？</span></a></h3>
<p>Wikiの拡張では、ネームスペースは良く見る、準標準くらいの立ち位置にある機能と思う。例えばPukiWikiにはページの階層化、という名前でネームスペースがある。</p>
<p><a href="https://pukiwiki.osdn.jp/?Use+PukiWiki/%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%AE%E9%9A%8E%E5%B1%A4%E5%8C%96" target="_blank" rel="noopener noreferrer">Use PukiWiki/ページの階層化 - PukiWiki-official</a></p>
<p>一方でTeFWikiは見た目が似ているのに、サブWikiという微妙に違う物になっている。
なるべく変な拡張はしたくないと思っているTeFWikiだが、サブWikiだけは独自のものになっている。</p>
<p>まず普通のネームスペースの実装では、ネームスペース内でも、普通は何も指定の無いグローバルなWikiNameはグローバルなリンクとして扱われる。
ネームスペース内でローカルのリンクにしたければ「./ローカル」などのように、「./」をつける必要がある。</p>
<p>ネームスペースは、その親のネームスペースへのリンクが普通にある前提となっている。
一方でこれは公開単位としてそのネームスペース下だけを公開しようと思った時には、親へのリンクが無いかをいちいち確認する必要があって面倒。
公開単位として使うなら、もっとサンドボックス的というか、その中から外へのリンクは制限されている方が都合が良い。
ネームスペースはそういう機能では無い。</p>
<p>サブWikiは各サブWiki同士はもっと独立していて、そのサブWikiで閉じている。逆に言えばサブWiki同士でリンクを貼ったりはあまりやらない使い方を想定している。特に兄弟とか親へのリンクは貼らない前提（そういう機能も今の所無い）。
そのサブWikiの中では普通のWikiのように編集をしていけば、自然とそのサブWiki内だけのWikiが出来るようになっている。</p>
<h2 id="git-wikiでの複数ディレクトリ対応" tabindex="-1"><a class="header-anchor" href="#git-wikiでの複数ディレクトリ対応"><span>git-wikiでの複数ディレクトリ対応</span></a></h2>
<p>サブWikiごとに別のレポジトリを持つのは面倒なので、<a href="./GitWiki.html">GitWiki</a>の一つのレポジトリに複数のサブディレクトリを掘ってそれぞれにサブWikiを置きたい。</p>
<ul>
<li>recentsをサブディレクトリに</li>
<li>サイトのタイトルをサブディレクトリの名前に</li>
</ul>
<p>といった作業が必要と思う。以下実際にやってみたメモ。</p>
<p>wikiの下にサブディレクトリをほってmdを置いてみると、permlinkがずれる。
config.ymlでサブディレクトリごとに書く事に（pathではwiki/が含まれてしまい、これを抜く方法が分からなかった）。</p>
<ul>
<li>タイトルをサブディレクトリの名前に</li>
<li>Recentsをそれぞれのサブディレクトリ内のみに</li>
</ul>
<p>page.dirをもとにurlを作ってincludeをしたら、どうもinlcudeされない。
同じ中身をassingしてincludeすると出来るのに。</p>
<p>良く分からないが、includeがpage.dirに依存するのはダメなのかなぁ。</p>
<p>結局page.dirでifを分けて、include先にはcase分を並べたものをシェルスクリプトで自動生成して置く事にした。</p>
<p>一応できたかな。</p>
<p><a href="https://karino2.github.io/SubWiki/Home" target="_blank" rel="noopener noreferrer">Home - サブWiki公開用Wiki</a></p>
<p>レポジトリとしてはこんなふうにwiki_srcのディレクトリの下にディレクトリを掘る。</p>
<p><a href="https://github.com/karino2/SubWiki/tree/master/wiki_src/JetpackCompose" target="_blank" rel="noopener noreferrer">SubWiki/wiki_src/JetpackCompose at master · karino2/SubWiki</a></p>
<p>今後は新しい講義のノートなどはこの下に追加していきたい。</p>
</div></template>


