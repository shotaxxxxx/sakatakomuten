# Orelop CLI 2.0

俺のWebサイト制作開発環境
Ore no Web Develop Command Line Interface 略して「Orelop CLI」です。

僕なりのWebサイト制作の開発環境ってことです。

昔はGulpを使って開発環境を作っていましたが、Gulpをやめてwebpackを使って実行する開発環境を作りました。
version1.0 では、webpackはJavaScriptのバンドルとトランスパイルの目的だけで使っており、他のコンパイルはnpm-scriptsで書いていましたが、このversion2.0では、ほぼ全てのコンパイルをwebpackで行っています。

## 概要
この開発環境で開発が可能な言語は以下のとおりです。

- HTML（Pug）
- CSS（Sass）
- JavaScript（TypeScript）
- PHP
- MySQL

です。

### HTML（Pug）
静的サイトは、純粋にHTMLを書く方法とPugを使う方法で開発できます。
pugを開発用にコンパイルする時には、Pretter による整形を行い、
本番環境用にコンパイルする場合は、HTML、Pugともにminify化されます。



### CSS（Sass / Scss）
CSSは通常のCSS や Sass/Scss での記述が可能です。
コンパイルは dart-sass でコンパイルしてます。
また、コンパイル時に、PostCSSによって様々な調整も行います。

- `Autoprefixer` によるベンダープレフィックス自動付加（対応ブラウザは `browserslist` で設定）
- `Css Declaration Sorter` によるプロパティの並び順の調整（`SMACSS` の順）
- `CSS MQPacker` による メディアクエリの最適化(複数のメディアクエリをまとめる)

フォーマットやルールの管理は、Pretterと Stylelintを使っています。
自動でルールの修正できるものは自動で行い、修正できないコードがあればエラーを出力します。

なお、開発用にコンパイルする際は、ソースマップを出力し、
本番環境用にコンパイル吸う場合は、minify化されます。

### JavaScript（TypeScript）
JavaScriptは、JavaScriptをそのまま書くか、TypeScriptよる開発が可能です。

ES6以降の文法に関しては、IE11ユーザーのことも考慮して、JavaScriptの場合は babel で、
TypeScriptの場合は tsconfigの設定に基づきES5にトランスパイルします。

なお、fetchなどのAPIに関しては、JavaScirptの場合は babelの設定で、core-jsを利用して必要なポリフィルを利用するようにしていますが、
TypeScriptの場合は、開発時にcore-jsなどを利用して必要なポリフィルを利用するようにお願いします。

また、よく使うライブラリなどは予めインストールをしているので、
利用する際はエントリーポイントに import するだけで利用できます。

- jQuery
- Swiper
- GSAP
- object-fit-images

フォーマットやルールの管理は、Pretterと Stylelintを使っています。
自動でルールの修正できるものは自動で行い、修正できないコードがあればエラーを出力します。

なお、開発用にコンパイルする際は、ソースマップを出力し、
本番環境用にコンパイル吸う場合は、minify化されます。

### PHP + MySQL
PHP + MySQLを開発することも可能です。

すでにローカル開発環境をお持ちの場合は、そちらをお使い頂ければと思いますが、
Docker Comporse を使った LAMP環境を構築できるような設定ファイルも入れております。

- Nginx
- MySQL 5.7
- PHP 7
- phpMyAdmin

なお、開発時は BrawserSync による自動リロードも可能です。

### 画像
画像ファイルは、
- `imagemin-mozjpeg`
- `imagemin-pngquant`
- `imagemin-gifsicle`
- `imagemin-svgo`

を使って、画像の圧縮を一括で行います。
なお、「.jpg」と「.png」のファイルに関しては、自動で「.webp」のファイルを生成します。

ファイル名は元のファイル名（拡張子を含む）の後ろに「.webp」という拡張子が追加されます。
付属の「.htaccess」をサーバーに設置することで「webp」に対応しているブラウザから「jpeg」と「png」をリクエストされた際は、自動で「webp」を返します。


