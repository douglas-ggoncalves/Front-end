import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Movie from '../views/movie/Movie.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'DefaultRouter',
    component: Index
  },
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  
  {
    path: '/filme/:id',
    name: 'Movie',
    component: Movie
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
