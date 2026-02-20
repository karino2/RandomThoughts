[[技術的なメモ]]

[[JavaScript]]インタープリタのJavaによる実装。Mozilla製。Androidでもインタープリタモードなら動きそう。[[EmbeddedLang]]

- [mozilla/rhino: Rhino is an open-source implementation of JavaScript written entirely in Java](https://github.com/mozilla/rhino/tree/master)  公式
  - [rhino/it-android/README.md at master · mozilla/rhino](https://github.com/mozilla/rhino/blob/master/it-android/README.md) 公式でAndroidのテストが入っている
- [Rhino ES2015/ES6, ES2016 and ES2017 support](https://mozilla.github.io/rhino/compat/engines.html) サポート状況
  - async-awaitは無いっぽい [Support ES2017 async (arrow) functions & “await” · Issue #395 · mozilla/rhino](https://github.com/mozilla/rhino/issues/395) 
  - arrow関数はあるか
- [rhino/rhino/src/test/java/org/mozilla/javascript/tests/ContinuationsApiTest.java at 96d264acd2df85ad685ecdc4f059b4413f99faeb · mozilla/rhino](https://github.com/mozilla/rhino/blob/96d264acd2df85ad685ecdc4f059b4413f99faeb/rhino/src/test/java/org/mozilla/javascript/tests/ContinuationsApiTest.java#L37) 中断はできそう。
