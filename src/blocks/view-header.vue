<template>
  <a-page-header :title="title" :avatar="avatar" :subTitle="subTitle">
    <template #extra>
      <transition name="fade" mode="out-in">
        <a-button type="primary" v-if="backShowStatus" @click="backHomePage"
          ><HomeOutlined />返回首页</a-button
        >
      </transition>
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </a-page-header>
</template>

<script>
import { PageHeader } from "ant-design-vue";
import { HomeOutlined } from "@ant-design/icons-vue";
import { useRouterPathToPage } from "@/use/router";
import { useNotOnRouteWhiteListStatus } from "@/use/route.js";
export default {
  components: {
    APageHeader: PageHeader,
    HomeOutlined,
  },
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const {
      avatar = {},
      title = "",
      subTitle = "",
      unWantedBackWhiteList,
      homePath,
    } = props.config || {};
    avatar.size = avatar.size || "large";
    avatar.shape = avatar.shape || "square";

    // 点击“返回首页”按钮跳转到日志页面
    const backHomePage = useRouterPathToPage(homePath);

    const backShowStatus = useNotOnRouteWhiteListStatus(unWantedBackWhiteList);

    // return内部的值会暴露给template   使其可以进行引用
    return {
      avatar,
      title,
      subTitle,
      backHomePage,
      backShowStatus,
    };
  },
};
</script>

<style>
</style>