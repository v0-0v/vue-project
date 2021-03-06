// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Api from "./api/config.js"
import store from './store/store.js'
import axios from 'axios'

import './assets/css/base.css'
require('./mock/index.js')//此部分引入的是我们所编写的mockjs文档

Vue.config.productionTip = false

Vue.prototype.Api=Api;
Vue.prototype.axios = axios;

/* eslint-disable no-new */
Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
