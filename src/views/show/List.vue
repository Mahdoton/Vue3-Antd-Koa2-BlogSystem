<template>
  <main>
    <a-card title="赞助列表">
      <a-timeline  mode="alternate">
        <a-timeline-item v-for="record of cardRecords" :key="record.id" :color="useRandomColor()">
          {{record.time}} ---{{record.content}}
        </a-timeline-item>
      </a-timeline>
    </a-card>
  </main>
</template>

<script>
import { listViewConfig } from "@/view-provider/show/list.js";
import {useRandomColor} from "@/use/color.js"
export default {
  setup() {
    const { cardRecords } = listViewConfig || [];

    return {
      cardRecords,
      useRandomColor
    };
  },
};
</script>