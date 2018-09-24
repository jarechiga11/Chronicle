import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import firebase from 'firebase'

import './fa.config' //FontAwesome Icons

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


//Bootstrap-Vue 
Vue.use(BootstrapVue)

Vue.config.productionTip = false

let app;

firebase.auth().onAuthStateChanged(function() {
  if(!app){
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
});
