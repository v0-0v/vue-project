import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    userMess:{"id":1,"userName":"和牙刷私奔叻丶","loginId":"buyer1","password":"123","address":"黑龙江省大庆市"}//登陆者信息
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