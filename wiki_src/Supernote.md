Mantaを買った。

- [Supernote Manta – Supernote Japan](https://supernote.jp/pages/supernote-a5-x2-manta)
- [reddit r/Supernote](https://www.reddit.com/r/Supernote/)

## スペック

- 10.7
- 300 ppi
- 375g
- フロントライト無し
- 3600mAh

### ファームウェア関連

redditから公式サイトに行くとupdate.zipがダウンロード出来てそれを手動でインストールすると降ってくるのを待たなくて良い。

[ファームウェアのダウンロードとシステムのアップデート - Supernote](https://support.supernote.com/change-log/how-to-update-your-supernote)

展開方法を調べていてroot関連のドキュメントを見つける。

[sugoi-supernote/Guides/How to root SN A6X2.md at main · dwongdev/sugoi-supernote](https://github.com/dwongdev/sugoi-supernote/blob/main/Guides/How%20to%20root%20SN%20A6X2.md)

update.zipはFinderからは開けなかったのでterminalからunzipした。

展開にはmagiskbootを使ってみる。

[Releases · PinNaCode/magiskboot_build](https://github.com/PinNaCode/magiskboot_build/releases)

chmod +xして設定から許可して以下を実行。

```
./magiskboot unpack boot.img
```

### low latency的な奴

- [mpdairy/monopaint](https://github.com/mpdairy/monopaint) コードがAI生成で読みにくい…
- [YoramDevGH/AnimInk: Offline frame-by-frame animation for the Supernote Nomad e-ink tablet](https://github.com/YoramDevGH/AnimInk)
  - [AnimInk/docs/PERFORMANCE_RESEARCH.md at main · YoramDevGH/AnimInk](https://github.com/YoramDevGH/AnimInk/blob/main/docs/PERFORMANCE_RESEARCH.md)


### 届いた〜！ 2026-10-09 (金)

朝の6時には最寄りの営業所まで来ていたのだが家まで来たのは16時という。まぁ３日で届いたのでなかなか優秀だ。

開封してセットアップ。開幕WiFiに接続、を押しても無反応でRedditを調べるとskipしてあとで設定すればいいとか。なんか昔GalaxyTabかなんかでもこんなのあったな。

セットアップして手書き。ペンはBOOX Note3のペンでもいいかな、という感じではある。
自分の机の上だと思ったより暗いなぁ。デスクライトとか無いからなぁ。

### 世の中の電子書籍アプリは意外と動く

あまり電子書籍を読む気は無かったのだが、Kindleが公式で入れられて結構ちゃんと動いたので、
Aurora Storeから他のも試してみたら、DolyとかSony Readerとかは一通り動く。思ったより動くなぁ。
Dolyは結構買ってるのでDolyが動くなら使ってもいいかもしれん。

ただネットワークはなんか遅い。出先で何かダウンロードする気は起こらないな。

### アプリをデバッグ実行じてみる

サイドロードを有効にするだけで、普通にケーブルつなげてadbが認識する。開発者モードに降りるとかも不要で、そのままデバッグ実行出来る。楽だね。

RhinocsはonTouchがキーボードからは来ない（画面触るとスタイラスは来る）。通常のEditTextのアプリだと普通に入力は出来るので、何か対応が必要そう。
onPreImeは来てるのでSupernoteだったらこっちで処理するように変更。とりあえずRhinocsは動かせたヽ(´ー｀)ノ

[[マグナスケッチ]]をなんとなくlow renderingっぽい事をしてみたがさっぱり反応せず。コードを見ていると間違いには気づいたが、

### 購入 2026-10-06 (火)

本体76980円、ハーフフォリオケースが8980円で合計85960円。
ケースちょっと高い気もしたが、割と満足している人が多いので買ってみる事にした。
スタイラスは買わない。高い割に他の奴でも満足している人は結構多いし、Note3のスタイラスはたぶん使えるのでまずそれを試してから考える。

2026-10-08 (木) の18時ころに発送メールが届く。
クロネコヤマトの安曇野豊科営業所で発送となっているな。
上海から届くという噂もあったが少なくとも今は長野県あたりから届くっぽいな。