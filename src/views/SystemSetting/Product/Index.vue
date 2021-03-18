<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-input v-model="productName">
          <template slot="prepend">产品名称</template>
          <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6" class="operate">
        <el-button type="primary" @click="$refs.addDialog.add()">增加</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" v-loading="tableLoading" @row-dblclick="row=>$refs.editDialog.edit(row)">
      <el-table-column prop="productName" label="产品名称"></el-table-column>
      <el-table-column prop="productType" label="产品类型"></el-table-column>
      <el-table-column prop="specification" label="规格型号"></el-table-column>
      <el-table-column prop="hasNumber" label="是否注册" :formatter="(row)=>{if(row.hasNumber){return '是'}else{return '否'}}"></el-table-column>
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
import EditDialog from "../Product/EditDialog.vue";
import AddDialog from "../Product/AddDialog.vue";
export default {
  components: { AddDialog, EditDialog },
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      total: 0,
      productName: "",
      tableData: null,
      tableLoading: false,
    };
  },
  methods: {
    getList() {
      let that = this;
      that.tableLoading = true;
      that.axios
        .post("Product/GetList", {
          pageSize: that.pageSize,
          currentPage: that.currentPage,
          total: that.total,
          productName: that.productName,
        })
        .then(function (response) {
          that.tableLoading = false;
          that.total = response.data.data.total;
          that.tableData = response.data.data.data;
          console.log(response);
        });
    },
    del(row) {
      let that = this;
      that
        .$confirm("确定要删除吗？")
        .then(function () {
          that.axios.post("Product/DelModel", { id: row.id }).then(function () {
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

<style scoped>
.operate {
  padding-left: 4px;
}
</style>