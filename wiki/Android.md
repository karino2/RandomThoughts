- [JetpackCompose](JetpackCompose)
- [StorageAccessFramework](StorageAccessFramework)
- [RecyclerView](RecyclerView)
- [Kotlin](Kotlin)
- [Android Debug Bridge (adb)  :  Android Developers](https://developer.android.com/studio/command-line/adb) WiFiデバッグの説明。
- [Android code search](https://cs.android.com)
- [Stable Releases  -  Jetpack  |  Android Developers](https://developer.android.com/jetpack/androidx/versions/stable-channel)
- [あおぞらAndroid教室](%E3%81%82%E3%81%8A%E3%81%9E%E3%82%89Android%E6%95%99%E5%AE%A4)
- [NFC の基本  -  Connectivity  |  Android Developers](https://developer.android.com/guide/topics/connectivity/nfc/nfc?hl=ja)
- [Android Basics in Kotlin course  -  Android Developers](https://developer.android.com/courses/android-basics-kotlin/course) code labsとか
- [FDroid](FDroid)
- [Android Graphics Shading Language (AGSL)  -  Views  -  Android Developers](https://developer.android.com/develop/ui/views/graphics/agsl) AGSLなんて出来てたのか。びっくりするほどドキュメントがなくGLSLとの違いが全然分からんが。
- [Material Symbols & Icons - Google Fonts](https://fonts.google.com/icons) マテリアルデザインのアイコン

## launcherアイコンの作り方

最近はAndroidの Asset Studioを使うのが良い。
AndroidStudioから、

`メニュー＞View＞Tool Window＞Resource Manager`

を選ぶ。
上の所の+を選び、Launcher iconを選びAsset typeをImageにして、
512x512とかの大きめのpngを用意して指定し、TrimをYesにするとだいたい良きに計らってくれる。


前は以下だった。

`メニュー＞File＞New＞Image Asset`

## no user data collectedな時のPrivacy Policyの書き方

以下にあるように、データを集めてない、というPrivacy Policyが必要らしい。

[Provide information for Google Play's Data safety section - Play Console Help](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en)

## adbのソースコードの場所

そのうちMacとの間の移動のアプリとか書きたいなぁ、と思い、adbのソースコードの場所をメモしておく。

[platform/system/adb - Git at Google](https://android.googlesource.com/platform/system/adb)

adb shellとかのGUIラッパくらいでいいかな、とは思っている。

## SDK 33へのアップデート作業

gradle/wrapper/gradle-wrapper.propertiesを `distributionUrl=https\://services.gradle.org/distributions/gradle-8.3-bin.zip`にする。

ルートのbuild.gradleで`        classpath 'com.android.tools.build:gradle:8.1.1'`とする。

アプリの方のbuild.gradleで以下みたいなnamespaceを作る（my.package.idはAndroidManifests.xmlのpackageに書いていたもの、AndroidManifestsの方は削除）

```
android {
...
    namespace 'my.package.id'
    kotlinOptions {
        jvmTarget = '1.8'
    }
}
```

compileSdkVersionをcompileSdkに。

buildlToolsVersionは消す。

Settings＞Build, Execution, Deployment＞Gradle JDK を jbr 1.7に。


Playのページは一番左下のPolicy and programのApp contentに必要な事がまとまっている。