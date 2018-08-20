import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    domain: 'http://piekill.com',
    userInfo: {
      role: null,
    },
  },
  mutations: {
    updateUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo;
    },
  },
  getters: {
    role: state => state.userInfo.role,
  },
});

export default store;
