<template><div><h1 id="directcompute" tabindex="-1"><a class="header-anchor" href="#directcompute"><span>DirectCompute</span></a></h1>
<p>DirectXのCompute Shaderのこと。
Windows上だとランタイムとかの面倒が少ないかな？と思い調査してみる。</p>
<p>Windows 10はDirectX 12がプレインストールされている模様。DirectX 11だとWindows 7まで広がる。
バージョンを調べるのはdxdiag。</p>
<p>とりあえず11で試してみて、困る事が出てきたら12にしてみる方針で。ドキュメントも11を中心に調べる。</p>
<ul>
<li><a href="https://learn.microsoft.com/en-us/windows/win32/direct3d11/direct3d-11-advanced-stages-compute-shader" target="_blank" rel="noopener noreferrer">Compute Shader Overview - Win32 apps - Microsoft Learn</a> プログラミングガイドの1セクション。プログラミングガイドはなかなか良く書けている。</li>
<li><a href="https://learn.microsoft.com/en-us/windows/win32/direct3d11/direct3d-11-advanced-stages-compute-create" target="_blank" rel="noopener noreferrer">How To Create a Compute Shader - Win32 apps - Microsoft Learn</a> 試してみたい。
<ul>
<li><a href="https://github.com/walbourn/directx-sdk-samples/tree/main/BasicCompute11" target="_blank" rel="noopener noreferrer">directx-sdk-samples/BasicCompute11 at main · walbourn/directx-sdk-samples</a>  サンプル</li>
</ul>
</li>
<li><a href="https://learn.microsoft.com/en-us/windows/win32/direct3d12/directx-12-programming-environment-set-up" target="_blank" rel="noopener noreferrer">Direct3D 12 programming environment setup - Win32 apps - Microsoft Learn</a> DirectXのヘッダファイルの場所とか名前とか知りたい時に。
<ul>
<li><a href="https://learn.microsoft.com/en-us/windows/win32/direct3d12/working-samples" target="_blank" rel="noopener noreferrer">Working Samples - Win32 apps - Microsoft Learn</a></li>
</ul>
</li>
<li><a href="https://developer.download.nvidia.com/compute/DevZone/docs/html/DirectCompute/doc/DirectCompute_Programming_Guide.pdf" target="_blank" rel="noopener noreferrer">NVIDIAのDirectComputのpdf</a> 良く引っかかるのでメモしておく。</li>
<li><a href="https://www.nvidia.com/content/GTC/documents/1015_GTC09.pdf" target="_blank" rel="noopener noreferrer">Direct Compute – Bring GPU Computing to
the Mainstream.pdf</a> 2009年のNVIDIAのカンファレンスのpdfだが、CUDA, OpenCL分かってる人にとって良いオーバービューになっている。</li>
<li><a href="https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl" target="_blank" rel="noopener noreferrer">High-level shader language (HLSL) - Win32 apps - Microsoft Learn</a>
<ul>
<li><a href="https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-abs" target="_blank" rel="noopener noreferrer">abs - Win32 apps - Microsoft Learn</a> プリミティブの一例</li>
</ul>
</li>
</ul>
<h2 id="computing-shaderのタイムアウト" tabindex="-1"><a class="header-anchor" href="#computing-shaderのタイムアウト"><span>Computing Shaderのタイムアウト</span></a></h2>
<p>Dispatchのエラーを見る場所が特に無いが、最後に結果をMapする所でGetDeviceRemovedReasonで結果がもらえる事がある。</p>
<p><a href="https://gamedev.stackexchange.com/questions/165356/directx-11-compute-shader-error-dxgi-error-device-hung" target="_blank" rel="noopener noreferrer">c++ - DirectX 11 Compute Shader error DXGI_ERROR_DEVICE_HUNG - Game Development Stack Exchange</a></p>
</div></template>


