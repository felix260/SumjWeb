<template>
  <div class="sumjcenter">
    <el-alert class="sumjcenter1" v-if="errorVisible" :title="errorText" type="error" center show-icon :closable="false"></el-alert>
    <van-dialog v-model="dialogVisible" :before-close="handleBeforeClose">
      <van-field v-model="remark" label="备注" placeholder="请输入备注" />
    </van-dialog>
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
      errorVisible: false,
      errorText: "",
      dialogVisible: false,
      remark: "",
      view_OpenIdDevice: null,
    };
  },
  methods: {
    redirectFromSerialNumber() {
      let that = this;
      if (that.view_OpenIdDevice.DeviceType == "WXCW01") {
        //判断有没有备注。没有备注则提示用户填写备注
        window.location.href =
          "WapWXCW01Operate?serialNumber=" +
          that.view_OpenIdDevice.SerialNumber;
      } else if (that.view_OpenIdDevice.DeviceType == "PRINT1") {
        window.location.href =
          "Wap_PRINT1_Operate?serialNumber=" +
          that.view_OpenIdDevice.SerialNumber;
      } else if (that.view_OpenIdDevice.DeviceType == "HDWY01") {
        window.location.href =
          "WapHDWY01Operate?serialNumber=" +
          that.view_OpenIdDevice.SerialNumber;
      } else if (that.view_OpenIdDevice.DeviceType == "KSY001") {
        window.location.href =
          "Old/WAP_KSY001/Operate?SerialNumber=" +
          that.view_OpenIdDevice.SerialNumber +
          "&OpenId=" +
          that.view_OpenIdDevice.OpenId +
          "&DeviceType=KSY001";
      } else if (that.view_OpenIdDevice.DeviceType == "RSL001") {
        window.location.href =
          "Old/WAP_RSL001/Operate?SerialNumber=" +
          that.view_OpenIdDevice.SerialNumber +
          "&OpenId=" +
          that.view_OpenIdDevice.OpenId +
          "&DeviceType=RSL001";
      } else if (that.view_OpenIdDevice.DeviceType == "YSY001") {
        window.location.href =
          "Old/WAP_YSY001/Operate?SerialNumber=" +
          that.view_OpenIdDevice.SerialNumber +
          "&OpenId=" +
          that.view_OpenIdDevice.OpenId +
          "&DeviceType=YSY001";
      } else {
        //未开发页面
        that.errorText = that.view_OpenIdDevice.DeviceType + "开发中...";
        that.errorVisible = true;
      }
    },
    handleBeforeClose(action, done) {
      let that = this;
      if (that.remark) {
        that.axios
          .post("View_GroupMenu/EditRemark", {
            id: that.view_OpenIdDevice.Id,
            remark: that.remark,
          })
          .then(function () {
            done();
            that.redirectFromSerialNumber();
          })
          .catch(function () {
            that.$notify("保存异常");
          });
      } else {
        that.$notify("请输入备注");
        done(false);
      }
    },
  },
  mounted() {
    let that = this;
    that.axios
      .post("Login/AutoLogin", {
        openId: that.$route.query.openId,
        code: that.$route.query.code,
        serialNumber: that.$route.query.serialNumber, //后面带序列号的
        redirect: that.$route.query.redirect, //后面带直接跳转页面的
        signNumber: that.$route.query.signNumber, //试块码
      })
      .then(function (response) {
        if (response.data.code == 101) {
          window.localStorage.setItem("token", response.data.token);
          let obj = JSON.parse(response.data.data); //注意这里属性都是大写开头
          if (obj.SerialNumber) {
            that.view_OpenIdDevice = obj;
            if (obj.Remark == "扫码绑定" || obj.Remark == "") {
              that.dialogVisible = true;
            } else {
              //直接转向页面
              that.redirectFromSerialNumber();
            }
          } else if (obj.Redirect) {
            window.location.href = obj.Redirect;
          } else {
            //其它作用的码
          }
        } else {
          that.errorText = response.data.data;
          that.errorVisible = true;
        }
      });
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