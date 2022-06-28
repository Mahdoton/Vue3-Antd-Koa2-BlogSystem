<template>
  <a-pagination
    class="pagination"
    :total="total"
    defaultPageSize:
    v-model:current="current"
    :defaultPageSize="defaultPageSize"
    hideOnSinglePage
    simple
    @change="onPageNumChange"
  ></a-pagination>
</template>

<script>
// 封装分页组件
import { watchEffect } from "vue";
import { useWindowScrollTo } from "@/use/scroll.js";
import { useRouterParamChange } from "@/use/router.js";
import { useLinkedRouteParam } from "@/use/route.js";
export default {
  props: {
    total: {
      type: Number,
      default: 0,
    },
    defaultPageSize: {
      type: Number,
      default: 5,
    },
    // 当数据量较大时  不需要平滑地向上跳转
    hasScroll: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    // useLinkedRouteParam为封装函数
    const current = useLinkedRouteParam("pageNum");

    // path中params参数发生改变时  分页组件的页码也随之改变
    watchEffect(() => {
      if (props.hasScroll) {
        // 页码发生改变时滚动到页面最上方
        // useWindowScrollTo为封装函数
        useWindowScrollTo({ top: 0 },"auto");
      }
      // 当current.value发生变化时  根据依赖再次触发watchEffect回调函数
      emit("change", current.value);
    });

    // useRouterParamChange为封装函数
    const pageNumParamChange = useRouterParamChange("pageNum");

    // 页码发生改变时  path中的params参数也随之改变
    const onPageNumChange = (pageNum) => {
      pageNumParamChange(pageNum);
      // console.log(currentPageNum);
    };
    return {
      current,
      onPageNumChange,
    };
  },
};
</script>

<style>
.pagination {
  text-align: center;
}
</style>