<template>
  <a-card hoverable class="about">
    <template #cover>
      <a-image alt="example" :src="cover" />
    </template>
    <template class="ant-card-actions" #actions>
      <section v-for="action of actions" :key="action.text">{{action.text}}</section>
    </template>
    <a-card-meta
      :title="title"
      :description="description"
    >
    </a-card-meta>
  </a-card>
</template>
<script>
import { defineComponent } from "vue";
import { Image } from "ant-design-vue";
import { aboutViewConfig } from "@/view-provider/show/about.js";
export default defineComponent({
  components: {
    AImage: Image,
  },
  setup() {
    const { cover, title, description, actions } = aboutViewConfig;
    return {
      cover,
      title,
      description,
      actions
    };
  },
});
</script>

<style scoped>
.about {
  padding: 10px 50px;
  text-align: center;
}
</style>