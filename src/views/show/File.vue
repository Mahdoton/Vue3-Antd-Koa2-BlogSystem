<template>
  <main>
    <a-card
      v-for="cardRecord of cardRecords"
      :key="cardRecord.month"
      :title="cardRecord.month"
    >
      <a-timeline>
        <a-timeline-item
          v-for="record of cardRecord.data"
          :key="record.id"
          :color="useRandomColor()"
        >
          {{ record.createAt }} -----
          <a-button @click="toDetailPage(record.id)"> {{ record.title }}</a-button>
        </a-timeline-item>
      </a-timeline>
    </a-card>
  </main>
</template>

<script>
import { useRandomColor } from "@/use/color.js";
import { ref } from "vue";
import http from "@/use/http.js";
import { watchEffect } from "@vue/runtime-core";
import { useInfoNotice } from "@/use/notice";
import { useRouterPathToPage } from '@/use/router';
export default {
  setup() {
    const cardRecords = ref([]);

    watchEffect(async () => {
      try {
        const res = await http.get("/articles/all/archives");
        cardRecords.value = res.data;
        // console.log(res);
      } catch (error) {
        useInfoNotice({
          message: "获取失败",
          description: error.data || error.reason || "未知错误",
        });
      }
    });

  const toDetailPage = id => {
    const toPage = useRouterPathToPage(`/details/${id}`);
    toPage();
  }

    return {
      cardRecords,
      useRandomColor,
      toDetailPage
    };
  },
};
</script>