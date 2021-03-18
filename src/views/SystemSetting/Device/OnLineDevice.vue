<template>
  <div>
    <el-row>
      <el-button type="primary" icon="el-icon-refresh" @click="getList()">刷新</el-button>
    </el-row>
    <el-table :data="tableData" v-loading="tableLoading">
      <el-table-column label="设备类型" prop="DeviceType"></el-table-column>
      <el-table-column label="序列号" prop="SerialNumber"></el-table-column>
      <el-table-column label="最后通讯时间" prop="LastTime"></el-table-column>
      <el-table-column label="出厂日期" prop="DateOfProduction"></el-table-column>
      <el-table-column label="版本号" prop="VersionNumber"></el-table-column>
    </el-table>
  </div>
</template> 

<script>
export default {
  data() {
    return {
      tableData: null,
      tableLoading: false,
    };
  },
  methods: {
    getList() {
      let that = this;
      that.tableLoading = true;
      that.axios.post("Base_Device/GetOnLineDevice").then(function (response) {
        that.tableLoading = false;
        if (response.data.data) {
          that.tableData = JSON.parse(response.data.data);
        } else {
          that.$alert("刷新失败");
        }
      });
    },
  },
  mounted() {
    let that = this;
    that.getList();
  },
};
</script>

<style>
</style>