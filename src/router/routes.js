export const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import('@/views/common/NotFound.vue')
  },
  {
    path: "/",
    redirect: "/show",
  },
  {
    path: '/show',
    name: 'show',
    component: () => import('@/views/show/Index.vue'),
    children: [
      {
        path: "",
        redirect: "/show/blog/1"
      },
      {
        path: 'blog/:pageNum',
        name: "showBlog",
        component: () => import('@/views/show/Blog.vue')
      },
      {
        path: 'book/:pageNum',
        name: 'showBook',
        component: () => import('@/views/show/Book.vue')
      },
      {
        path: 'project',
        name: 'showProject',
        component: () => import('@/views/show/Project.vue')
      },
      {
        path: 'file',
        name: 'showFile',
        component: () => import('@/views/show/File.vue')
      },
      {
        path: 'list',
        name: 'showList',
        component: () => import('@/views/show/List.vue')
      },
      {
        path: 'about',
        name: 'showAbout',
        component: () => import('@/views/show/AboutView.vue')
      }
    ],
  },
  {
    path: "/manage",
    name: "manage",
    component: () => import('@/views/manage/Index.vue'),
    children:[
      {
        path: "",
        redirect: "/manage/article/1"
      },
      {
        path: 'login',
        name: 'manageLogin',
        component: () => import('@/views/manage/Login.vue')
      },
      {
        path: 'editor',
        name: 'manageEditor',
        component: () => import('@/views/manage/Editor.vue')
      },
      {
        path: 'article/:pageNum',
        name: 'manageArticle',
        component: () => import('@/views/manage/Article.vue')
      }
    ]
  },
  {
    path:"/details/:id",
    name:"details",
    component: () => import("@/views/details/Index.vue")
  }
]