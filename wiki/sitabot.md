[raito417/mistodon-sitabot](https://github.com/raito417/mistodon-sitabot)

## sitabotいじり

ちょっとPRでも送ろうと作業する。その作業メモ

### Dockerfile

デプロイして動かす気は無いけどライブラリは入れておきたいという事でDockerfileを作る事から。

```
$ docker build -t arino/sitabot .
```

実行

```
docker run -it --rm -v $(pwd):/work arino/sitabot bash
```