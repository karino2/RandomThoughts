- [【公式】UQ WiMAX（wifi/ルーター）│高速モバイルネット wifiサービス](https://www.uqwimax.jp/wimax/)

## BiglobeからUQ-WiMaxに乗り換え (2023-08-26 (土))

BiglobeでSpeed Wi-Fi 5G X11という機種で契約していたが、発熱が酷く、
夏には熱すぎて通信やめるね、みたいな事言いだしたりするので乗り換える事にした。
時間帯的にもなんかつながらない時間があるし。

ちょうどUQ-WiMaxがGalaxy 5Gを2円で提供するキャンペーンをやっていたので、
UQ-WiMaxに乗り換える事に。

アフィサイトとかの計算では3年くらいで解約で比較するのが多い（というかそうなるようにキャンペーンをうってる所がキックバックが多いんだろうが）が、今回は1年ちょっとだった。
自分は1年で解約する前提で比較する方が良さそうだな。

## Galaxy 5G

2.4GHzと5GHzのどちらかしか選べないが、通信速度が1.5倍くらい違うので、中継機を買う事にした。
最初バッファローにしようとしたがAmazonで発熱がきになるというレビューが多いのでエレコムに。

- [ヨドバシ.com - エレコム ELECOM Wi-Fi中継器 Wi-Fi 5（11ac）対応 867＋300Mbps ブラック [WTC-C1167GC-B] 通販【全品無料配達】](https://www.yodobashi.com/product/100000001005981645/)
- [Wi-Fi 5(11ac) 867+300Mbps無線LAN中継器 - WTC-C1167GC-B](https://www.elecom.co.jp/products/WTC-C1167GC-B.html)
   - [目次 - WTC-C1167GC ユーザーズマニュアル - エレコム株式会社](https://www.elecom.co.jp/support/manual/network/wireless-lan/relay/wtc-c1167gc/usersmanual/?_gl=1*3eotn4*_gcl_au*MTAyNzU0NjYyMS4xNjkzMDE1Njc3*_ga*MTM3NDcyODYzMi4xNjkzMDE1Njc3*_ga_0F81RERH28*MTY5MzAxNTY3Ny4xLjEuMTY5MzAxNTY4NC4wLjAuMA..)

接続はWPSではできなかった上に一度変な状態になると全然設定できないが、リセットしてやり直せばうまく出来た。
でもSSID変えたりとかは出来ないのかね、これ。2.4GHzは名前変えようかと思っていたのだが。あ、出来た。接続した後にSSIDを変えると変更されるのか。
これはわかりにくいなぁ。

でもこれでやりたい事は出来たな。よしよし。

夕方くらいに入りが悪くなった。Biglobeの頃とあんまり変わらないか。ただ、ルーターが熱くならないしバッテリの保ちもいいので、
窓際に置きやすいのが違いか。窓際だとつながりにくい時間でもつながる。電波の問題なのかしら？

鎌倉の家で日曜の夜に測ったら、は[みんそく](https://minsoku.net/searches/results?word=WiMax+%E9%8E%8C%E5%80%89)の計測で


| 種類 | 測定結果 |
| ---- | ---- |
| Jitter |	10.27ms |
| Ping |	45.7ms |
| 下り |	26.69Mbps(普通) |
| 上り |	5.06Mbps(遅い) |

遅くね？
翌日の月曜の夜に再度測る。

| 種類 | 測定結果 |
| ---- | ---- |
| Jitter |	8.42ms |
| Ping | 45.1ms |
| 下り | 67.13Mbps(速い) |
| 上り | 8.33Mbps(遅い) |

多少はマシか。

```
Jitter	6.71ms
Ping	37.7ms
下り	48.5Mbps(少し速い)
上り	6.85Mbps(遅い)
```

### 楽天モバイルのテザリング

| 種類 | 測定結果 |
| ---- | ---- |
| Jitter |	14.77ms |
| Ping |	37.5ms |
| 下り |	45.44Mbps(少し速い) |
| 上り |	21.18Mbps(普通) |

月曜の夜に楽天モバイルのテザリングも測ってみた。
少し遅いが、似たようなものだなぁ、これ。

```
種類	測定結果
Jitter	8.85ms
Ping	37.5ms
下り	43.74Mbps(少し速い)
上り	14.25Mbps(あまり速くない)
```

楽天モバイルに乗り換えるかなぁ。

- [Galaxy 5G Mobile Wi-Fi(SCR01)は楽天モバイル最強プランで使えるのかを検証](https://xn--gmowimax-uv4gua1g3gb5p6k8a2956mom7aqbzc.net/galaxy5gmobilewifi-rakutenunlimit/)
- [UQ WiMaxから楽天モバイル2回線に乗り換え - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2024/10/09/uq_wimax_to_rakuten_2line.html)

## 契約プラン

プランがいっぱいあってどれかわからなくなるのでメモしておく。

「ギガ放題プラス ホームルータープラン/ギガ放題プラス モバイルルータープラン」で

-  13ヶ月間 税抜き3880円、税込み4268円、毎月682円の割引
- それ以降は4950円（税込み）

モバイルルーターのGalaxy 5Gが2円で、その代わり新規の事務手数料が3000円くらい。
ルーターが欲しい人にとっては割と悪くない料金設定だった。13ヶ月後にどうするかはその時考える予定。