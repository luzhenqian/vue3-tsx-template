/** @type {import('@babel/core').types} */
module.exports = {
  presets: [
    ['@babel/preset-typescript']
  ],
  plugins: ['@vue/babel-plugin-jsx',
    [
      "import",
      {
        "libraryName": "vant",
        "libraryDirectory": "es",
        "style": true
      }
    ]
  ]
}
