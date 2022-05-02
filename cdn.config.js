const dependencies = [
  {
    name: "vue",
    library: "Vue",
    js: "https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js",
    backup: "https://unpkg.com/vue@2.6.11/dist/vue.min.js",
    css: "",
  },
  {
    name: "vuex",
    library: "Vuex",
    js: "https://cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js",
    backup: "https://unpkg.com/vuex@3.4.0/dist/vuex.min.js",
    css: "",
  },
  {
    name: "vue-router",
    library: "VueRouter",
    js: "https://cdn.jsdelivr.net/npm/vue-router@3.2.0/dist/vue-router.min.js",
    backup: "https://unpkg.com/vue-router@3.2.0/dist/vue-router.min.js",
    css: "",
  },
  {
    name: "element-ui",
    library: "ELEMENT",
    js: "https://cdn.jsdelivr.net/npm/element-ui@2.15.6/lib/index.js",
    backup: "https://unpkg.com/element-ui@2.15.6/lib/index.js",
  },
  {
    name: "axios",
    library: "axios",
    js: "https://cdn.jsdelivr.net/npm/axios@0.24.0/dist/axios.min.js",
    backup: "https://unpkg.com/axios@0.24.0/dist/axios.min.js",
  },
  {
    name: "dayjs",
    library: "dayjs",
    js: "https://cdn.jsdelivr.net/npm/dayjs@1.10.7/dayjs.min.js",
    backup: "https://unpkg.com/dayjs@1.10.7/dayjs.min.js",
  },
  {
    name: "@vue/composition-api",
    library: "VueCompositionAPI",
    js: "https://cdn.jsdelivr.net/npm/@vue/composition-api@1.4.0/dist/vue-composition-api.prod.min.js",
    backup: "https://unpkg.com/@vue/composition-api@1.4.3/dist/vue-composition-api.prod.js",
  },
];

// 设置不参与构建的库
const cdnExternals = {};
dependencies.forEach((pkg) => {
  cdnExternals[pkg.name] = pkg.library;
});

// 引入文件的 cdn 链接
const cdnConfig = {
  css: dependencies.map((e) => e.css).filter((e) => e),
  js: dependencies.map((e) => e.js).filter((e) => e),
  dependencies,
};

exports.cdnExternals = cdnExternals;
exports.cdnConfig = cdnConfig;
