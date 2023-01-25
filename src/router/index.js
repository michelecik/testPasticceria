import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BackOffice from '../views/BackOffice.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/backoffice',
      name: 'backoffice',
      component: BackOffice
    }
  ]
})

export default router
