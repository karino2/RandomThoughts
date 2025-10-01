<template><div><p><a href="./Android.html">Android</a>のSAF関連。</p>
<ul>
<li><a href="https://techblog.lycorp.co.jp/ja/20240828a" target="_blank" rel="noopener noreferrer">DocumentsProviderによるデータアクセスをよりセキュアにする工夫</a></li>
<li><a href="https://www.javaer101.com/en/article/92932287.html" target="_blank" rel="noopener noreferrer">DocumentFileをACTION_VIEWにわたす</a></li>
<li><a href="https://akira-watson.com/android/action_create_document.html" target="_blank" rel="noopener noreferrer">[Android] Storage Access Framework でドキュメントを保存する</a> ACTION_CREATE_DOCUMENTの例</li>
<li><a href="https://y-anz-m.blogspot.com/2020/11/android-11-actioncreatedocument.html" target="_blank" rel="noopener noreferrer">Y.A.Mの雑記帳: Android 11 では ACTION_CREATE_DOCUMENT と ACTION_OPEN_DOCUMENT には queries 指定が必要</a></li>
<li><a href="https://developer.android.com/training/data-storage/use-cases" target="_blank" rel="noopener noreferrer">Android storage use cases and best practices  -  Android Developers</a></li>
</ul>
<hr>
<h3 id="メディアファイルの周辺" tabindex="-1"><a class="header-anchor" href="#メディアファイルの周辺"><span>メディアファイルの周辺</span></a></h3>
<p>WhiteBoardCastで録画した動画をこれまではexternal storageに保存していたが、これはAndroid 10以降のスタイルでは無い。
という事で方針を考える。</p>
<h3 id="全体の方針" tabindex="-1"><a class="header-anchor" href="#全体の方針"><span>全体の方針</span></a></h3>
<p>MediaMixtureがFileを取る。だから録画中のファイルはapp specific directoryに入れておくのが良さそう。
最後に合成が終わったらMediaStoreに移動するのがいいだろうか？</p>
<ul>
<li><a href="https://developer.android.com/training/data-storage/shared/media" target="_blank" rel="noopener noreferrer">Access media files from shared storage  -  Android Developers</a> のToggle pending status for media files　という所にParcelFileDescriptorを取得する例がある。これでバイナリを書く事は出来そう。</li>
<li><a href="https://stackoverflow.com/questions/59511147/create-copy-file-in-android-q-using-mediastore" target="_blank" rel="noopener noreferrer">Create/Copy File in Android Q using MediaStore - Stack Overflow</a> これの「1. Create and Write File」の回答も近いコードになっている</li>
</ul>
<p>スライドはpdfとしてexportするので、これはSAFを使うのがいいか？
コードを見直すとpdfwriterのライブラリはOutputStreamでさえあれば良さそうなので、SAFで保存ファイルを選ばせる事は出来そう。</p>
<h3 id="permission" tabindex="-1"><a class="header-anchor" href="#permission"><span>permission</span></a></h3>
<p>permissionとしては<a href="https://developer.android.com/training/data-storage/shared/media" target="_blank" rel="noopener noreferrer">Access media files from shared storage  -  Android Developers</a>の「Extra permissions needed for apps running on legacy devices」に、 Android 9以下ならREAD_EXTERNAL_STORAGEとWRITE_EXTERNAL_STORAGEがいるとの事。
Android 9はAPI Level 28。</p>
<h3 id="relative-path" tabindex="-1"><a class="header-anchor" href="#relative-path"><span>RELATIVE_PATH</span></a></h3>
<p>RELATIVE_PATHは API Level 29から。</p>
<ul>
<li><a href="https://developer.android.com/reference/android/provider/MediaStore.MediaColumns#RELATIVE_PATH" target="_blank" rel="noopener noreferrer">MediaStore.MediaColumns  -  Android Developers</a></li>
<li><a href="https://developer.android.com/tools/releases/platforms" target="_blank" rel="noopener noreferrer">SDK Platform release notes  -  Android Studio  |  Android Developers</a></li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q)</span>
<span class="line">{</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="サムネイル" tabindex="-1"><a class="header-anchor" href="#サムネイル"><span>サムネイル</span></a></h3>
<p>これまではファイルに書いて<code v-pre>ThumbnailUtils.createVideoThumbnail</code>を呼んでいたがMediaStoreのUriに書くようにしたので違うのを使う必要がある。</p>
<p><a href="https://developer.android.com/training/data-storage/shared/media" target="_blank" rel="noopener noreferrer">Access media files from shared storage  -  Android Developers</a>の「Load file thumbnails」によると、loadThumbnailで良さそう。</p>
<p>と思ったらこれはAndroid Qから。Pより前は何使ったらいいんだ？
とりあえずapp specific storageに保存されてる方のファイルにこれまで通りのThumbnailUtilsを使う方針にしてみよう。</p>
<h3 id="todo" tabindex="-1"><a class="header-anchor" href="#todo"><span>TODO</span></a></h3>
<ul>
<li>DONE ... WorkDirの下のmp4を全て削除</li>
<li>PDFのexportをSAFに</li>
<li>DONE ... drag indicatorのアイコンを組み込む</li>
<li>DONE ... 横画面でのスライド選びをなんとかしたい。</li>
<li>DONE ... MultiGalleryが機能してないので方針を考える</li>
</ul>
<p>Photo pickerが使いたいがFire Maxでは使え無さそう？要調査。</p>
<p><a href="https://developer.amazon.com/ja/docs/fire-tablets/ft-supported-android-intents.html" target="_blank" rel="noopener noreferrer">対応しているAndroidのインテント - Fireタブレット</a></p>
<p>GET_CONTENTと入れ替えActivityにするかなぁ。</p>
<ul>
<li><a href="https://stackoverflow.com/questions/19513556/select-multiple-files-with-intent-action-get-content" target="_blank" rel="noopener noreferrer">android - Select multiple files with Intent.ACTION_GET_CONTENT - Stack Overflow</a></li>
<li><a href="https://stackoverflow.com/questions/60085410/android-10-action-get-content-image-with-gps-info" target="_blank" rel="noopener noreferrer">Android 10 ACTION_GET_CONTENT image with GPS info? - Stack Overflow</a></li>
</ul>
<p>Photo Pickerは無ければACTION_GET_CONTENTになって、しかも良い感じにやってくるメッセージは統一してくれるので、
Photo Pickerでいい気がしてきた。</p>
<p>そこにRecycleViewerでドラッグアンドロップで順番変えられる感じのスライドインポーター的なActivityを作るのが良さそう。</p>
<ul>
<li><a href="https://developer.android.com/reference/androidx/recyclerview/widget/ItemTouchHelper" target="_blank" rel="noopener noreferrer">ItemTouchHelper  -  Android Developers</a> この辺か。</li>
</ul>
<p>FireMaxでAudioRecordのreadがかえってこなくなるのはバッファサイズが大きすぎるらしい。minの倍ちょっとなんだが…
という事で無事解決。</p>
<p>ContentDBのupdateがうまく行かなくなっている。以下のメッセージが出ている。</p>
<p><code v-pre>&quot;Movement of content://media/external/video/media which isn't part of well-defined collection not allowed&quot;</code></p>
<ul>
<li>where句でidと一致するのをupdateしていたが、urlを直接指定するように変更</li>
</ul>
<h3 id="getexternalstoragepublicdirectory周辺" tabindex="-1"><a class="header-anchor" href="#getexternalstoragepublicdirectory周辺"><span>getExternalStoragePublicDirectory周辺</span></a></h3>
<p><a href="./あおぞらAndroid教室.html">あおぞらAndroid教室</a>でファイル周りの解説でも書こうかと思っていて、getExternalStoragePublicDirectoryを使おうと思ったらdeprecatedとなっているな。</p>
<p><a href="https://developer.android.com/reference/android/os/Environment#getExternalStoragePublicDirectory(java.lang.String)" target="_blank" rel="noopener noreferrer">Environment  -  Android Developers</a></p>
<p>だが同じ役割をする代替が無さそう。</p>
<p><a href="https://stackoverflow.com/questions/56468539/getexternalstoragepublicdirectory-deprecated-in-android-q" target="_blank" rel="noopener noreferrer">getExternalStoragePublicDirectory deprecated in Android Q - Stack Overflow</a></p>
<p>RELATIVE_PATHが良さそうだが、これはAPI level 29から、だとか。さすがにこれはちょっと新しすぎるなぁ。</p>
<div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt"><pre v-pre><code class="language-kotlin"><span class="line">      <span class="token keyword">val</span> resolver <span class="token operator">=</span> context<span class="token punctuation">.</span>contentResolver</span>
<span class="line">      <span class="token keyword">val</span> contentValues <span class="token operator">=</span> <span class="token function">ContentValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">apply</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">put</span><span class="token punctuation">(</span>MediaStore<span class="token punctuation">.</span>MediaColumns<span class="token punctuation">.</span>DISPLAY_NAME<span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">"SomeFileName001"</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token function">put</span><span class="token punctuation">(</span>MediaStore<span class="token punctuation">.</span>MediaColumns<span class="token punctuation">.</span>MIME_TYPE<span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">"image/jpeg"</span></span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token function">put</span><span class="token punctuation">(</span>MediaStore<span class="token punctuation">.</span>MediaColumns<span class="token punctuation">.</span>RELATIVE_PATH<span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">"DCIM/SomeDirName"</span></span><span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">val</span> uri <span class="token operator">=</span> resolver<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>MediaStore<span class="token punctuation">.</span>Images<span class="token punctuation">.</span>Media<span class="token punctuation">.</span>EXTERNAL_CONTENT_URI<span class="token punctuation">,</span> contentValues<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">      resolver<span class="token punctuation">.</span><span class="token function">openOutputStream</span><span class="token punctuation">(</span>uri<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// TODO something with the stream</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Storage Access Frameworkの推奨シナリオを見ていたら、getExternalStoragePublicDirectoryを使えと書いてある… ＞<a href="https://developer.android.com/training/data-storage/use-cases#export-media-files-to-device" target="_blank" rel="noopener noreferrer">Android storage use cases and best practices  -  Android Developers</a></p>
<p>正しくはバージョン見てgetExternalStoragePublicDirectoryと上記のコードを切り替えるんだろうが、さすがに違いすぎてかったるいな、これは。</p>
<p>まぁSAF使わずにDownloads下に保存したい、みたいなのはそれなりに雑なアプリな事が多いので、29以下を捨てる日が来るまではgetExternalStoragePublicDirectoryを使い続けるか。</p>
<p>こういうの互換にするためのandroidxでは無いのか？と思うが、使えそうなのが見当たらないな。</p>
<h3 id="しばらくしたあとのアクセスでsecurityexceptionが上がる" tabindex="-1"><a class="header-anchor" href="#しばらくしたあとのアクセスでsecurityexceptionが上がる"><span>しばらくしたあとのアクセスでSecurityExceptionが上がる</span></a></h3>
<p>GoogleDriveなどで、ACTION_OPEN_DOCUMENTで得たuriをtakePersistableUriPermissionして保存し、デバイスを再起動してそのuriを開くと、以下のexception。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">java.lang.SecurityException: Permission Denial: opening provider com.google.android.apps.docs.storagebackend.StorageBackendContentProvider from ProcessRecord{3833be7 4019:io.github.karino2.textdeck/u0a234} (pid=4019, uid=10234) requires that you obtain access using ACTION_OPEN_DOCUMENT or related APIs</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>ACTION_OPEN_DOCUMENTのintentに以下をやってもダメ。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">intent.addFlags(Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION)</span>
<span class="line">intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)</span>
<span class="line">intent.addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>直し方分からず。とりあえずSecurityExceptionをハンドルしておこう。</p>
<hr>
<h3 id="試行錯誤した時のメモ" tabindex="-1"><a class="header-anchor" href="#試行錯誤した時のメモ"><span>試行錯誤した時のメモ</span></a></h3>
<p><a href="https://developer.android.com/training/data-storage/shared/documents-files#grant-access-directory" target="_blank" rel="noopener noreferrer">https://developer.android.com/training/data-storage/shared/documents-files#grant-access-directory</a></p>
<p>ここに書いてあるとおりにACTION_OPEN_DOCUMENT_TREEでIntentを投げて帰ってきたuriにContentResolverのqueryをやったら、UnsupportedOperationExceptionが。</p>
<p>なんで？とググってたらここに引っかかり、</p>
<p><a href="https://stackoverflow.com/questions/54161951/unsupported-uri-in-contentresolver-when-passing-uri-returned-by-intent" target="_blank" rel="noopener noreferrer">SO: Unsupported Uri in ContentResolver when passing Uri returned by Intent</a></p>
<p>そこにかかれている謎のおまじない</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">val uri = DocumentsContract.buildDocumentUriUsingTree(treeUri, DocumentsContract.getTreeDocumentId(treeUri))</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>を間に挟んだらたしかに読めるようになった。なんじゃこれ？
そしてこれだとdirのエントリが帰ってきて中身が読めない。ふむ。</p>
<p>DocumentsContractというのがヒントっぽい、とドキュメントを読んで見る</p>
<p><a href="https://developer.android.com/reference/android/provider/DocumentsContract" target="_blank" rel="noopener noreferrer">https://developer.android.com/reference/android/provider/DocumentsContract</a></p>
<p><code v-pre>buildChildDocumentsUriUsingTree</code>がそれっぽいか？</p>
<p><a href="https://developer.android.com/reference/androidx/documentfile/provider/DocumentFile" target="_blank" rel="noopener noreferrer">androidx:DocumentFile</a> がちゃんと動くっぽい！</p>
<h3 id="documentfileはlistfilesとかnameとかがいちいち遅い" tabindex="-1"><a class="header-anchor" href="#documentfileはlistfilesとかnameとかがいちいち遅い"><span>DocumentFileはlistFilesとかnameとかがいちいち遅い</span></a></h3>
<p><a href="https://stackoverflow.com/questions/42186820/documentfile-is-very-slow" target="_blank" rel="noopener noreferrer">java - DocumentFile is very slow - Stack Overflow</a></p>
<p>これは酷い。
コードはここか。</p>
<p><a href="https://cs.android.com/androidx/platform/frameworks/support/+/androidx-main:documentfile/documentfile/src/main/java/androidx/documentfile/provider/TreeDocumentFile.java" target="_blank" rel="noopener noreferrer">TreeDocumentFile.java - Android Code Search</a></p>
<h3 id="documentfileと同じような機能を持つfastfileを実装" tabindex="-1"><a class="header-anchor" href="#documentfileと同じような機能を持つfastfileを実装"><span>DocumentFileと同じような機能を持つFastFileを実装</span></a></h3>
<p><a href="https://github.com/karino2/PngNote/commit/b19dbf1841ff443ea7561c9c07109e358d03cdad" target="_blank" rel="noopener noreferrer">Implement FastFile and use it instead of DocumentFile. · karino2/PngNote@b19dbf1</a></p>
<p>今後はこれを使っていこう。</p>
<hr>
<h3 id="雑多なメモ" tabindex="-1"><a class="header-anchor" href="#雑多なメモ"><span>雑多なメモ</span></a></h3>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">    &lt;uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" /></span>
<span class="line">    &lt;uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" /></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>last_modified</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">0 = "document_id"</span>
<span class="line">1 = "mime_type"</span>
<span class="line">2 = "_display_name"</span>
<span class="line">3 = "last_modified"</span>
<span class="line">4 = "flags"</span>
<span class="line">5 = "_size"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">        try{</span>
<span class="line">            val df = DocumentFile.fromTreeUri(this, treeUri)</span>
<span class="line">            val files = df?.listFiles()</span>
<span class="line">            // val uri = DocumentsContract.buildDocumentUriUsingTree(treeUri, DocumentsContract.getTreeDocumentId(treeUri))</span>
<span class="line">            val uri = DocumentsContract.buildChildDocumentsUriUsingTree(treeUri, DocumentsContract.getDocumentId(treeUri))</span>
<span class="line"></span>
<span class="line">            val cursor = contentResolver.query(uri, null,</span>
<span class="line">                null, null, null, null) ?: return</span>
<span class="line">            val seqs = sequence {</span>
<span class="line">                cursor.use { cur -></span>
<span class="line">                    while (cur.moveToNext()) {</span>
<span class="line">                        // last_modified</span>
<span class="line">                        val disp = cur.getString(cur.getColumnIndex(OpenableColumns.DISPLAY_NAME))</span>
<span class="line">                        val lindex = cur.getColumnIndex(DocumentsContract.Document.COLUMN_LAST_MODIFIED)</span>
<span class="line">                        val lm = cur.getLong(lindex)</span>
<span class="line">                        val did = cur.getString(cur.getColumnIndex(DocumentsContract.Document.COLUMN_DOCUMENT_ID))</span>
<span class="line">                        yield("$disp : $lm: $did")</span>
<span class="line">                    }</span>
<span class="line">                }</span>
<span class="line">            }</span>
<span class="line">            editText.setText(seqs.joinToString("\n"))</span>
<span class="line">        }catch (e: RuntimeException) {</span>
<span class="line">            editText.setText(e.message)</span>
<span class="line">        }</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://developer.android.com/reference/android/provider/DocumentsContract.Document" target="_blank" rel="noopener noreferrer">DocumentsContract.Document  ：  Android Developers</a></p>
<p>isDirectoryは以下が呼ばれるのでMIME_TYPEで良さそう。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">   public static boolean isDirectory(Context context, Uri self) {</span>
<span class="line">        return DocumentsContract.Document.MIME_TYPE_DIR.equals(getRawType(context, self));</span>
<span class="line">    }</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>listFilesのコードを抜粋。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">        Cursor c = null;</span>
<span class="line">        try {</span>
<span class="line">            c = resolver.query(childrenUri, new String[] {</span>
<span class="line">                    DocumentsContract.Document.COLUMN_DOCUMENT_ID }, null, null, null);</span>
<span class="line">            while (c.moveToNext()) {</span>
<span class="line">                final String documentId = c.getString(0);</span>
<span class="line">                final Uri documentUri = DocumentsContract.buildDocumentUriUsingTree(mUri,</span>
<span class="line">                        documentId);</span>
<span class="line">                results.add(documentUri);</span>
<span class="line">            }</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>uriはbuildDocumentUriUsingTreeで作るらしい。</p>
</div></template>


