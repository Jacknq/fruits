import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
//const  Home = () => import( '@/views/Home.vue');
const grid = () => import("@/components/grid.vue");
const detail = () => import("@/components/detail.vue");
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: grid
  },
  { name:'detail',path: "/detail/:id", component: detail },
 // { name:'add',path: "/add", component: Home },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
