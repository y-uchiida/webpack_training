# memorandum of webpack-training
Udemy講座の内容を実際に作成しながら、忘れそうなところやつまづいた部分を記載していきます。

## webpack とはなんなのか
webコンテンツを構成するファイルをまとめるツール  
おもにはJavaScriptのファイルをトランスパイルするために利用される  
まとめる際に、シンタックスシュガーやブラウザのバージョン差異などを吸収してくれる  
jsファイルのほかにも、sassのトランスパイルや、画像ファイルのリサイズ処理なども行ってくれる  

## npm のセットアップ
`npm init` コマンドでpackage.json を生成  
インタラクティブ形式で設定を行える  
基本的には空欄のままエンターキーでよい  
あとからpackage.json を編集することもできる
```
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (webpack_training)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author: y.uchiida
license: (ISC)
About to write to /c/Users/y-uchiida/Documents/develop/webpack_training/package.json:

{
  "name": "webpack_training",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "y.uchiida",
  "license": "ISC"
}


Is this OK? (yes)
```

## webpackのインストール
`npm install` コマンドでインストールを行う
```
# バージョンの確認ができる
$ npm view webpack

webpack@5.58.2 | MIT | deps: 24 | versions: 777
Packs CommonJs/AMD modules for the browser. Allows to split your codebase into multiple bundles, which can be loaded on demand. Support loaders to preprocess files, i.e. json, jsx, es7, css, less, ... and your custom stuff.
https://github.com/webpack/webpack

# ...(中略)...

dist-tags:
latest: 5.58.2     legacy: 1.15.0     next: 5.0.0-rc.6   webpack-2: 2.7.0   webpack-3: 3.12.0  webpack-4: 4.46.0

# 最新版を、 --save-dev オプション付きでインストール
$ npm install --save-dev webpack@5.58.2

added 73 packages, and audited 74 packages in 6m

10 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```
package.jsonにwbepackが追記され、依存パッケージの内容がpackage-lock.jsonが作成される  
インストール時に`--save-dev` オプションをつけておくと、package.jsonに「devDependencies」として追加される  
webpackは開発用のツールなので、`--save-dev`をつけて本番データに含まれないようにしておくとよい

## webpack-cli のインストール
webpackと同じ手順でインストールする
```
# 最新パージョンの確認
$ npm view webpack-cli

webpack-cli@4.9.0 | MIT | deps: 13 | versions: 112
CLI for webpack & friends
https://github.com/webpack/webpack-cli/tree/master/packages/webpack-cli

# 最新版をインストール
$ npm install --save-dev webpack-cli@latest
```
最新版をインストールする場合、`webpack-cli@latest` と、タグを利用してバージョンを設定することもできる  
今回だと、最新版である4.9.0 以上を指定したのと同じことになる

## jsファイルのビルド
初期設定では、`./src` ディレクトリ内のjsファイルがビルドされる  
ビルドには、`npx webpack` コマンドを利用する
`--mode development` オプションをつけると、ミニファイなしで出力される
```
$ npx webpack
asset main.js 28 bytes [emitted] [minimized] (name: main)
./src/index.js 28 bytes [built] [code generated]

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value.
Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

webpack 5.58.2 compiled with 1 warning in 537 ms

# --mode development オプションをつけた場合
$ npx webpack --mode development
asset main.js 1.22 KiB [emitted] (name: main)
./src/index.js 28 bytes [built] [code generated]
webpack 5.58.2 compiled successfully in 108 ms

```

## モジュールの読み込み
エントリーポイント以外のjsファイルなどを作って、その内容を読み込みする  
デフォルトのエントリーポイントはindex.js  
ここでは、modules/sample_module.js をインポートする  
モジュールファイルでは、以下の書式でモジュールを定義する
```
export default () => {
	/* 処理内容 */
}
```

エントリーポイント側、または別のモジュールファイルからは、以下のようにしてモジュールをインポートする
```
import module_test from "./modules/samlple_module.js"
```

インポートしたモジュールは、インポート名を関数名として実行することができる
```
/* module_test というモジュール名でインポートした場合 */
module_test() /* -> モジュールの実行 */
```

## 動作の確認
jsファイルの単純な動作チェックであれば、`node` コマンドで動かしてみればOK  
window オブジェクトを使ったり、vue やreactなどを利用している場合は、ブラウザを利用する必要あり
```
$ node dist/main.js
# -> console.log の結果など
```