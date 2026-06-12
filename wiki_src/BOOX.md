[[タブレット]], [[グッズ関連]], [[キーボード]]

AndroidのE-inkデバイス。

- [[PngNote]] BOOX用に書いたノートアプリ。
- [[マグナスケッチ]] BOOX用に書いた磁気ボードみたいなアプリ
- [karino2/ToggleOrient: Toggle portlait-landscape on Android.](https://github.com/karino2/ToggleOrient)
- [karino2/SSaverSetter: Receive image intent and set to ScreenSaver, for BOOX only.](https://github.com/karino2/SSaverSetter) マグナスケッチをスクリーンセーバーにするために。
- [[Rhinocs]] これはBOOX以外でも使えるけど。


## Note3

- [boox-note3 – SKT株式会社](https://sktgroup.co.jp/boox-note3/)
- [ONYX BOOX Note3を買った](https://karino2.github.io/2020/12/10/boox_note3.html)  2020年12月10日、64800円
  - [BOOX Note3、買ってしばらく経ったが相変わらず良いという話](https://karino2.github.io/2021/01/29/boox_after.html)
受けてバッテリをニコイチした。

2026年くらいからバッテリの保ちが悪くなる。1年くらいあまり使わずに放置していたせいかも。

一旦使い切ってカリブレーションされるのを期待するかな。＞変わらず

2026年にBOOX Proをよしぞうさんから譲り受けてバッテリを移植＞[BOOX ProのバッテリをBOOX Note3に移す](https://karino2.github.io/2026/05/10/BOOX_Pro_Note3_battery_substitute.html) 

**スペック**

- パネル：フラット10.3インチEinkフレキシブルスクリーン
- 解像度：1872×1404 Carta (227dpi)
- タッチ：静電容量式タッチ+4096段階筆圧検知ワコムペン
- CPU：クアルコム８コア (Cortex-A72 + Cortex-A55)
- メモリ：4GB LPDDR4Xメモリ
- ROM：64GB （UFS2.1）
- ネットワーク：Wi-Fi（2.4GHz + 5GHz）+ BT 5.0
- OS：Android 10
- 電池容量：4300mAh Polymer Li-on

### USBデバッグ

たまに触ると忘れる。アプリのタブから右上のアプリを選ぶとなんかそれっぽい設定に行ける。なんか一度どこかで何かを連打とかでenableにしたかもしれない。


### タブレットスタンド 2026-05-24（追記：ペンに干渉して一部かけなくなる！）

[amazon: タブレットスタンド リング式](https://amzn.to/3RDvvmY) 

[[Rhinocs]]と[[キーボード]]で文章入力環境がいい感じになってきたので、
BOOX用に後ろにはっつけるスタンドが欲しいなぁ、という気分になってamazonをぐるぐるした結果ぽちったもの。

マグネット式と書いてあるが両面テープがうんぬん、とも書いてあって、どっちやねん、と思っていたが、実物は両面テープで貼りつけるものだった。
丸いシールが別に付属しているがマグネットっぽくも無いし使い道が不明。
下に貼るものに見えるが貼る意味は不明だ。剥しやすいとかかな？

BOOXを開いてすぐ立てかけられるようにはなったので、目的は満たしている気がする。
今キーボードでタイプしてみているが、キーボードでタイプしている時には不満は無い。

持ち運ぶ時にどのくらい邪魔かはもう少し使ってみないと分からないな。
厚みはちょっとある。重さは気にならないかな。
本を読む時にカバーを後ろにしようとしてもでっぱりのせいで少しぴたっとつなげて持てない。
ただ少し隙間があってもまぁいいかという気もする。

回転するのとヒンジが割と固いので開き具合いを選べて、スタンドとしては有能な気はしている。

## SDKメモ

- [onyx-intl/OnyxAndroidDemo](https://github.com/onyx-intl/OnyxAndroidDemo) 公式デモ
- [Maven Repository: com.onyx.android.sdk » onyxsdk-device](https://mvnrepository.com/artifact/com.onyx.android.sdk/onyxsdk-device)
- [Maven Repository: com.onyx.android.sdk » onyxsdk-pen](https://mvnrepository.com/artifact/com.onyx.android.sdk/onyxsdk-pen)
- [inksdk/inkcontroller/src/main/java/com/inksdk/ink/OnyxInkController.kt at main · imedwei/inksdk](https://github.com/imedwei/inksdk/blob/main/inkcontroller/src/main/java/com/inksdk/ink/OnyxInkController.kt) いろいろ対応していそうなコード例。

## 画面の一部がスタイラスが反応しなくなる 2026-06-07 (日)

MagnaSketchを使っていて気付いたが、画面の真ん中より少し右下くらいにスタイラスの効かない領域が出来ていた。
アプリによらず効かない。タッチは効く。ぐぬぬ。

### と思ったら後ろのスタンドのせいだ！

スタンドを回転してみるとかけない領域が移動する事に気づいた。スタンドのせいだ！

## スクリーンセーバーのメモ

/data/local/assets/images に standby-1.png がある。2と3がどこにあるかは不明。

[karino2/SSaverSetter: Receive image intent and set to ScreenSaver, for BOOX only.](https://github.com/karino2/SSaverSetter) で二回目以降が無視されてしまう問題を調べた結果を。

スクリーンセーバーのセットは最終的にはonyx.action.SCREENSAVERへのインテントでセットされるのだが、
これは内部でPictures下に渡されたuriからとったファイル名のファイルを作って保存して、それをセットしているっぽい。

そして同じ名前（パスが違っても）のファイルがあると更新せずに古いのを再利用してしまう。

パスとしては手持ちのNote3では `/storage/emulated/0/Pictures/` になっていて、Fileオブジェクトを作ればファイルがあるかどうかは確認出来るが削除は出来なさそう。
このpermissonも良く分からないので、SSaverSetterとしては連番をつけて、定期的に削除を手でやってもらう事にする。

なお、ここのファイルを消すとスクリーンセーバーはデフォルトに戻る。

## apkのリリース手順

レポジトリの設定のSecrets and variablesのActionsで、SecretsのタブのRepositorySecretsに以下を追加

- SIGNING_KEY
- SIGNING_KEY_ALIAS
- SIGNING_KEY_PASSWORD
- SIGNING_STORE_PASSWORD

なおSIGNING_KEYは

```
base64 -i  release_keystore_for_github_actions.jks | tr -d '\n' | pbcopy
```

とかしたものをペースト。