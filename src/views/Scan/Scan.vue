<template>
  <div class="sumjcenter">
    <el-alert class="sumjcenter1" v-if="errorVisible" :title="errorText" type="error" center show-icon :closable="false"></el-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorVisible: false,
      errorText: "",
    };
  },
  mounted() {
    let that = this;
    let serialNumber = that.$route.query.s;
    let signNumber = that.$route.query.t;
    let l = that.$route.query.l;
    if (serialNumber && serialNumber.length == 8) {
      //先判断设备类型。有了设备类型之后决定跳转到哪个页面
      window.location.href =
        "http://open.weixin.qq.com/connect/oauth2/authorize?appid=wx90b8acdc04348739&redirect_uri=" +
        encodeURI(
          "http://gzh.bjlcyq.cn/AutoLogin?serialNumber=" + serialNumber
        ) +
        "&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect";
    } else if (signNumber && signNumber.length == 22) {
      window.location.href =
        "http://open.weixin.qq.com/connect/oauth2/authorize?appid=wx90b8acdc04348739&redirect_uri=" +
        encodeURI("http://gzh.bjlcyq.cn/AutoLogin?signNumber=" + signNumber) +
        "&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect";
    } else if (l) {
      window.location.href =
        "http://open.weixin.qq.com/connect/oauth2/authorize?appid=wx90b8acdc04348739&redirect_uri=http://gzh.bjlcyq.cn/old/s/Login?p=" +
        l +
        "&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect";
    } else {
      that.errorText = "长度不正确";
      that.errorVisible = true;
    }
  },
};
</script>

<style scoped>
.sumjcenter {
  vertical-align: middle;
  height: 100%;
}
.sumjcenter1 {
  margin-top: 50%;
}
</style>