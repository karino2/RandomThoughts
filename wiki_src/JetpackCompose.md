Jetpack Composeに関するメモ。

### マテリアルカタログ

ソースが良く行方不明になるのでリンク。

- [material-catalog - Android Code Search](https://cs.android.com/androidx/platform/frameworks/support/+/androidx-main:compose/material/material/integration-tests/material-catalog/) ただし実態はもう少し上のレポジトリにある事もあるのでもう少し上からフィルタした方がいいかも。
- [androidx/compose/material/material/integration-tests/material-catalog at androidx-main · androidx/androidx](https://github.com/androidx/androidx/tree/androidx-main/compose/material/material/integration-tests/material-catalog) ミラー

### DropdownMenu

- [DropdownMenu - Jetpack Compose Playground](https://foso.github.io/Jetpack-Compose-Playground/material/dropdownmenu/)
- [androidx.compose.material: Android Developers](https://developer.android.com/reference/kotlin/androidx/compose/material/package-summary#dropdownmenu)


### Columnのスクロールがあると、ソフトキーが出た時のadjustResizeがうまく機能しない

[Text Field - Text goes below the IME [192043120] - Visible to Public - Issue Tracker](https://issuetracker.google.com/issues/192043120)

え？こんな重要なバグが治ってないまま放置されてるの！？と信じがたい気持ちだが、どうも治ってないっぽい。

### スクロールすると隠れるTopAppBarの実装

デフォルトで無いの？とググると公式ドキュメントのnestedScrollがそれっぽい。TopAppBarの高さを判定するのがダサいが他は以前のViewの頃の実装とあまり変わらないな。

[androidx.compose.ui.input.nestedscroll: Android Developers](https://developer.android.com/reference/kotlin/androidx/compose/ui/input/nestedscroll/package-summary)