module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: './dist/time-storage-umd.js',
    libraryTarget: 'umd'
  }
}
