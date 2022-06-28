
import { useRoute } from "vue-router";
import { computed } from "@vue/runtime-core";
import { ref, watchEffect } from "vue";

export const useNotOnRouteWhiteListStatus = (whiteList = []) => {
  // 计算日志路由  如果当前页是日志路由  则不显示“返回首页”按钮
  const route = useRoute();
  const status = computed(() => !whiteList.includes(route.name));
  // const status = computed(() => route.name !== "showBlog");
  return status;
}

// 监听params参数的变化  参数变化时返回Number类型的参数
export const useLinkedRouteParam = (type, isNum = true) => {
  const route = useRoute();
  const currentParam = ref(1);
  watchEffect(() => {
    const param = route.params[type];
    currentParam.value = isNum ? Number(param) : param;
  });
  return currentParam;
}



export const useRouteQuery = type => {
  const router = useRoute();
  return router.query[type]
}