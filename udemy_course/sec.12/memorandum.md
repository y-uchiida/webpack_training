# memorandum of webpack-training sec.12
Udemy講座の内容を実際に作成しながら、忘れそうなところやつまづいた部分を記載していきます。

## JavaScript のソースマップ
コンパイル前のコードをブラウザ上で表示したり、ブレイクポイントを設定してデバッグを行うことができる  
`devtool: source-map` を設定ファイルに追加する
```
	module.exports = {
		devtool: "source-map",
```

設定値によって利用できる機能や出力される形式が変わる  
https://webpack.js.org/configuration/devtool/  

## CSS のソースマップ
Sassなどの内容をブラウザ上で確認できる
```
	test: /\.css|sass|scss/, 
	use: [
		{ loader: MiniCssExtractPlugin.loader },
		{ 
			loader: "css-loader",
			options: { sourceMap: true },　/* ソースマップの出力を追加する */
		},
```

## ビルドモードの切り替え
`development`: 開発中に便利な機能が利用できる  
`production`: ファイルサイズを小さくし、また実行速度が速くなるようにコンパイルする  
configのファイルに`mode: "development"` を指定すると、デフォルトのビルドモードを設定できる
```
module.exports = {
	mode: "development"

```

## 短縮コマンドの設定
`package.json` に、npx のショートカットコマンドを設定できる
`scripts` の中に設定する
```
  "scripts": {
    "start": "npx webpack serve --mode=development",
    "build": "webpack --mode production",
    "build:dev": "webpack --mode development"
  },
```

- npm start で webpackサーバを起動
- npm run build でプロダクションモードでビルドを実行
- npm run build:dev で、開発モードでビルドを行う

そのほかにも、任意にコマンドを追加することができる