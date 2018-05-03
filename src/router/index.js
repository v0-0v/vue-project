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
        {
          path:'buyer',
          component: function(resolve){
            require(['../view/admin/Buyer.vue'], resolve)
          }
        },
      ]
    },
    {
    	path: '/shop',
    	component: Shop,
      children: [
        {
          path:'index',
          component: function(resolve){
            require(['../view/shop/Index.vue'], resolve)
          }
        },
        {
          path:'goodList',
          component: function(resolve){
            require(['../view/shop/GoodList.vue'], resolve)
          }
        },
        {
          path:'good/:id',
          component: function(resolve){
            require(['../view/shop/Good.vue'], resolve)
          }
        },
        {
          path:'addGood',
          component: function(resolve){
            require(['../view/shop/AddGood.vue'], resolve)
          }
        },
      ]
    },
    {
    	path: '/buyer',
    	component: Buyer,
      children: [
        {
          path:'index',
          component: function(resolve){
            require(['../view/buyer/Index.vue'], resolve)
          }
        },
        {
          path:'goodList',
          component: function(resolve){
            require(['../view/buyer/GoodList.vue'], resolve)
          }
        },
        {
          path:'good',
          component: function(resolve){
            require(['../view/buyer/Good.vue'], resolve)
          }
        },
        {
          path:'toBuy',
          component: function(resolve){
            require(['../view/buyer/ToBuy.vue'], resolve)
          }
        },
        {
          path:'orderList',
          component: function(resolve){
            require(['../view/buyer/OrderList.vue'], resolve)
          }
        },
        {
          path:'order',
          component: function(resolve){
            require(['../view/buyer/Order.vue'], resolve)
          }
        },
      ]
    },
  ]
})
