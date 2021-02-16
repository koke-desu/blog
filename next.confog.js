// 環境変数の読み込み。

const webpack = require("webpack");
require("dotenv").config();

// firebase関係の環境変数
module.exports = {
  webpack: (config) => {
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc;
    }, {});
    config.plugins.push(new webpack.DefinePlugin(env));
    return config;
  },
};
