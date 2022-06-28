<template>
  <main class="details w-e-text shadow">
    <h1 class="title">{{ article.title }}</h1>
    <a-tag color="#42A5F5" class="type">{{ article.type }}</a-tag>
    <a-alert
      :message="article.synopsis"
      type="info"
      class="synopsis"
      show-icon
      v-if="article.synopsis"
    >
      <template #icon>
        <CommentOutlined />
      </template>
    </a-alert>
    <main v-html="article.content"></main>
  </main>
</template>

<script>
import { ref, watchEffect } from "vue";
import { Alert } from "ant-design-vue";
import { CommentOutlined } from "@ant-design/icons-vue";
import { useLinkedRouteParam } from "@/use/route";
import http from "../../use/http.js";
import { useInfoNotice } from "@/use/notice.js";
import { useWindowScrollTo } from "@/use/scroll.js";
// 加载wangeditor富文本编辑器的css文件
import "wangeditor";
export default {
  components: {
    AAlert: Alert,
    CommentOutlined,
  },
  setup() {
    const id = useLinkedRouteParam("id");
    const article = ref({});

    useWindowScrollTo({ top: 0 }, "auto");

    watchEffect(
      async () => {
        try {
          const res = await http.get(`/articles/${id.value}`);
          article.value = res.data;
          // console.log(res);
        } catch (error) {
          // console.log("error", error);
          // 文章id不存在时  后端是返回的404信息  资源未找到但是请求是成功的
          // 但是axios会把404当成错误信息来处理  此处需要做兼容
          // 加上description: error.data
          useInfoNotice({
            message: "文章获取失败",
            description: error.data || error.reason || "未知错误",
          });
        }
      },
      {
        flush: "post",
      }
    );

    return {
      article,
    };
  },
};
</script>

<style>
.details {
  margin-left: 300px;
  width: 700px;
  height: 700px;
  background-color: white;
  padding: 10px 30px;
}
.title {
  text-align: center;
}
.type {
  margin-bottom: 10px;
}
.synopsis {
  margin-bottom: 10px;
}
</style>