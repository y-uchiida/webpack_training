# memorandum of webpack-training sec.9
Udemy講座の内容を実際に作成しながら、忘れそうなところやつまづいた部分を記載していきます。

## webpack-dev-server でローカルサーバを起動する
これまではブラウザで直接PC内のhtmlファイルにアクセスしてきたが、  
`webpack-dev-server` パッケージを利用してローカルにWebサーバを動作させてhttpアクセスできるようにする
実際のURL構造に近い状態で動作確認できることと、ライブリロードの機能が使えることが利点

## インストール
```
$ npm install --save-dev webpack-dev-server@latest
npm WARN deprecated querystring@0.2.0: The querystring API is considered Legacy. new code should use the URLSearchParams API instead.
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated core-js@2.6.12: core-js@<3.3 is no longer maintained and not recommended for usage due to the number of issues. Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Please, upgrade your dependencies to the actual version of core-js.

added 464 packages, and audited 465 packages in 29s

60 packages are looking for funding
  run `npm fund` for details

2 high severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
```

今回も警告が出ているが、いったん修正せずに進める

## サーバの起動
```
$ npx webpack serve --mode=development
<i> [webpack-dev-server] Project is running at:
<i> [webpack-dev-server] Loopback: http://localhost:8080/
<i> [webpack-dev-server] On Your Network (IPv4): http://192.168.1.5:8080/
<i> [webpack-dev-server] On Your Network (IPv6): http://[fe80::218d:9c5b:e:ca17]:8080/
<i> [webpack-dev-server] Content not from webpack is served from 'C:\Users\y-uchiida\Documents\develop\webpack_training\udemy_course\sec.9\public' directory
assets by path images/ 1.76 MiB
  asset images/background.jpg 1.75 MiB [emitted] [from: src/images/background.jpg]
  asset images/deer_icon.png 7.91 KiB [emitted] [from: src/images/deer_icon.png]
assets by path ./ 298 KiB
  asset ./js/main.js 297 KiB [emitted] (name: main)
  asset ./css/main.css 251 bytes [emitted] (name: main)
assets by path *.html 1.65 KiB
  asset index.html 921 bytes [emitted]
  asset access.html 769 bytes [emitted]
Entrypoint main 298 KiB = ./css/main.css 251 bytes ./js/main.js 297 KiB
runtime modules 42.9 KiB 23 modules
orphan modules 2.79 KiB [orphan] 3 modules
javascript modules 204 KiB
  modules by path ./node_modules/ 203 KiB 30 modules
  modules by path ./src/ 944 bytes
    ./src/js/main.js 430 bytes [built] [code generated]
    ./src/js/samlple_module.js 121 bytes [built] [code generated]
    ./src/css/main.css 393 bytes [built] [code generated]
css ./node_modules/css-loader/dist/cjs.js!./src/css/main.css 29 bytes [built] [code generated]
webpack 5.58.2 compiled successfully in 2097 ms

# 停止したいときは Ctrl + C
```

dev-server を起動した状態で、`http://localhost:8080/` へアクセスすると、index.htmlが表示される

## ライブリロード
src ディレクトリ内のファイルを監視していて、変更を検知すると自動的にビルドして更新してくれる  
手動でのビルドと、読み込みしなおしも不要なので、すごく手間が少なくなる

## devサーバ利用時は、ファイルが生成されない
メモリ上にdistのファイルが展開されているだけの状態  
そのためライブリロードなどの高レスポンスが実現できているということらしい