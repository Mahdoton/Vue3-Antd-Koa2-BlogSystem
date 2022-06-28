<template>
  <section class="card-list">
    <a-card
      :title="record.title"
      :extra="record.createAt"
      v-for="record of cardRecords"
      :key="record.id"
      hoverable
      class="card"
      @click="handler(record.id)"
      >{{ record.synopsis }}</a-card
    >
  </section>
</template>

<script>
export default {
  props: {
    cardRecords: {
      type: Array,
      default: () => [],
    },
  },

  setup(props,{emit}) {
    // 由于此组件是Blog的子组件  所以需要将handler点击函数往外抛出
    const handler = id => emit("handler",id)
    return {
      handler,
    };
  },
};
</script>

<style scoped>
.card {
  margin: 20px 0;
}
</style>