import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    userMess:{"userName":"附近的拉布拉多","loginId":"admin1","password":"123"}//登陆者信息
}

const mutations = {
	login(state,payload){//用户登陆
		state.userMess = payload.userMess;
	}
}

export default new Vuex.Store({
  state,
  mutations
});