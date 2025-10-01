# JetpackCompose

今後はJetpackComposeのサブWikiへ移していく（まだリンク貼れないのでそのうち貼る）

Jetpack Composeに関するメモ。

### DropdownMenu

- [DropdownMenu - Jetpack Compose Playground](https://foso.github.io/Jetpack-Compose-Playground/material/dropdownmenu/)
- [androidx.compose.material: Android Developers](https://developer.android.com/reference/kotlin/androidx/compose/material/package-summary#dropdownmenu)


### Columnのスクロールがあると、ソフトキーが出た時のadjustResizeがうまく機能しない

[Text Field - Text goes below the IME [192043120] - Visible to Public - Issue Tracker](https://issuetracker.google.com/issues/192043120)

え？こんな重要なバグが治ってないまま放置されてるの！？と信じがたい気持ちだが、どうも治ってないっぽい。

### スクロールすると隠れるTopAppBarの実装

デフォルトで無いの？とググると公式ドキュメントのnestedScrollがそれっぽい。TopAppBarの高さを判定するのがダサいが他は以前のViewの頃の実装とあまり変わらないな。

[androidx.compose.ui.input.nestedscroll: Android Developers](https://developer.android.com/reference/kotlin/androidx/compose/ui/input/nestedscroll/package-summary)

### by rememberを動かす為に必要なimport

毎回忘れるのでここにメモ。

```
   var textState by remember { mutableStateOf("") }
```

みたいな表記をする時は、必要なimportが何故か自動でされない。
以下を手で足す必要がある。

```
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
```

