import Vue from 'vue'
import uView from "uview-ui";
import App from './App';

import request from 'common/config.js'
Vue.prototype.$request = request;
Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
