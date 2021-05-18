const path = require("path");
const glob = require("glob");

// plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgeCssWebpackPlugin = require("purgecss-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

/**
 * @description webpack configs for production ready frontend app
 */
module.exports = {
  // setting mode to production made code minized
  // and production ready
  mode: "production",

  // for changing default bahavor of webpack(generating `eval`)
  // and making source map instead
  devtool: "source-map",

  // vendor is just for 3rd party packages
  // and main is for developed code
  entry: {
    vendor: "./src/vendor.js",
    main: "./src/index.js",
  },

  // in development contenthash will be added to file name
  // also the name of output directory has set here
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].bundle.js",
    publicPath: "",
  },

  // for minimizing and minifying js and css
  // webpack does this by default but for avoiding side effects
  // some plugins, these are used.
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
    // splitChunks: {
    // include all types of chunks
    //   chunks: "all",
    //   name: "chunks",
    // },
  },

  module: {
    rules: [
      // babel config can be found in root of project
      // in .babelrc.json file.
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },

      // for resolving path of assets
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          minimize: false,
        },
      },

      // postcss was used for its autoprefixer
      // also its cnfig file is in the root of project
      // in postcss.config.js
      {
        test: /\.css$/,
        //   use: ["style-loader", "css-loader"],
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },

      // `url-resolver` avoid path issues in html and other assets
      // also like css all the styling code extracted in separate files
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "resolve-url-loader",
          "sass-loader",
          "postcss-loader",
        ],
      },

      // folder structure will remain the same in dist folder
      // and contenthash will be added to all assetments in production mode
      {
        test: /.(png|svg|jpg|jpeg|webp)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "assets/images",
              outputPath: "assets/images",
              name: "[folder]/[name].[contenthash].[ext]",
            },
          },
        ],
      },

      // public path has set to `../fonts`
      // in order to avoid path issue in html
      {
        test: /.(eot|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          publicPath: "../fonts/",
          outputPath: "assets/fonts",
          name: "[name].[contenthash].[ext]",
        },
      },
    ],
  },

  plugins: [
    // cleaning output folder (`dist` in our case)
    // before generating new files
    new CleanWebpackPlugin(),

    // handling filename of extracted css files
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].[contenthash].min.css",
    }),

    // this plugin remove all unused css in both 3rd party pkgs
    // and ourself codes.
    // `paths` refers to all html files (which using those css classes)
    new PurgeCssWebpackPlugin({
      paths: glob.sync(`${path.resolve(__dirname, "src")}/**/*`, {
        nodir: true,
      }),
    }),

    // generate html files in `dist` with styles and scripts included
    // all the pages should be registered here in order to
    // match to the rest of generated code
    //
    // in config object `chunks` is an array which we can
    // indicate which bundle file we want to include in this html file
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      // chunks: ["main"],
    }),

    new HtmlWebpackPlugin({
      template: "./src/about.html",
      filename: "about.html",
    }),
  ],
};
