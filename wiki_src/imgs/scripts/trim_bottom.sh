#!/bin/sh

# 指定されたディレクトリをPngNoteArchiveに移動して、下部をトリミングする

SRC=$1
BACK="../../../PngNoteArchive/$1"

echo "Call from imgs/"
echo "ex:  ./scripts/trim_bottom.sh EnhancedSuffixArray/"
echo "src: $SRC, BACK: $BACK"

if [ -e "$BACK" ]; then
  echo "バックアップ先 '$BACK' は存在しています。処理を中止します。"
  exit 1
fi

mv $SRC $BACK
./scripts/trim_bottom  $BACK $SRC
