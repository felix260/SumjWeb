<template>
  <el-container class="login_Container">
    <el-header class="login_header" height="100px">
      <div>
        <el-image :src="'images/logo2.png'" fit="fill">
        </el-image>
      </div>
      <div>
        <el-link href="images/HelpRegister.jpg" class="el-font" type="primary" target="_blank">注册帮助</el-link>
        <el-link href="#" style="margin-left: 10px;" type="primary" class="el-font">English</el-link>
        <el-link href="old/login/index" style="margin-left: 10px;" type="primary" class="el-font">旧版</el-link>
      </div>
    </el-header>
    <div class="login_main" style="background: url('images/theme-pic1.jpg') #cce1f3 center 0 no-repeat;">
      <div class="login_box">
        <el-tabs class="login_tabs" value="weiXinDengLu" :stretch="true" type="border-card">
          <el-tab-pane name="weiXinDengLu" label="微信登录">
            <div class="qrcode_image">
              <el-image :src="imageUrl" fit="fill">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
            <div class="qrcode_tip">请使用微信扫描二维码登录</div>
          </el-tab-pane>
          <el-tab-pane name="zhangHuDengLu" label="账户登录">
            <el-input class="login_input" v-model="username" placeholder="请输入帐号" prefix-icon="el-icon-user"></el-input>
            <el-input class="login_input" v-model="pwd" prefix-icon="el-icon-lock" show-password placeholder="请输入密码"></el-input>
            <el-row type="flex" justify="end" class="login_input">
              <el-button type="primary" @click="login" class="btn_login" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-footer style="text-align:center;padding-top:20px;">
      <el-link href="http://www.beian.miit.gov.cn/" target="_blank" class="el-font"> 京ICP备18062262号-1</el-link>
      <p class="el-font">公司版权所有：北京路晨伟业仪器设备有限公司</p>
    </el-footer>
  </el-container>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      pwd: "",
      fullscreenLoading: false,
      imageUrl: "",
      loginGuid: "",
      sumjLoginInterval: null,
    };
  },
  methods: {
    login: function () {
      var that = this;
      this.fullscreenLoading = true;
      this.axios
        .post("Login/Login", {
          username: this.username,
          pwd: this.pwd,
        })
        .then(function (data) {
          that.fullscreenLoading = false;
          if (!data.data) {
            that.$message.error("用户名或者密码错误！");
          } else {
            window.localStorage.setItem("token", data.data.token);
            window.localStorage.setItem("userName", data.data.data.phone);
            that.$router.push("/DeviceData/DeviceData_Default");
            clearInterval(that.sumjLoginInterval);
          }
        })
        .catch(function () {
          that.fullscreenLoading = false;
          that.$message.warning("请求失败！");
        });
    },
  },
  mounted() {
    let that = this;
    this.axios.post("Login/GetLoginQRCode").then(function (response) {
      that.imageUrl = "data:image/png;base64," + response.data.data.image64;
      that.loginGuid = response.data.data.loginGuid;
      that.sumjLoginInterval = setInterval(function () {
        that.axios
          .post("Login/ScanLogin", {
            loginGuid: that.loginGuid,
          })
          .then(function (response) {
            if (response.data.data) {
              window.localStorage.setItem("token", response.data.token);
              window.localStorage.setItem("userName", response.data.data.phone);
              clearInterval(that.sumjLoginInterval);
              that.$router.push("/DeviceData/DeviceData_Default");
            }
          });
      }, 1000);
    });
  },
};
</script>
<style scoped>
.login_Container {
  height: 100%;
}
.login_box {
  width: 350px;
  height: 350px;
  position: absolute;
  left: 60%;
  top: 65px;
}
/* .login_form {
  height: 100%;
} */
.login_tabs {
  height: 100%;
}
.qrcode_tip {
  text-align: center;
  font-size: 10px;
}
.qrcode_image {
  text-align: center;
}
.login_input {
  margin-top: 30px;
}

.btn_login {
  width: 100%;
}
.login_header {
  display: flex;
  align-items: flex-end;
}
.login_header div {
  flex: 1 1 auto;
  text-align: center;
}
.login_main {
  position: relative;
  height: 478px;
  /* background: url("../assets/images/theme-pic1.jpg") #cce1f3 center 0 no-repeat; */
}
.el-font {
  font: 12px Extra Small;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>
