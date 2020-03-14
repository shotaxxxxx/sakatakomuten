module.exports = ctx => ({
  plugins: {
    'css-declaration-sorter': {
      order: 'concentric-css'
    },
    'css-mqpacker': {},
    'autoprefixer': {
      grid: true
    },
    'cssnano': ctx.env === 'production' ? { preset: 'default' } : false
  }
})
