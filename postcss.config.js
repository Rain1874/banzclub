module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        'Chrome >= 35',
        'Firefox >= 20',
        'Safari >= 6',
        'iOS >= 8',
        'Android > 4.4',
        'ie> 8'
      ]
    })
  ]
}
