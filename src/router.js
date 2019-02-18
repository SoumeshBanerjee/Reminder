import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NewUser from './views/NewUser.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/:id?',
      name: 'home',
      component: Home,
      meta: {isAuth:true}
    },
    {
      path: '/newuser',
      name: 'newuser',
      component: NewUser
    }
  ]
})