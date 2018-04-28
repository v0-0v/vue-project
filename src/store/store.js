import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    userMess:{"id":1,"userName":"张兴邦食品旗舰店","loginId":"shop1","password":"123","label":"食品"}//登陆者信息
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