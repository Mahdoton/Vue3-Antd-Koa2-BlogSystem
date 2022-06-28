<template>
  <main class="show">
    <b-view-header :config="showIndexViewConfig">
    <!-- 在view-header页插入子组件 父组件向子组件进行传值 -->
      <template #footer>
        <u-button-group />
      </template>
    </b-view-header>

    <!-- 插入子组件 -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    
  </main>
</template>

<script>
import BViewHeader from "@/blocks/view-header.vue";
import { showIndexViewConfig } from "@/view-provider/show/index.js";
import { useButtonGroup } from "@/use/button-group.jsx";
export default {
  components: {
    BViewHeader,
    // 使用JSX实现按钮循环渲染
    UButtonGroup: useButtonGroup(showIndexViewConfig.buttonGroup),
  },
  setup() {
    return {
      showIndexViewConfig,
    };
  },
};
</script>

<style scoped>
.show {
  width: 50vw;
  margin: 50px auto;
  padding-bottom: 50px;
}
</style>