[[自作アプリ]]

自分用のAndroidアプリを置くOrganization。

自作アプリをagentで作りまくるようになった結果、いちいちapkを作ったりするのが面倒になってきた。
ただ後でビルドが通らないとかで端末乗り換えの時に苦労しそうなので、
自分用アプリはOrganizationの下に入れてapk作成を自動化する事にする。

このDIYAppはいろいろ単純化した方針でやっていきたい。

## バージョンは単なる連番でv0, v1, v2と進める

バージョンコードとバージョンネームを完全に単なるintの連番として、スクリプトから上げやすくする。
そしてタグもv0, v1とvで始めたバージョン番号とする。

## タグをpushしたらapkがReleaseページに出来る

このOrganizationでは基本的にはapkのリリースを共通のワークフローテンプレートを使ってリリースする。

## 既存レポジトリの移行手順

- レポジトリのSettings＞General＞Danger Zone＞Transfer ownershipでKarino2DIYAppにする
- Settings＞ActionsでWorkflow permissionsをRead and writeに変更
- ローカルのgitのremoteを以下の感じでセット

```
% git remote -v
origin	git@github.com:karino2/SAFToDo.git (fetch)
origin	git@github.com:karino2/SAFToDo.git (push)
% git remote set-url origin git@github.com:Karino2DIYApp/SAFToDo.git

```

そして以下を実行してrelease.ymlを作る。

```
$ mkdir -p .github/workflows && cat << 'EOF' > .github/workflows/release.yml
name: Build and Release APK

on:
  push:
    tags:
      - 'v*'

jobs:
  call-shared-build:
    uses: Karino2DIYApp/.github/.github/workflows/android-build.yml@main
    secrets: inherit
EOF
```
