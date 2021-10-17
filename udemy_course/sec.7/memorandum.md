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
