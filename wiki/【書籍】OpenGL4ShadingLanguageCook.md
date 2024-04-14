- [CG](CG)
- [書籍](%E6%9B%B8%E7%B1%8D)
- [PacktPublishing/OpenGL-4-Shading-Language-Cookbook-Third-Edition: OpenGL 4 Shading Language Cookbook - Third Edition, published by Packt](https://github.com/PacktPublishing/OpenGL-4-Shading-Language-Cookbook-Third-Edition/tree/master) サンプルコード

[amazon: OpenGL 4 Shading Language Cookbook: Build high-quality, real-time 3D graphics with OpenGL 4.6, GLSL 4.6 and C++17, 3rd Edition](https://amzn.to/4cF8Qg0)
  
## 購入動機など 2024-03-30 (土)

OpenCLやMetalのコンピューティングシェーダーなどは結構触ってきたので割と慣れているのだが、
普通のグラフィックスのシェーダーは使った事が無い。
使う予定も無いんだが。

ただグラフィックス系の処理ではフラグメントシェーダーで描かれている例などを見る事もあるし、
そうした例の常識的なものを知っておきたいというのもあって、
GLSLの本を読みたくなった。

ただしOpenGLのホスト側にはあまり関心が無い。

そんな感じでググっていたら、redditでこの本が薦められていて、サンプルを見たら悪く無さそうだったのでポチって見る。
Kindle版が4000円だった。

サンプルを見た範囲だとレシピごとに記述が割と独立しているので使いやすそうだが、
最初の方はホスト側というか前準備の話が多いので、買ってみないと分からんなぁ、と思い購入。

## diffuseオンリーのシェーディングまで読んだ 2024-04-12 (金)

diffuseオンリーのシェーディングまで読んだ。CGの本としては理論的な解説が薄めだが、どこかで基本を学んだあとなら使いやすいコード例がたくさんあって良い気もする。
ただ自分の目的としてはあまり3Dの頂点データがたくさんある前提の話は使えないのでこの辺は飛ばそうかな。

この辺の話は昔Real Time Renderingsの勉強会で結構真面目にやったのを読んでいて思い出す。
当時は使う予定も無く勉強していたが、意外とこうやって何十年もあとに使うことになったりして世の中分からないものだな。

昔Real Time Renderingsを勉強していた頃は、ハードウェアのことを良く分かっていなかったので、数学的な事だけを真面目に理解していた気がする。
それはプログラマとしては全く意味の無い事ではあるんだが、
ハードウェアとかこの辺のプログラムに詳しくなった今改めて読むと、数学的な事をやけに真面目に理解した過去があると、内容がえらく簡単になるのでスラスラ読んでいけるな。

### サンプルのソースの確認

トーラスのデータはどうやって指定しているのかを読み直したが、特に解説は無い。
サンプル、[OpenGL-4-Shading-Language-Cookbook-Third-Edition/chapter03/scenediffuse.h at master · PacktPublishing/OpenGL-4-Shading-Language-Cookbook-Third-Edition](https://github.com/PacktPublishing/OpenGL-4-Shading-Language-Cookbook-Third-Edition/blob/master/chapter03/scenediffuse.h)を読むと、Torusとかいうクラスが使われていて、`torus.render()`とかいうメソッドが呼ばれている。

TorusはTriangleMeshのサブクラスで、renderはこちらに定義されている。[OpenGL-4-Shading-Language-Cookbook-Third-Edition/ingredients/trianglemesh.cpp at master · PacktPublishing/OpenGL-4-Shading-Language-Cookbook-Third-Edition](https://github.com/PacktPublishing/OpenGL-4-Shading-Language-Cookbook-Third-Edition/blob/master/ingredients/trianglemesh.cpp)
これは序盤に解説のあったVAOを設定してglDrawElementsを呼んでいるな。glDrawElementsはUsing element arraysの所に一応説明があるが、詳細はOpenGLのドキュメントを読んでくれ、との事。
この辺の解説は微妙だなぁ。

サンプルを通して全体を説明する、というよりは、
サンプルのカタログって側面が強い気がする。

## Image Processingのあたりを読んでいる 2024-04-14 (日)

この本、ホスト側の解説が少ないのがいまいちだな。
GLSLの本なのでそちらが中心だ、という理屈は分かるが、
マルチパスの話とかをホスト側を載せずに説明しても具体的な事が全然出てこないのでいまいち。
ただ上記リンク先のサンプルソースを読めば分かるので、最低ラインはクリアしていると言えるかもしれない。
でもカフェでタブレットだけ持っていって読書する時とかはいまいちだなぁ。