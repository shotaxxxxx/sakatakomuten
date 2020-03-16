# Orelop CLI

俺のWebサイト制作開発環境
Ore no Web Develop Comand Line Interface 略して「Orelop CLI」です。

僕なりのWebサイト制作の開発環境ってことです。

最近まではGulpを使っていましたが、脱Gulpを目標に、基本はnpm-scriptsとJavaScriptファイルのバンドルにwebpackを使って実行する開発環境を作りました。

まだまだ、問題点はありますが・・・。

## 概要
この開発環境で開発が可能な言語は以下のとおりです。

- HTML（EJS）
- CSS（Sass）
- JavaScript
- PHP
- MySQL

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

また、IE11ユーザーのことも考慮して、ES6以降の記述は、
babelを利用してES5にトランスパイルしています。

なお、JSファイルのフォーマットは、ESlintと、Pretterを利用しています。

JSもCSSと同様で、開発用にコンパイルする際は、ソースマップを出力し、リリース用にコンパイルする際は、webpackによって、ファイルの圧縮を行います。

### PHP + MySQL
PHP + MySQLを開発することも可能です。

すでいローカル開発環境をお持ちの場合は、それをお使い頂ければと思いますが、
Docker Comporse を使った 環境を構築できるような設定ファイルも入れておきます。


### 画像
画像ファイルは、
- `imagemin-mozjpeg`
- `imagemin-pngquant`
- `imagemin-gifsicle`
- `imagemin-svgo`

を使って、圧縮を行います。



## 必要な環境
- Node.js 12 ~

### Node.jsがインストールされているか確認する方法
ターミナルなどのコマンドラインツールを立ち上げて、以下のコマンドを入力

```bash:ターミナル
node -v
```
これで、Node.jsのバージョンが表示されれば、Node.jsはインストールされています。

なお、Dockerを使ったPHPの開発環境を構築する場合は、以下のツールも必要となります。
- Docker
- Docker Compose

こちらも予め、インストールしておいて下さい。

### Docker、Docker Comporseがインストールされているか確認する方法
ターミナルなどのコマンドラインツールを立ち上げて、以下のコマンドを入力

```
docker -v
```

これで、dockerのバージョンが表示されれば、dockerはインストールされています。

```
docker-comporse -v
```

これで、docker-comporse のバージョンが表示されれば、docker-comporseはインストールされています。

Mac OS での動作確認は行ってますが、Windowsでは動作確認はしてません。


## How to Use
では使い方を紹介します。


### 必要なファイル群をダウンロード
まずは、必要なファイル達をダウンロードします。

#### Gitをお使いの方は、このリポジトリを clone する

ターミナルなどのコマンドラインツールを起動し、開発を行うディレクトリで、このリポジトリをcloneして下さい。

```
git clone https://gitlab.com/shibajuku/template/orelop-cli.git
```

#### Gitをお持ちじゃない場合は、zipファイルをダウンロード
ダウロードボタンから、zipファイルをダウンロードして、デスクトップなどに解凍しておいて下さい。


### ディレクトリ構造の確認

Orelop CLIは以下のようなディレクトリ構成になっています。

