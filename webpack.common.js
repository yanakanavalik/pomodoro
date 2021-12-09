const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "index.tsx"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      filename: "index.html",
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: "./src/**/*",
      },
    }),
    new MiniCssExtractPlugin(),
  ],
  // output: {
  //   filename: "[name].bundle.js",
  //   path: path.resolve(__dirname, "dist"),
  //   clean: true,
  // },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css", ".scss", ".svg"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name(file) {
                console.log("Adding file to dist: ", file);
                return "[name].[ext]";
              },
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        use: [{ loader: "@svgr/webpack", options: { icon: true } }],
      },
      {
        test: /\.(json|js)$/,
        exclude: /node_modules/,
        loader: "file-loader",
        type: "javascript/auto",
        options: {
          name(file) {
            console.log("Adding file to dist: ", file);
            return "[name].[ext]";
          },
          esModule: false,
        },
      },

      {
        test: /\.(mp3|wav)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name(file) {
                console.log("Adding audio file to dist: ", file);
                return "[name].[ext]";
              },
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          { loader: "css-modules-typescript-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          {
            loader: "resolve-url-loader",
            options: {
              sourceMap: true,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "fonts/",
            esModule: false,
          },
        },
      },
    ],
  },
};
