const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

// const glob = require("glob");
// const PurgeCssWebpackPlugin = require("purgecss-webpack-plugin");

module.exports = {
  mode: "development",
  //   devtool: "source-map",

  entry: {
    vendor: "./src/vendor.js",
    main: "./src/index.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: "",
  },

  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          minimize: false,
        },
      },
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          //   "style-loader",
          "css-loader",
          "resolve-url-loader",
          "sass-loader",
          "postcss-loader",
        ],
      },
      {
        test: /.(png|svg|jpg|jpeg|webp)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "assets/images",
              outputPath: "assets/images",
              name: "[folder]/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /.(eot|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          publicPath: "../fonts/",
          outputPath: "assets/fonts",
          name: "[name].[ext]",
        },
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].min.css",
    }),

    // new PurgeCssWebpackPlugin({
    //   paths: glob.sync(`${path.resolve(__dirname, "src")}/**/*`, {
    //     nodir: true,
    //   }),
    // }),

    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),

    new HtmlWebpackPlugin({
      template: "./src/about.html",
      filename: "about.html",
    }),
  ],
};
