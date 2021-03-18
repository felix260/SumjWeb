<template>
  <div>
    <el-row>
      <el-col :span="10">
        <el-input v-model="serialNumber">
          <template slot="prepend">序列号或者产品类型</template>
          <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2" class="operate">
        <el-button type="primary" @click="$refs.addDialog.add()">增加</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" v-loading="tableLoading" @row-dblclick="row=>$refs.editDialog.edit(row)">
      <el-table-column prop="name" label="产品名称"></el-table-column>
      <el-table-column prop="deviceType" label="产品类型"></el-table-column>
      <el-table-column prop="serialNumber" label="序列号"></el-table-column>
      <el-table-column prop="edition" label="版本"></el-table-column>
      <el-table-column prop="dateOfProduction" label="出厂日期"></el-table-column>
      <el-table-column prop="pwd" label="密钥"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-popover></el-popover>
          <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
          <el-button type="primary" size="mini" @click="showQRCode(scope.row)">生成二维码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="getList" background :total="total" :page-size="pageSize" :current-page.sync="currentPage"></el-pagination>
    <add-dialog ref="addDialog"></add-dialog>
    <edit-dialog ref="editDialog"></edit-dialog>
    <q-r-code-dialog ref="qrCodeDialog"></q-r-code-dialog>
  </div>
</template>

<script>
import AddDialog from "../Device/AddDialog.vue";
import EditDialog from "../Device/EditDialog.vue";
import QRCodeDialog from "../Device/QRCodeDialog.vue";
export default {
  components: { AddDialog, EditDialog, QRCodeDialog },
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      total: 0,
      serialNumber: "",
      tableLoading: false,
      tableData: null,
    };
  },
  methods: {
    getList() {
      let that = this;
      that.tableLoading = true;
      that.axios
        .post("Base_Device/GetList", {
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
    del(row) {
      let that = this;
      that
        .$confirm("确定要删除吗？")
        .then(function () {
          that.axios
            .post("Base_Device/DelModel", { id: row.id })
            .then(function () {
              that.getList();
            });
        })
        .catch(function () {});
    },
    showQRCode(row) {
      let that = this;
      that.$refs.qrCodeDialog.show(row);
    },
  },
  mounted() {
    let that = this;
    that.getList();
  },
};
</script>

<style scoped>
.operate {
  padding-left: 4px;
}
</style>