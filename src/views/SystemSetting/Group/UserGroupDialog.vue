<template>
  <el-dialog :visible.sync="visible" :title="objGroup.groupName">
    <el-row type="flex" justify="center">
      <el-transfer filterable v-model="selectUser" :data="userList" :props="props" :titles="['全部用户','选择用户']"></el-transfer>
    </el-row>
    <template #footer>
      <el-row type="flex" justify="end">
        <el-button type="primary" @click="saveUserGroup">保存</el-button>
        <el-button @click="visible=false">取消</el-button>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      selectUser: [],
      userList: [],
      props: { key: "id", label: "otherName" },
      objGroup: {},
    };
  },
  methods: {
    show(objGroup) {
      let that = this;
      that.loadDialog((that.objGroup = objGroup));
      that.visible = true;
    },
    getUserList() {
      return this.axios({
        url: "Sys_UserInfo/GetAllList",
      });
    },
    getUserGroup(groupId) {
      return this.axios({
        method: "post",
        url: "UserGroup/GetUserGroupByGroupId",
        data: { id: groupId },
      });
    },
    loadDialog(objGroup) {
      let that = this;
      that.axios.all([that.getUserList(), that.getUserGroup(objGroup.id)]).then(
        that.axios.spread(function (response1, response2) {
          that.userList = response1.data.data;
          that.selectUser = response2.data.data;
        })
      );
    },
    saveUserGroup() {
      let that = this;
      that.axios
        .post("UserGroup/SaveUserGroup", {
          groupId: that.objGroup.id,
          list_UserId: that.selectUser,
        })
        .then(function (response) {
          if (response.data.code == 101) {
            that.visible = false;
            that.$alert("保存成功");
          }
        });
    },
  },
  mounted() {},
};
</script>

<style>
</style>