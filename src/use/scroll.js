import { useWindowEvent } from "./event.js"
import { ref } from "vue"
export const useWindowScrollStatus = () => {
  const status = ref(false);
  const judgeScrollStatusHandler = () => {
    const { scrollTop } = document.documentElement;
    status.value = scrollTop > 0 ? true : false;
  };
  useWindowEvent("scroll", judgeScrollStatusHandler);
  return status;
}

export const useWindowScrollTo = (position,behavior = "smooth") => {
  window.scrollTo({
    ...position,
    behavior: "smooth",
  });
}