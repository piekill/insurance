// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import App from './App';
import router from './router';
import utils from './common/utils';
import store from './common/store';

window.get = utils.ajaxGet;
window.post = utils.ajaxPost;
Vue.config.productionTip = false;

Vue.use(iView);

Vue.prototype.setCookie = (name, value, expiredays) => {
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = `${name}=${escape(value)}${(expiredays == null) ? '' : `;expires=${exdate.toGMTString()}`}`;
};

// 获取cookie、
function getCookie(name) {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  const arr = document.cookie.match(reg);
  if (arr) { return (arr[2]); }
  return null;
}
Vue.prototype.getCookie = getCookie;

// 删除cookie
Vue.prototype.delCookie = (name) => {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval = getCookie(name);
  if (cval != null) { document.cookie = `${name}=${cval};expires=${exp.toGMTString()}`; }
};

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
      if (!this.getCookie('session')) {
        this.$router.push('/login');
      } else {
        this.$router.push('/');
      }
    },
  },
});
