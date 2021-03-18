<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="9">
        <el-input v-model="serialNumber">
          <template slot="prepend">传感器序列号</template>
          <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="$refs.addDialog.add()">增加</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" v-loading="tableLoading" @row-dblclick="handleRowDblClick">
      <el-table-column prop="serialNumber" label="序列号"></el-table-column>
      <el-table-column prop="temperatureCompensation" label="温度补偿"></el-table-column>
      <el-table-column prop="pwd" label="密钥" :formatter="pwdFormatter"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-popover></el-popover>
          <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="getList" background :total="total" :page-size="pageSize" :current-page.sync="currentPage"></el-pagination>
    <add-dialog ref="addDialog"></add-dialog>
    <edit-dialog ref="editDialog"></edit-dialog>
  </div>
</template> 

<script>
import util from "@/util/util";
import AddDialog from "./AddDialog";
import EditDialog from "./EditDialog";

export default {
  components: { AddDialog, EditDialog },
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      total: 0,
      tableData: null,
      serialNumber: "",
      tableLoading: false,
    };
  },
  methods: {
    getList() {
      let that = this;
      that.tableLoading = true;
      that.axios
        .post("WXCW_WXCWSensor/GetList", {
          serialNumber: that.serialNumber,
          pageSize: that.pageSize,
          currentPage: that.currentPage,
          total: that.total,
        })
        .then(function (response) {
          that.tableLoading = false;
          that.total = response.data.data.total;
          that.tableData = response.data.data.data;
        });
    },
    pwdFormatter: function (row) {
      return util.prefixInteger(row.pwd, 8);
    },
    handleRowDblClick(row) {
      let that = this;
      that.$refs.editDialog.edit(row);
    },
    del(row) {
      let that = this;
      that
        .$confirm("确定要删除吗？")
        .then(function () {
          that.axios
            .post("WXCW_WXCWSensor/DelModel", { id: row.id })
            .then(function () {
              that.getList();
            });
        })
        .catch(function () {});
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