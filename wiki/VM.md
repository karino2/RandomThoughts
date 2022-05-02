VMに関しての話。
世の中JITありきが多いが、AppStoreはJITというか実行属性のあるメモリ領域を作るとrejectされるとの事なので、
JIT無しでのVMの話をもうちょっと知りたい。

## 論文

Trinity College Dublinという所が何本かJavaVMをレジスタ型にした場合の比較の論文を出している。

- [The Case for Virtual Register Machines](https://mural.maynoothuniversity.ie/10191/1/KC-Case-2003.pdf)
- [Virtual Machine Showdown: Stack Versus Registers(ACM, 2008)](https://dl.acm.org/doi/pdf/10.1145/1328195.1328197)

## Virtual Machine Showdown: Stack Versus Registers
 
[Virtual Machine Showdown: Stack Versus Registers(ACM, 2008)](https://dl.acm.org/doi/pdf/10.1145/1328195.1328197)

新しい方から読んで見る。
JavaVMのバイトコードをレジスタ型のバイトコードにコンバートしてレジスタ型のVMで実行していろいろ比較した論文。
Davis et al. 2003の同種の論文の発展版で、
より最適化が進んでいるとの事。このDavis et al. 2003っていうのは、
同じ所から出ている2003年の論文のThe Case for Virtual Register Machinesの事らしいな。

構成

- Section 2 インタープリタとしてスタックベースとレジスタベースの違い
- Section 3 スタックベースのバイトコードをどんな感じでレジスタベースのバイトコードにしているかとどんなoptimizationしてるか
- Section 4 実際のスタックベースとレジスタベースのVMの振る舞いとかの違いの比較
- Section 5 考えられるその他の最適化
- Section 6 他のVMへ同じような作業出来ないかみたいな話
- Section 7 関連研究
- Section 8 結論

とのこと。3と4がメインの内容っぽいな。