import { useRouterNameToPage } from "@/use/router";

export const projectViewConfig = {
  cardRecords: [
    {
      id: "0",
      content: "后台管理系统",
      handle:useRouterNameToPage("showAbout"),
    },
    {
      id: "1",
      content: "贪吃蛇",
    },
    {
      id: "2",
      content: "黑白块",
    },
    {
      id: "3",
      content: "校园地图管理系统",
    },
  ]
}