## 必要な環境
- Node.js 14 ~

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


## インストール
では、Orelop CLI の使い方を紹介します。


## 必要なファイル群をダウンロード
まずは、必要なファイル達をダウンロードします。

### Gitをお使いの方は、このリポジトリを clone する

ターミナルなどのコマンドラインツールを起動し、開発を行うディレクトリで、このリポジトリを clone して下さい。

```
git clone https://gitlab.com/shibajuku/template/orelop-cli.git
```

### Gitをお持ちじゃない場合は、zipファイルをダウンロード
ダウロードボタンから、zipファイルをダウンロードして、デスクトップなどに解凍しておいて下さい。


## ディレクトリ構造の確認

Orelop CLIは以下のようなディレクトリ構成になっています。

```
orelop-cli
├ .vscode
│　└ settings.json
│
├ config
│　├ mysql
│　├ nginx
│　└ php
│
├ src
│　├ assets
│　│ ├ img
│　│ │ └ logo-primary.svg
│　│ │
│　│ ├ js
│　│ │ ├ lib
│　│ │ │ ├ loading.js
│　│ │ │ ├ ScrollObserver.js
│　│ │ │ └ Toggle.js
│　│ │ └ main.js
│　│ │
│　│ ├ sass
│　│ │ ├ foundation
│　│ │ ├ inc
│　│ │ ├ layout
│　│ │ ├ object
│　│ │ │ ├ component
│　│ │ │ ├ project
│　│ │ │ └ utility
│　│ │ └ common.scss
│　│ │
│　│ ├ ts
│　│ │ ├ lib
│　│ │ │ ├ loading.js
│　│ │ │ ├ ScrollObserver.js
│　│ │ │ └ Toggle.js
│　│ │ └ main.ts
│　│ │
│　├ html
│　│ └ sample.html
│　│
│　├ php
│　│ ├ include
│　│ │ ├ config.php
│　│ │ ├ footer.php
│　│ │ ├ functions.php
│　│ │ └ header.php
│　│ └ index.php
│　│
│　├ pug
│　│ ├ include
│　│ │ ├ _config.pug
│　│ │ ├ _footer.pug
│　│ │ ├ _head.pug
│　│ │ ├ _header.pug
│　│ │ └ _schema.pug
│　│ ├ layout
│　│ │ └ _main.pug
│　│ ├ mixin
│　│ │ └ _global-nav.pug
│　│ └ index.pug
│　│
│　├ .htaccess
│　└ humans.txt
│
├ .eslintrc.json
├ .gitignore
├ .prettierrc.json
├ .stylelintrc.json
│
├ babel.config.js
├ docker-compose.yml
├ postcss.config.js
├ tsconfig.json
├ webpack.common.js
├ webpack.dev.js
├ webpack.prod.js
│
├ package.json
├ package.json
└ yarn.lock
```

この src ディレクトリ内で開発を進めて行きます。

## 必要なパッケージをインストール

クローンまたは解凍した `orelop-cli` フォルダの名前を変更して、ターミナルなどのコマンドラインツールでそのディレクトリに移動しましょう。

```
cd [リネームしたorelop-cliフォルダ名]
```

移動したら、必要なパッケージをインストールする為に、以下のコマンドを実行します。

【npmの場合】
```
npm ci
```

【yarnの場合】
```
yarn i
```

このコマンドを実行すると、ルートディレクトリに配置してある、
 `package.json`、`package-lock.json`（ `yarn.lock` ）の内容を元に、必要なパッケージをインストールしてくれます。



コーヒーを飲んでインストールが終わるまでしばし待ちます。

### パッケージのアップデート

お使いのタイミングによっては、パッケージが古い場合があります。
最新になっていないパッケージを一覧表示する場合は、下記のコマンドをターミナルにドンして下さい。

【npmの場合】
```
npm outdated
```

【yarnの場合】
```
yarn outdated
```


全て最新にする場合は、以下のコマンドをターミナルにドンでアップデートできます。

【npmの場合】
```
npm update
```

