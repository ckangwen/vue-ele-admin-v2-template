/**
 * 自动注册components/global 下的组件为全局组件
 * 组件命名采用短横线命名
 */
import Vue from "vue";
import { kebabCase } from "lodash-es";

// https://webpack.js.org/guides/dependency-management/#require-context
const requireComponent = require.context(
  "./components/global",
  true,
  /[a-z0-9]+\.vue$/i,
);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  const componentName = fileName
    .substr(fileName.lastIndexOf("/") + 1)
    .replace(/\.\w+$/, "");

  Vue.component(
    kebabCase(componentName),
    componentConfig.default || componentConfig,
  );
});
