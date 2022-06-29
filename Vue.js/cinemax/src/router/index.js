import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Movie from '../views/movie/Movie.vue'
import Movies from '../views/movie/Movies.vue'
import Serie from '../views/serie/Serie.vue'
import Series from '../views/serie/Series.vue'
import Person from '../views/person/Person.vue'
import Persons from '../views/person/Persons.vue'

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
    path: '/filmes',
    name: 'Movies',
    component: Movies
  },
  {
    path: '/filme/:id',
    name: 'Movie',
    component: Movie
  },
  {
    path: '/series',
    name: 'Series',
    component: Series
  },
  {
    path: '/serie/:id',
    name: 'Serie',
    component: Serie
  },
  {
    path: '/pessoa/:id',
    name: 'Person',
    component: Person
  },
  {
    path: '/pessoa&page=:id',
    name: 'Persons',
    component: Persons
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
