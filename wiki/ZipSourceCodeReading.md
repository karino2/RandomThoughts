ソースコードをzipでAndroidに置いて、それをインデックス作って全文検索して読むソース読みアプリ。

- [ZSCReading - Apps on Google Play](https://play.google.com/store/apps/details?id=com.livejournal.karino2.zipsourcecodereading)
- [karino2/ZipSourceCodeReading: Zipped source code reading app for Android](https://github.com/karino2/ZipSourceCodeReading)

正規表現をトリグラムにすることで正規表現の全文検索をサポートする、というcodesearchのアイデアをそのまま移植している。

表示周りを全部自前でやっているのでオペレーション周辺の挙動がいまいち。TextViewをいっぱい並べる方が良かったなぁ、と完成してから後悔したが、まぁいいか、と結構使っている。