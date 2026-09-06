一般的には大文字ではなくsoftmaxと書くが、WikiName的に違和感があったのでWikiNameはSoftMaxとした。

![imgs/SoftMax/0000.png](imgs/SoftMax/0000.png)

## 演習3.5 softmaxが値の大きい所で誤差伝搬の勾配が小さくなるのを確認せよ（スケールの理由）

[[原論文から解き明かす生成AI]]の演習3.5。softmaxは入力の値の大きい領域では勾配が小さくなるという事を示したい。

![imgs/Transformer/0001.png](imgs/Transformer/0001.png)
![imgs/Transformer/0002.png](imgs/Transformer/0002.png)

こんな考察のもとに、[[セルフアテンション]]では、attentionに渡す値のスケールをdの影響分割り引く事にしているらしい。

[support-genAI-book/exercises/chapter3.md at main · yoheikikuta/support-genAI-book](https://github.com/yoheikikuta/support-genAI-book/blob/main/exercises/chapter3.md#%E6%BC%94%E7%BF%92%E5%95%8F%E9%A1%8C35) 菊田さんの解答。