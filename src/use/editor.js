import E from "wangeditor";
import { onMounted, onUnmounted, getCurrentInstance } from "vue";
// import xss from "xss"
// import { useInfoNotice } from "@/use/notice.js";
import { useDebouce } from "@/use/common.js";

export const useEditor = (id = "editor") => {
  // setup执行的优先级大于onMounted声明周期函数
  onMounted(() => {

    const { proxy } = getCurrentInstance();
    // editor所有的配置都需要在create（）函数之前才能生效
    proxy.editor = new E(`#${id}`);

    proxy.editor.config.zIndex = 0;
    proxy.editor.config.height = 600;

    // 放抖
    proxy.editor.config.onchange = useDebouce(
      (newHtml) => {
        // draft.value = xss(newHtml);

        // 防止xss攻击  但是会过滤掉富文本编辑器中的待办事项  也可以通过配置xss不过滤  单用户可不使用
        // localStorage.setItem("draft", xss(newHtml));

        localStorage.setItem("draft", newHtml);


        // 此段代码会导致用户体验极差
        // useInfoNotice({
        //   message: "草稿",
        //   description: "已缓存在本地",
        // });

        // console.log("处理过 xss 攻击的 html" + xss(newHtml));
      }, 500
    )


    proxy.editor.create();
    onUnmounted(() => proxy.editor.destroy());
  });
}