import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    loginState:"0",//登陆状态，0未登录，1管理员登陆，2商家登陆，3买家登陆
    adminAccount:[//管理员账号
    	{"name":"admin1","password":"123"},
    	{"name":"admin2","password":"123"},
    	{"name":"admin3","password":"123"},
    ],
    shopAccount:[//商家账号
    	{"name":"shop1","password":"123","mess":{}},
    	{"name":"shop2","password":"123","mess":{}},
    	{"name":"shop3","password":"123","mess":{}},
    ],
    buyerAccount:[//买家账号
    	{"name":"buyer1","password":"123","mess":{}},
    	{"name":"buyer2","password":"123","mess":{}},
    	{"name":"buyer3","password":"123","mess":{}},
    ],
    userMess:{}//登陆者信息
}

const mutations = {
	login(state,payload){//用户登陆
		state.userMess = payload.userMess;
		state.loginState = payload.loginState;
	}
}

export default new Vuex.Store({
    state,
    mutations
});