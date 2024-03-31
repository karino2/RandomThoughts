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

## GPU関連

- [【書籍】OpenGL4ShadingLanguageCook](%E3%80%90%E6%9B%B8%E7%B1%8D%E3%80%91OpenGL4ShadingLanguageCook)