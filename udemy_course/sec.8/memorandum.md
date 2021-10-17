# memorandum of webpack-training sec.8
Udemy講座の内容を実際に作成しながら、忘れそうなところやつまづいた部分を記載していきます。

## htmlをPugを使って記述する
Jade の後継にあたるテンプレートエンジン  
記述方法が特殊なので、結構覚えることが多い  

## 必要なパッケージのインストール
html-loader と pug-html-loader をインストールする  
```
$ $ npm install --save-dev pug-html-loader@latest html-loader@latest
npm WARN deprecated core-js@2.6.12: core-js@<3.3 is no longer maintained and not recommended for usage due to the number of issues. Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Please, upgrade your dependencies to the actual version of core-js.

added 62 packages, changed 1 package, and audited 281 packages in 9s

39 packages are looking for funding
  run `npm fund` for details

2 high severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
```
バージョン依存のエラー？が出てるけど、無理に直そうとすると動かなくなったので、とりあえずこのままにしておく

## configファイルの変更
`.pug`ファイルをhtmlに変換する`pug-html-loader`を適用したあと、htmlを文字列としてエクスポートする`html-loader`に引き渡す。  
以前にやった通り、「loaderの設定は下から適用される」ので、上に`html-loader`、下に`pug-html-loader` を記述する
```
		rules: [
			/* pug ファイルの読み込み設定を追加 */
			{
				test: /\.pug/,
				use: [
					/* 2. htmlを文字列としてエクスポート */
					{loader: "html-loader"},
					
					/* 1. pug ファイルをhtmlに変換 */
					{
						loader: "pug-html-loader",
						options: {
							pretty: true /* 返還後のhtmlのミニファイを行わない */
						}
					}
				]
			},
```

また、`HtmlWebpackPlugin` のtemplateの設定も、index.html からindex.pug に変更する
```
		new HtmlWebpackPlugin({
			// template: "./src/templates/index.html"
			template: "./src/templates/index.pug"
		}),
```

## index.pug の作成
`index.html` の出力元になる`index.pug` を作成する  
```
//- index.pug 
//- コメント
doctype html
html(lang="en")
	head
		meta(charset="UTF-8")
		meta(http-equiv="X-UA-Compatible", content="IE=edge")
		meta(name="viewport", content="width=device-width, initial-scale=1.0")
		title index.html - webpack training
	body 
		h1 index.html(build from index.pug)
		p this is training
		div 
			img(src="../images/deer_icon.png", alt="deer")
		div 
			img(src="", alt="background")
```

## ビルドを実行
index.pug がindex.html になってdistに保存されることを確認する
```
$ npx webpack --mode development
assets by path images/ 1.76 MiB
  asset images/background.jpg 1.75 MiB [emitted] [from: src/images/background.jpg]
  asset images/deer_icon.png 7.91 KiB [emitted] [from: src/images/deer_icon.png]
assets by path ./ 5.44 KiB
  asset ./js/main.js 5.19 KiB [emitted] (name: main)
  asset ./css/main.css 251 bytes [emitted] (name: main)
assets by path *.html 995 bytes
  asset index.html 576 bytes [emitted]
```

## 複数のページを出力する方法
設定ファイルの`plugins` ディレクティブで、設定を追加する  
```
	plugins: [ 
		new HtmlWebpackPlugin({ /* index.html を出力する設定 */
			// template: "./src/templates/index.html"
			template: "./src/templates/index.pug",
			filename: "index.html"
		}),
		
		new HtmlWebpackPlugin({ /* access.html を出力する設定 */
			template: "./src/templates/access.pug",
			filename: "access.html"
		}),
```

`access.pug` を作成してビルドすると、`access.html`が生成される

## 分割したpug ファイルを、共通して読み込みする
`incluide [読み込みするpug ファイル名]` で、別ファイルの内容を表示できる  
ヘッダーなど各ページで共通して利用される部分で便利

```
	body 
		// - 分割したファイルを、include で読み込みする
		include _header.pug
```

## pugのテンプレートの継承(extends)  
PHP のbladeと同じような機能  
継承元のファイルの中に、あらかじめおき返される部分を作っておいて、  
インクルード先で内容を記述させる  
`block content` と継承元ファイルに記述したら同じように継承先のファイルでも  
`block content` と記述して、インデントしてその部分に出力する内容を書く  
今回は、`_layout.pug`を継承元とした  
継承先ファイルでは`extends _layout.pug` と記述してベースのレイアウトを取り込み、
`block content` の中に自身のページで表示する内容を記述する

## 変数の利用
宣言  
`- var 変数名 = 値`

使用  
`#{変数名}`  

継承元のファイルのblockの中で変数を宣言しておくと、継承先ファイルのblockの中でそれを上書きすることができる  
今回はそれを利用して、ページタイトルを各ページごとに書き換えるということを行った