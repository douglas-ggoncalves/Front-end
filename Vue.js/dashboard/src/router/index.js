import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Recs from '../views/Recs/Recs.vue'
import Exps from '../views/Exps/Exps.vue'
import Test from '../views/Test.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Index
  },
  {
    path: '/transacoes/receitas',
    name: 'recs',
    component: Recs
  },
  {
    path: '/transacoes/despesas',
    name: 'exps',
    component: Exps
  },
  
  {
    path: '/test',
    name: 'Test',
    component: Test
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
