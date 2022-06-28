import { useRouterNameToPage, useRouterPathToPage } from '@/use/router';

export const appViewConfig = {
  avatar: {
    src: require('@/assets/image/lufei.jpg'),
  },
  tags: [
    {
      color: "success",
      text: "VueJS",
    },
    {
      color: "pink",
      text: "JavaScript",
    },
    {
      color: "cyan",
      text: "NodeJS",
    },
    {
      color: "purple",
      text: "TypeScript",
    }
  ],
  menu: [
    {
      text: "首页",
      handle: useRouterPathToPage("/show/blog/1"),
    },
    {
      text: "归档",
      handle: useRouterNameToPage("showFile"),
    },
    {
      text: "赞助",
      handle: useRouterNameToPage("showList"),
    },
    {
      text: "关于我",
      type: "primary",
      handle: useRouterNameToPage("showAbout"),
    }
  ],

}