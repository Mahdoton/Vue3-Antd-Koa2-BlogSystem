import { reactive } from "vue";

export const articleViewConfig = {
  pagination: reactive({
    pageSize: 5,
    current: 1,
    total: 20
  }),
  columns: [
    {
      title: "标题",
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: '修改时间',
      dataIndex: 'updateAt',
      key: 'updateAt',
    },
    {
      title: '类型',
      key: 'type',
      dataIndex: 'type',
      slots: {
        customRender: 'type',
      },
    },
    {
      title: '编辑',
      key: 'edit',
      slots: {
        customRender: 'edit',
      },
    },
  ],

}