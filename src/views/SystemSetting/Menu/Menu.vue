<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-input v-model="name">
          <template slot="prepend">菜单名称</template>
          <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6" class="operate">
        <el-button-group>
          <el-button type="primary" @click="addData">增加</el-button>
          <el-button type="danger" @click="delData">删除</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table ref="table" :data="tableData" v-loading="tableLoading" :height="tableHeight" @row-dblclick="editData">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="Id" prop="id"></el-table-column>
          <el-table-column label="Pid" prop="pid"></el-table-column>
          <el-table-column label="Name" prop="name"></el-table-column>
          <el-table-column label="Url" prop="url"></el-table-column>
          <el-table-column label="Icon" prop="icon"></el-table-column>
          <el-table-column label="HaveChild" prop="haveChild" :formatter="haveChild_Formatter"></el-table-column>
          <el-table-column label="IsChecked" prop="isChecked"></el-table-column>
          <el-table-column label="VueUrl" prop="vueUrl"></el-table-column>
          <el-table-column label="VueName" prop="vueName"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <add-dialog ref="addDialog"></add-dialog>
    <edit-dialog ref="editDialog"></edit-dialog>
  </div>

</template>
<script>
import AddDialog from "./AddDialog.vue";
import EditDialog from "./EditDialog.vue";

export default {
  components: { AddDialog, EditDialog },
  data() {
    return {
      name: "",
      tableData: null,
      tableLoading: false,
      addVisible: false,
      editVisible: false,
      tableHeight: null,
    };
  },
  methods: {
    getList() {
      let that = this;
      that.tableLoading = true;
      that.axios
        .post("Sys_Menu/GetList", { name: that.name })
        .then(function (response) {
          that.tableLoading = false;
          that.tableData = response.data.data;
        });
    },
    addData() {
      this.$refs.addDialog.add();
    },
    editData(row) {
      let that = this;
      that.$refs.editDialog.edit(row.id);
    },
    delData() {
      let that = this;
      let ids = "";
      if (that.$refs.table.selection.length == 0) {
        that.$alert("请选择记录", { showClose: false });
      } else {
        that
          .$confirm("确定要删除吗？")
          .then(function () {
            that.$refs.table.selection.forEach((element) => {
              ids += element.id + ",";
            });
            that.axios
              .post("Sys_Menu/DelModel", { ids: ids })
              .then(function () {
                that.getList();
              });
          })
          .catch(function () {});
      }
    },
    haveChild_Formatter(v) {
      if (v.haveChild) return "是";
      else return "否";
    },
  },
  mounted() {
    this.tableHeight = this.$parent.$el.offsetHeight - 150;
    this.getList();
  },
};
</script>
<style scoped>
.operate {
  padding-left: 4px;
}
</style>