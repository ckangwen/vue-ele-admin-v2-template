import Vue from "vue";
import CompositionApi from "@vue/composition-api";
/* ELEMENT 这个名字不能修改，因为element-ui的全局变量就是 `ELEMENT` */
import ELEMENT from "element-ui";
import CharrueLayout from "@charrue/layout";
import "element-ui/lib/theme-chalk/index.css";
// 引入全局scss
import "./styles/index.scss";
import "windi.css";
import "./register-components";

Vue.use(CompositionApi);
Vue.use(ELEMENT);
Vue.use(CharrueLayout);
