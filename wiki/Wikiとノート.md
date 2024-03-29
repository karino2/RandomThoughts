### 関連リンク

- [TeFWiki](TeFWiki)
- [blog: 理想のノート（アプリ）について考える](https://karino2.github.io/2021/09/26/ideal_note.html)
- [blog: Blogに向く事、Wikiに向く事](https://karino2.github.io/2021/09/28/blog_vs_wiki.html)
- [サブWiki](%E3%82%B5%E3%83%96Wiki)
- [講義ノート](%E8%AC%9B%E7%BE%A9%E3%83%8E%E3%83%BC%E3%83%88)

### WIkiで講義のノートを取るのに必要な事

講義や本のノートをWikiで取る時に欲しい性質。

- ノートはソフトウェアの寿命よりも長生きして欲しい（ソフト無しで後から見れる事）
- ノート単位で移動やコピー（バックアップ、クラウドストレージやUSBハードディスクに複製）、公開、検索、ブラウズ、削除出来る事

一般的なWikiとの違いとして、講義や本のノートは書かれる量がそれほどでは無い、というのがある。
すべてが見直せる程度に少ない。
そしてある程度シーケンシャルに進む。
一般のWikiはWikiNameが数百とか数千も普通だと思うけれど、講義のノートはせいぜい数十のオーダーだろう。
この規模の小ささを前提に出来る所が通常のWikiと講義ノート用のWikiの違いに思う。

一方でブログの単一のページに全部書くには微妙に大きすぎるくらいには大きい。
今はブログに書いているが、ブログだと、分けるとブラウズが面倒だが、わけないと一つのファイルが長すぎるという問題がある。
あと、講義のノートなどは随分後になってから少し編集したりしたくなる事もしばしばあるが、
ブログは当時のファイルを探し出すのがちょっとかったるい。
普段は見ないが、たまに復習する時にノートを取り出すようにその時だけは良く編集してた頃に戻せるような、そういう感じの何かが欲しい。

通常のWikiの一部として講義のノートを書くと、その講義のノートを全部ブラウズするのが難しい。
Wikiで全体を把握しようとしてもリンクがどこまでも続いて、「終わり」を把握するのが難しい。
これは他の項目とシームレスに混ざるという良さがある一方で、全体を見直しづらい、という問題も生む。
第三者や時間が経った後に見直す時に、しばらく全体を把握するためにブラウズする時間が必要になってしまう。

第三者や時間が経った後に思い出す時には、その講義や本のノートだけで独立して他から分かれている方が良いと思う。
公開という観点でもそういう単位になっている方がコンテンツとしての価値が高いんじゃないか。
例えばその講義の内容がどんなかをぱっと把握したい、という時に、そこだけをブラウズ出来る方が全体像は把握しやすい。
その講義と関係ない教科書のノートと混ざり合っていると、その講義について知ろうという時にはわかりにくくなってしまう。

講義や本のノートという性質から、他の事と自然に連携していく通常のWikiの性質よりも、
サイトの単位として独立しているメリットがまさるように思う。
ノート一冊、という感じの単位で切れている方が嬉しい。
講義の受講が最後まで行ったら、そこで手を離れて欲しい。

### ソフトウェアより長く残る必要があるという事

昔web日記として書いていたノートは、そのサービスが終了した結果失われてしまった。
サービスが終わる時などにexportするとかは面倒でいろいろ失われるので、もうそういう所にノートを残したくない。

昔手書きで書いたノートのスキャンは残っていてたまに見直す事があるので、pngの手書きはアリかな、と思っている。
テキストファイルも残っているが、ノートをテキストファイルで取っていた事はあまり無い。
今後はテキストファイルでノートを残しておくのが良い気もしている。

ただ公開はしたい。公開する方があとでググりやすいし。
でも公開されているサービスが終了した後もノートは残って欲しいので、フォルダごとバックアップで自然に残って欲しい。

### blogとの比較

現時点ではノートは割とブログに書いている。
なぜこれを、単純にgithubでwikiを書いていくのでは駄目なのか。

単純に他人に読まれない、というのはある気はする。
ブログなら、他人が「あぁ、これはXXについてのノートなんだな」と認識して、飛ばす事になる。これはちょうど良いと思う。

公開という観点からすると、時系列に流れてくる、というのは結構大切で、なんかいつまでもダラダラ更新され続ける、というのはあんまり良くない。

講義のノートは、その講義を受け終われば基本的には更新も終わる。この数ヶ月で終わる、という区切りがあるおかげで、ある程度自然にブログに馴染む。

ブログにしておけばググって来た他人が読む事はwikiよりも多い。
第三者の読みやすさはある程度重視したい。

一方でブログは後から編集するのが面倒、という問題がある。
当時のファイルを探して開くのが結構面倒で、また、昔のファイルが更新されていくというのはブログ的にも微妙である（第三者が見づらい）。

基本的にはその講義を受け終わったら読まないのだけれど、後から二度目の履修とかでまた書く事はあるのだよな。
一時期良く更新されて、しばらく更新されない時期が続いて、また良く更新される時期が来る事がある。

こういう時に、更新される時期の時にはそばにあって欲しい。更新されない時期には適切な距離があって欲しい。
Wikiはずっとそばにあるのがいまいち。ブログは一度離れるとまたそばに置くのが面倒でいまいち。

ノートごとに別々にwikiサイトになって、それをブログからリンクする、という感じの運用にすればいい感じに混ざるんじゃないか？どうだろう？