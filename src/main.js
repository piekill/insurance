// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import iView from 'iview';
import 'babel-polyfill';
import Cookies from 'js-cookie';
import 'iview/dist/styles/iview.css';
import App from './App';
import router from './router';
import utils from './common/utils';
import store from './common/store';

window.get = utils.ajaxGet;
window.post = utils.ajaxPost;
Vue.config.productionTip = false;

Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App),
  created() {
    this.checkLogin();
  },
  watch: {
    $route: 'checkLogin',
  },
  methods: {
    checkLogin() {
      if (!Cookies.get('session')) {
      // if (!Cookies.get('session')) {
        this.$router.push('/login');
      }
    },
  },
});
