var path = require("path");
var webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const BUILD_MODE = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
  DEMO: "demo",
};
console.log("当前env", process.env.NODE_ENV);
let curMode = "";
switch (process.env.NODE_ENV) {
  case "production":
    curMode = BUILD_MODE.PRODUCTION;
    break;
  case "demo":
    curMode = BUILD_MODE.DEMO;
    break;
  case "development":
  default:
    curMode = BUILD_MODE.DEVELOPMENT;
}
const getEntry = (mode) => {
  switch (mode) {
    case BUILD_MODE.PRODUCTION:
      return "./src/lib/index.js";
    case BUILD_MODE.DEVELOPMENT:
    case BUILD_MODE.DEMO:
    default:
      return "./src/main.js";
  }
};
const getOutput = (mode) => {
  switch (mode) {
    case BUILD_MODE.PRODUCTION:
      return {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/dist/",
        filename: "map-control.js",
        library: "map-control",
        libraryTarget: "umd",
        umdNamedDefine: true,
      };
    case BUILD_MODE.DEMO:
      return {
        path: path.resolve(__dirname, "./demo"),
        publicPath: "./",
        filename: "build.js",
      };
    case BUILD_MODE.DEVELOPMENT:
    default:
      return {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/dist/",
        filename: "build.js",
      };
  }
};

const getPlugin = (mode) => {
  switch (mode) {
    case BUILD_MODE.DEMO:
      return [
        new htmlWebpackPlugin({
          //生成文件
          template: "demo.html", //按该模板生成
        }),
        // 配置 copy-webpack-plugin
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, "public"), // 定义要拷贝的源目录
            to: path.resolve(__dirname, "demo/public"), // 定义要拷贝到的目标目录
          },
        ]),
      ];
    case BUILD_MODE.PRODUCTION:
    case BUILD_MODE.DEVELOPMENT:
    default:
      return [];
  }
};

module.exports = {
  entry: getEntry(curMode),
  output: getOutput(curMode),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {},
          // other vue-loader options go here
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]",
        },
      },
    ],
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    open: false,
  },
  performance: {
    hints: false,
  },
  devtool: "#eval-source-map",
};

if (process.env.NODE_ENV !== "development") {
  module.exports.devtool = "#source-map";
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (
    module.exports.plugins ||
    getPlugin(curMode) ||
    []
  ).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]);
}
