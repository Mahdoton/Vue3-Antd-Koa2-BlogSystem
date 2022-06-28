<template>
  <a-config-provider :locale="locale">
    <!-- <div id="app"> -->
      <b-header :config="appViewConfig" />
      <!-- HomeView组件展示位置 -->
      <router-view />
      <a-back-top />
    <!-- </div> -->
  </a-config-provider>
</template>

<script>
import BHeader from "@/blocks/header-Section.vue";
import { appViewConfig } from "@/view-provider/app.js";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { ConfigProvider ,BackTop} from "ant-design-vue";
export default {
  components: {
    // BHeader写成标签的形式为<b-header />
    BHeader,
    AConfigProvider: ConfigProvider,
    ABackTop:BackTop,
  },
  setup() {
    return {
      appViewConfig,
      locale: zhCN,
    };
  },
};
</script>
<style>
@import url("./style.css");
</style>
