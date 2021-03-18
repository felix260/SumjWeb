<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="wap-home" to="/WapMyHome">试验管理</van-tabbar-item>
      <van-tabbar-item icon="manager" to="/WapMy">账号信息</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style>
</style>