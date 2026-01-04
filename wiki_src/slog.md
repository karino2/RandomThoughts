[[作業ログ]], [[ノート]]

## slogとは

slogとは、以下の決まりで書いていく作業メモの事。

- 単なるmdファイルを特定のフォルダ下に置いていく
- mdファイルは日付から生成されるファイル名
- ファイルの先頭は必ずその作業のタイトルを書く

具体的な形式などは以下の各項目を参照のこと。

### 哲学

[[作業ログ]]をいい感じにローカルに書いていくのに必要な決まりごとを考えた。考察は[[作業ログ]]の方にも書いてある。

- 気軽に新規の作業ログを開始出来る
   - ファイル名に頭を使わずに始められる（newfile.commandをダブルクリックするだけ）
   - タイトルは後で変更してもファイル名に影響無し（始めた後にタイトルを考えられるように）
- 一つの作業ログに何を書き足してもほかの作業をしている時は目に触れない
  - 1作業1ファイル
- ログやコマンド、コード片などを何も考えずにコピペしていける
  - ゆるいmdフォーマットだがたまにmd違反があっても良い
- フォルダごと[[Syncthing]]で同期。公開しない。

## 新規ファイル作成スクリプト

ファイル名は2025_1212_211312.md とかにする。以下のスクリプトで作る。

```bash
#!/usr/bin/env bash

BASENAME=`date "+%Y_%m%d_%H%M%S"`


DEST=$(dirname $0)
FILENAME="$DEST/${BASENAME}.md"
echo $FILENAME
echo "# " > $FILENAME
```

フォーマットは先頭の行だけ `# タイトル` で始める。
けれど中はマークダウンにはこだわらない。単なるテキストファイルを貼ったりも気にせずやっていく。

## 一覧を選ぶシェルスクリプト

Copilotに書かせてみたらfzfを使ったいい感じのが出来た。

```bash
#!/usr/bin/env bash

DIR=$(dirname $0)

# 一時ファイルに日付とタイトルを抽出
LIST=$(for file in "$DIR"/*.md; do
    title=$(head -n 1 "$file" | sed 's/^# *//')
    date=$(basename "$file" .md | sed 's/_/ /g')
    echo "$date | $title | $file"
done)

# fzfで選択
SELECTED=$(echo "$LIST" | fzf --with-nth=1,2 --delimiter="|" --preview 'head -n 20 {3}' --preview-window=down:wrap)

# ファイルパスを抽出して開く
FILE=$(echo "$SELECTED" | awk -F '|' '{print $3}' | xargs)
[ -n "$FILE" ] && open "$FILE"
```

こういうの書かせるにはLLMは最強だな。