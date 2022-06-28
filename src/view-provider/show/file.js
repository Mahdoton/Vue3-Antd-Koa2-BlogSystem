import { useRouterNameToPage } from "@/use/router";

export const fileViewConfig = {
  cardRecords: [
    {
      id: "0",
      time:"2022-03-17",
      content: "这是归档页面",
      handle:useRouterNameToPage("showAbout"),
    },
    {
      id: "1",
      time:"2022-03-17",
      content: "贪吃蛇",
    },
    {
      id: "2",
      time:"2022-03-17",
      content: "黑白块",
    },
    {
      id: "3",
      time:"2022-03-17",
      content: "校园地图管理系统",
    },
  ]
}