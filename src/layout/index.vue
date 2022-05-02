<template>
  <div class="global-layout-container">
    <charrue-layout
      :collapsed.sync="collapsed"
      :data="menuData"
      :title="title"
    >
      <router-view></router-view>
    </charrue-layout>
  </div>
</template>

<script>
import Settings from "./setting";

export default {
  name: "GlobalLayout",
  data() {
    return {
      menuData: Settings.menus,
      title: Settings.title,
      collapsed: false,
    };
  },
};
</script>
