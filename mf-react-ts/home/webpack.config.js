const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  output: {
    publicPath: "http://localhost:8080/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8080,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "home",
      filename: "remoteEntry.js",
      remotes: {
        header: "header@http://localhost:3001/remoteEntry.js",
        next_host: "next_host@http://localhost:3002/_next/static/chunks/remoteEntry.js",
      },
      exposes: {},
      // shared: {
      //   ...deps,
      //   react: {
      //     singleton: true,
      //     requiredVersion: false,
      //   },
      //   "react-dom": {
      //     singleton: true,
      //     requiredVersion: false,
      //   },
      // },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
});
