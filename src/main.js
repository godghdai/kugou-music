import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import VueLazyload from 'vue-lazyload';
import fastclick from 'fastclick';
import store from './store';
// import VueResource from 'vue-resource';
// Vue.use(VueResource);
fastclick.attach(document.body);

Vue.config.productionTip = false;
Vue.use(VueLazyload, {
// error: 'dist/error.png',
// loading: 'dist/loading.gif',
try: 2
});

/* eslint-disable no-new */
new Vue({
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app');
