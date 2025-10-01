<template><div><ul>
<li>[[JetpackCompose]]</li>
<li>[[StorageAccessFramework]]</li>
<li>[[RecyclerView]]</li>
<li>[[Kotlin]]</li>
<li><a href="https://developer.android.com/studio/command-line/adb" target="_blank" rel="noopener noreferrer">Android Debug Bridge (adb)  :  Android Developers</a> WiFiデバッグの説明。</li>
<li><a href="https://cs.android.com" target="_blank" rel="noopener noreferrer">Android code search</a></li>
<li><a href="https://developer.android.com/jetpack/androidx/versions/stable-channel" target="_blank" rel="noopener noreferrer">Stable Releases  -  Jetpack  |  Android Developers</a></li>
<li>[[あおぞらAndroid教室]]</li>
<li><a href="https://developer.android.com/guide/topics/connectivity/nfc/nfc?hl=ja" target="_blank" rel="noopener noreferrer">NFC の基本  -  Connectivity  |  Android Developers</a></li>
<li><a href="https://developer.android.com/courses/android-basics-kotlin/course" target="_blank" rel="noopener noreferrer">Android Basics in Kotlin course  -  Android Developers</a> code labsとか</li>
<li>[[FDroid]]</li>
<li><a href="https://developer.android.com/develop/ui/views/graphics/agsl" target="_blank" rel="noopener noreferrer">Android Graphics Shading Language (AGSL)  -  Views  -  Android Developers</a> AGSLなんて出来てたのか。びっくりするほどドキュメントがなくGLSLとの違いが全然分からんが。</li>
<li><a href="https://fonts.google.com/icons" target="_blank" rel="noopener noreferrer">Material Symbols &amp; Icons - Google Fonts</a> マテリアルデザインのアイコン</li>
</ul>
<h2 id="launcherアイコンの作り方" tabindex="-1"><a class="header-anchor" href="#launcherアイコンの作り方"><span>launcherアイコンの作り方</span></a></h2>
<p>最近はAndroidの Asset Studioを使うのが良い。
AndroidStudioから、</p>
<p><code v-pre>メニュー＞View＞Tool Window＞Resource Manager</code></p>
<p>を選ぶ。
上の所の+を選び、Launcher iconを選びAsset typeをImageにして、
512x512とかの大きめのpngを用意して指定し、TrimをYesにするとだいたい良きに計らってくれる。</p>
<p>前は以下だった。</p>
<p><code v-pre>メニュー＞File＞New＞Image Asset</code></p>
<h2 id="no-user-data-collectedな時のprivacy-policyの書き方" tabindex="-1"><a class="header-anchor" href="#no-user-data-collectedな時のprivacy-policyの書き方"><span>no user data collectedな時のPrivacy Policyの書き方</span></a></h2>
<p>以下にあるように、データを集めてない、というPrivacy Policyが必要らしい。</p>
<p><a href="https://support.google.com/googleplay/android-developer/answer/10787469?hl=en" target="_blank" rel="noopener noreferrer">Provide information for Google Play's Data safety section - Play Console Help</a></p>
<h2 id="adbのソースコードの場所" tabindex="-1"><a class="header-anchor" href="#adbのソースコードの場所"><span>adbのソースコードの場所</span></a></h2>
<p>そのうちMacとの間の移動のアプリとか書きたいなぁ、と思い、adbのソースコードの場所をメモしておく。</p>
<p><a href="https://android.googlesource.com/platform/system/adb" target="_blank" rel="noopener noreferrer">platform/system/adb - Git at Google</a></p>
<p>adb shellとかのGUIラッパくらいでいいかな、とは思っている。</p>
<h2 id="sdk-33へのアップデート作業" tabindex="-1"><a class="header-anchor" href="#sdk-33へのアップデート作業"><span>SDK 33へのアップデート作業</span></a></h2>
<p>gradle/wrapper/gradle-wrapper.propertiesを <code v-pre>distributionUrl=https\://services.gradle.org/distributions/gradle-8.3-bin.zip</code>にする。</p>
<p>ルートのbuild.gradleで<code v-pre>        classpath 'com.android.tools.build:gradle:8.1.1'</code>とする。</p>
<p>アプリの方のbuild.gradleで以下みたいなnamespaceを作る（my.package.idはAndroidManifests.xmlのpackageに書いていたもの、AndroidManifestsの方は削除）</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">android {</span>
<span class="line">...</span>
<span class="line">    namespace 'my.package.id'</span>
<span class="line">    kotlinOptions {</span>
<span class="line">        jvmTarget = '1.8'</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>compileSdkVersionをcompileSdkに。</p>
<p>buildlToolsVersionは消す。</p>
<p>Settings＞Build, Execution, Deployment＞Gradle JDK を jbr 1.7に。</p>
<p>Playのページは一番左下のPolicy and programのApp contentに必要な事がまとまっている。</p>
</div></template>


