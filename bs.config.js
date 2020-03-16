module.exports = {
  "files": './public/**/*.css, ./public/**/*.js, ./public/**/*.html, ./public/**/*.php',
  "server": { // PHPを使う時は server オブジェクトをコメントにする
    baseDir: './public/',
    index: 'index.html'
  },
  // "proxy": 'http://localhost:8080/',  // PHPを使う時用
  "online": true,
  "open": 'external',
  "proxy": false,
  "port": 3000
};
