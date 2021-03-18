import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentUser: {}
    },
    getters: {
        doneWeiXinUserInfo: state => {
            if (state.currentUser.weiXinUserInfo)
                return JSON.parse(state.currentUser.weiXinUserInfo);
            else {
                return {}
            }
        }
    },
    mutations: {
        setCurrentUser(state, currentUser) {
            console.log(currentUser)
            state.currentUser = currentUser;
        }
    },
    actions: {
        getCurrentUser(context) {
            Vue.axios.get("Base/GetCurrentUser").then(function (response) {
                context.commit("setCurrentUser", response.data.data)
            })
        }
    },
    modules: {}
})