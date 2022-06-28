<template>
  <main class="not-found">
    <a-empty description="您访问的页面不存在哦~" />
  </main>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { Empty } from "ant-design-vue";
export default {
  components: {
    AEmpty: Empty,
  },
};
</script>
<style scoped>
.not-found{
  /* margin-top: 100px;
   */
   position: fixed;
   left: 50%;
   top: 50%;
   transform: translate(-50%,-50%);
}
</style>
