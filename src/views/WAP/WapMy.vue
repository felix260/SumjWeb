<template>
  <div>
    <div class="userinfo">
      <el-row>
        <el-col :span="6">
          <el-row type="flex" justify="end">
            <div>
              <el-avatar :size="46" :src="doneWeiXinUserInfo.headimgurl">用户</el-avatar>
            </div>
          </el-row>
        </el-col>
        <el-col :span="17" :offset="1" class="userandphone">
          <div>{{doneWeiXinUserInfo.nickname}}</div>
          <div>欢迎您</div>
        </el-col>
      </el-row>
    </div>
    <div class="sumjvancellgroup">
      <van-cell-group title="用户基本信息">
        <van-cell title="账号" is-link :value="$store.state.currentUser.userName==$store.state.currentUser.openId?'':$store.state.currentUser.userName" @click="editUserName"></van-cell>
        <van-cell title="密码" is-link @click="editPWD"></van-cell>
        <van-cell title="公司名称" is-link :value="$store.state.currentUser.companyName" @click="editCompanyName"></van-cell>
        <van-cell title="用户名称" is-link :value="$store.state.currentUser.name" @click="editName"></van-cell>
      </van-cell-group>
    </div>
    <div class="sumjvancellgroup">
      <van-cell-group title="试验信息">
        <van-cell title="我的试验" is-link></van-cell>
        <van-cell title="我的设备" is-link></van-cell>
      </van-cell-group>
    </div>
    <van-popup v-model="popupVisible" :close-on-click-overlay="true" class="wh100" position="right">
      <van-cell-group :title="editTitle">
        <van-field :label="editLabel" :type="editLabel=='密码'?'password':'text'" v-model="fieldValue" :placeholder="editPlaceholder"></van-field>
      </van-cell-group>
      <el-divider></el-divider>
      <van-button type="info" block @click="saveByColumn">保存</van-button>
    </van-popup>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      popupVisible: false,
      fieldValue: "",
      editTitle: "",
      editLabel: "",
      editPlaceholder: "",
    };
  },
  methods: {
    ...mapActions(["getCurrentUser"]),
    editUserName() {
      let that = this;
      that.fieldValue = that.$store.state.currentUser.userName;
      that.editTitle = "编辑账号";
      that.editLabel = "帐号";
      that.editPlaceholder = "请输入账号(建议手机号码)";
      that.popupVisible = true;
    },
    editCompanyName() {
      let that = this;
      that.fieldValue = that.$store.state.currentUser.companyName;
      that.editTitle = "编辑公司名称";
      that.editLabel = "公司名称";
      that.editPlaceholder = "请输入公司名称";
      that.popupVisible = true;
    },
    editName() {
      let that = this;
      that.fieldValue = that.$store.state.currentUser.name;
      that.editTitle = "编辑用户姓名";
      that.editLabel = "用户姓名";
      that.editPlaceholder = "请输入用户姓名";
      that.popupVisible = true;
    },
    editPWD() {
      let that = this;
      that.fieldValue = that.$store.state.currentUser.pwd;
      that.editTitle = "编辑密码";
      that.editLabel = "密码";
      that.editPlaceholder = "请输入密码";
      that.popupVisible = true;
    },
    saveByColumn() {
      let that = this;
      that.axios
        .post("Sys_UserInfo/SaveByColumn", {
          id: that.$store.state.currentUser.id,
          editColumn: that.editLabel,
          editValue: that.fieldValue,
        })
        .then(function (response) {
          if (response.data.code == 101) {
            that.$notify({ type: "success", message: "保存成功" });
            that.getCurrentUser();
            that.popupVisible = false;
          } else {
            that.$notify(response.data.data);
          }
        });
    },
  },
  computed: {
    ...mapGetters(["doneWeiXinUserInfo"]),
    ...mapState(["currentUser"]),
  },
  mounted() {
    let that = this;
    that.getCurrentUser();
  },
};
</script>

<style scoped>
.userinfo {
  height: 80px;
  background-color: #409eff;
  padding-top: 40px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.userandphone {
  font-size: 14px;
  color: white;
  font-weight: 900;
  display: flex;
  flex-direction: column;
}
.sumjvancellgroup {
  margin: 10px;
  border: 1px solid #f2f3f5;
  border-radius: 8px;
  padding: 10px;
}
.wh100 {
  width: 100%;
  height: 100%;
}
</style>