import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeGhView.vue'
import NearView from '../views/NearView.vue'
import GhuaView from '../views/GhuaView.vue'
import TimeLine from '../components/TimeLine.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      meta: { reload: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/About.vue')
    },
    {
      path: '/near',
      name: 'near',
      meta: { reload: true },
      component: NearView
    },
    {
      path: '/gh',
      name: 'gh',
      component: GhuaView
    },
    {
      path: '/timeLine/:id',
      name: 'timeLine',
      component: TimeLine
    }
  ]
})
 
export default router
