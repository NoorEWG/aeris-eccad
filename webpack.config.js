var webpack = require("webpack");

module.exports = {
   entry: './src/main.js',
  output: {
    path: 'C:\\Users\\François ANDRE\\workspaceWordpress\\aeris-commons-vue-components\\dist',
    publicPath: 'dist/',
    filename: 'build.js'
  },
  plugins: [
//	    new webpack.optimize.UglifyJsPlugin({
//	      include: /\.js$/,
//	      minimize: false
//	    })
	  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
            loaders: {
              // you need to specify `i18n` loaders key with `vue-i18n-loader` (https://github.com/kazupon/vue-i18n-loader)
              i18n: '@kazupon/vue-i18n-loader'
            }
         }	
      }
    ]
  },
  
  resolve: {
	  alias:{'vue$': 'vue/dist/vue.js'}
  }
  
}
