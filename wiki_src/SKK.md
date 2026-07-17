[[Rhinocs]]

- [SKK (Simple Kana to Kanji conversion program) Manual — ddskk 17.1 ドキュメント](https://ddskk.readthedocs.io/ja/latest/) 本家のドキュメントはここという事になるんだろうか。
- [karino2/RhinocsSKK: SKK port for Rhinocs](https://github.com/karino2/RhinocsSKK/) [[Rhinocs]]上のSKK。
  - [hkurokawa/chrome-skk: An SKK implementation for ChromeOS IME API.](https://github.com/hkurokawa/chrome-skk/tree/main) ChromeOS用(jmuk版)をhkurokawa氏がメンテしているもの、RhinocsSKKの派生元
  - [loyaltouch/Skk-Mode: xyzzy-skk-mode](https://github.com/loyaltouch/Skk-Mode/tree/master) xyzzyのSkk-Mode。実装が単純なのに普通に使えるので良く参考にしている。

実装が簡単で辞書も小さく、けれどかなり実用になる凄いIME。送り仮名でちょっと使う側が頭を使う。
自分が学生の頃はnemacsにSKKを使っていた。

## RhinocsSKK

[karino2/RhinocsSKK: SKK port for Rhinocs](https://github.com/karino2/RhinocsSKK/) このページは主にこれを扱う。

[[Rhinocs]]上に移植したSKKだが、辞書のロードなどはkotlin側で書いている。[[Rhinocs]]はどうせSKKでしか使わない予定なのでかなり特別扱いしている。
innerSKKは廃止してダイアログでAndroidのEditTextを出すような作りにしている（外部のIMEで漢字が登録出来るように）。

**Dogfoodメモ**

- DONE ... ダイアログをC-gでキャンセルした時の状態をちゃんと戻す
- DONE ... preeditでC-nとかが動くのも良くない
- DONE ... preeditでC-kが効いているがたぶん良く無い。(でもどうするのがいいかな？)
- DONE ... ｢りふぁk｣と入力してバックスペースを二回以上押してもkより前が消えない
- DONE ... cyuuで｢ちゅう｣にならない
- DONE ... cyauで｢ちゃう｣にならない。
- DONE ... hiraganaでは＞記号は全角にしたい(良く使うので)

### キャレットの移動はサポートしない事に 2026-06-26 (金)

clearCompositionとか確定の周辺は、バッファに直接かきこんでいるRhinocsと変換用の特別な状態を持つと思われるChromeOSで結構違いがでて、
つじつまをあわせるのが難しい。

そこでpreeditでの左矢印などの移動はサポートしない事にする。
preedit中は知らないキーはデフォルトに流すのではなく握りつぶす事にした。

### 変換途中のundoの試行錯誤撤退メモ

insertなどにundoTrackをfalseにするモードが追加されたので、clearCompositionとかだけundo情報を持たせなければいいんじゃないか、と思ったが、
clearCompositionがcommitTextの後に呼ばれるとUndo情報のpointがずれるのでうまくいかなかった。
conversionModeは順番変えるだけで直せたが、
例えばひがらなの「の」などでうまくいかない。
これはskk.jsのhandleKeyEventでkeyHandlerを呼んでからupdateCompositionとかclearCompositionをするからで、これを直すのは手間なので撤退した。