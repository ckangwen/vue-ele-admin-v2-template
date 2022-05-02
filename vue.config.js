/* eslint-disable no-param-reassign */
const path = require("path");
const { cdnConfig, cdnExternals } = require("./cdn.config");

const name = "____";

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  pluginOptions: {
    windicss: {
      // see https://github.com/windicss/vite-plugin-windicss/blob/main/packages/plugin-utils/src/options.ts
    },
  },
  publicPath: "./",
  devServer: {
    disableHostCheck: true,
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: ` @import "@/styles/variable.scss";`,
      },
    },
  },
  productionSourceMap: false,
  configureWebpack: (config) => {
    config.name = name;

    if (process.env.NODE_ENV !== "development") {
      config.externals = cdnExternals;
    }

    // JSX 支持
    config.resolve.extensions = [".jsx"].concat((config.resolve && config.resolve.extensions) || []);
    config.module.rules.push({
      test: /\.(jsx|tsx|ts)$/,
      loader: "babel-loader",
    });

    // 解决dart-sass打包element-ui的字体样式时的编码异常
    const sassLoader = require.resolve("sass-loader");
    config.module.rules.filter((rule) => rule.test.toString().indexOf("scss") !== -1)
      .forEach((rule) => {
        rule.oneOf.forEach((oneOfRule) => {
          const sassLoaderIndex = oneOfRule.use.findIndex((item) => item.loader === sassLoader);
          oneOfRule.use.splice(sassLoaderIndex, 0,
            { loader: require.resolve("css-unicode-loader") });
        });
      });
  },
  chainWebpack(config) {
    config
      .when(process.env.NODE_ENV !== "development",
        // eslint-disable-next-line no-shadow
        (config) => {
          config
            .plugin("ScriptExtHtmlWebpackPlugin")
            .after("html")
            .use("script-ext-html-webpack-plugin", [
              {
              // `runtime` must same as runtimeChunk name. default is `runtime`
                inline: /runtime\..*\.js$/,
              },
            ])
            .end();
          config
            .optimization.splitChunks({
              chunks: "all",
              cacheGroups: {
                commons: {
                  name: "chunk-commons",
                  test: resolve("src/components"), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true,
                },
              },
            });

          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk("single");
        });

    config.plugin("html")
      .tap((args) => {
        args[0].cdn = process.env.NODE_ENV !== "development" ? cdnConfig : {};
        args[0].env = process.env.NODE_ENV;
        args[0].title = name;
        return args;
      });
  },
};
