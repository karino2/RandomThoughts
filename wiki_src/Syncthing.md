[公式: Syncthing](https://syncthing.net/)

ローカルのファイル同士をsyncするツール。LANの中だけで通信が閉じるので安心感も強いし、
何よりAndroidのアプリなどの出来が良い。

[[UFASアーキテクチャ]]のAndroidアプリと相性が良い。

### Macで起動時に勝手に立ち上がるようにする

以前syncthing-appのアップデート周りとかが面倒でコマンドライン版を使っているが、いちいち立ち上げるのは面倒だなぁ、と思い、サービスとして使う方法を調べた。

コマンドライン版でもhomebrewでインストールしている場合は以下で良さそう。

```
$ brew services start syncthing
```

brew info syncthingするとこの辺を教えてくれる。

ちなみにwebGUIは `http://localhost:8384/` だとか。
