import { ref, watchEffect } from "vue";

export const useLocalStorage = key => {
  const storage = ref(localStorage.getItem(key));
  const stop = watchEffect(() => {
    // 富文本编辑器中有值才去设置缓存  无值不设置缓存
    if (storage.value) {
      localStorage.setItem(key, storage.value);
    }
  })
  return [storage, stop]
}