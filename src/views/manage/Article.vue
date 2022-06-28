<template>
  <main class="article shadow">
    <h1>文章管理</h1>
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="pagination"
      @change="handleChange"
      row-key="id"
      :loading="loading"
    >
      <!-- record记录的是当前行的渲染信息  可以打印出来进行测试 -->
      <template #type="record">
        <a-tag :color="useColor(record.text)">
          {{ record.text }}
        </a-tag>
      </template>
      <!-- 解构text  再解构id -->
      <template #edit="{ text: { id } }">
        <a-button class="mx-1" @click="search(id)">查看</a-button>
        <a-button class="mx-1" type="primary" @click="update(id)"
          >更新</a-button
        >
        <a-button class="mx-1" type="primary" danger @click="destroy(id)"
          >删除</a-button
        >
      </template>
    </a-table>

    <section class="action">
      <a-button type="primary" @click="toEditorPage">创作</a-button>
    </section>
  </main>
</template>

<script>
import { defineComponent, watchEffect, ref, toRaw, computed } from "vue";
import { useColorMap } from "@/use/color.js";
import { Table } from "ant-design-vue";
import { articleViewConfig } from "@/view-provider/manage/article.js";
import {
  useRouterNameToPage,
  useRouterParamChange,
  useRouterPathToPage,
  useRouterNameWithQueryToPage,
} from "@/use/router.js";
import { useLinkedRouteParam } from "@/use/route.js";
import http, { lazyRequest } from "../../use/http.js";
import { useErrorNotice, useSuccessNotice } from "@/use/notice.js";
import { useState } from "@/use/hooks.js";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const { columns, pagination } = articleViewConfig;

    // 集合映射
    const colorMap = new Map([
      ["blog", "#00897B"],
      ["book", "#03A9F4"],
    ]);
    const useColor = useColorMap(colorMap);

    // 路由页码变化  更新分页current
    // 此处有个小bug  此时的pagination.current完成赋值之后变成了一个对象
    // 总是会提示类型警告
    // 需要通过pagination.current.value才能够取到current的值
    pagination.current = useLinkedRouteParam("pageNum");

    // 将对象转化为数字
    // pagination.current = pagination.current.value;
    // console.log(pagination.current.value);
    // console.log(pagination.current);
    // 分页current变化  更新路由页码
    const pageNumParamChange = useRouterParamChange("pageNum");
    const handleChange = ({ current }) => pageNumParamChange(current);

    // const handleChange = (data) => console.log(data);

    // 跳转到富文本编辑器
    const toEditorPage = useRouterNameToPage("manageEditor");

    // 引入文章列表数据
    const data = ref([]);

    // 使用已经封装好的状态改变函数
    const [loading, setLoading] = useState(false);
    // 渲染文章数据列表
    watchEffect(
      async () => {
        try {
          setLoading(true);
          const request = http.get(
            `/articles?limit=${pagination.pageSize}&page=${pagination.current}`
          );
          const [res] = await lazyRequest(request, 400);
          data.value = res.data.rows;

          // 此处有个小bug  可能是antd组件的数据绑定失效了
          // 总条数已经赋值过去了  但是antd组件的总条数并没有发生改变
          // 更新总记录数
          pagination.total = res.data.count;

          // console.log(pagination.total);
          // console.log(res.data.rows);
          // console.log(data.value);
          // console.log(res.data.count);
        } catch (error) {
          useErrorNotice({
            message: "文章列表获取失败",
            description: error.reason || "未知错误",
          });
        } finally {
          setLoading(false);
        }
      },
      // 设置为渲染后 让watchEffect副作用失效  不然点开创作界面会报错
      {
        flush: "post",
      }
    );

    const destroy = async (id) => {
      try {
        setLoading(true);
        await http.delete(`/articles/${id}`);

        const request = http.get(
          `/articles?limit=${pagination.pageSize}&page=${pagination.current}`
        );
        const [res] = await lazyRequest(request, 400);
        data.value = res.data.rows;

        // 此处有个小bug  可能是antd组件的数据绑定失效了
        // 总条数已经赋值过去了  但是antd组件的总条数并没有发生改变
        // 更新总记录数
        pagination.total = res.data.count;

        useSuccessNotice({
          message: "删除成功",
        });
      } catch (error) {
        useErrorNotice({
          message: "文章删除失败",
          description: error.reason || "未知错误",
        });
      } finally {
        setLoading(false);
      }
    };

    const search = (id) => {
      const toPage = useRouterPathToPage(`/details/${id}`);
      toPage();
    };

    const router = useRouter();
    // 此处使用了高阶函数
    const update = useRouterNameWithQueryToPage("manageEditor", "id");

    return {
      data,
      columns,
      pagination,
      useColor,
      handleChange,
      toEditorPage,
      loading,
      destroy,
      search,
      update,
    };
  },

  components: {
    // [Table.name]:Table
    ATable: Table,
  },
});
</script>
<style scoped>
.article {
  margin: 10px;
  padding: 10px;
  border-radius: 8px;
  border: 2px solid #cfd8dc;
  text-align: center;
}
</style>