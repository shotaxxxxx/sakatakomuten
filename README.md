# Orelop CLI use JavaScript


俺のWebサイト制作開発環境
Ore no Web Develop Comand Line Interface 略して「Orelop CLI」です。

僕なりのWebサイト制作の開発環境ってことです。

最近まではGulpを使っていましたが、脱Gulpを目標に、基本はnpm-scriptsとJavaScriptファイルのバンドルにwebpackを使って実行する開発環境を作りました。

## 概要
この開発環境で開発が可能な言語は以下のとおりです。

- HTML（EJS）
- CSS（Sass）
- JavaScript
- PHP

です。

### HTML
HTMLは、純粋にHTMLを書く方法とEJSを使う方法で開発できます。
Pugは・・・・。

やめました。

### CSS
CSSは　SCSSでの記述が可能です。
コンパイルは node-sass でコンパイルしてます。
glob による @importが可能で、特定のディレクトリ内のscssファイル全てインポートする場合は、以下のように記述できます。

```sass:common.scss
@import "layout/*";
@import "object/compornent/*";
```

また、コンパイル時に、PostCSSによって、
Autoplefixerによるベンダープレフィックスを付加したCSSファイルを生成します。

なお、開発用にコンパイルする際は、ソースマップを出力し、リリース用にコンパイルする際は、PostCSSのcssnanoによって、ファイルの圧縮を行います。

Sassファイルのフォーマットは、Pretterと Stylelintを使って整形することが可能です。プロパティの並び順は、Concentric CSS（ボックスの外から内の順） を採用しています。

余談
本当は、dart sassを使ってコンパイルしたかったのですが、glob による @importを行うための、importerのオプションがないので、諦めちゃいました。

### JavaScript
JavaScriptは、webpackを使ってバンドルをしています。
「src/assets/js/main.bundle.js」をエントリーポイントとしていますので、そちらに、importして頂ければと思います。

なお、デフォルトでjQueryをバンドルしています。
不要な場合は下記の部分を削除してお使い下さい。

```javascript:main.bundle.js
import $ from 'jquery';
```

また、IE11ユーザーのことも考慮して、ES6以降の記述は、
babelを利用してES5にトランスパイルしています。

なお、JSファイルのフォーマットは、ESlintと、Pretterを利用しています。

JSもCSSと同様で、開発用にコンパイルする際は、ソースマップを出力し、リリース用にコンパイルする際は、webpackによって、ファイルの圧縮を行います。

### 画像
画像ファイルは、
- `imagemin-mozjpeg`
- `imagemin-pngquant`
- `imagemin-gifsicle`
- `imagemin-svgo`

を使って、圧縮を行います。



## 必要な環境
- Node.js 12 ~

Mac OS での動作確認は行ってますが、Windowsでは動作確認はしてません。


## How to Use

### まずはこのリポジトリを clone する

まずは、ターミナルを起動し、開発を行うディレクトリで、このリポジトリをcloneして下さい。

```
git clone https://gitlab.com/shibajuku/template/orelop-cli.git
```

### 必要なパッケージをインストール

クローンしたディレクトリをリネームしてそのディレクトリに移動しましょう。

```
cd [リネームしたorelopディレクトリ名]
```

移動したら、必要なパッケージをインストールして下さい。

```
npm ci
```

しばし待ちます。

#### パッケージのアップデート

お使いのタイミングによっては、パッケージが古い場合があります。
最新になっていないパッケージを一覧表示する場合は、下記のコマンドをターミナルにドンして下さい。

```
npm outdate
```

全て最新にする場合は、以下のコマンドをターミナルにドンでアップデートできます。

```
npm update
```

ただし、アップデートによって仕様が変わる場合はありますのでご注意下さい。
個別にパッケージｗアップデートする場合は以下のコマンドをターミナルにドンして下さい。

```
npm update [更新したいパッケージ名]
```

もし、必要のないパッケージがある場合は、下記のコマンドで削除して下さい。
```
npm uninstall [削除したいパッケージ名]
```

また、npm 自体のアップデートをする場合は以下のコマンドをターミナルにドンして下さい。

```
npm update npm
```

### ディレクトリ構造の確認

Orelop CLIは以下のようなディレクトリ構成になっています。

```
orelop
├ src
│　├ assets
│　│ ├ img
│　│ │ ├ img.jpg
│　│ │ ├ img.png
│　│ │ ├ img.svg
│　│ │ └ img.gif
│　│ │
│　├ config
│　│ ├ mysql
│　│ ├ nginx
│　│ └ php
│　│ │
│　│ ├ js
│　│ │ └ main.bundle.js
│　│ │
│　│ ├ sass
│　│ │ ├ foundation
│　│ │ ├ inc
│　│ │ ├ layout
│　│ │ ├ object
│　│ │ │ ├ component
│　│ │ │ ├ project
│　│ │ │ ├ utility
│　│ │ └ common.scss
│　│ │
│　├ ejs
│　│ ├ include
│　│ │ └ include.ejs
│　│ └ index.ejs
│　│
│　├ html
│　│ └ index.html
│　│
│　├ php
│　│ └ index.php
│　│
│　└ humans.txt
│
├ package.json
├ package-lock.json
│
├ babel.config
├ bs.config.js
├ copy.config.js
├ docker-compose.yml
├ imagemin.js
├ postcss.config.js
├ webpack.common.js
├ webpack.dev.js
├ webpack.prod.js
│
├ .eslintrc.json
├ .gitignore
├ .prettierrc.json　
└ .stylelintrc.json
```

この src ディレクトリ内で開発を進めて行きます。

### 開発を開始する

開発を開始するには、`dev` というコマンドで、public フォルダ内に必要なデータをコンパイルし、ウォッチを開始し、ローカルサーバを立ち上がります。

ウォッチ中はファイルの変更を感知し、変更があれば自動でコンパイルします。

ですが、一部テキストファイルなど、更新が頻繁なファイルに関しましては、ウォッチをしていません。

ウォッチ中は、srcディレクトリの中で開発を進めて下さい。

```
npm run dev
```

ウォッチを停止するには、「control」+「c」でウォッチを停止できます。

### 本番用にコンパイルする

本番用のファイルを作成するには、 `prod` コマンドを利用します。
必要なファイルのコピーやコンパイルを行います。

```
npm run prod
```

コンパイルしたデータは、圧縮処理され本番にふさわしいデータを作成します。