```
orelop-cli
├ src
│　├ assets
│　│ ├ img
│　│ │ ├ img.jpg
│　│ │ ├ img.png
│　│ │ ├ img.svg
│　│ │ └ img.gif
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
│　├ config
│　│ ├ mysql
│　│ ├ nginx
│　│ └ php
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

### 必要なパッケージをインストール

クローンまたは解答した `orelop-cli` フォルダの名前を変更して、ターミナルなどのコマンドラインツールでそのディレクトリに移動しましょう。

```
cd [リネームしたorelop-cliフォルダ名]
```

移動したら、必要なパッケージをインストールする為に、以下のコマンドを実行します。

```
npm ci
```
このコマンドを実行すると、ルートディレクトリに配置してある、
 `package.json`、`package-lock.json`の内容を元に、必要なパッケージをインストールしてくれます。

コーヒーを飲んでインストールが終わるまでしばし待ちます。

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


### 開発を開始する

開発を開始する際は、以下のコマンドを実行するとファイルの監視が始まります。

```
npm run dev
```

この `npm run dev` というコマンドを実行すると、まずルートディレクトリに `public` というフォルダを生成し、`src` フォルダから、必要なファイルを `public` フォルダにコピーしたり、コンパイルします。そして、`src` フォルダのウォッチ（監視）を開始し、ローカルサーバが立ち上がります。

ウォッチ中はファイルの変更を感知し、変更があれば自動でコンパイルします。
（一部テキストファイルなど、更新が頻繁なファイルに関しましては、ウォッチをしていません。）

ウォッチを停止するには、「control」+「c」でウォッチを停止できます。

ウォッチ中は、`src` フォルダの中で開発を進めて下さい。

#### HTMLの開発
HTMLは、`src/html` フォルダ内で開発して下さい。
必要に応じて、`src/html` フォルダ内に新たなフォルダを作ってもらっても構いません。

保存したり、新規のファイルを作成するとディレクトリの構造を保ったまま、 `public`フォルダの直下にコピーされます。

従って、相対パスを書く場合は、`public` ファイル内の構造を基準に考えてください。

##### 例：`src/html` 直下にあるHTMLファイルに common.css をリンクする場合

```
<link href="assets/css/common.css" rel="stylesheet">
```

なお、EJSによる開発を行わない場合は、`src` 内の `ejs` フォルダは削除しておいて下さい。

#### EJSの開発
EJSは、`src/ejs` フォルダ内で開発して下さい。

保存したり、新規のファイルを作成するとディレクトリの構造を保ったまま、 `public`フォルダの直下にコピーされます。

必要に応じて、`src/ejs` フォルダ内に新たなフォルダを作ってもらっても構いません。

従って、相対パスを書く場合は、`public` ファイル内の構造を基準に考えてください。

##### 例：`src/ejs` 直下にあるHTMLファイルに common.css をリンクする場合

```
<link href="assets/css/common.css" rel="stylesheet">
```

なお、`src/html` フォルダを使わない場合は、`src` 内の `html` フォルダを削除しておいて下さい。

なお、コンパイル後ファイルを生成したくないパーシャルファイルを作成する場合は、ファイル名を `_` から初めて下さい。

#### CSS（SCSS）の開発
CSSは、`src/assets/sass` フォルダ内で開発して下さい。
インポート元のsassファイルの名前は、`common.scss` として下さい。

基本的には、`scss` 記法による開発を想定しています。

デフォルトでは、FLOCSS の設計を元にした、ディレクトリを用意していますが、必要に応じて変更してもらって構いません。

`scss` のインポートは、`glob` よる読み込みが可能です。

```sass:common.scss
@import "layout/*";
@import "object/compornent/*";
```

「`*`」を用いることで、そのディレクト内にある全てのscssファイルを自動で読み込むことができます。

scssは、ファイルを保存したり、新規のファイルを作成すると `public/assets/css`フォルダ内に`css` をコンパイルします。

その際、`PostCSS` を用いて、以下のような中間処理を行います。

1. `Css Declaration Sorter` によるプロパティの並び順の調整（`Concentric CSS` の順）
2. `Autoprefixer` によるベンダープレフィックス自動付加（対応ブラウザは `Autoprefixer` の `default`）
3. `CSS MQPacker` による メディアクエリの最適化(複数のメディアクエリをまとめる)

また、開発時のデバックを行いやすいように、ソースマップも `public/assets/css`フォルダに出力します。

#### JavaScriptの開発
JavaScriptは、`src/assets/js` フォルダ内で開発して下さい。

インポート元のエントリーポイントとなるJavaScriptファイルの名前は、`main.js` として下さい。

なお、デフォルトで `jQuery` をバンドルしていますが、必要がない場合は、
`main.js`の下記の部分を削除してお使い下さい。

```javascript:main.bundle.js
import $ from 'jquery';
```

また、モジュール単位でJavaScriptファイルを作成する場合は、
エントリーポイントとなる `main.js` にインポートしてお使い下さい。

```javascript:main.bundle.js
import $ from 'jquery';
import 'sub';
```

JavaScriptは、ファイルを保存したり、新規のファイルを作成すると `public/assets/js`フォルダ内に各JavaScriptファイルをバンドルした`main.bundle.js` というファイルをコンパイルします。

その際、`webpack` を用いて、以下のような中間処理を行います。

1. `ESlint` と　`prettier` による構文のチェック
2. `babel` にES5へのトランスパイル


また、開発時のデバックを行いやすいように、ソースマップも `public/assets/js`フォルダに出力します。

#### PHPの開発
PHPでの開発を行うには、少々準備が必要になります。


まず、サーバーサイド開発で、ブラウザのライブリロードを有効にする場合は、`bs.config.js` を開き、3行目 - 5行目の `server` オブジェクトをコメントアウトし、7行目の先頭にある `//` を削除しコメント解除し `proxy` を有効にして下さい。

```
module.exports = {
  "files": './public/**/*.css, ./public/**/*.js, ./public/**/*.html, ./public/**/*.php',
  // "server": { // PHPを使う時は server オブジェクトをコメントにする
  //   baseDir: './public/',
  //   index: 'index.html'
  // },
  "proxy": 'http://localhost:8080/',  // PHPを使う時用
  "online": true,
  "open": 'external',
  "proxy": false,
  "port": 3000
};

```

続いて環境を用意しましょう。

#####  XAMPPやMAMPを使う場合
PHPはXAMPPやMAMPを使って開発される場合は、この `Orelop CLI`のディレクトリを `htdocs` などの公開フォルダに配置して開発して下さい。

