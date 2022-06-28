// 防抖函数
export const useDebouce = (callback, delay = 500, firstFlag = true) => {
  let timeout = null;
  // 第一次进入页面不提示
  return (...rest) => {
    if (!firstFlag) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback(...rest);
      }, delay);
    }
    firstFlag = false;
  }
} 