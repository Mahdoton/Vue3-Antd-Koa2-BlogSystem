<template>
  <main class="editor shadow">
    <div id="editor"></div>
    <section class="actions">
      <a-button type="primary" @click="showModal">{{
        buttonSubmitArticle
      }}</a-button>
      <a-button type="primary" danger>清空</a-button>
    </section>

    <!-- 文章发布弹窗 -->
    <b-modal ref="modal" @submit="submit" />
  </main>
</template>

<script>
import { useEditor } from "@/use/editor.js";
import { onMounted, getCurrentInstance, ref, toRaw } from "vue";
import { useLocalStorage } from "@/use/local-storage.js";
import BModal from "@/blocks/modal.vue";
import http from "../../use/http.js";
import { lazyRequest } from "../../use/http.js";
import {
  useErrorNotice,
  useInfoNotice,
  useSuccessNotice,
} from "@/use/notice.js";
import { useRouteQuery } from "@/use/route.js";
import { bookViewConfig } from "@/view-provider/show/book.js";
export default {
  components: {
    BModal,
  },
  setup() {
    // 使用全局变量注册解决在不同组件中需要访问同一变量的问题
    // 创建富文本编辑器
    useEditor();

    // 获取全局变量对象
    const { proxy } = getCurrentInstance();

    // 由于setup比useEditor内部的onMounted函数执行得更快  所以此处打印为null
    // console.log("getCurrentInstance()中的proxy.editor:", proxy.editor);

    const [draft] = useLocalStorage("draft");
    // 给富文本编辑器添加缓存
    onMounted(() => proxy.editor.txt.html(draft.value));

    // 显示发布文章弹窗
    const modal = ref();
    const showModal = () => modal.value.setVisible(true);

    // 接收从modal中emit出来的submit 拿到编辑的数据record  并且关闭发布文章弹窗
    let submit = async (record) => {
      // 进来时加载
      modal.value.okButtonProps.loading = true;
      // console.log(record);
      const content = proxy.editor.txt.html();
      try {
        const request = http.post("/articles", {
          ...toRaw(record),
          content,
        });

        await lazyRequest(request);
        useSuccessNotice({
          message: "发布成功",
        });
      } catch (error) {
        useErrorNotice({
          message: "发布失败",
          description: error.reason || "未知错误",
        });
      } finally {
        // 关闭弹窗
        modal.value.setVisible(false);
        // 离开时关闭加载
        modal.value.okButtonProps.loading = false;
      }
    };

    const id = useRouteQuery("id");
    // 当参数id存在时  更新标识符为true
    const updateFlag = Boolean(id);
    if (updateFlag) {
      onMounted(async () => {
        try {
          const { data } = await http.get(`/articles/${id}`);
          proxy.editor.txt.html(data.content);
          // reactive的不足之处 需要一个个进行修改
          modal.value.formRecord.title = data.title;
          modal.value.formRecord.synopsis = data.synopsis;
          modal.value.formRecord.type = data.type;
        } catch (error) {
          useInfoNotice({
            message: "文章获取失败",
            description: error.data || error.reason || "未知错误",
          });
        }
      });
    }

    if (updateFlag) {
      submit = async (record) => {
        modal.value.okButtonProps.loading = true;
        try {
          const request = http.put(`/articles/${id}`, {
            ...record,
            content: proxy.editor.txt.html(),
          });
          await lazyRequest(request, 400);
          useSuccessNotice({
            message: "更新成功",
          });
        } catch (error) {
          useErrorNotice({
            message: "更新失败",
            description: error.reason || "未知错误",
          });
        } finally {
          modal.value.setVisible(false);
          // 离开时关闭加载
          modal.value.okButtonProps.loading = false;
        }
      };
    }
    const buttonSubmitArticle = updateFlag ? "更新" : "发布";

    return {
      modal,
      showModal,
      submit,
      buttonSubmitArticle,
    };
  },
};
</script>

<style scoped>
.editor {
  margin: 30px 10px;
  background-color: #eceff1;
  padding: 10px;
  border-radius: 4px;
}
.actions {
  text-align: center;
  padding: 8px;
}
.actions > * {
  margin: 10px;
}
</style>