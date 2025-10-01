<template><div><ul>
<li>[[CG]]</li>
<li>[[書籍]]</li>
<li><a href="https://github.com/PacktPublishing/OpenGL-4-Shading-Language-Cookbook-Third-Edition/tree/master" target="_blank" rel="noopener noreferrer">PacktPublishing/OpenGL-4-Shading-Language-Cookbook-Third-Edition: OpenGL 4 Shading Language Cookbook - Third Edition, published by Packt</a> サンプルコード</li>
</ul>
<p><a href="https://amzn.to/4cF8Qg0" target="_blank" rel="noopener noreferrer">amazon: OpenGL 4 Shading Language Cookbook: Build high-quality, real-time 3D graphics with OpenGL 4.6, GLSL 4.6 and C++17, 3rd Edition</a></p>
<h2 id="購入動機など-2024-03-30-土" tabindex="-1"><a class="header-anchor" href="#購入動機など-2024-03-30-土"><span>購入動機など 2024-03-30 (土)</span></a></h2>
<p>OpenCLやMetalのコンピューティングシェーダーなどは結構触ってきたので割と慣れているのだが、
普通のグラフィックスのシェーダーは使った事が無い。
使う予定も無いんだが。</p>
<p>ただグラフィックス系の処理ではフラグメントシェーダーで描かれている例などを見る事もあるし、
そうした例の常識的なものを知っておきたいというのもあって、
GLSLの本を読みたくなった。</p>
<p>ただしOpenGLのホスト側にはあまり関心が無い。</p>
<p>そんな感じでググっていたら、redditでこの本が薦められていて、サンプルを見たら悪く無さそうだったのでポチって見る。
Kindle版が4000円だった。</p>
<p>サンプルを見た範囲だとレシピごとに記述が割と独立しているので使いやすそうだが、
最初の方はホスト側というか前準備の話が多いので、買ってみないと分からんなぁ、と思い購入。</p>
<h2 id="diffuseオンリーのシェーディングまで読んだ-2024-04-12-金" tabindex="-1"><a class="header-anchor" href="#diffuseオンリーのシェーディングまで読んだ-2024-04-12-金"><span>diffuseオンリーのシェーディングまで読んだ 2024-04-12 (金)</span></a></h2>
<p>diffuseオンリーのシェーディングまで読んだ。CGの本としては理論的な解説が薄めだが、どこかで基本を学んだあとなら使いやすいコード例がたくさんあって良い気もする。
ただ自分の目的としてはあまり3Dの頂点データがたくさんある前提の話は使えないのでこの辺は飛ばそうかな。</p>
<p>この辺の話は昔Real Time Renderingsの勉強会で結構真面目にやったのを読んでいて思い出す。
当時は使う予定も無く勉強していたが、意外とこうやって何十年もあとに使うことになったりして世の中分からないものだな。</p>
<p>昔Real Time Renderingsを勉強していた頃は、ハードウェアのことを良く分かっていなかったので、数学的な事だけを真面目に理解していた気がする。
それはプログラマとしては全く意味の無い事ではあるんだが、
ハードウェアとかこの辺のプログラムに詳しくなった今改めて読むと、数学的な事をやけに真面目に理解した過去があると、内容がえらく簡単になるのでスラスラ読んでいけるな。</p>
<h3 id="サンプルのソースの確認" tabindex="-1"><a class="header-anchor" href="#サンプルのソースの確認"><span>サンプルのソースの確認</span></a></h3>
<p>トーラスのデータはどうやって指定しているのかを読み直したが、特に解説は無い。
サンプル、<a href="https://github.com/PacktPublishing/OpenGL-4-Shading-Language-Cookbook-Third-Edition/blob/master/chapter03/scenediffuse.h" target="_blank" rel="noopener noreferrer">OpenGL-4-Shading-Language-Cookbook-Third-Edition/chapter03/scenediffuse.h at master · PacktPublishing/OpenGL-4-Shading-Language-Cookbook-Third-Edition</a>を読むと、Torusとかいうクラスが使われていて、<code v-pre>torus.render()</code>とかいうメソッドが呼ばれている。</p>
<p>TorusはTriangleMeshのサブクラスで、renderはこちらに定義されている。<a href="https://github.com/PacktPublishing/OpenGL-4-Shading-Language-Cookbook-Third-Edition/blob/master/ingredients/trianglemesh.cpp" target="_blank" rel="noopener noreferrer">OpenGL-4-Shading-Language-Cookbook-Third-Edition/ingredients/trianglemesh.cpp at master · PacktPublishing/OpenGL-4-Shading-Language-Cookbook-Third-Edition</a>
これは序盤に解説のあったVAOを設定してglDrawElementsを呼んでいるな。glDrawElementsはUsing element arraysの所に一応説明があるが、詳細はOpenGLのドキュメントを読んでくれ、との事。
この辺の解説は微妙だなぁ。</p>
<p>サンプルを通して全体を説明する、というよりは、
サンプルのカタログって側面が強い気がする。</p>
<h2 id="image-processingのあたりを読んでいる-2024-04-14-日" tabindex="-1"><a class="header-anchor" href="#image-processingのあたりを読んでいる-2024-04-14-日"><span>Image Processingのあたりを読んでいる 2024-04-14 (日)</span></a></h2>
<p>この本、ホスト側の解説が少ないのがいまいちだな。
GLSLの本なのでそちらが中心だ、という理屈は分かるが、
マルチパスの話とかをホスト側を載せずに説明しても具体的な事が全然出てこないのでいまいち。
ただ上記リンク先のサンプルソースを読めば分かるので、最低ラインはクリアしていると言えるかもしれない。
でもカフェでタブレットだけ持っていって読書する時とかはいまいちだなぁ。</p>
<h2 id="読み終わり、感想など-2024-05-04-土" tabindex="-1"><a class="header-anchor" href="#読み終わり、感想など-2024-05-04-土"><span>読み終わり、感想など 2024-05-04 (土)</span></a></h2>
<p>だいたい読みたい所は一通り読んだので、
読んだ所と感想などを書く。</p>
<h3 id="後半で読んだ所" tabindex="-1"><a class="header-anchor" href="#後半で読んだ所"><span>後半で読んだ所</span></a></h3>
<p>読んだのは以下。</p>
<ul>
<li>Image Processingを7割くらい</li>
<li>Geometry ShaderとTessellation Shaderは冒頭だけ</li>
<li>Shadowsはshadow mapだけ</li>
<li>Noiseは8割くらい</li>
<li>Particle Systemはparticle fountainまで</li>
</ul>
<p>Computing Shaderはぱらぱら眺めたくらい。</p>
<h3 id="自分の目的からの感想" tabindex="-1"><a class="header-anchor" href="#自分の目的からの感想"><span>自分の目的からの感想</span></a></h3>
<p>自分は3Dプログラムを学びたい訳ではなくて、2Dの画像処理などで使うという特殊用途だったので、本の半分以上は要らない内容だった。
ただこれは自分の用途が特殊なのであって本が悪いという訳では無い。</p>
<p>飛ばした所の方が多いけれど、読んだ所はそれなりにあるので、買った甲斐はあったかな、と思う。</p>
<p>割とシェーダーで画像処理する時の経験値は溜まったと思うし、OpenGLのGLSLのコードを読むのはだいぶ慣れたと思う。
それはまさにこの本に期待する事でもあったので、</p>
<p>レシピ集としてはもう三倍くらい種類が欲しかったが、自分の用途が特殊である事を思えば、それはまぁ無理な望みだろう。</p>
<h3 id="一般的な感想" tabindex="-1"><a class="header-anchor" href="#一般的な感想"><span>一般的な感想</span></a></h3>
<p>自分の用途という事を離れてのこの本の感想を。</p>
<p>まず、話題は結構幅広く、3Dグラフィックスについてはかなり詳しくなれると思う。
Open GLの入門を終えた人がこの本を一通り読めば、かなり詳しい人になれるだろう。
コードのアンチョコとしてもへんてこな抽象化とかはそんなに無いし、割と使いやすいように見える（ただちょっとはある）。
githubにいい感じ使いやすい、レシピごとにまぁまぁ独立したコードがたくさんあるのはこの本の良い所に思う。</p>
<p>githubのコードだけでも別にいのでは、という気もするかもしれないが、索引代わりに目次を使えたり、スクショとか解説とかがあったりと、
補足としての本の価値は割とあるので、このサンプルコードに興味があるなら本を買って読む価値はあるとも思う。</p>
<p>本の中ではコードの抜粋が解説されているのだが、抜粋の仕方はいまいちに思った。
「いや、そこはこれまでと同じでこのレシピ特有な所はそこじゃないのになんでそこしか解説無いの？」と思うような事はちょくちょくあった。
本を単体で読んで勉強するにはちょっと出来が良く無い、と思う所がちょくちょくある。
もうちょっと良い本に出来たんじゃないか、とは思った。
ただgithubには全コードがあって、このコードは十分読めるものなので、githubも合わせて読めば十分に理解出来る解説ではあった。
githubをいちいち参照しなくちゃいけないのはかったるいが、かったるい程度であってやれない程では無い。
でもこういうのはカフェで読んだりするにはいまいちなんだよねぇ。</p>
<p>理論的な解説はまぁまぁされていて、だいたいは分かる。Rendering Equation的な話は割とある。
ただ全部は分からない。
だいたい2割くらいはこの本の外の原典とかを当たらないとわからんかなぁ、という感じになっている。
勉強会などでこの本だけでやるのはいまいちと思うけれど、
他の本も参照する前提では悪くないかもしれない。</p>
<p>また、コード集として使うだけと思うなら、この位の解説がちょうどいい塩梅かもしれない。詳しすぎず、適度に分からなくていい所は他の本に丸投げしているが、
知ってかないとコードの意味が分からない所の解説はそれなりにあるので、使うのには十分な解説という気はする。
そういう点で、レシピ集としては良く出来ていると思う。</p>
<p>何も知らない人がこの本で勉強する、という感じでは無い。
Real Time Renderingsを読んで、OpenGLの入門書を読んだ後くらいに読むとちょうど良い感じ。
Real Time Renderingsほど詳しくなくてもいいが、3Dグラフィックスの基本（ホモジーニアスノーテーションでカメラとかライトとかを扱うとか）はどこか別の所で学ぶ必要があると思う。</p>
<p>Open GLの入門も他でやる必要はある。
ただ、入門くらいは分かっているがテクスチャに描くにはどうしたらいいか分からない、とか、2パスで何かやりたい時にどうしたらいいか分からない、
程度のレベルで十分読んでいけるので、Open GLの勉強としては読んでいける。</p>
<p>昔Real Time Renderingsの勉強会で割と真面目に読んだがもう忘れた、という感じで、Open GLは触った事無いがMetalのComputing Shaderは良く触っていて、
<a href="https://www.shadertoy.com/" target="_blank" rel="noopener noreferrer">Shadertoy</a>などで良くシェーダー読んだり触ったりしている、
という自分にはちょうど良いくらいの難度だった。もうちょっと理論の解説が多くてもいいかな、とは思ったが、この位でもいいか、と思える内容だった。
この本を読むまでは、Open GLあんまり良くわからないな、という状態だったが、
読み終わった後はだいたいの事は書こうと思えば書けるな、と思えるようになった。
Open GLを得意にしたい人には手頃な本なんじゃないか。</p>
<p>幅広い分野を扱っていて、最初の所が導入になっていてその分野の基礎となるレシピになっているので、
あまり興味の無い分野は最初だけ理解して先に進むと3Dグラフィックスの全体像だけを省エネで学べるようになっていて良い。
自分の目的以外の分野についての、いい勉強になった。</p>
<p>やはりコードがあるのはいいよな。Real Time Renderingsを読んだ時や解説などで良く分からない所も、
コードを読めば曖昧な所は無くなるので、読んで分からなかった所をちゃんと自己解決出来る。
ちゃんと動く全コードがgithubにあるのは良いな。</p>
<p>個人的にはgithubを参照せずに本だけでもうちょっと分かるようになっていたらいいのになぁ、とは思うが、
及第点ではあった。結構いい本なんじゃないか。</p>
<h3 id="glslの感想" tabindex="-1"><a class="header-anchor" href="#glslの感想"><span>GLSLの感想</span></a></h3>
<p>OpenCL, Cuda, Metalは割と似ているので、同じようなものだと思っていたのだけれど、思ったよりもC言語じゃない。
Cに少しベクトル周りとかメモリに拡張が入っているだけだと思っていたのだが、割と違う言語だった。
これならMetalの方がいいな、と思った。Metalは割と素のC++って感じで、かなり高機能だよねぇ。</p>
<p>HLSLも全然C言語じゃなくて驚いたが、GLSLもかなり違うもので、むしろ両者は似たものを感じる。
OpenGLはシェーダーが後から入ったせいか、シェーダーでやる事とホストでやる事の棲み分けがちょっと微妙だよなぁ。
Metalはサンプラーをシェーダー側で定義するが、こっちの方がいい気がする。
まぁMetalの方がいいのは当然か。後発で一社が好きに決められるMetalの方が悪かったら困っちゃうからな。</p>
<p>関係ないがOpenCLが思ったよりもGLSLと違って、しかもOpen GLにもComputing Shaderが入っているとなると、
Open CLは微妙な立ち位置だよなぁ、という気もしてしまう。
GLでええやん感が。</p>
</div></template>