なお、お使いの環境の `http` のポート番号に合わせて `bs.config.js` 7行目にある `proxy` の `8080` の部分をお使いのポート番号に変更して下さい。

そして、ルートディレクトリにある `config` フォルダは不要になりますので、削除しておいて下さい。

#####  Docker を使う場合
`docker-compose.yml`を使って Niginx PHP MySQL phpMyAdmin の環境を作ることができます。

*ウォッチ停止中*に、ルートディレクトリをターミナルなどのコマンドラインツールで開き、以下のコマンドを実行することで、環境をインストールすることが出来ます。

```bash:ターミナル
docker-compose up -d
```

これでコンテナをバックグラウンドで立ち上げることが出来ますが、
初回は、Docker の Image　や　Container が無いため時間がかかります。

おいしいコーヒーを淹れましょう。

インストールが終わったら、以下のコマンドを実行して、コンテナが立ち上がっていることを確認しましょう。


```bash:ターミナル
docker ps
```

##### 開発

PHPの開発も静的ファイルと同様で、

```
npm run dev
```

でウォッチが始まります。

PHPは、`src/php` フォルダ内で開発して下さい。
必要に応じて、`src/php` フォルダ内に新たなフォルダを作ってもらっても構いません。

保存したり、新規のファイルを作成するとディレクトリの構造を保ったまま、 `public`フォルダの直下にコピーされます。

従って、相対パスを書く場合は、`public` ファイル内の構造を基準に考えてください。

##### 例：`src/php` 直下にあるHTMLファイルに common.css をリンクする場合

```
<link href="assets/css/common.css" rel="stylesheet">
```
開発が終わったら、「control」+「c」でウォッチを停止します。

Dockerを使ってる場合は、以下のコマンドで コンテナを停止しましょう。

```bash:ターミナル
docker-comporse down
```

以下のコマンドを実行して、コンテナが停止していることを確認しましょう。


```bash:ターミナル
docker ps
```

なお、コンテナを停止しても、Docker Imageは消えません。
```bash:ターミナル
docker images
```

なお、引き続き開発を行う際は、再度以下のコマンドを実行して、コンテナを起動します。

```bash:ターミナル
docker-compose up -d
```


今度は、すぐに立ち上がると思います。

そして、また開発が終わったら以下のコマンドで コンテナを停止しましょう。

```bash:ターミナル
docker-comporse down
```


#### MySQLの開発
Dockerで環境を作った場合は、デフォルトで `docker_db` というデータベースをひとつ作ってあります。

開発中はそのデータベースを使ってアプリを開発してもらえればと思います。
なお、そのデータベースを触れるユーザーも作ってあります。

PHPから、データベースを操作する際は、それらデータベースの名前や、ホスト名、データベースのユーザ名とパスワードをまとめた定数化したPHPファイルを、`config/php/database.php` というファイルで作ってあります。


従って、データベースに接続したいPHPファイルで、その設定ファイルを読み込めばすぐにデータベースに接続できます。

```php:index.php
<?php
  // ファイルの読み込み
  require_once('../config/php/database.php');

  try {
    $dbh = new PDO(DSN, DB_USER, DB_PASSWORD);
    echo '接続成功';
  } catch (PDOException $e) {
    //　例外発生時の処理
    echo 'エラー' . h($e->getMessage());
    exit();
  }
?>
```

MySQLにログインする方法が、MAMPやXAMPPなどとすこし違って、
まず、MySQLのコンテナに入らないといけません。

```bash:ターミナル
docker-compose exec mysql bash
```

するとターミナルが、`root@xxxxxxxxxxxx:/#` のようになると思いますが、これで、`mysql` コマンドが実行できます。


```
mysql -u docker_user -p
```

で、パスワードを入力してエンターを押すと、MySQLモニタにログインできます。

なお、`docker_user` というユーザーは管理者権限ではないので、`create database` はできません。

docker_db というデータベースだけを操作できる権限ですので、このデータベースを使ってアプリを作ってください。

##### phpMyAdmin を使う

phpMyAdmin を使う場合は、

http://localhost:8888

にアクセスして下さい。

すると、phpMyAdmin が開きます。


### 本番用にコンパイルする

開発が完了し、本番用のファイルを作成するには、以下コマンドを利用します。

```
npm run prod
```


基本的には `dev` コマンドと同様で必要なファイルのコピーやコンパイルを行います。

ですが、以下の部分が異なります。

- sassファイルをコンパイルする前に、`stylelint` と `prettier` による構文のチェック
- `stylelint` によって、sassファイル内のプロパティの並び順を整理
- `PostCSS` の `cssnano` によって sassをコンパイルする際に、CSSファイルを圧縮
- JSファイルをコンパイルする際に、ファイルを圧縮
- ソースマップは出力しない

つまり、コンパイルしたデータは、圧縮処理され本番にふさわしいデータを作成します。
