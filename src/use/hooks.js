import { ref } from "vue";
export const useState = val => {
  // 在setup函数中，可以使用ref函数，用于创建一个响应式数据
  const state = ref(val);
  const setState = newVal => (state.value = newVal);
  return [state, setState];
}