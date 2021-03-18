import 'babel-polyfill'
import Vue from 'vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/global.css'


Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(ElementUI)

axios.defaults.baseURL = process.env.VUE_APP_BaseUrl;

axios.interceptors.request.use(function (config) {
    config.headers["token"] = window.localStorage.getItem("token");
    return config;
});
axios.interceptors.response.use(
    function (response) {
        if (response.data.code != 101) {
            if (response.data.code == 401) window.location.href = "/";
        }
        return response;
    },
    function () {
        console.log("拦截器response报的错");
    }
);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')




