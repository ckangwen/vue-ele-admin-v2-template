const fs = require("fs");
const { resolve } = require("path");
const Mustache = require("mustache");
const pages = require("./pages");
const { camelize, upperCaseFirst } = require("./utils");

const ROUTE_MODULE_PATH = resolve(__dirname, "../src/router/modules");

const moduleRouteTemp = `import Layout from "@/layout";
export default [
  {
    path: "/{{ moduleName }}",
    component: Layout,
    children: [
      {{ #children }}
      {
        path: "{{ path }}",
        name: "{{ name }}",
        component: () => import(/* webpackChunkName: "{{ moduleName }}-{{ path }}" */"@/modules/{{ moduleName }}/views/{{ path }}.vue"),
      },
      {{ /children }}
    ],
  },
];
`;

const moduleViewIndexTemp = `
{{ #routes }}
import {{ routeName }} from "./modules/{{ moduleName }}";
{{ /routes }}

export default [
{{ #routes }}
  ...{{ routeName }},
{{ /routes }}
];
`;

if (!fs.existsSync(ROUTE_MODULE_PATH)) {
  fs.mkdirSync(ROUTE_MODULE_PATH);
}

const routeMap = pages.reduce((routeObj, pagePath) => {
  const [moduleName, childName] = pagePath.split("/");
  routeObj[moduleName] = routeObj[moduleName] || {};
  routeObj[moduleName].children = routeObj[moduleName].children || [];
  routeObj[moduleName].children.push({ name: childName });
  return routeObj;
}, {});

Object.keys(routeMap).forEach((moduleName) => {
  const children = routeMap[moduleName].children.map((t) => {
    return {
      path: t.name,
      name: upperCaseFirst(camelize(`${moduleName}-${t.name}-page`)),
    };
  });
  const moduleRouteContent = Mustache.render(moduleRouteTemp, {
    moduleName,
    children,
  });
  fs.writeFileSync(
    resolve(ROUTE_MODULE_PATH, `./${moduleName}.js`),
    moduleRouteContent,
    { encoding: "utf-8" },
  );
});

const moduleViewIndexContent = Mustache.render(moduleViewIndexTemp, {
  routes: Object.keys(routeMap).map((moduleName) => {
    return {
      moduleName,
      routeName: upperCaseFirst(camelize(`${moduleName}-routes`)),
    };
  }),
});
fs.writeFileSync(
  resolve(ROUTE_MODULE_PATH, `../routes.js`),
  moduleViewIndexContent,
  { encoding: "utf-8" },
);
