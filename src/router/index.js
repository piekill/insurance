import Vue from 'vue';
import Router from 'vue-router';
import Frame from '../components/frame';
import Login from '../components/login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      name: 'Frame',
      component: Frame,
    },
  ],
});