【yarnの場合】
```
yarn upgrade
```

ただし、アップデートによって仕様が変わる場合はありますのでご注意下さい。
個別にパッケージをアップデートする場合は以下のコマンドをターミナルにドンして下さい。

【npmの場合】
```
npm update [更新したいパッケージ名]
```
【yarnの場合】
```
yarn upgrade [更新したいパッケージ名]
```

もし、必要のないパッケージがある場合は、下記のコマンドで削除して下さい。

【npmの場合】
```
npm uninstall [削除したいパッケージ名]
```
【yarnの場合】
```
yarn remove [削除したいパッケージ名]
```


また、npm や yarn 自体のアップデートをする場合は以下のコマンドをターミナルにドンして下さい。

【npmの場合】
```
npm update npm
```

【yarnの場合】
```
npm install yarn -g
```


## 開発を開始する

開発を開始する際は、以下のコマンドを実行するとファイルの監視が始まります。

【npmの場合】

```
npm run dev
```

【yarnの場合】
```
yarn run dev
```
この `npm run dev` （`yarn run dev`）というコマンドを実行すると、まずルートディレクトリに `public` というフォルダを生成し、`src` フォルダから、必要なファイルを `public` フォルダにコピーしたり、コンパイルします。そして、`src` フォルダのウォッチ（監視）を開始し、ローカルサーバが立ち上がります。

ウォッチ中はファイルの変更を感知し、変更があれば自動でコンパイルします。
ウォッチを停止するには、「control」+「c」でウォッチを停止できます。

ウォッチ中は、`src` フォルダの中で開発を進めて下さい。

## HTMLの開発
HTMLは、`src/html` フォルダ内で開発して下さい。
必要に応じて、`src/html` フォルダ内に新たなフォルダを作ってもらっても構いません。

保存したり、新規のファイルを作成するとディレクトリの構造を保ったまま、 `public`フォルダの直下にコピーされます。

従って、相対パスを書く場合は、`public` ファイル内の構造を基準に考えてください。

### 例：`src/html` 直下にあるHTMLファイルに common.css をリンクする場合

```html
<link href="assets/css/common.css" rel="stylesheet">
```

なお、Pugによる開発を行わない場合は、`src` 内の `pug` フォルダは削除しておいて下さい。

## Pugの開発
Pugは、`src/pug` フォルダ内で開発して下さい。

保存したり、新規のファイルを作成するとディレクトリの構造を保ったまま、 `public`フォルダの直下にコンパイルされます。

必要に応じて、`src/pug` フォルダ内に新たなフォルダを作ってもらっても構いません。

従って、相対パスを書く場合は、`public` ファイル内の構造を基準に考えてください。

### 例：`src/pug` 直下にあるHTMLファイルに common.css をリンクする場合

```pug
 link(href="assets/css/common.css", rel="stylesheet")
```

なお、`src/html` フォルダを使わない場合は、`src` 内の `html` フォルダを削除しておいて下さい。

なおデフォルトでは各ファイルを以下のようなルールで保存しています。

- コンポーネントは `include` フォルダ内に作成
- レイアウトなどの継承ファイルは `layout` フォルダ内に作成
- mixinは `mixin` フォルダ内に作成

コンパイル後ファイルを生成したくないパーシャルファイルを作成する場合は、ファイル名を `_` から初めて下さい。

## CSSの開発
CSSを開発する場合は、`src/assets/css` フォルダ内で開発して下さい。

保存したり、新規のファイルを作成するとディレクトリの構造を保ったまま、 `public/assets/css`フォルダ内に保存されます。

その際、`PostCSS` や、`Pretter`、`Stylelint`を用いて、以下のような中間処理を行います。

- `Autoprefixer` によるベンダープレフィックス自動付加（対応ブラウザは `Autoprefixer` の `default`）
- `Css Declaration Sorter` によるプロパティの並び順の調整（`SMACSS` の順）
- `CSS MQPacker` による メディアクエリの最適化(複数のメディアクエリをまとめる)
- `Pretter` によるフォーマットとルールのチェック
- `Stylelint` によるルールのチェック（修正できるものは自動修正）


