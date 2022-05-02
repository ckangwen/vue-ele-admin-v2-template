import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout/index.vue";
import allRoutes from "./routes";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Layout,
    children: allRoutes,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
