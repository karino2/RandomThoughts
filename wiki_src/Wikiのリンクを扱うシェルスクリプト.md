[[TeFWiki]], [[ノート]], [[メモをアプリケーションに依存させたくない]]

バックリンクとか2ホップリンクがUnix的に表現しづらいんだよなぁ。

と考えて、その辺をやるコマンドでも作ればいいのでは？という気もしてきた。
ファイル名とそのファイルがリンクしているリンク先の一覧があれば良いのだが、
リンク先でsortしたいよな。

という事でそういうシェルスクリプトの仕様を考えて試してみる。

## 仕様の検討

A.mdからA1.md、A2.mdがリンクされていて、B.mdからB1.md, B2.mdがリンクされているとする。
以下みたいなリストがsortされてあれば、バックリンクは実現できそう。

```
A1.md A.md
A2.md A.md
B1.md B.md
B2.md B.md
```

### 2ホップリンク

A.mdからA1.mdがリンクされていて、C.mdからもA1.mdがリンクされているとしよう。

```
A1.md A.md
A1.md C.md
```

A.mdから自身のリンクを見て、それと同じリンクをしているページの一覧を取れば良いので、この情報で実現できそうだ。

### 行のフォーマット

空白はいかにもファイル名で使いそう、という問題はある。Unix的な扱いやすさを思えば、あまりjsonとかにはしたくないが。
コロンはWindows上では壊滅的なのでコロンを使えばいいかもしれない。

```
A1.md:A.md
A2.md:A.md
B1.md:B.md
B2.md:B.md
```

微妙だが、まぁこのくらいが落としどころかもしれず。

## linkinfo.sh シェルスクリプト

Geminiに書いてもらった。linkinfo.shという名前で保存して使ってみる。

```bash
#!/bin/bash

find . -name "*.md" | while read -r file; do
    src=$(basename "$file")

    grep -o '\[\[[^]]\+\]\]' "$file" | while read -r link; do
        dst="${link#\[\[}"
        dst="${dst%\]\]}"
        echo "${dst}.md:${src}"
    done
done | sort -u
```

MacBookで実行すると0.7secくらい。

### バックリンク

```bash
$  linkinfo.sh | grep ":.*IntroductionToAlgorithms"
```

曖昧検索も出来て良い。このくらいローテクに出来るのならメモの構造をこれに依存させてもいいかな。

### 2hopリンク

実装してみたが、大量のページが表示されてしまって駄目だな。

```bash
#!/bin/bash

target="$1"

# 拡張子がなければ付ける
case "$target" in
    *.md) ;;
    *) target="${target}.md" ;;
esac

awk -F: -v target="$target" '
{
    # child -> parent
    parent[$1] = parent[$1] " " $2
}

END {
    # target <- mid <- src
    if (!(target in parent))
        exit

    n = split(parent[target], mids, " ")
    for (i = 1; i <= n; i++) {
        mid = mids[i]
        if (mid == "") continue

        if (!(mid in parent))
            continue

        m = split(parent[mid], srcs, " ")
        for (j = 1; j <= m; j++) {
            src = srcs[j]
            if (src == "") continue
            print src
        }
    }
}
' | sort -u
```

以下のように使えるが、「書籍」リンクみたいなのがあると多すぎて使い物にならない。

```
$ linkinfo.sh | 2hop.sh "【書籍】IntroductionToAlgorithms.md"
```

ただパフォーマンス的には十分なので、必要だったらこういう感じで実装したらいいとは思う。

これはそのようにメモを構築しないとあまり意味の無いフィーチャーだが、それはちょっとメモがアプリケーションに依存しすぎに思える。
そういう方向には進みたくないか。

### 結論：バックリンクはあり、2ホップリンクは無し

バックリンクは対話的なシェルスクリプトフレンドリーなので前提にしてもいいかな、という気持ちになった。
2ホップリンクはスクリプトも複雑だし前提にはしたくないな、と思った。