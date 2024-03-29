Unique it, 略してuit。gitを参考に考えたファイル管理システム。
すべてのファイルのハッシュを計算して、ハッシュが一致しているファイルは一つだけ実体を持ち、
重複ファイルを消していくようなシステム。

## リンク

- [karino2/uit: Unique it file sync and manage system.](https://github.com/karino2/uit)
- [FSharp](FSharp)
- [自作アプリ](%E8%87%AA%E4%BD%9C%E3%82%A2%E3%83%97%E3%83%AA)

以下はブログに書いたメモとか作業ログ

- [ぼくのかんがえたさいきょうのファイルsyncシステム - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2020/11/12/saikyou_file_sync.html)
- [uitに関するメモ その1 - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2020/12/11/uit_memo_1.html)
- [uitメモ2、ローカルで変更された場合についての考察など - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2020/12/20/uit_memo_2.html)

----

以下は開発メモ

## TODO

- フォルダ以下のlinkファイルだけを全部削除するコマンドを実装
- メタ情報と実際のファイルのタイムスタンプを比較して違うファイルの一覧を表示する機能
   - ファイル側から見るstatと、ハッシュ側から見るhstatを作りたい
   - 不整合があった時にこれらのデータを処理するコマンドを作りたい
- initが不完全な状態で異常終了した時用に、すでにあるエントリは無視するinitを作りたい
- キャッシュを元に計算をさぼるinitを実装したい
  - この時、ファイルサイズも持っておく方がいいかも？

## キャッシュを使ったinitの仕様

.uitの下にcachepath.txtというファイルがあったら、その中身の指すディレクトリの.uitをキャッシュとして使う。
さらに二行目があったら、それをlookup時のprefixとして使う。
ようするにキャッシュ先のサブディレクトリに対応させる為。
最初と最後のスラッシュは無し。

これらの条件を満たす時、initの時のキャッシュの計算としてキャッシュがヒットすればそのハッシュ値を使う事にする。

キャッシュにヒットさせるかどうかは将来的にはファイル名とサイズと日付にしたいが、今はサイズ情報は持ってない。
まずはパスと日付が一致しているケースをヒットとしよう。

### プレフィクスの扱い

initの作業をする時、子供をinitして親にingestは出来るが、親で作業して子供にする事は出来ない。

initの作業は、究極的には一番下のディレクトリで行う事が出来るので、同じサブツリーを含むrepo同士であれば、
プレフィクスさえ指定出来ればいつでも一致する階層でinitの作業をする事は可能と思うので、
まずはプレフィクスを追加するだけで取り除く機能はつけない。

いつでもルックアップ先のキャッシュ側の方がツリーが深いという前提になるが、init作業を下で行う事はいつでも出来るので、この前提はいつでも満たせる（ただし作業がかったるいケースは存在するかもしれない）

## 2022-02-03 時点の雑感

今日、最初の目標であった64GBのmicroSDの全データを管理下に置く、という事が実現出来たヽ(´ー｀)ノ

64GBのmicroSD、いろいろ試行錯誤をしていたら二重エントリとかが出来てしまったので、とりあえず.uitディレクトリを全部削除してやりなおした。
将来的には二重エントリとかも処理出来るようにしたいが、
今はそれよりも正常系がちゃんと動くようにしたいので。

以前64GBを管理下に置くのは一日作業というか一日かけて終わらない感じだったが、
今回はだいぶいろいろ整備されてきたので、複数シェル開いて並行で作業していくとそんな大変でも無い（時間は掛かるが手間はそこまででも無い）。

全データでいちいちこの処理をやり直すのは辛いので、何らかの方法で同じようなデータでは結果を持っていく方法が欲しいなぁ。
最初はメタデータを丸コピーして不整合な一覧を表示する、というのを考えたのだが、ハッシュの計算（のためのread）に時間がかかるのだとすれば、
この計算をキャッシュ的なものから持ってくるようにするだけでもいいかもなぁ。
タイムスタンプとパスが既知のものでハッシュ値があればそれを使う、的な。

不整合を知る方法は欲しい気もするけれど、削除されるケースを考えると面倒なんだよな。
それよりは既存のデータを使ってinitが出来れば、あとはinitした後に手作業で変更された部分を後から一覧で取得出来れば良くて、
このケースでは削除はあまり考えなくても…
待てよ？そもそもキャッシュから高速にinit出来るのなら、既存の.uitをrenameしてこれを元にまたinitし直せば不整合はすべて無くせるんじゃないか。
実装も簡単だし安全そうだし、こっちの方が良さそうだな。

速度次第ではあるが、ファイルのバックアップの都度一回走らせるくらいだから、多少長いくらいなら待てるかもしれない。

USBハードディスク側ではそのうち不整合のチェックは欲しくなる気もするが、まずは必要になるまでやらないの精神でいってみよう。

次は複数のmicroSDのデータを管理する為の機能を追加すれば、Google Play Musicからサルベージしたデータのうち必要なものだけスマホに移す、と、壊れたギャラノの本体データをバックアップして端末を廃棄するという、とりあえず解決したい問題が解決出来るはず。
もう2日くらい開発すればそこまでイケるかな。
ただちょっと燃え尽きてきたので少し違う事をやって寝かせたい。

ある程度自分が使いたいと思ってるユースケースで使ってみて固まってきたら、第三者向けの解説を作るかなぁ。
だいぶ複雑になってしまったので、自分以外に理解出来るような説明が書けるかは分からないが。

## hashのディレクトリが意外と大きい

6.8GBの音楽のディレクトリを管理したら、管理領域が281MBになった。うーん、少ないような大きいような。
Macにコピーするだけで8MBになる。exFAT効率悪すぎだなぁ。ほとんど空のフォルダが640KB取られてしまうんだな。
うーん。

ちなみにzipで圧縮すると837KB。扱いが面倒になるが、これは必要かなぁ。

ちなみにファイルの数は仕方ないとして、フォルダの数が多い問題は複数の子ディレクトリにバラバラに.uitがある状態だったから、というのはある。最後に統合する気だったのだが、今あるのを一通り統合してみよう。

統合してみた。884MB。うーん、ちょっと大きいか。zipにすると2MB。うーん、この小ささは魅力的だが、扱いが面倒になるのがなぁ。

[How to: Compress and extract files - Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/standard/io/how-to-compress-and-extract-files)

まぁ扱いの面倒さはそんな変わらないか？
ググってたらもうちょっと使いやすい事を意図したライブラリもあるらしい。

[haf/DotNetZip.Semverd](https://github.com/haf/DotNetZip.Semverd)

こっちで良いかもしれない。

さらに少し調査。統合した.uitでは一番大きいディレクトリがf6で、5.3MB。zipすると14KB。
これならlinkとか変更する都度全具書き直しでいいか。

### hashをzipにした

これまでの34/とかのディレクトリを34.zipに変更した。
先頭二文字なので256ファイルくらい出来る感じ。

zipの中にはhashの二文字切った.txtが入っている。

これで880MBくらいだった管理領域が32MBくらいになった。
dirsの方が70MBくらい使っているのでこちらの方が大きくなったが、こちらはバックアップ対象のディレクトリツリーをディレクトリだけほぼマップしたものなので、まぁいいかなぁ（ファイル数では無くディレクトリ数に一致するので）

追記: 61GBのデータを管理して、最終的にdirs 127MB、hash 32MBの合計159MBに落ち着いた。
ハッシュはデータが増えてもあまり変わらない。dirsはディレクトリ数が増えると大きくなっていくが、
61GBのデータで159MBくらい使う、なら許容範囲かなぁ。


## 存在しないエントリだけ追加するinitが欲しい

大量にディレクトリのある所でinit -rしてしまい、途中まで行った所でこけた時に、どこまで終わったのか良くわからない。
こういう時に、dir.txtが存在して正しそうだったら次に進むinitが欲しい。

## 2022-01-31 現時点の雑感

64GBのmicro SDをこれで管理することが出来そうな所までは来た。
幾つか遅い所もあるけれど、スケーラビリティ的には実用レベルなことが保証されたと思う。

最初の段階では.uit下のメタ情報をちゃんと構築して操作するのが大切で、
その為に必要な最低限の操作を幾つか用意してやれば、あとはシェルスクリプトとかで使い始められるという手応えを感じている。
しかもそういう風に使いやすいようにコマンドを揃えていく方が実際のオペレーションでも使いやすくて便利だよなぁ。

これまでもなるべくfsxから叩いて試しながら仕様を考えてきたが、やはりコマンドラインから叩けるように整備して大きなデータに対して使えるようになったのは大きな前進で、
そうなる前に実装したimportなどは仕様が複雑な割には当面は使わないので、
これを先に実装したのは間違いだったなぁ、とか思っている。

あと2〜3日作業をすればとりあえずやりたい作業ができるようになると思うので、そこまでは頑張りたい。
結構凄い物が作れそうで、ちょっとワクワクしている。

## 壊れたファイルシステムの対応

`uit init -r`すると、EnumerateFilesではエントリがあるが実体に触れない壊れファイルがあると、initをする手段が無い。
こういうケースでも触れるファイルだけを管理したい。
こういうケースは手動で良いが、手動でやる為に幾つか足りない機能がある。

- どこまでinitが終了したのかを知る方法（dirs下をlsすれば分かるが、uitのサブコマンドで知る方法が欲しい）
- ファイル一つをaddする方法

ということで実装してみた。

### lsm 管理されているファイルとディレクトリの一覧を表示

`uit lsm .`で現在のディレクトリのうち、dirs下にエントリのあるファイルの一覧と、dirs下に対応するディレクトリのあるディレクトリ一覧が表示される。
直下のものしか表示しない。

`uit lsm -d .`でディレクトリのみ表示。

### add 管理されていない子ファイルを追加

ディレクトリに壊れエントリがある時などに、それらをスキップして特定のファイルだけ足したい、ということがある。
そこで一つだけ追加する、というaddというサブコマンドを実装。

### 何もmanageしないemptyでのinitを実装

initは直下のファイルを全部manageしようとして、だいたいはこれでいいのだけれど、
中に壊れファイルがあるとこの挙動は困る。

ということで、`uit init -e`でemptyな状態でinitする、というのを実装した。

### 壊れファイルシステムについてのメモ

自分の用途的に、microSDが壊れると新しいmicroSDを買ってきてそれをコピーして使う訳だが、
壊れ具合によっては前の前のmicroSDからコピーした後に必要なファイルだけ幾つか手でコピーしていたりして、
内容が微妙に違う風になってしまっていて、これらを管理したいのだよな。
特定のmicroSDからサルベージしそこなっているファイルとかを探したい。

その為にはこわれたmicroSDに対して使いたいが、壊れたmicroSDは壊れているのでいろいろ変なことが起こる。
そういうおかしなことが起きても全部やり直しじゃなくて、その少し前からやり直せるようにしておかないといけない。

中途半端な状態というのは扱いが難しいので、小さな完全な状態を組み合わせて大きな完全な状態を作るように作る必要があるよなぁ。

### 壊れたファイルシステムで良く使うスクリプト片

**ファイルだけをadd**

```
$ ls -p | grep -v / | sed 's/^/uit add "/;s/$/"/' > temp.sh
```

**ディレクトリだけをinitatとingest**

空白とかなければ以下。

```
$ ls -1d */ | sed 's/^/uit initat /' > temp1.sh
$ ls -1d */ | sed 's/^/uit ingest /' > temp2.sh
```

空白があると以下。

```
$ ls -1d */ | sed 's/^/uit initat "/;s/$/"/' > temp1.sh
$ ls -1d */ | sed 's/^/uit ingest "/;s/$/"/' > temp2.sh
```

## initを下から順番に手動で出来るようにする（ingestの実装）

2022-01-30 現在、いざ使ってみようとすると、
どうもバカでかいファイルツリーに一気にinit処理を走らせる感じになってしまい、
動く気がしなくて気後れてしまう。

一番最初にやらなくてはいけないuit initが面倒そうなのがとりあえず使ってみるのを妨げている。
管理したいファイルが膨大だが、突然それに対して全部一気に動く処理をするのは、動かすのも大変だしバグがあった時に解決するのも面倒過ぎる。

どうなっているといいのかな、と思うに、サブフォルダから順番にinitしていって、子供のinit済みのフォルダをマージしていくようになってれば良いよなぁ。
そういうことが出来るような機能が欲しい。
当初はimportで代用すればいいかと思っていたが、どうもオペレーションが面倒で使う気が起こらない。

現状のinitは、再帰的に一気に全部作ろうとしてしまうが、
こういうのは大規模なものに対してはトラブルに弱い。
一つ一つの処理は数十秒で終わって失敗しても痛くないような単位であるべきだよな。
そっちの方がデバッグも開発もしやすいし、使う時も楽だ。
自動で動きすぎずに途中途中で手動が入る方が良い。

ハッシュを計算しない、単にファイルだけ作るuit initがあって、そのあとにinit済みの子フォルダを指定してマージしていきたい。
子供の.uitフォルダを無くして親の庇護下に入る処理を作ろう。

### 子供のrepoを取り込むコマンド名（ingestに決定）

なんて名前がいいだろう？

- 編入する transfer
- 統合する integrate
- 会員にする、傘下に置く、加盟する affilicate
- 組み込む incorporate
- (口から体内に）取り込む ingest

affiliateが意味的には近いが、incorporateの方が馴染みがあっていいかな。underとかもいい気がするが、これだとマージする感じが無いんだよなぁ。

merge child repoみたいなのが正しいんだよな。でもmcとかは絶対忘れるよなぁ。

includeとかtakeとかでもいいのだが、これだと子供の.uitが無くなる感じが出てないよなぁ。

eatとかingestとかがいいかもしれない。子供の.uitが無くなる感じもする。eatは何が起こるのかがちょっと直感的じゃないからingestにするかな。

```
$ uit ing child/folder
```

うん、いい気がする。

### 再帰的でないinitを作る

initがすべて再帰的なせいでインクリメンタルに試せない。
だから現在のフォルダだけのinitを作る。

むしろ再帰的な方を別名にしたいな。initRecursiveにしよう。コマンドライン的にはフラグを指定するだけだろうから、ソース内での関数名がやぼったくてもいいだろう。

### ingestに必要な処理を考える

- mbinfo listのマージ
- dirs下のマージ
- 子供の.uitフォルダを消す

最後はいいので前２つを考える。

**mbinfo listのマージ**

1. 子供のmbinfo listの、パスを差し替えたものを作る
2. 親のmbinfo listとマージして保存する

この二段階か。

**dirs下のマージ**

1. 親ディレクトリのdirs下に対応するディレクトリを掘る
2. dir.txtを親のdirs下に移動

dir.txtは完全に同じものでいいんだな。

書き出してみるとそんな難しくないな。

実装してみた。良さそう。