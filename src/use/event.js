import { onUnmounted } from "vue"
export const useWindowEvent = (eventType, callback) => {
  // 设置监听
  window.addEventListener(eventType, callback);
  const removeEventHandler = () => window.removeEventListener(eventType, callback);
  onUnmounted(removeEventHandler);
}