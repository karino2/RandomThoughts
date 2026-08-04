みんな大好きJavaScript

- [[Electron]]
- [[TypeScript]]
- [New series of blog posts: learning web development](https://2ality.com/2025/08/learning-web-dev-toc.html) 現代的な入門としていいかもしれん。
- [[VuePress]] nodejs製のサイトジェネレータ
- [[zx]]
- [[Rhino]]
- [JavaScript reference - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

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

## prismjs

[Prism](https://prismjs.com/)

JS製のシンタックスハイライト。小さい。

[[TeFWiki]]のAndroid版はassetsにprismjsを入れている。こういう用途には小さくて良い。

[[MFG]]のシンタックスハイライトも以下に用意した。＞[MFG/tools/prism-mfg at main · karino2/MFG](https://github.com/karino2/MFG/tree/main/tools/prism-mfg)

## Optional Chain

ちょっと予想と違う事があったのでメモ。

[Optional chaining (?.) - JavaScript - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

普通はある変数がnullかどうかで効果の出るものだが、これはプロパティアクセスに限定されている。
だからメソッド呼び出しが以下のようにドットが必要になる。

```js
const const adventurer = { name: "Alice" };
console.log(adventurer.someNonExistentMethod?.());
```

また、以下のようには書けるが、

```js
const dogName = adventurer.dog?.name;
```

以下のようには書けない。

```js
// NG!
const mayDog = adventurer.dog?;
```

考えてみれば `adventurer.dog` は無ければundefinedなのだからJSの振る舞い的にはこれが正しいが、

kotlinとかの言語に慣れていれば、
メソッド呼び出しは `hoge?.ika() `とhogeの方にはてなをつけそうなものだけど、良く考えるとこれは意味が違う。
JSの例ではhogeがnullかどうかではなく、ikaがあるかどうか、という話をしている。

でも、例えばインデクサも以下のようになる。

```js
const propName = "x";
const nestedProp = obj?.[propName];
```

これはobjがnullかどうかでは無く、propNameがあるかどうか、というoptionalになっている。配列の範囲外アクセスをundefinedにする感じだ。