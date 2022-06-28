<template>
  <main>
    <b-crad-list :cardRecords="cardRecords" @handler="handler"></b-crad-list>
    <c-pagination :total="total" :defaultPageSize="limit"></c-pagination>
  </main>
</template>

<script>
import BCradList from "@/blocks/card-list.vue";
import CPagination from "@/components/pagination.vue";
import { blogViewConfig } from "@/view-provider/show/blog.js";
import http from "@/use/http.js";
import { watchEffect } from "@vue/runtime-core";
import { useLinkedRouteParam } from "@/use/route";
import { useInfoNotice } from "@/use/notice";
import { useRouterPathToPage } from '@/use/router';
export default {
  components: {
    BCradList,
    CPagination,
  },
  setup() {
    const { cardRecords, limit, total } = blogViewConfig || [];

    // 监听url的pageNum参数并实时返回
    const pageNum = useLinkedRouteParam("pageNum");
    watchEffect(
      async () => {
        try {
          const res = await http.get(
            `/articles?type=blog&limit=${limit.value}&page=${pageNum.value}`
          );
          total.value = res.data.count;
          cardRecords.value=res.data.rows;
        } catch (error) {
          useInfoNotice({
            message: "获取blog失败",
            description: error.reason || error.data || "未知错误",
          });
        }
      },
      {
        flush: "post",
      }
    );


    const handler = id => {
      const toPage = useRouterPathToPage(`/details/${id}`);
      toPage();

    }
    return {
      cardRecords,
      total,
      limit,
      handler
    };
  },
};
</script>

