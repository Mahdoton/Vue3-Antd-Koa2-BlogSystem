<template>
  <main>
    <a-card title="开源项目">
      <a-timeline :cardRecords="cardRecords">
        <a-timeline-item v-for="record of cardRecords" :key="record.id" :color="useRandomColor()">
          <a-button @click="record.handle">{{record.content}}</a-button>
        </a-timeline-item>
      </a-timeline>
    </a-card>
  </main>
</template>

<script>
import { projectViewConfig } from "@/view-provider/show/project.js";
import {useRandomColor} from "@/use/color.js"
export default {
  setup() {
    const { cardRecords } = projectViewConfig || [];

    return {
      cardRecords,
      useRandomColor
    };
  },
};
</script>