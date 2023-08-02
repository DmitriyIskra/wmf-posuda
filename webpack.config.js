const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devServer: {
    port: 8800,
  },
  devtool: 'source-map',
  // entry: {
  //   entry: {
  //     index: './index',  // на случай если 2 точки входа (файла js) и нужно сделать их раздельными
  //     shop: './shop'
  //   }
  // },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[hash].js',
    assetModuleFilename: "img/[hash][ext][query]", // [name] или [hash], путь куда сохранять изображения
    clean: true, // очищает папку dist
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,  // отключаем минификацию html
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        // loader: 'pug-loader',
        exclude: /(node_modules|bower_components)/,
        use:[
          {
            loader: 'html-loader',
            options: {
              minimize: false,  // отключаем минификацию html
            },
          },
          {
            loader: 'pug-html-loader', // чтобы нормально подтягивало картинки и собирало
            options: {
              exports: false,
              pretty : true,  // не минифицировать
            }
          }
          
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/i,
        type: 'asset/resource',
        generator: {
          filename: 'svg/[hash][ext]',  // указываем путь сборки
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',  // указываем путь сборки
        }
      },

    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/pug/index.pug',
      filename: './index.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false
      },
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/page-vase.pug',
      filename: './page-vase.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false
      },
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/synergy-&-style-lights.pug',
      filename: './synergy-&-style-lights.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false 
      },
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/ssl-collections-breakfast.pug',
      filename: './ssl-collections-breakfast.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false 
      },
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/ssl-collections-supper.pug',
      filename: './ssl-collections-supper.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false 
      },
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/ssl-collections-cuisine.pug',
      filename: './ssl-collections-cuisine.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/ssl-collections-furshet.pug',
      filename: './ssl-collections-furshet.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/ssl-collections-banquet.pug',
      filename: './ssl-collections-banquet.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/porcelain-synergy.pug',
      filename: './porcelain-synergy.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/product-line-lifestyle.pug',
      filename: './product-line-lifestyle.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/decor.pug',
      filename: './decor.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
    }),
    
    new MiniCssExtractPlugin({
      filename: 'css/[hash].css', // куда компилировать
      chunkFilename: '[id].css',
    }),
  ],
};
