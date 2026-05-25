[[技術的なメモ]]

[[JavaScript]]インタープリタのJavaによる実装。Mozilla製。Androidでもインタープリタモードなら動きそう。[[EmbeddedLang]]

- [mozilla/rhino: Rhino is an open-source implementation of JavaScript written entirely in Java](https://github.com/mozilla/rhino/tree/master)  公式
  - [rhino/it-android/README.md at master · mozilla/rhino](https://github.com/mozilla/rhino/blob/master/it-android/README.md) 公式でAndroidのテストが入っている
- [Rhino ES2015/ES6, ES2016 and ES2017 support](https://mozilla.github.io/rhino/compat/engines.html) サポート状況
  - async-awaitは無いっぽい [Support ES2017 async (arrow) functions & “await” · Issue #395 · mozilla/rhino](https://github.com/mozilla/rhino/issues/395) 
  - arrow関数はあるか
- [rhino/rhino/src/test/java/org/mozilla/javascript/tests/ContinuationsApiTest.java at 96d264acd2df85ad685ecdc4f059b4413f99faeb · mozilla/rhino](https://github.com/mozilla/rhino/blob/96d264acd2df85ad685ecdc4f059b4413f99faeb/rhino/src/test/java/org/mozilla/javascript/tests/ContinuationsApiTest.java#L37) 中断はできそう。
- [ShabdVasudeva/OneUI-Gallery-Clone](https://github.com/ShabdVasudeva/OneUI-Gallery-Clone) Androidで使ってるアプリで現在でも動きそうなもの
- [oracle/graaljs: GraalJS – A high-performance, ECMAScript compliant, and embeddable JavaScript runtime for Java](https://github.com/oracle/graaljs) GraalJSはRhinoより新しいJSで動くとの事でESMとかもサポートしているらしくAndroidでも動くと言っているが、良くわからん。

使ってみたらあっさり動いて中断とか再開も出来るので気にった。使っていこう＞[[AshX]], [[Rhinocs]]

## Objectリテラルのメソッド（は使える）

昔ながらのprototypeとか書いていて、シングルトンはこんな事する必要無いよなぁ、とCopilotにオブジェクトリテラルに直してもらったら、
アロー関数のthisは呼び出しもとだ、とか言われて、method定義に直された。

あれ？Rhinoってメソッド使えたっけ？と調べると使える＞[Rhino ES2015/ES6, ES2016 and ES2017 support](https://mozilla.github.io/rhino/compat/engines.html#ES2015-syntax-object-literal-extensions-shorthand-methods)

なおclassキーワードは使えない。asyncは使えないがgeneratorは使えたり、何が使えるかちょっと曖昧だよなぁ。

でもObjectのメソッドはもう使えない環境は無さそうだから積極的に使っていった方がいいな。

## JavaScriptの配列をJavaから使う

```js
select_file_callback([mimeType], onSuccess, onFailure)
```

という関数を作った時に、Java側で最初のmimeTypesの配列をどう扱ったらいいかわからなかったので調べた。
Scriptableにキャストしてctx.getElementsでObjectの配列が取れる。

```java
        Object[] mtypesObj = ctx.getElements((Scriptable)args[0]);
```

中身は `ctx.toString(mTypesObj[0])` とかする必要がある。

## docstringのメモ

describe-function的なものを実装するために、なんかdocstringみたいなの無い？とgeminiに聞いたら以下を教えてくれたので貼っておく。

```js
function getDocstring(fn) {
    var fnSource = fn.toString();
    
    // 関数の最初にある /** ... */ または /* ... */ のブロックコメントを抽出する正規表現
    var match = fnSource.match(/^function\s*.*?\s*\(\s*.*?\s*\)\s*\{\s*(\/\*\*[\s\S]*?\*\/|\/\*[\s\S]*?\*\/)/);
    
    if (match && match[1]) {
        // コメント内のアスタリスクや無駄な改行を綺麗に掃除する
        return match[1]
            .replace(/^\/\*\*|^\/\*|\*\/$/g, '') // デリミタの削除
            .replace(/^\s*\*\s?/mg, '')          // 行頭の「 * 」の削除
            .trim();
    }
    return null;
}

// --- 使い方 ---

function myAppFunction(x, y) {
    /**
     * 2つの数値を加算する関数です。
     * @param {number} x - 最初の数値
     * @param {number} y - 2番目の数値
     * @returns {number} 計算結果
     */
    return x + y;
}

var doc = getDocstring(myAppFunction);
print(doc); 
// 出力:
// 2つの数値を加算する関数です。
// @param {number} x - 最初の数値
// @param {number} y - 2番目の数値
// @returns {number} 計算結果
```