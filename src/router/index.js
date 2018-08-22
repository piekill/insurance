import Vue from 'vue';
import Router from 'vue-router';
import Roster from '../components/roster';
import Login from '../components/login';
import Admin from '../components/admin';
import NotFound from '../components/errorpage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
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
    {
      path: '/manage',
      name: 'Admin',
      component: Admin,
      meta: {
        role: ['admin'],
      },
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});
