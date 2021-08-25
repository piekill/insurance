import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

const store = new Vuex.Store({
  state: {
    domain: 'https://x.piekill.com',
    userInfo: {
      role: '',
    },
    userRoutes: {
      routes: [],
    },
  },
  mutations: {
    updateUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo;
    },
    clearState(state) {
      state.userInfo = { role: '' };
    },
  },
  getters: {
    role: state => state.userInfo.role,
  },
  plugins: [vuexLocal.plugin],
});

export default store;
