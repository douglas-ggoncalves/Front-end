import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Teste from '../views/Teste.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Index
  },
  {
    path: '/about',
    name: 'Teste',
    component: Teste
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
