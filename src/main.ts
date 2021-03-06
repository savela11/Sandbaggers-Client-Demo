import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/styles/main.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h: any): any => h(App),
}).$mount('#app')
