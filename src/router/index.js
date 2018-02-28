import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Admin from '@/view/admin/Admin'
import Shop from '@/view/shop/Shop'
import Buyer from '@/view/buyer/Buyer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
    	path: '/admin',
    	component: Admin
    },
    {
    	path: '/shop',
    	component: Shop
    },
    {
    	path: '/buyer',
    	component: Buyer
    },
  ]
})
