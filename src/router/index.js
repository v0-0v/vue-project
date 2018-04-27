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
      redirect:'/index',
    },
    {
      path: '/index',
      component: Login
    },
    {
    	path: '/admin',
    	component: Admin,
      children: [
        {
          path:'index',
          component: function(resolve){
            require(['../view/admin/Index.vue'], resolve)
          }
        },
        {
          path:'shop',
          component: function(resolve){
            require(['../view/admin/Shop.vue'], resolve)
          }
        },
      ]
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
