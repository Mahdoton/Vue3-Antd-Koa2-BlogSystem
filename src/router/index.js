import { useErrorNotice, useWarningNotice } from '@/use/notice.js';
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes.js'


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  // console.log(to.name);
  // 获取token令牌
  const token = localStorage.getItem("token");

  // 对非登录路由进行排查
  const isInManageRouterGroup = /^manage(?!(Login))/.test(to.name);

  // 没有携带token并且请求非登录路由时  给予警告
  const isToLogin = !token && isInManageRouterGroup;
  if (isToLogin) {
    useWarningNotice({
      message: "无此权限,请先登录"
    });
    return { path: '/manage/login' }
  }
  return true;
})

export default router
