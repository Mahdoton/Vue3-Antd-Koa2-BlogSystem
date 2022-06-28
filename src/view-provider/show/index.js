import { BookOutlined, ReadOutlined, ProjectOutlined, BarsOutlined, CrownOutlined } from "@ant-design/icons-vue"
import { useRouterNameToPage, useRouterPathToPage } from "@/use/router.js"
export const showIndexViewConfig = {
  avatar: {
    src: require("@/assets/image/lufei.jpg"),
  },
  title: "Mahdoton",
  subTitle: "人无完人",
  unWantedBackWhiteList: ["showBlog"],
  homePath:"/show/blog/1",
  buttonGroup: [
    {
      text: "日志",
      icon: <BookOutlined />,
      handle: useRouterPathToPage("/show/blog/1")
    },
    {
      text: "读书",
      icon: <ReadOutlined />,
      handle: useRouterPathToPage("/show/book/1")
    },
    {
      text: "项目",
      icon: <ProjectOutlined />,
      handle: useRouterNameToPage("showProject")
    },
    {
      text: "归档",
      icon: <BarsOutlined />,
      handle: useRouterNameToPage("showFile")
    },
    {
      text: "赞助",
      icon: <CrownOutlined />,
      handle: useRouterNameToPage("showList")
    },
  ]
}