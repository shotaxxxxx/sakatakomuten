module.exports = api => {
  api.cache(true);

  return {
    "presets": [
      ["@babel/preset-env", {
        targets: [
          "defaults"
        ],
        useBuiltIns: 'usage',
        corejs: 3 // バージョンを指定
      }]
    ]
  }
}
