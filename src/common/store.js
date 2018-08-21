import Vue from 'vue';
import Vuex from 'vuex';
import { asyncRouterMap, constRouterMap } from '../router';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    domain: 'http://piekill.com',
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
      let routes = constRouterMap;
      if (newUserInfo.role === 'admin') {
        routes = routes.concat(asyncRouterMap);
      }
      state.userRoutes.routes = routes;
    },
  },
  getters: {
    role: state => state.userInfo.role,
    routes: state => state.userRoutes.routes,
  },
});

export default store;
