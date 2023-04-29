[Android](Android)のSAF関連。

- [DocumentFileをACTION_VIEWにわたす](https://www.javaer101.com/en/article/92932287.html)
- [[Android] Storage Access Framework でドキュメントを保存する](https://akira-watson.com/android/action_create_document.html) ACTION_CREATE_DOCUMENTの例
- [Y.A.Mの雑記帳: Android 11 では ACTION_CREATE_DOCUMENT と ACTION_OPEN_DOCUMENT には queries 指定が必要](https://y-anz-m.blogspot.com/2020/11/android-11-actioncreatedocument.html)

---

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