## Sass/Scssの開発
Sass/Scssで開発する場合は、`src/assets/sass` フォルダ内で、開発して下さい。

インポート元のsassファイルはデフォルトでは、`common.scss` としています。

なお、予め FLOCSS の設計を元にした、ディレクトリを用意していますが、必要に応じて変更してもらって構いません。
また、予め 俺流のreset.css「Oreset.css」（`foundation/_oreset.scss`）や俺流フレキシブルCSSグリッドシステム「Olex 2.0」（`component/_grid.scss`）、俺流スクロールエフェクトの「Oreroll」（`component/_inview.scss`）も用意しています。

`scss` のインポートは、`glob` よる読み込みが可能です。

### 読み込みのサンプル
```sass:common.scss
@import "layout/*";
@import "object/compornent/*";
```

「`*`」を用いることで、そのディレクト内にある全てのscssファイルを自動で読み込むことができます。

scssは、ファイルを保存したり、新規のファイルを作成すると `public/assets/css`フォルダ内に`css` をコンパイルします。

その際、`PostCSS` や、`Pretter`、`Stylelint`を用いて、以下のような中間処理を行います。

- `Autoprefixer` によるベンダープレフィックス自動付加（対応ブラウザは `Autoprefixer` の `default`）
- `Css Declaration Sorter` によるプロパティの並び順の調整（`SMACSS` の順）
- `CSS MQPacker` による メディアクエリの最適化(複数のメディアクエリをまとめる)
- `Pretter` によるフォーマットとルールのチェック
- `Stylelint` によるルールのチェック（修正できるものは自動修正）

また、開発時のデバックを行いやすいように、ソースマップも `public/assets/css`フォルダに出力します。

## JavaScriptの開発
JavaScriptは、`src/assets/js` フォルダ内で開発して下さい。

インポート元のエントリーポイントとなるJavaScriptファイルの名前をデフォルトでは、`main.js` としています。

なお、デフォルトで以下のライブラリをインストールしています。

- jQuery
- Swiper
- GSAP
- object-fit-images

利用する場合は、`main.js`の下記の部分のコメント外してお使い下さい。

【jQueryを使う場合】
```javascript:main.bundle.js
import $ from 'jquery'; // コメントを外す
// import Swiper from 'swiper';
// import ScrollObserver from './lib/ScrollObserver';
// import Toggle from './lib/Toggle';
// import { dropdown } from './lib/dropdown';
// import { inview } from './lib/inview';
```

また、モジュール単位でJavaScriptファイルを作成する場合は、
エントリーポイントとなる `main.js` にインポートしてお使い下さい。

```javascript:main.js
import $ from 'jquery';
import 'sub';
```

JavaScriptは、ファイルを保存したり、新規のファイルを作成すると `public/assets/js`フォルダ内に各JavaScriptファイルをバンドルした`main.bundle.js` というファイルをコンパイルします。

その際、`babel`や、`Prettier`、`ESlint`を用いて、以下のような中間処理を行います。

- `babel` によるES5へのトランスパイル
- `core-js` によるプリフィルの設定
- `Pretter` によるフォーマットとルールのチェック
- `Stylelint` によるルールのチェック（修正できるものは自動修正）


また、開発時のデバックを行いやすいように、ソースマップも `public/assets/js`フォルダに出力します。

## TypeScriptの開発
TypeScriptは、`src/assets/ts` フォルダ内で開発して下さい。

開発に当たっては webpack.config.js の20行目付近にある以下の設定を変更して下さい。

```javascript: webpack.config.js
const settings = {
  sass: true,
  ts: true, // これを true にする
  php: false,
};
```

インポート元のエントリーポイントとなるTypeScriptファイルの名前をデフォルトでは、`main.ts` としています。

なお、デフォルトで以下のライブラリをインストールしています。

- jQuery
- Swiper
- GSAP
- object-fit-images

