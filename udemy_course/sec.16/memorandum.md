# memorandum of webpack-training sec.16
Udemy講座の内容を実際に作成しながら、忘れそうなところやつまづいた部分を記載していきます。

## TypeScriptのトランスパイル
JavaScriptのシンタックスシュガー

### パッケージのインストール
- typescript
- ts-loader

### 設定ファイルの変更
`.ts` と`.tsx`に対して、ローダーが実行されるように設定を追加する  

### ts-config.json の追加
`./src/ts-config.ts` を作成する  
TypeScriptをどのバージョンにトランスパイルするかを設定しておくファイル

### TypeScriptのモジュールを作成
２つの数を足し算する関数`add` を持つモジュール`add.ts` を作成

### モジュールの読み込みと関数の実行
`main.js` から`add.ts`を読み込みし、その関数を実行する

## TypeScript でreactのコンポーネントを記述する

### コンポーネントの記述
`src/js/Alert.tsx` を作成
```
import * as React from "react";

const Alert: React.FC<{ message: string }> = ({message}) => {
	return(
		<div style={{ color: "#fff", background: "red" }}>{message}</div>
	)
}

export default Alert;
```

### react by ts のビルド用のパッケージを追加
- @types/react

### jsx から読み込み
作成した`src/js/Alert.tsx` を、`reactApp.js` から読み込んで利用する  
使い方はこれまでと変わらず、モジュールとしてimport するだけでOK