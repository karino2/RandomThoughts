### 概要

- [gautamkrishnar/github-pages-gallery](https://github.com/gautamkrishnar/github-pages-gallery) 

github pagesを使った photo gallery のテンプレート。
[PngNote](PngNote.md)の公開に使っている。＞[blog: PngNoteのノートの公開にはGithub Pages Galleryを使う事にした](https://karino2.github.io/2021/07/27/use_ghg_for_pngnote_publish.html)

内部的には、[thumbsup](https://thumbsup.github.io/)というコマンドラインツール（？）を使って静的ページを生成している。
これは[sachinchoolur/lightGallery](https://github.com/sachinchoolur/lightGallery)というjsライブラリを使ったページを生成する。

### ページに直接リンクを貼りたい

ノートの特定のページへのリンクを貼りたいので、方法を調べる。
lightGallery的にはhashというプラグインがあって、これを有効にすればurlにハッシュが付きそう。

ver 1のデモだが、[lightGallery: Hash](https://sachinchoolur.github.io/lightgallery.js/demos/share.html)を見るとどういう感じか分かる。


プラグインを有効にする方法はトップページ、[sachinchoolur/lightGallery](https://github.com/sachinchoolur/lightGallery)のInstallationに書いてあり、

```
<script src="js/plugins/lg-zoom.umd.js"></script>
```

とか足して、

```
<script type="text/javascript">
    lightGallery(document.getElementById('lightgallery'), {
        plugins: [lgZoom, lgThumbnail],
        speed: 500,
        licenseKey: 'your_license_key'
        ... other settings
    });
</script>
```

とすればいいらしい。
これは例えば自分の例だと、gh-pagesブランチの[ImageGallery/Biochemistry705x.html at gh-pages · karino2/ImageGallery](https://github.com/karino2/ImageGallery/blob/gh-pages/Biochemistry705x.html)に該当箇所があるので、
これをカスタマイズ出来れば良さそう。

どうやってthumbsupで有効にするかは分からないが、本家のissueではテーマで出来ると言っている。
[Major missing feature: direct linking to pictures, that would allow sharing · Issue #35 · thumbsup/thumbsup](https://github.com/thumbsup/thumbsup/issues/35)

[Creating a theme  ｜ thumbsup](https://thumbsup.github.io/docs/4-themes/create/)に作り方が載っているがhtmlの生成のカスタマイズはどうやるんだろう？album.hbsのカスタマイズで良さそう。＞[Add option to rotate images on browser · Issue #248 · thumbsup/thumbsup](https://github.com/thumbsup/thumbsup/issues/248)

テーマクラシックは以下にある。[thumbsup/theme-classic: Thumbsup classic theme](https://github.com/thumbsup/theme-classic)。
自分が使っているcardsはこっちか。[thumbsup/theme-cards: Thumbsup cards theme](https://github.com/thumbsup/theme-cards)

これをdupしてalbum.hbsを書き換えれば良さそう。
Creating a themeのページにローカルのテーマを適用する方法は載っているが、これをgithub-pages-galleryでやる方法はどうやるのだろう？

config.jsonを使っているので、[Miscellaneous](https://thumbsup.github.io/docs/3-configuration/misc-settings/)と[Cheat sheet](https://thumbsup.github.io/docs/3-configuration/cheat-sheet/)をあわせて考えると、config.jsonにtheme-pathを足せば良さそう。