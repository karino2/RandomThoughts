[[技術的なメモ]], [[JavaScript]]

みんな大好きTypeScript。

- [TypeScript: Documentation - TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [[Deno]]
- [The essentials of TypeScript • Tackling TypeScript](https://exploringjs.com/tackling-ts/ch_typescript-essentials.html) 入門記事
- [TypeScript: TS Playground - An online editor for exploring TypeScript and JavaScript](https://www.typescriptlang.org/play/?#code/Q) ちょっと試すにはこれ。
- [[ExploringTypeScript]]
- [[TypeScriptHandbook]]
- [[eshlk]]

**VSCode 関連**

- [TypeScript tutorial with Visual Studio Code](https://code.visualstudio.com/docs/typescript/typescript-tutorial)
- [TypeScript debugging with Visual Studio Code](https://code.visualstudio.com/docs/typescript/typescript-debugging)

## Type Challenges

少しType Scriptの型を調べたいと思って見つけたサイト。

[type-challenges/type-challenges: Collection of TypeScript type challenges with online judge](https://github.com/type-challenges/type-challenges?utm_source=chatgpt.com)

各問題の左上の「Take the challenges」というボタンを押すと実際に問題に挑める。

Errorsのタブに失敗していると出るっぽい。


## 型テスト

上のType Challengesでやってる方法は以下みたいな感じらしい。

```ts
type Equal<A, B> =
    (<T>() => T extends A ? 1 : 2) extends
    (<T>() => T extends B ? 1 : 2)
        ? true
        : false

type Expect<T extends true> = T
```

というのを書いて、

```ts

type Test = Expect<
    Equal<
        MyType<string>,
        string[]
    >
>
```

とかやる。

以下みたいな例を試すと使い方は分かる。

```ts
type A = {
    x: string
}

type B = A & {
    y: number
}

const v = {
    x: "abc",
    y: 123
} satisfies B

const v2 : B = {
    x: "abc",
    y: 123
}

// これはOK
type Test = Expect<
    Equal<
        typeof v2,
        B
    >
>

// これはエラー
type Test2 = Expect<
    Equal<
        typeof v1,
        B
    >
>

```

satisfiesはこちら。 [TypeScript: Documentation - TypeScript 4.9](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html)

### declare constを使う

declare constを使うと、作り方を無視して変数を用意出来る。

```ts
interface Person1 {
  name: string;
}
 
interface Person2 {
  name: number;
}
 
type Staff = Person1 & Person2
 
declare const staffer: Staff;
staffer.name;
```

これでホバーして型を見る事が出来る。簡単な型の確認にはこれが手軽かもしれん。

ちなみにこの場合のstaffer.nameはneverになる（[TypeScript: Documentation - Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)の「Interface Extension vs. Intersection」より)

## 単一jsファイルを作る時のメモ

Rhinoとnodeの両方で動くjsを作ろうとしてGeminiにいろいろ聞いた時のメモ。あとで実際にためした時にアップデートしていきたい。

packages.json

```json
{
  "name": "ts-my-lang",
  "version": "1.0.0",
  "scripts": {
    "build": "tsc",
    "watch": "tsc -w"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

tsconfig.json

```json
{
  "compilerOptions": {
    /* ターゲット設定 */
    "target": "ES5",                  // Rhinoのバージョンに合わせて指定（古いRhinoならES5、新しいRhino 1.7.14+ 等ならES6）
    "module": "system",               // outFileで単一ファイルに束ねる場合は "system" や "amd" を指定
    "outFile": "./dist/bundle.js",    // すべてのTypeScriptコードを1つのJSに結合して出力

    /* 出力制御 */
    "outDir": "./dist",
    "rootDir": "./src",
    "removeComments": true,          // 出力JSからコメントを除去して軽量化

    /* 厳格な型チェック（言語処理系づくりでは必須レベル） */
    "strict": true,                   // strictNullChecks や noImplicitAny を一括有効化
    "noImplicitReturns": true,        // 関数の戻り値チェックを厳密化
    "noUncheckedIndexedAccess": true, // 配列・Mapアクセスの型を安全にする（AST巡回で役立ちます）

    /* モジュール解決 */
    "moduleResolution": "node",
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

outFileを指定しておくと単一ファイルにしてくれるらしい。
結果はdist/bundle.jsになる。

`npm run watch` でtsを編集すると勝手にjsが出来る。

importは以下みたいな感じに、相対パスで拡張子無しでやるとか。

```ts
import type { ASTNode } from "../parser/ast";
```

## fs/promisesを使ってみる

パッケージの使い方が分かればあとはすぐ使えそうだな。
という事でとりあえずfs/promisesを使ってみよう。

以下を実行するらしい。

```
$ npm install -D @types/node
```

ああ、package.jsonが出来てしまった。
とりあえず以下みたいに埋めておこう（generate.tsという名前で作業している）

```
{
  "name": "gen_sites",
  "version": "1.0.0",
  "description": "",
  "main": "generate.js",
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/node": "^20.5.1"
  },
  "scripts": {
    "build": "tsc -p .",
    "start": "node out/generate.js"
  }
}
```

で、コードを書こうとしたらトップレベルawaitで怒られた。ふむ。
という事でasync関数でくくって呼ぶ事にする。

```typescript
import * as fs from 'fs/promises'

(async ()=>{
  const dirs = await fs.readdir("./")

  console.log(dirs.length)
})()
```

動いた。これだけ動けばあとはどうにかなりそうだな。