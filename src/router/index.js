import Vue from 'vue';
import Router from 'vue-router';
import Roster from '../components/roster';
import Login from '../components/login';
import Admin from '../components/admin';

Vue.use(Router);

export const constRouterMap = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Roster',
    component: Roster,
  },
];

export default new Router({
  routes: constRouterMap,
});

export const asyncRouterMap = [
  {
    path: '/manage',
    name: 'Admin',
    component: Admin,
    meta: {
      role: ['admin'],
    },
  },
];
