# memorandum of webpack-training sec.10
Udemy講座の内容を実際に作成しながら、忘れそうなところやつまづいた部分を記載していきます。

## Sassの利用
Sassをwebpack でコンパイルして、CSSこーディンゴを効率化する

## パッケージのインストール
`node-sass` と`sass-loader` が必要

```
$ npm install --save-dev node-sass@latest sass-loader@latest

# エラーが出るけど今回もスルー
```

## 設定ファイルとソースコードの編集
1. sass-loaderを一番下にsass-loaderを追加  
2. 拡張子`sass`, `scss` をtestに追加  
3. `css/main.css` のファイル名を、`css/main.scss/` に変更
4. main.jsでインポートするファイルを、`main.css`から`main.scss`に変更
