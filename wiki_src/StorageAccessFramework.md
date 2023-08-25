[[Android]]のSAF関連。

- [DocumentFileをACTION_VIEWにわたす](https://www.javaer101.com/en/article/92932287.html)
- [[Android] Storage Access Framework でドキュメントを保存する](https://akira-watson.com/android/action_create_document.html) ACTION_CREATE_DOCUMENTの例
- [Y.A.Mの雑記帳: Android 11 では ACTION_CREATE_DOCUMENT と ACTION_OPEN_DOCUMENT には queries 指定が必要](https://y-anz-m.blogspot.com/2020/11/android-11-actioncreatedocument.html)
- [Android storage use cases and best practices  -  Android Developers](https://developer.android.com/training/data-storage/use-cases)

---

### メディアファイルの周辺

WhiteBoardCastで録画した動画をこれまではexternal storageに保存していたが、これはAndroid 10以降のスタイルでは無い。
という事で方針を考える。

MediaMixtureがFileを取る。だから録画中のファイルはapp specific directoryに入れておくのが良さそう。
最後に合成が終わったらMediaStoreに移動するのがいいだろうか？

- [Access media files from shared storage  -  Android Developers](https://developer.android.com/training/data-storage/shared/media) のToggle pending status for media files　という所にParcelFileDescriptorを取得する例がある。これでバイナリを書く事は出来そう。
- [Create/Copy File in Android Q using MediaStore - Stack Overflow](https://stackoverflow.com/questions/59511147/create-copy-file-in-android-q-using-mediastore) これの「1. Create and Write File」の回答も近いコードになっている

スライドはpdfとしてexportするので、これはSAFを使うのがいいか？
コードを見直すとpdfwriterのライブラリはOutputStreamでさえあれば良さそうなので、SAFで保存ファイルを選ばせる事は出来そう。

permissionとしては[Access media files from shared storage  -  Android Developers](https://developer.android.com/training/data-storage/shared/media)の「Extra permissions needed for apps running on legacy devices」に、 Android 9以下ならREAD_EXTERNAL_STORAGEとWRITE_EXTERNAL_STORAGEがいるとの事。
Android 9はAPI Level 28。

RELATIVE_PATHは API Level 29から。

-  [MediaStore.MediaColumns  -  Android Developers](https://developer.android.com/reference/android/provider/MediaStore.MediaColumns#RELATIVE_PATH)
- [SDK Platform release notes  -  Android Studio  |  Android Developers](https://developer.android.com/tools/releases/platforms)

```
if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q)
{
}
```

### getExternalStoragePublicDirectory周辺

[[あおぞらAndroid教室]]でファイル周りの解説でも書こうかと思っていて、getExternalStoragePublicDirectoryを使おうと思ったらdeprecatedとなっているな。

[Environment  -  Android Developers](https://developer.android.com/reference/android/os/Environment#getExternalStoragePublicDirectory(java.lang.String))

だが同じ役割をする代替が無さそう。

[getExternalStoragePublicDirectory deprecated in Android Q - Stack Overflow](https://stackoverflow.com/questions/56468539/getexternalstoragepublicdirectory-deprecated-in-android-q)

RELATIVE_PATHが良さそうだが、これはAPI level 29から、だとか。さすがにこれはちょっと新しすぎるなぁ。

```kotlin
      val resolver = context.contentResolver
      val contentValues = ContentValues().apply {
        put(MediaStore.MediaColumns.DISPLAY_NAME, "SomeFileName001")
        put(MediaStore.MediaColumns.MIME_TYPE, "image/jpeg")
        put(MediaStore.MediaColumns.RELATIVE_PATH, "DCIM/SomeDirName")
      }

      val uri = resolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, contentValues)

      resolver.openOutputStream(uri).use {
        // TODO something with the stream
      }
```

Storage Access Frameworkの推奨シナリオを見ていたら、getExternalStoragePublicDirectoryを使えと書いてある… ＞[Android storage use cases and best practices  -  Android Developers](https://developer.android.com/training/data-storage/use-cases#export-media-files-to-device)

正しくはバージョン見てgetExternalStoragePublicDirectoryと上記のコードを切り替えるんだろうが、さすがに違いすぎてかったるいな、これは。

まぁSAF使わずにDownloads下に保存したい、みたいなのはそれなりに雑なアプリな事が多いので、29以下を捨てる日が来るまではgetExternalStoragePublicDirectoryを使い続けるか。

こういうの互換にするためのandroidxでは無いのか？と思うが、使えそうなのが見当たらないな。

### しばらくしたあとのアクセスでSecurityExceptionが上がる

GoogleDriveなどで、ACTION_OPEN_DOCUMENTで得たuriをtakePersistableUriPermissionして保存し、デバイスを再起動してそのuriを開くと、以下のexception。

```
java.lang.SecurityException: Permission Denial: opening provider com.google.android.apps.docs.storagebackend.StorageBackendContentProvider from ProcessRecord{3833be7 4019:io.github.karino2.textdeck/u0a234} (pid=4019, uid=10234) requires that you obtain access using ACTION_OPEN_DOCUMENT or related APIs
```

ACTION_OPEN_DOCUMENTのintentに以下をやってもダメ。

```
intent.addFlags(Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION)
intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
intent.addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION)
```

直し方分からず。とりあえずSecurityExceptionをハンドルしておこう。

----

### 試行錯誤した時のメモ

[https://developer.android.com/training/data-storage/shared/documents-files#grant-access-directory](https://developer.android.com/training/data-storage/shared/documents-files#grant-access-directory)

ここに書いてあるとおりにACTION_OPEN_DOCUMENT_TREEでIntentを投げて帰ってきたuriにContentResolverのqueryをやったら、UnsupportedOperationExceptionが。

なんで？とググってたらここに引っかかり、

[SO: Unsupported Uri in ContentResolver when passing Uri returned by Intent](https://stackoverflow.com/questions/54161951/unsupported-uri-in-contentresolver-when-passing-uri-returned-by-intent)

そこにかかれている謎のおまじない

```
val uri = DocumentsContract.buildDocumentUriUsingTree(treeUri, DocumentsContract.getTreeDocumentId(treeUri))
```
を間に挟んだらたしかに読めるようになった。なんじゃこれ？
そしてこれだとdirのエントリが帰ってきて中身が読めない。ふむ。

DocumentsContractというのがヒントっぽい、とドキュメントを読んで見る

[https://developer.android.com/reference/android/provider/DocumentsContract](https://developer.android.com/reference/android/provider/DocumentsContract)

`buildChildDocumentsUriUsingTree`がそれっぽいか？

[androidx:DocumentFile](https://developer.android.com/reference/androidx/documentfile/provider/DocumentFile) がちゃんと動くっぽい！

### DocumentFileはlistFilesとかnameとかがいちいち遅い

[java - DocumentFile is very slow - Stack Overflow](https://stackoverflow.com/questions/42186820/documentfile-is-very-slow)

これは酷い。
コードはここか。

[TreeDocumentFile.java - Android Code Search](https://cs.android.com/androidx/platform/frameworks/support/+/androidx-main:documentfile/documentfile/src/main/java/androidx/documentfile/provider/TreeDocumentFile.java)

### DocumentFileと同じような機能を持つFastFileを実装

[Implement FastFile and use it instead of DocumentFile. · karino2/PngNote@b19dbf1](https://github.com/karino2/PngNote/commit/b19dbf1841ff443ea7561c9c07109e358d03cdad)

今後はこれを使っていこう。

----

### 雑多なメモ
```
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

last_modified

```
0 = "document_id"
1 = "mime_type"
2 = "_display_name"
3 = "last_modified"
4 = "flags"
5 = "_size"
```


```
        try{
            val df = DocumentFile.fromTreeUri(this, treeUri)
            val files = df?.listFiles()
            // val uri = DocumentsContract.buildDocumentUriUsingTree(treeUri, DocumentsContract.getTreeDocumentId(treeUri))
            val uri = DocumentsContract.buildChildDocumentsUriUsingTree(treeUri, DocumentsContract.getDocumentId(treeUri))

            val cursor = contentResolver.query(uri, null,
                null, null, null, null) ?: return
            val seqs = sequence {
                cursor.use { cur ->
                    while (cur.moveToNext()) {
                        // last_modified
                        val disp = cur.getString(cur.getColumnIndex(OpenableColumns.DISPLAY_NAME))
                        val lindex = cur.getColumnIndex(DocumentsContract.Document.COLUMN_LAST_MODIFIED)
                        val lm = cur.getLong(lindex)
                        val did = cur.getString(cur.getColumnIndex(DocumentsContract.Document.COLUMN_DOCUMENT_ID))
                        yield("$disp : $lm: $did")
                    }
                }
            }
            editText.setText(seqs.joinToString("\n"))
        }catch (e: RuntimeException) {
            editText.setText(e.message)
        }
```

[DocumentsContract.Document  ：  Android Developers](https://developer.android.com/reference/android/provider/DocumentsContract.Document)

isDirectoryは以下が呼ばれるのでMIME_TYPEで良さそう。

```
   public static boolean isDirectory(Context context, Uri self) {
        return DocumentsContract.Document.MIME_TYPE_DIR.equals(getRawType(context, self));
    }
```

listFilesのコードを抜粋。

```
        Cursor c = null;
        try {
            c = resolver.query(childrenUri, new String[] {
                    DocumentsContract.Document.COLUMN_DOCUMENT_ID }, null, null, null);
            while (c.moveToNext()) {
                final String documentId = c.getString(0);
                final Uri documentUri = DocumentsContract.buildDocumentUriUsingTree(mUri,
                        documentId);
                results.add(documentUri);
            }
```

uriはbuildDocumentUriUsingTreeで作るらしい。