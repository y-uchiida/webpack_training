# memorandum of webpack-training sec.6
Udemy講座の内容を実際に作成しながら、忘れそうなところやつまづいた部分を記載していきます。

## clean-webpack-pulugin のインストールと導入
dist ディレクトリ内を削除し、古いファイルを残さないようにするためのプラグイン  
`npm install --save-dev clean-webpack-plugin@latest` でインストール  
config ファイルに設定を追加する

## dist への出力内容を整理する
distの出力結果はサーバーに設置(デプロイ)するものなので、ディレクトリ構成なども設定しておきたい  
config ファイルへの設定で対応できる

### js ファイルの出力の設定
coufig ファイル内の、output の項目にfilename を相対パス月で指定する

### css ファイルの出力
cssファイルの出力の設定は、mini-css-extract-pluginのオプションで指定できる  
config ファイルのpluginsの設定の中で、filename を設定する

## src ディレクトリ内の構成の変更
dist ディレクトリと同じ構成にしてあった方がいいので、JavaScriptやcssのファイルの配置を変更する  
追加でインストールするパッケージやプラグインはない