- [[書籍]]
- [[技術的なメモ]]

[amazon: Modern Compiler Implementation in ML](https://amzn.to/4hKa77e)

いわゆるタイガーブック。
若い頃Tiger Languageの終わりまで割と真面目に読んだが、
割と定期的に見直したくなる項目があるのでKindleで買い直した。

## Polymorphic typeをinferenceまで読む 2025-02-09 (日)

[[Folang]]でGenericsの実装を雑にしたら割と行き詰まったので読んだ。
自分なりに考えた事はかなり近い。

instantiationはちょっと説明は分かりにくかったが、ようするにgenericな関数のcallに対して、その場でMetaな型を型パラメータに割り当てる、という事だよな。
そしてgenerarizationは最後まで解決されなかったMetaの型を型パラメータに昇格させる、という事か。
