# memorandum of webpack-training sec.17
Udemy講座の内容を実際に作成しながら、忘れそうなところやつまづいた部分を記載していきます。

## プロジェクトの整理整頓

### 利用しないファイルの削除(練習 1)
vueに関連するファイルを消して、reactだけを残す  
ソースコードの削除と、設定ファイルからvueに関する設定の除去  
設定ファイルのほか、`main.js` にもインポートとマウントの記述があるので忘れずに

### 利用しないパッケージの削除(練習 2)
vueを使わないので、パッケージも削除する  
依存関係が残ってしまうので、npm コマンドで削除する  
configファイルを見てvueに関連するパッケージを確認し、`npm uninsall `で取り除く  

コマンド実行後、ビルドが成功してローカルサーバで動作できるかを確認する

### 利用しないファイルの削除(練習 2)
続いて、TypeScriptの関連パッケージとソースコードも削除していく  
手順は先ほどと同じ  
今回はReactのソースと関連があるので、そちらも忘れずに

### 利用しないパッケージの削除(練習 2)
`npm uninstall` でパッケージ削除

コマンド実行後、ビルドが成功してローカルサーバで動作できるかを確認する


### その他、練習で作成してあった内容を取り除く
console へのテスト出力など

## 画面表示の調整
scss ファイルで、スタイルを調整


## react のstyled component
css とコードを分離した記述ができる styled component を試してみる  
やっぱりTypeScript を使うみたいなので、再度インストールしなおす

### パッケージの追加
- styled-compornent

### Alert.tsx の編集
`styled-compornents` をインポートし、`AlertContainer` としてreturnに渡す
```
import * as React from "react";
import styled from "styled-components"

const AlertContainer = styled.div`
	background-color: green;
	color: #fff;
	padding: 1em;
`

const Alert: React.FC<{ message: string }> = ({message}) => {
	return(
		<AlertContainer>
			{message}
		</AlertContainer>		
	)
}

export default Alert;
```
コンポーネント内にスタイルの実装を閉じ込めることができ、別のコンポーネントへの影響を懸念しなくてよくなる