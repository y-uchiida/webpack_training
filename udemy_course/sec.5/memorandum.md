# memorandum of webpack-training sec.5
Udemy講座の内容を実際に作成しながら、忘れそうなところやつまづいた部分を記載していきます。

## style-loader の問題点
- cssがHTML上に出力されてしまうため、htmlファイルが肥大化する
- ファイル構成の見通しが立ちづらいため、ビルド後のファイルから内容が把握できなくなる

## mini-css-extract-plugin の利用
style-loaderに代わって、mini-css-extract-plugin を利用する  
プラグインではあるが、インストール手順はパッケージと同じ
```
$ npm install --save-dev mini-css-extract-plugin@latest

added 1 package, and audited 141 packages in 682ms

20 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

## config ファイルの変更
style-loaderからmini-css-extract-plugin を利用するようにconfigファイルを書き換える  
編集・追記は以下の3か所
1. MiniCss... プラグインを読み込みする
2. minicss... を利用するため、plugins の設定を追記
3. cssファイルに対して、style-loaderの代わりにminicss... プラグインを適用する

## ビルドをして、cssファイルが出力されることを確認する
以上の設定を行ってビルドすると、main.cssが新しく生成される
```
$ npx webpack --mode development
asset main.js 5.24 KiB [emitted] (name: main)
asset main.css 264 bytes [emitted] (name: main)
```
main.cssはhtml側で読み込みされていないので、linkタグを追加して読み込みさせる

## html ファイルを生成するプラグイン webpack-html-plugin の利用
これまではdist/index.html ファイルを直接編集していたが、そもそもdistディレクトリ内はwebpackの出力結果のみが含まれるようにしておくべき  
htmlファイルもwebpackから出力できるように、webpack-html-plugin を導入する

```
$ npm install html-webpack-plugin@latest
added 33 packages, and audited 174 packages in 10m

30 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

## html-pluginのためのconfigの変更
インストール後、configを変更する
A. HtmlWebpackPlugin を読み込みする  
requireで読み込み

B. HtmlWebpackPluginの設定を追加  
plugins に、HtmlWebpackPlugin のオブジェクトを追加  
初期化用の引数として、teplate でファイルの位置を与えておく  
src ディレクトリの中を編集すればよいように、パスを指定する  
このファイルを雛形として、main.js や main.css など他の生成ファイルを読み込みする記述を追記したものがdistに出力される

## index.htmlの作成
srcディレクトリ内に、index.htmlを作成する

## ビルドをして、htmlファイルが出力されることを確認する
以上の設定をしてビルドを行うと、index.htmlが新たに出力される
```
$ npx webpack --mode development
asset main.js 5.24 KiB [compared for emit] (name: main)
asset index.html 355 bytes [emitted]
asset main.css 264 bytes [compared for emit] (name: main)
# ... (以下略) ...
```