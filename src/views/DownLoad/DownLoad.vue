<template>
  <div>
    <van-cell-group title="平整度">
      <van-cell title="蓝牙平整度" is-link url="download/PZDly/pzdly.apk" value="下载"></van-cell>
      <van-cell title="蓝牙平整度BLE" is-link url="download/PZD100/pzd100.apk" value="下载"></van-cell>
    </van-cell-group>
    <van-cell-group title="氯离子">
      <van-cell title="氯离子含量测定" is-link url="download/LLZ008/llz008.apk" value="下载"></van-cell>
    </van-cell-group>
    <van-cell-group title="静力触探">
      <van-cell title="双通道" is-link url="download/jlct02/jlct02.apk" value="下载"></van-cell>
    </van-cell-group>
    <van-cell-group title="灌立停">
      <van-cell title="灌立停" is-link url="download/GLTZ01/GLTZ01.apk" value="下载"></van-cell>
    </van-cell-group>
    <van-cell-group title="车辙">
      <van-cell title="车辙（WIFI,三位小数）" is-link url="download/CZY001/wndcz.apk" value="下载"></van-cell>
      <van-cell title="车辙（WIFI,两位小数）" is-link url="download/CZY001/chezhe20200731.apk" value="下载"></van-cell>
      <van-cell title="车辙（蓝牙）" is-link url="download/czyly/czyly.apk" value="下载"></van-cell>
    </van-cell-group>
    <van-cell-group title="无核密度仪">
      <van-cell title="无核密度仪" is-link url="download/WHMD01/WHMD01.apk" value="下载"></van-cell>
    </van-cell-group>
    <van-overlay :show="showOverlay" @click="show = false">
      <van-image src="images/yindao.png" />
    </van-overlay>
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
      showOverlay: false,
    };
  },
  mounted() {
    let that = this;
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      that.showOverlay = true;
    } else {
      that.showOverlay = false;
    }
  },
};
</script>

<style>
</style>