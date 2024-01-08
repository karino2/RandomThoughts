みんな大好きJavaScript

- [[Electron]]
- [[TypeScript]]

## JDoc

[JSDocいいね！ - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2023/08/19/jsdoc_is_nice.html)

## Arrayのfilterをasyncで使うのが難しい

[javascript - How to use Array.prototype.filter with async? - Stack Overflow](https://stackoverflow.com/questions/47095019/how-to-use-array-prototype-filter-with-async)

信じがたいけれど、本当にこんな事しないといけないのかね。

## ブックマークレット

とりあえずここに置いておく。
markdownのリンクとして、けれど縦棒をハイフンに置き換えるブックマークレット。

```javascript
javascript:(function(){const e=document.createElement('input');const title = document.title.replaceAll('|', '-'); e.value=`[${title}](${location.href})`;document.querySelector('body').append(e);e.select();document.execCommand('copy');e.remove(); alert(`${title} copied!`)})();
```