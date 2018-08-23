import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/login'),
    },
    {
      path: '/',
      name: 'Roster',
      component: () => import('../components/roster'),
    },
    {
      path: '/manage',
      name: 'Admin',
      component: () => import('../components/admin'),
      meta: {
        role: ['admin'],
      },
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import('../components/errorpage'),
    },
  ],
});
