# memorandum of webpack-training sec.7
Udemy講座の内容を実際に作成しながら、忘れそうなところやつまづいた部分を記載していきます。

## 画像の読み込み
html のimgタグなどで画像を読み込む場合、通常通りの方法ではバンドルされない  
`<% require('画像パス') %>` の形式で記述する

## url-loader パッケージのインストール
urlを取り扱うパッケージ？ をインストールする
```
$ npm install --save-dev url-loader@latest

added 206 packages, and audited 207 packages in 13s

32 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

## 設定ファイルの記述
`webpack.config.js` に、url-loaderの設定を記述する
```
			/* 画像の読み込みルールを追加 */
			{
				test: /\.png/,
				use: [
					{
						loader: "url-loader",
						options: {
							/* ES modulesの構文での読み込みをしない
							 * ES modules: jsファイルから別のjsファイルを読み込むための仕様
							 */
							esModule: false
						}
					}
				]
			}
```

## url-loaderでは、画像がbase64として取り込まれる
ここまでの内容でビルドしてみると、htmlファイルの画像パスがbase64形式で記述される  
これだと扱いづらくなってしまうので、画像を外部ファイルとしてdistに含めるようにしたい

## file-loader のインストールと利用
url-loaderの代わりに、file-loaderを使う  
まずはインストールを行う
```
$ npm install --save-dev file-loader@latest

added 1 package, and audited 208 packages in 917ms

33 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```
その後、設定ファイルの記述を、url-loaderからfile-loaderに変更する  
```
	/* file-loader を利用するので、"url-loader"はコメントアウトしておく */
	// loader: "url-loader",
	loader: "file-loader",
```

この状態でビルドすると、ファイル名がランダムに出力された画像ファイルがdistに含まれるようになる

## file-loader の設定の最適化
ファイル名の出力がランダムになってしまうと、distを見た際の対応関係がわからなくなるので、srcファイルのほうと一致させたい  
その場合、optionsの `name`で設定することができる  
`[name].[ext]` で、ファイル名と拡張子を維持したままdist/images ディレクトリに保存される  
```
	options: {
		esModule: false,
		name: "images/[name].[ext]"
	}
```
  
また、様々な形式の画像ファイルに対応するため、testの記述も変更する
```
	test: /\.(png|jpg|jpeg|svg|bmp)/,
```

## ビルドを実行
ここまで設定を行ってビルドをすると、出力結果にimagesディレクトリと画像が含まれていることがわかる
```
$ npx webpack --mode development
assets by path images/ 1.76 MiB
  asset images/background.jpg 1.75 MiB [emitted] [from: src/images/background.jpg]
  asset images/deer_icon.png 7.91 KiB [emitted] [from: src/images/deer_icon.png]
assets by path ./ 5.44 KiB
  asset ./js/main.js 5.19 KiB [emitted] (name: main)
  asset ./css/main.css 251 bytes [emitted] (name: main)
asset index.html 501 bytes [emitted]
Entrypoint main 5.44 KiB = ./css/main.css 251 bytes ./js/main.js 5.19 KiB
```

## Webpack5 のasset module
最新版のWebpack 5 では、画像などのアセットファイルを扱うためのモジュールが標準搭載された  
url-loaderやfile-loaderを追加でインストールしなくても、asset モジュールを利用すれば、  
画像ファイルをdistに含めることができる

```
	test: /\.(png|jpg|jpeg|svg|bmp)/,
	/* webpack 5 のasset modukeを利用する場合の記述 */
	type: "asset/resource",
	generator: {
		filename: "images/[name][ext]"
	},
```