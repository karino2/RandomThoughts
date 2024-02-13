DirectXのCompute Shaderのこと。
Windows上だとランタイムとかの面倒が少ないかな？と思い調査してみる。

Windows 10はDirectX 12がプレインストールされている模様。DirectX 11だとWindows 7まで広がる。
バージョンを調べるのはdxdiag。

とりあえず11で試してみて、困る事が出てきたら12にしてみる方針で。ドキュメントも11を中心に調べる。

- [Compute Shader Overview - Win32 apps - Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/direct3d11/direct3d-11-advanced-stages-compute-shader) プログラミングガイドの1セクション。プログラミングガイドはなかなか良く書けている。
- [How To Create a Compute Shader - Win32 apps - Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/direct3d11/direct3d-11-advanced-stages-compute-create) 試してみたい。
  - [directx-sdk-samples/BasicCompute11 at main · walbourn/directx-sdk-samples](https://github.com/walbourn/directx-sdk-samples/tree/main/BasicCompute11)  サンプル
- [Direct3D 12 programming environment setup - Win32 apps - Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/direct3d12/directx-12-programming-environment-set-up) DirectXのヘッダファイルの場所とか名前とか知りたい時に。
   - [Working Samples - Win32 apps - Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/direct3d12/working-samples)
- [NVIDIAのDirectComputのpdf](https://developer.download.nvidia.com/compute/DevZone/docs/html/DirectCompute/doc/DirectCompute_Programming_Guide.pdf) 良く引っかかるのでメモしておく。
- [Direct Compute – Bring GPU Computing to 
the Mainstream.pdf](https://www.nvidia.com/content/GTC/documents/1015_GTC09.pdf) 2009年のNVIDIAのカンファレンスのpdfだが、CUDA, OpenCL分かってる人にとって良いオーバービューになっている。
- [High-level shader language (HLSL) - Win32 apps - Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl)
   - [abs - Win32 apps - Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-abs) プリミティブの一例

## Computing Shaderのタイムアウト

Dispatchのエラーを見る場所が特に無いが、最後に結果をMapする所でGetDeviceRemovedReasonで結果がもらえる事がある。

[c++ - DirectX 11 Compute Shader error DXGI_ERROR_DEVICE_HUNG - Game Development Stack Exchange](https://gamedev.stackexchange.com/questions/165356/directx-11-compute-shader-error-dxgi-error-device-hung)