- [技術的なメモ](%E6%8A%80%E8%A1%93%E7%9A%84%E3%81%AA%E3%83%A1%E3%83%A2)
- [Metal](Metal)
- [【書籍】PrinciplesOfDigitalImageProcessing](%E3%80%90%E6%9B%B8%E7%B1%8D%E3%80%91PrinciplesOfDigitalImageProcessing)
- [Are there any books on shaders? : r/GraphicsProgramming](https://www.reddit.com/r/GraphicsProgramming/comments/olbkpi/are_there_any_books_on_shaders/)
- [ShaderToy Tutorials - YouTube](https://www.youtube.com/playlist?list=PLGmrMu-IwbguU_nY2egTFmlg691DN7uE5)
- [Shadertoy BETA](https://www.shadertoy.com/)
- [XDC 2022 - Implementing the graphics pipeline on compute - Erik Faye-Lund - YouTube](https://www.youtube.com/watch?v=DREz3n7gZPw)

## GPUでのPath描画

misreading chatで紹介していたエピソードが興味深かったので、関連論文を読みたい。

[103: GPU-Accelerated Path Rendering – Misreading Chat](https://misreading.chat/2022/11/01/103-gpu-accelerated-path-rendering/) 

### GPUを使って曲線を描く (2005 MSR)

[Resolution Independent Curve Rendering using Programmable Graphics Hardware - Microsoft Research](https://www.microsoft.com/en-us/research/publication/resolution-independent-curve-rendering-using-programmable-graphics-hardware/)を読んでみる。

パラメトリックに記述された曲線をx, yの表現に直す事でGPUで描くというもの。ある種の曲線は放物線を変換したものとして表現出来る事を使う事で、GPUで高速に描けるとか。

- conic section 円錐曲線（円錐の断面）

3章でquadraticなケースを、4章でqubicなケースをやっていて、3の冒頭がquadraticの場合の本体に思う。基本的なアイデアとしては任意のx, yをu, vスペースに射影して式1の正負で塗り分ける、という事だと思う。

shader toyの以下 [Bezier quadratic (Loop/Blinn)](https://www.shadertoy.com/view/flG3Rt) を見ると、barycentricというの以外はだいたいここに書いてあるのと同じ事をしているように見える。
三角形の重心座標、というのがあるのかな。
ググってみて以下に当たる。

[三角形の重心座標とその応用 - 高校数学の美しい物語](https://manabitimes.jp/math/805)

ふむふむ。
重心座標を求めて、それをd, e, fの係数に使っている。
ちょっと良く分からないな。

もうちょっと論文に沿って考えてみよう。
まずuvスペースで曲線の中を塗る事は、式1が負の所に点を打てば良いだろう。

元のスペースはb0, b1, b2の三点から、このuvスペースへの変換を考えれば良い。
b0を0, 0に変換して、b0b1を(1/2, 0)に、b0b2を(1, 1)に変換すればいいのか？

お、分かってきたぞ。b0, b1, b2の三角形の中のある点Pを、対応するuvの三角形の中のどの辺になるか、というのを考えるのに重心座標を使うのか。
そしてbの方の三角形の比をuvの方の三角形の方でも使うと対応する三角形の位置が分かるんだな。
これは自明では無いが、まぁ感覚的にはなるんだろう。
厳密にはb0b1とb0b2の線形和で点Pを表して、この係数をスケールしてやれば同じ話にできそうだが、
それと重心座標系は同じような事をやってそうに思う。

まぁ向きとか全部場合分けしないとちゃんとは分からないが、たぶん依存しないんだろう。

よし、shader toyのコードはだいぶ理解出来た。

さらに [Chapter 25. Rendering Vector Art on the GPU - NVIDIA Developer](https://developer.nvidia.com/gpugems/gpugems3/part-iv-image-effects/chapter-25-rendering-vector-art-gpu) を読んでいた所、もっと理解が深まった。

ようするに単純に３つのコントロールポイントのvertexにu, vのそれぞれ(0, 0), (1/2, 0), (1, 1)を入れてやると、フラグメントシェーダーの方ではその対応する値が降ってくるので、単にuとvの計算をするだけで勝手に色が濡れる、という事の模様。

なるほど、これは賢い！uvとの変換を自分でするんじゃなくて、補間結果が勝手に変換された事になるんだな。

## GPU関連

- [【書籍】OpenGL4ShadingLanguageCook](%E3%80%90%E6%9B%B8%E7%B1%8D%E3%80%91OpenGL4ShadingLanguageCook)