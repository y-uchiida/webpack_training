# memorandum of webpack-training sec.7
Udemy講座の内容を実際に作成しながら、忘れそうなところやつまづいた部分を記載していきます。

## 画像の読み込み
html のimgタグなどで画像を読み込む場合、通常通りの方法ではバンドルされない  
`<% require('画像パス') %>` の形式で記述する

## url-loader パッケージのインストール
