
// {
//   id: "0",
//   title: "标题1",
//   time: "2022-03-17",
//   content: "我是测试内容111",
// }
import {ref} from "vue"
export const blogViewConfig = {
  cardRecords: ref([]),
  limit:ref(5),
  total:ref(0)
}