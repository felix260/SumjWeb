<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-input v-model="UserName">
          <el-select slot="prepend" v-model="searchCol" style="width:130px;">
            <el-option value="UserName" label="用户名"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="this.tableData" v-loading="tableLoading">
          <el-table-column label="Id" prop="id"></el-table-column>
          <el-table-column label="用户名称" prop="userName" width="300"></el-table-column>
          <el-table-column label="用户姓名" prop="name"></el-table-column>
          <el-table-column label="OpenId" prop="openId" width="300"></el-table-column>
          <el-table-column label="手机" prop="phone"></el-table-column>
          <el-table-column label="密码" prop="pwd"></el-table-column>
          <el-table-column label="用户类型" prop="userType"></el-table-column>
          <el-table-column label="注册时间" prop="insertTime"></el-table-column>
        </el-table>
        <el-pagination @current-change="getList" background :total="pm_pagination.total" :page-size="pm_pagination.pageSize" :current-page.sync="pm_pagination.currentPage"></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pm_pagination: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      searchCol: "UserName",
      UserName: "",
      tableData: [],
      tableLoading: false,
    };
  },
  methods: {
    getList: function () {
      var that = this;
      that.tableLoading = true;
      this.axios
        .post("Sys_UserInfo/GetList", {
          pm_pagination: that.pm_pagination,
          UserName: that.UserName,
        })
        .then(function (response) {
          if (response) {
            that.tableData = response.data.data.data;
            that.pm_pagination.total = response.data.data.total;
            that.tableLoading = false;
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
  mounted: function () {
    this.getList();
  },
};
</script>
<style scoped>
</style>