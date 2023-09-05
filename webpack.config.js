const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");

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
    assetModuleFilename: "img/[name][ext][query]", // [name] или [hash], путь куда сохранять изображения
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
        test: /\.(png|jpg|gif|webp)$/i, // 
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
      // {
      //   test: /\.(webmanifest)$/i,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         outputPath: 'webmanifest/', // копируем файл webmanifest
      //       },
      //     },
      //   ],
      // }

    ],
  },
  plugins: [ 
    new HtmlWebPackPlugin({
      template: './src/pug/index.pug',
      filename: './index.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({ 
      template: './src/pug/page-vase.pug',
      filename: './page-vase.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/synergy-&-style-lights.pug',
      filename: './synergy-&-style-lights.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false 
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/ssl-collections-breakfast.pug',
      filename: './ssl-collections-breakfast.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false 
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/ssl-collections-supper.pug',
      filename: './ssl-collections-supper.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false 
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/ssl-collections-cuisine.pug',
      filename: './ssl-collections-cuisine.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/ssl-collections-furshet.pug',
      filename: './ssl-collections-furshet.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/ssl-collections-banquet.pug',
      filename: './ssl-collections-banquet.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/porcelain-synergy.pug',
      filename: './porcelain-synergy.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/product-line-lifestyle.pug',
      filename: './product-line-lifestyle.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/decor.pug',
      filename: './decor.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/individual-decor.pug',
      filename: './individual-decor.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/the-new-easy.pug',
      filename: './the-new-easy.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/about-tablewares-sub.pug',
      filename: './about-tablewares-sub.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/tablewares-collections.pug',
      filename: './tablewares-collections.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/tablewares-all-tablewares.pug',
      filename: './tablewares-all-tablewares.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/serving-devices-all-collections.pug',
      filename: './serving-devices-all-collections.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/serving-devices-all-serving-devices.pug',
      filename: './serving-devices-all-serving-devices.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/serving-devices-rodeo.pug',
      filename: './serving-devices-rodeo.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/tablewares-special-finishing.pug',
      filename: './tablewares-special-finishing.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/finishing-devices-all-collections.pug',
      filename: './finishing-devices-all-collections.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/table-top-crystal-glass.pug',
      filename: './table-top-crystal-glass.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/table-top-coffee-tea.pug',
      filename: './table-top-coffee-tea.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/table-top-coolers.pug',
      filename: './table-top-coolers.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/table-top-drinks-all-position.pug',
      filename: './table-top-drinks-all-position.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/table-top-drinks-all-collections.pug',
      filename: './table-top-drinks-all-collections.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',

    }),
    new HtmlWebPackPlugin({
      template: './src/pug/coffee-culture-international.pug',
      filename: './coffee-culture-international.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',

    }),
    new HtmlWebPackPlugin({
      template: './src/pug/culture-cup.pug',
      filename: './culture-cup.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',

    }),
    new HtmlWebPackPlugin({
      template: './src/pug/table-top-firstglass.pug',
      filename: './table-top-firstglass.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',

    }),
    new HtmlWebPackPlugin({
      template: './src/pug/table-top-serving-all-positions.pug',
      filename: './table-top-serving-all-positions.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',

    }),
    new HtmlWebPackPlugin({
      template: './src/pug/table-top-serving-collections.pug',
      filename: './table-top-serving-collections.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',

    }),
    new HtmlWebPackPlugin({
      template: './src/pug/table-top-decor-all-positions.pug',
      filename: './table-top-decor-all-positions.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',

    }),
    new HtmlWebPackPlugin({
      template: './src/pug/table-top-decor-collections.pug',
      filename: './table-top-decor-collections.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',

    }),
    new HtmlWebPackPlugin({
      template: './src/pug/table-top-spices-all-positions.pug',
      filename: './table-top-spices-all-positions.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',

    }),
    new HtmlWebPackPlugin({
      template: './src/pug/table-top-spices-collections.pug',
      filename: './table-top-spices-collections.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',

    }),
    new HtmlWebPackPlugin({
      template: './src/pug/swedish-line-quadro-all-positions.pug',
      filename: './swedish-line-quadro-all-positions.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/swedish-line-quadro-modules.pug',
      filename: './swedish-line-quadro-modules.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/swedish-line-quadro-sets.pug',
      filename: './swedish-line-quadro-sets.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/swedish-line-marmites-all-position.pug',
      filename: './swedish-line-marmites-all-position.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/swedish-line-marmites-collections.pug',
      filename: './swedish-line-marmites-collections.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/swedish-line-dispensers-all-position.pug',
      filename: './swedish-line-dispensers-all-position.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/swedish-line-serving-food-all-position.pug',
      filename: './swedish-line-serving-food-all-position.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/contacts.pug',
      filename: './contacts.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/swedish-line-about-quadro.pug',
      filename: './swedish-line-about-quadro.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/swedish-line-about-marmites.pug',
      filename: './swedish-line-about-marmites.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/modal-form.pug',
      filename: './modal-form.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/apartment-maintenance.pug',
      filename: './apartment-maintenance.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    new HtmlWebPackPlugin({
      template: './src/pug/404.pug',
      filename: './404.html',   // куда компилировать
      minify: {
        html: false // отключаем минификацию html, еще есть версия minify: false  
      },
      scriptLoading: 'blocking',
    }),
    
    
    
    new MiniCssExtractPlugin({
      filename: 'css/[hash].css', // куда компилировать
      chunkFilename: '[id].css',
    }),

    new ImageminWebpWebpackPlugin({
      config: [{
        test: /.(jpe?g|png)/,
        options: {
          quality: 90,
        },
      }],
      overrideExtension: true,
      detailedLogs: false,
      silent: false,
      strict: true,
    }),
  ],
};
