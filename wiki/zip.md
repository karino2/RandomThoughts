仕事でzipアーカイブを使いたいのだが、C++で小回りの効く小さいライブラリが無かったので自分で書く事にする。

- [FILEFORMAT: ZIP](https://docs.fileformat.com/compression/zip/)
- [zipの仕様](https://pkware.cachefly.net/webdocs/casestudies/APPNOTE.TXT)
- [zip package - archive/zip - Go Packages](https://pkg.go.dev/archive/zip)
    - [reader.go - Go](https://cs.opensource.google/go/go/+/refs/tags/go1.21.0:src/archive/zip/reader.go) readerのコード
- [RFC 1950: ZLIB Compressed Data Format Specification version 3.3](https://www.rfc-editor.org/rfc/rfc1950)
- [RFC 1951: DEFLATE Compressed Data Format Specification version 1.3](https://www.rfc-editor.org/rfc/rfc1951)
- [zlib Home Site](https://www.zlib.net/)

出来た＞[CppUnzip](CppUnzip)