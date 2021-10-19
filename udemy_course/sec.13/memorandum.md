# memorandum of webpack-training sec.13
Udemy講座の内容を実際に作成しながら、忘れそうなところやつまづいた部分を記載していきます。

## 画像の軽量化
`image-webpack-loader` で画像を圧縮してdistに出力することができる

まずはインストール
```
$ npm install --save-dev image-webpack-loader@latest
```

画像ファイルの拡張子の設定を追加
```
	test: /\.(png|jpg|jpeg|svg|bmp)/,
	/* ... (中略) ... */
	/* image-loaderを利用して画像を軽量化する */
	use: [
		{ loader: "image-webpack-loader" }
	],
```

オプションの設定は以下のgithubリポジトリのREADMEで確認できる
https://github.com/tcoopman/image-webpack-loader