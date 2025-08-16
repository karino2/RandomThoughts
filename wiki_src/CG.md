- [[技術的なメモ]]
- [[Metal]]
- [[ガンマ補正]]
- [Are there any books on shaders? : r/GraphicsProgramming](https://www.reddit.com/r/GraphicsProgramming/comments/olbkpi/are_there_any_books_on_shaders/)
- [ShaderToy Tutorials - YouTube](https://www.youtube.com/playlist?list=PLGmrMu-IwbguU_nY2egTFmlg691DN7uE5)
- [Shadertoy BETA](https://www.shadertoy.com/)
- [XDC 2022 - Implementing the graphics pipeline on compute - Erik Faye-Lund - YouTube](https://www.youtube.com/watch?v=DREz3n7gZPw)
- [[【書籍】PrinciplesOfDigitalImageProcessing]]
- [[【書籍】OpenGL4ShadingLanguageCook]]
- [[【書籍】HLSLシェーダーの魔導書]]
- [math - Is there a good GLSL hash function? - Stack Overflow](https://stackoverflow.com/questions/23319289/is-there-a-good-glsl-hash-function) シェーダーでのハッシュ関数。randでは無くハッシュが欲しい事もあるんだよな。

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

## GPUを使って三角形を描く

[Buffer pass bloom](https://www.shadertoy.com/view/lsBfRc)　を見ていたら、三角形を以下で描いていた。

```
float getTriangle(vec2 p, vec2 rp){
    p *= vec2(iResolution.x, iResolution.y);
    p /= max(iResolution.x, iResolution.y);
    
    p -= rp;

    vec3 color = vec3(0.0);
    float d = 0.0;

    // Remap the space to -1. to 1.
    p = p *2.-1.;

    // Number of sides of your shape
    int N = 3;

    // Angle and radius from the current pixel
    float a = atan(p.x,p.y)+PI;
    float r = TWO_PI/float(N);

    // Shaping function that modulate the distance
    d = cos(floor(.5+a/r)*r-a)*length(p);

    return 1.0-step(.12,d);
}
```

最後のcosの中が良く分からない。イメージとしては三角形の各辺に垂線をおろして、それが一定の距離以下、という事で描いているんじゃなかろうか、と思うのだが。
軽く封筒の裏計算をしてみた所、シータの3つの範囲で場合分けが必要に思えるが、そうした事をしていない。floorでそういう小細工をしているんじゃないか。

場合分けは、0から2piで見ると、以下の３つで必要になる。

- 0〜pi/2と11pi/6〜2pi ...  - pi/6
- pi/2〜7pi/6 ... -5pi/6
- 7pi/6〜11pi/6 ... -3pi/2

右側は引く数字。2pi/3ずつ増えていく。なるほど。シータに2piを掛けたものを3で割って、一周を３つの区画に分けているのか。
ちゃんと計算はしてないがなりそうだな。

### GPUで正方形

上記三角形と同じ所に以下があった。

```
float getSquare(vec2 p, vec2 rp){
    p *= vec2(iResolution.x, iResolution.y);
    p /= max(iResolution.x, iResolution.y);
        
    p += rp;
    vec2 bl = step(abs(p * 2.0 - 1.0),vec2(0.2));
    float rt = bl.x * bl.y;
    
	return rt;
}
```

こちらは難しくは無いが、へーって感じするよね。xとyの中心からの距離を出して、step関数を使って掛け算する。

## OKlabカラースペース

[[【書籍】PrinciplesOfDigitalImageProcessing]]にはCIELabやCIELuvが解説されていたが、それの改善版としてOKlabというのがあるらしい。lは小文字か。

[A perceptual color space for image processing](https://bottosson.github.io/posts/oklab/)

計算は割と簡単だな。xyzへの変換も3x3の行列になっているので、掛けた結果の行列をあらかじめ求めておけば単なる行列適用と簡単な指数乗の組み合わせで求められる。いいね。

## xyzとsRGBの変換

まず[[ガンマ補正]]してから計算する。

- [[【書籍】PrinciplesOfDigitalImageProcessing]] の2冊目（Core Algorithm）の6.3.1 (p107)から詳しい解説がある。
- [Color space conversion (2)](https://fujiwaratko.sakura.ne.jp/infosci/colorspace/colorspace2_e.html)
- [sRGB - Wikipedia](https://en.wikipedia.org/wiki/SRGB)
- [Bruce Lindbloom: RGB to XYZ](http://www.brucelindbloom.com/index.html?Eqn_RGB_to_XYZ.html)
