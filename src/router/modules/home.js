import Layout from "@/layout";
export default [
  {
    path: "/home",
    component: Layout,
    children: [
      {
        path: "index",
        name: "HomeIndexPage",
        component: () => import(/* webpackChunkName: "home-index" */"@/modules/home/views/index.vue"),
      },
    ],
  },
];
