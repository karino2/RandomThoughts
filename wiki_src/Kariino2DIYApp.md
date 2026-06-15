[[自作アプリ]]

自分用のAndroidアプリを置くOrganizationとしてKarino2DIYAppというOrganizationを作った。[Karino2DIYApp repositories](https://github.com/orgs/Karino2DIYApp/repositories)

## モチベーション

自作アプリをagentで作りまくるようになった結果、いちいちapkを作ったりするのが面倒になってきた。
ただ後でビルドが通らないとかで端末乗り換えの時に苦労しそうなので、
自分用アプリはOrganizationの下に入れてapk作成を自動化する事にする。

開発はデバッグ実行しながら開発していくのでDebug版がどれかの端末には入ったままになる。
そしてrelease用のworkflowを定義しておいて、適当なタイミングでv3とかタグをつけてpushすると
apkがReleaseページに出来る、みたいな感じになっている。

このDIYAppは基本的には自分しか使わないので、いろいろ単純化した方針でやっていきたい。

## バージョンは単なる連番でv0, v1, v2と進める

バージョンコードとバージョンネームを完全に単なるintの連番として、スクリプトから上げやすくする。
そしてタグもv0, v1とvで始めたバージョン番号とする。

## タグをpushしたらapkがReleaseページに出来る

このOrganizationでは基本的にはapkのリリースを共通のワークフローテンプレートを使ってリリースする。
release.ymlは以下の移行手順に書いてあるものを使う。

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

## Organizationに入れないけど同じworkflowを実行したい場合の設定

- PngNoteのrelease.ymlを持ってくる [PngNote/.github/workflows/release.yml at main · karino2/PngNote](https://github.com/karino2/PngNote/blob/main/.github/workflows/release.yml)
- Secrets＞Secrets and variables＞ActionsのSecretsタブの下のRepository secretsで以下を指定
- Settings＞ActionsでWorkflow permissionsをRead and writeに変更

| 名前 | 何を設定するか |
|-----| -----|
| SIGNING_KEY | 下のpbcopy|
| SIGNING_KEY_ALIAS | release |
| SIGNING_KEY_PASSWORD | パスワードマネージャから |
| SIGNING_STORE_PASSWORD | パスワードマネージャから |

```
base64 -i  ~/your/pass/to/release_keystore_for_github_actions2.jks | tr -d '\n' | pbcopy
```