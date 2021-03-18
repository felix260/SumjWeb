<template>
  <el-container>
    <el-header class="sumj_header">
      <div style="display:flex">
        <img src="../assets/sumj_logo.png" class="sumj_header_img" />
        <el-menu mode="horizontal" class="sumj_header_menu" background-color="#409EFF" text-color="#FFFFFF" active-text-color="#E6A23C" :default-active="defaultActive" :router="true">
          <el-menu-item index="/DeviceData" :route="{name:'DeviceData_Default'}">设备数据</el-menu-item>
          <el-menu-item v-if="userType=='Employee'" index="/StockManage" :route="{name:'StockManage_Default'}">库存管理</el-menu-item>
          <el-menu-item v-if="userType=='Employee'" index="/SystemSetting" :route="{name:'SystemSetting_Default'}">系统设置</el-menu-item>
        </el-menu>
      </div>
      <div style="display:flex;justify-content: end; align-items: center;">
        <el-dialog title="修改密码" :visible.sync="changePWDdialogVisible" width="400px" @open="errmsgVisible=false">
          <el-alert class="sumj_yanzhengmima" :title="errmsg" v-show="errmsgVisible" type="error" :closable="false" :show-icon="true"> </el-alert>
          <el-form label-width="100px" :model="form">
            <el-form-item label="旧密码">
              <el-input v-model="form.oldPWD" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码">
              <el-input v-model="form.newPWD" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认新密码">
              <el-input v-model="form.confirmPWD" show-password></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer">
            <el-button type="primary" @click="changePWD">保 存</el-button>
            <el-button @click="changePWDdialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
        <el-avatar icon="el-icon-user-solid"></el-avatar>
        <el-popover placement="bottom" trigger="hover" v-model="userToolVisible">
          <el-menu>
            <el-menu-item @click="changePWDdialogVisible=true">
              修改密码
            </el-menu-item>
            <el-menu-item @click="exitSystem">
              退出
            </el-menu-item>
          </el-menu>
          <p class="sumj_p_username" slot="reference">{{username=="null"?'微信用户':username}}</p>
        </el-popover>
        <i class="el-icon-caret-bottom"></i>
      </div>
    </el-header>
    <router-view></router-view>
  </el-container>
</template>

<script>



export default {
  name: "Home",
  data() {
    return {
      form: {
        oldPWD: "",
        newPWD: "",
        confirmPWD: "",
      },
      errmsg: "",
      errmsgVisible: false,
      userToolVisible: false,
      changePWDdialogVisible: false,
      username: window.localStorage.getItem("userName"),
      userType: "",
    };
  },
  components: {},
  methods: {
    changePWD: function () {
      var that = this;
      this.userToolVisible = false;
      this.axios
        .post("Sys_UserInfo/ChangePWD", that.form)
        .then(function (response) {
          that.errmsgVisible = response.data.code != 101;
          if (response.data.code == 101) {
            that.$message.success(response.data.data);
            that.changePWDdialogVisible = false;
          } else {
            that.errmsgVisible = true;
            that.errmsg = response.data.data;
          }
        })
        .catch(function () {});
    },
    exitSystem: function () {
      var that = this;
      this.userToolVisible = false;
      this.$confirm("确定要退出吗？", {
        closeOnClickModal: false,
        type: "warning",
        center: true,
      })
        .then(function () {
         that.axios.post("sys_userinfo/exitSystem").then(function (response) {
            if (response.data.code == 101) {
              window.localStorage.removeItem("token");
              window.localStorage.removeItem("userName");
              that.$router.push("/login");
            }
          });
        })
        .catch(function () {});
    },
  },
  computed: {
    defaultActive: function () {
      if (this.$route.path.indexOf("/", 10) <= 0) {
        return this.$route.path;
      } else {
        return this.$route.path.substr(0, this.$route.path.indexOf("/", 10));
      }
    },
  },
  mounted: function () {
    let that = this;
    this.axios.post("Sys_UserInfo/GetUserType").then(function (response) {
      that.userType = response.data.data;
    });
  },
};
</script>
<style scoped>
.el-container {
  height: 100%;
  overflow: hidden;
}
.sumj_header {
  background-color: #409eff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sumj_header_img {
  margin-top: 5px;
  height: 55px;
}
.sumj_header_menu {
  margin-left: 20px;
}
.sumj_p_username {
  color: #e6a23c;
}
.sumj_yanzhengmima {
  margin-bottom: 10px;
}
</style>
