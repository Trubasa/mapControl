var path = require("path");
var webpack = require("webpack");

const BUILD_MODE = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
};
console.log("当前env", process.env.NODE_ENV);
let curMode = "";
switch (process.env.NODE_ENV) {
  case "production":
    curMode = BUILD_MODE.PRODUCTION;
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
    case BUILD_MODE.DEVELOPMENT:
    default:
      return {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/dist/",
        filename: "build.js",
      };
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

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
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
