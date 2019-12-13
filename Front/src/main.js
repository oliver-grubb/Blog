import Vue from 'vue'
import App from './App.vue'
import axios from "axios"

Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:5000/',
  timeout: 10000,
  
});
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


window.Event = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
