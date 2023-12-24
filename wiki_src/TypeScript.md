[[技術的なメモ]], [[JavaScript]]

みんな大好きTypeScript。

- [TypeScript: Documentation - TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [[Deno]]

**VSCode 関連**

- [TypeScript tutorial with Visual Studio Code](https://code.visualstudio.com/docs/typescript/typescript-tutorial)
- [TypeScript debugging with Visual Studio Code](https://code.visualstudio.com/docs/typescript/typescript-debugging)

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