利用する場合は、`main.ts`の下記の部分のコメント外してお使い下さい。

【jQueryを使う場合】
```javascript:main.ts
import $ from 'jquery'; // コメントを外す
// import Swiper from 'swiper';
// import ScrollObserver from './lib/ScrollObserver';
// import Toggle from './lib/Toggle';
// import { dropdown } from './lib/dropdown';
// import { inview } from './lib/inview';
```

また、モジュール単位でJavaScriptファイルを作成する場合は、
エントリーポイントとなる `main.js` にインポートしてお使い下さい。

```javascript:main.ts
import $ from 'jquery';
import 'sub';
```

TypeScriptは、ファイルを保存したり、新規のファイルを作成すると `public/assets/js`フォルダ内に各JavaScriptファイルをバンドルした`main.bundle.js` というファイルをコンパイルします。

その際、`babel`や、`Prettier`、`ESlint`を用いて、以下のような中間処理を行います。

- `tsconfig.json` に基づいてES5へのトランスパイル
- `Pretter` によるフォーマットとルールのチェック
- `Stylelint` によるルールのチェック（修正できるものは自動修正）


また、開発時のデバックを行いやすいように、ソースマップも `public/assets/js`フォルダに出力します。

## PHPの開発
PHPでの開発を行うには、`src/php` フォルダ内で開発して下さい。
必要に応じて、`src/php` フォルダ内に新たなフォルダを作ってもらっても構いません。

開発に当たっては webpack.config.js の20行目付近にある以下の設定を変更して下さい。

```javascript: webpack.config.js
const settings = {
  sass: true,
  ts: false,
  php: true, // これを true にする
};
```

これによりPHPファイル更新時の自動リロードが有効になります。

なお、ファイルを保存したり、新規のファイルを作成するとディレクトリの構造を保ったまま、 `public`フォルダの直下にコピーされます。

従って、相対パスを書く場合は、`public` ファイル内の構造を基準に考えてください。

### 例：`src/php` 直下にあるHTMLファイルに common.css をリンクする場合

```html
<link href="assets/css/common.css" rel="stylesheet">
```

なお、PHPによる開発を行わない場合は、`src` 内の `php` フォルダは削除しておいて下さい。



続いて環境を用意しましょう。

###  XAMPPやMAMPを使う場合
PHPはXAMPPやMAMPを使って開発される場合は、この `Orelop CLI`のディレクトリを `htdocs` などの公開フォルダに配置して開発して下さい。

なお、お使いの環境の `http` のポート番号に合わせて `bs.config.js` 7行目にある `proxy` の `8080` の部分をお使いのポート番号に変更して下さい。

そして、ルートディレクトリにある `config` フォルダは不要になりますので、削除しておいて下さい。

###  Docker を使う場合
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

Dockerでの開発が終わったら、「control」+「c」でウォッチを停止し、以下のコマンドで コンテナを停止しましょう。

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

案件が終わってイメージを削除するには `docker images` でimageのIDを確認後、以下のコマンドを入力します。
```bash:ターミナル
docker rmi ［imageのID］
```


## MySQLの開発
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

### phpMyAdmin を使う

phpMyAdmin を使う場合は、

http://localhost:8888

にアクセスして下さい。

すると、phpMyAdmin が開きます。


### 本番用にコンパイルする

開発が完了し、本番用のファイルを作成するには、以下コマンドを利用します。

【npmの場合】
```
npm run prod
```

【yarnの場合】
```
yarn run prod
```

基本的には `dev` コマンドと同様で必要なファイルのコピーやコンパイルを行います。

ですが、以下の部分が異なります。

- HTML（Pug）ファイルの minify 化
- CSS（Sass/Scss）ファイルの minify 化
- JS（TypeScript）ファイルの minify 化
- ソースマップは出力しない

コンパイルしたデータは、圧縮処理され本番にふさわしいデータを作成します。

あとは、`public`フォルダ内のデータをデプロイして頂ければと思います。

`.heaccess`や `humans.txt`は必要に応じてアップロードして下さい。
