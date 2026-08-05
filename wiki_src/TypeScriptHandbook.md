[[TypeScript]]の公式サイトのドキュメント。Bookといいつつ本じゃない。

[TypeScript: Handbook - The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

読んで思った事を適当に書く。新しいのは上に足します。

## Intersection Type

[Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)

Object Typeにintersection typeの記述があり、はじめて触れるものなので少しメモ。

以下のようなのがそれ。

```ts
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}
 
type ColorfulCircle = Colorful & Circle;
```

ColorfulCircleは両方のメンバを持つ。集合的にはintersectionになっているので普通なんだが、
なんとなく一瞬共通のメンバしか持たないように感じるので注意が必要か。
型を構造体のように見るのでは無く値の方を集合論的感覚で見る必要があるよなぁ。


## More on Function

[More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)

ジェネリクスとかの話があるが、あんまり凄い意外な事が無いのでメモする事は少ない。

### ジェネリクスのconstraints

extendsで書く。

```ts
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
```

この辺のシンタックスはすぐ忘れるのでメモしておく。

### Function Type ExpressionとCall Signatureとコンストラクタ

関数の型はarrow functionっぽいシンタックス（Function Type Expressionと言うらしい）で表せる。

```ts
(a: string) => void
```

ここで、aは省略出来ない。`(string)=>void` はstringという名前のany引数だと解釈される（！？）

一方オブジェクトがcallableであるのは、Call Sinatureと言うらしく、なぜかアローじゃない。

```ts
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
```

DescraibableFunction型の値は普通に呼べる。

なお、コンストラクタも似た感じに書ける。

```ts
type SomeConstructor = {
  new (s: string): SomeObject;
};
```

これはnewでSomeConstructor型を呼ぶケース。

### Function Overloads

こんな機能あるんだ！？overloaded signatureだけ呼べて、implementation signatureの関数は呼べないとか。ほえ〜。



## Narrowing

[Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

ここはなかなか面白いな。こういうのをちゃんと知りたかった。
最近の言語では標準装備という感じだけれど。Kotlinとかもこの辺は普通にあるよな。

### Type predicates

[Narrowing: Using type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)

user-defined type guard！こんなのあるんだ！へー。
以下のpet is Fishというreturn value。

```ts
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

JavaScript的にはbooleanだが引数に関する特別な処理な事を型のsignatureレベルで表現するのね。



## Everyday Types 2026-08-04 (火)

[Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

### Optional Chainの他の言語との違い

Optionalの意味がnullでは無くで存在しない、なのがちょっと注意が必要。

```ts
function printName(obj: { first: string; last?: string }) {
// ...
}
```

とあった時、lastが無い場合がある、というのがオプショナルの意味になる。
無意識にlastがnullかどうか、的な意味に思ってしまうが、そもそもlastが存在するかしないかなのでだいぶ意味合いが違う。

この辺はJavaScriptのoptional chainの話なので[[JavaScript]]の方に書いておくが、メソッド呼び出しやインデクサなどにドットがついたりするのが一見すると意外性があるが良く考えるともっともだ。

### Union型とnarrow

見た目は[[FSharp]]とかのDiscriminated Unionに似ているが、振る舞いとしてはgenericsのconstraintsが指定されたものに似ている。
共通のメソッドだけが呼べる、というような。

```ts
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}
```

個々の型を取り出すのはnarrowingする、と書いてあって、以下みたいにisArrayとかでも出来るらしい。

```ts
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}
```

型検査器はどうやってisArrayのセマンティクスを知っているのだろう？特別扱いしているのかな？

[TypeScript: TS Playground - An online editor for exploring TypeScript and JavaScript](https://www.typescriptlang.org/play/?#code/GYVwdgxgLglg9mABAWQJ4EkDOBBATrgQ1QAoAPALkUylxjAHMBtAXUQB8qa76BKRAbwBQiEYlwBTKCFxI8hVADoYOfETI8A3IgD02xAHkA0sNG7EAOQDilCVJmIaIcYIC+gwaEiwEiAO7iAGwg4AFtxAAVxOAAHAPEySmpaBhZ2TmTeARMYYERiNCw5NVIePiFRRGCwTDg4hQC4emIAIgAJQIaAGkRmxABqRFIFACs4OhbEAjAAEx7SjRMXREDMcSyKqpq6hqbmgHVA4LDEBrA1mgIAN0DxXB7+wc1F1yA)

少なくともMyIsArrayでくくるくらいでは動くようだ。でもreturn trueじゃ駄目なんだから伝播はするらしいな。

[TypeScript for Functional Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#unions) の方に、built-in predicatesが載っていて、ここにArray.isArrayは特別扱いしているな。

（追記: あとでtype predicatesというセクションでこの話がある、後述）

### Type Aliases

type文は型を定義しているのではなく、aliasなんだな。

```ts
type Point = {
  x: number;
  y: number;
};
```

これは、右辺だけで型になっていて、単にそれに名前がついているだけ。新しい型が出来る訳では無い。

structural typeと合わせると、typedefみたいに別の型にする事は出来ない、という事だな。

### interface

typeと似ていて、ほとんど同じに使えるけれど、extendsしたりメソッド足したりが出来るのがinterfaceか。
メソッドを足していくのがdeclaration mergingと呼ぶらしい。C++のnamespaceとかこういう感じだよな。

集合論的に考えればtypeだけで全部済みそうな気もするが、
よりJavaとかのinterfaceっぽく差分だけで定義していけるのが便利なケースはあるかもしれない。

### Literal Type

文字列とかを型に入れているのはどういう仕組なんだろう？と思っていたが、Literal Typeという概念があるのか。
リテラルはそれぞれその値固有の型とみなされるのでunionとかに入れれるのね。

C++のTemplateがなんとなく値が入れられるのとは違って、こっちの方が型システム的にちゃんとしているな。

ただオブジェクトのプロパティとかのinferenceが絡むと結構分かりにくい挙動をするな。
以下の例がreq.methodがstringになるのでエラーになるのは結構意外だ。

確かにconstでもプロパティは変えられちゃうんだよな。

```ts
declare function handleRequest(url: string, method: "GET" | "POST"): void;
 
const req = { url: "https://example.com", method: "GET" };
// NG
handleRequest(req.url, req.method);
```

そしてas constなんてものもあるらしい。これをするとmethodもLiteral Typeになるとか。

```ts
const req = { url: "https://example.com", method: "GET" } as const;
```

これでreq.methodがstringじゃなくて"GET"型になるらしい。へー。

## Basic Types 2026-08-04 (火)

[The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)

lenientは寛大な、という意味らしい。lenient typeでanyとかの一番ゆるい型を指す。
 inference takes the most lenient types は推論がany側になる事でゆるい型チェックを実現している事を指している模様。

strictnessのオプションなど、tsc周辺の話の基本的な事が結構はいっているセクション。

## TypeScript for JavaScript Programmers 2026-08-04 (火)

[TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

これはハンドブックの一部じゃないかもしれないが、先に読んどけ、と言われたので読んでおく。
ちなみにJSの他にCSharpやFunctional Programmer向けのもあって、それぞれ特徴が良くでていて面白い。

Structural Typeは特徴的だな。