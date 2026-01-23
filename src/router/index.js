import { createRouter, createWebHashHistory } from 'vue-router'
import LayoutView from '@layout/LayoutView.vue';
 
// 合并路由
const routes = [
  {
    path: '/',
    name: 'layoutView',
    component: LayoutView,
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@msn/home/home.vue'),
        meta: {
          title: '首页',
        }
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.meta.keepScrollPosition) {
      return savedPosition || { top: 0 }
    }
    return { top: 0 }
  }
})

export default router