みんな大好きJavaScript

- [Electron](Electron)
- [TypeScript](TypeScript)

## JDoc

[JSDocいいね！ - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2023/08/19/jsdoc_is_nice.html)

関数はreturns。

[Use JSDoc: returns](https://jsdoc.app/tags-returns)

```javascript
/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sum(a, b) {
    return a + b;
}
```

## Arrayのfilterをasyncで使うのが難しい

[javascript - How to use Array.prototype.filter with async? - Stack Overflow](https://stackoverflow.com/questions/47095019/how-to-use-array-prototype-filter-with-async)

信じがたいけれど、本当にこんな事しないといけないのかね。

## ブックマークレット

とりあえずここに置いておく。
markdownのリンクとして、けれど縦棒をハイフンに置き換えるブックマークレット。

```javascript
javascript:(function(){const e=document.createElement('input');const title = document.title.replaceAll('|', '-'); e.value=`[${title}](${location.href})`;document.querySelector('body').append(e);e.select();document.execCommand('copy');e.remove(); alert(`${title} copied!`)})();
```

## jsonc, json5

JavaScript関係無いがjson関連。

コメントが入れられるのがjsonc、trailing commaとかもありなのがjson5か。json5でいいのでは感。

[Paji's Blog - What is JSONC, what is JSON5.](https://paji.blog/jsonc-json5)