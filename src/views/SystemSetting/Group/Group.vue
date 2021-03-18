<template>
  <div>
    <el-col :span="12">
      <el-row>
        <el-col :span="12">
          <el-input v-model="name">
            <template slot="prepend">组名称</template>
            <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="12" class="operate">
          <el-button-group>
            <el-button type="primary" @click="add">增加</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-row>
        <el-table v-loading="loading" :data="tableData" highlight-current-row @row-click="handleRowClick" @row-dblclick="edit">
          <el-table-column prop="id" label="Id"></el-table-column>
          <el-table-column prop="groupName" label="组名称"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column label="操作">
            <template #default="scoped">
              <el-button type="primary" size="mini" @click="handleGroupUser(scoped.row)">组管理</el-button>
              <el-button type="danger" size="mini" @click="del(scoped.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @current-change="getList" background :total="total" :page-size="pageSize" :current-page.sync="currentPage"></el-pagination>
      </el-row>
    </el-col>
    <el-col :span="6">
      <div :style="'height:'+height+'px'" class="tree">
        <el-tree ref="tree" node-key="id" :data="treeData" v-loading="treeLoading" :default-expand-all="true" :show-checkbox="true"></el-tree>
      </div>

    </el-col>
    <el-col :span="5" :offset="1">
      <div :style="'height:'+height+'px'" class="tree">
        <el-divider>指定权限管理</el-divider>
        <el-checkbox-group v-model="checkList" v-loading="powerLoading">
          <el-row type="flex" v-for="item in powerList" :key="item.id">
            <el-checkbox :label="item.id">{{item.dataText}}</el-checkbox>
          </el-row>

        </el-checkbox-group>
      </div>
      <el-row type="flex" justify="end">
        <el-button type="primary" @click="SaveALL">保存</el-button>
      </el-row>
    </el-col>

    <add-dialog ref="addDialog"></add-dialog>
    <edit-dialog ref="editDialog"></edit-dialog>
    <user-group-dialog ref="userGroupDialog"></user-group-dialog>
  </div>

</template>

<script>
import AddDialog from "../Group/AddDialog.vue";
import EditDialog from "../Group/EditDialog.vue";
import UserGroupDialog from "./UserGroupDialog.vue";

export default {
  components: { AddDialog, EditDialog, UserGroupDialog },
  data() {
    return {
      name: "",
      loading: false,
      tableData: null,
      pageSize: 10,
      currentPage: 1,
      total: 0,
      treeData: null,
      height: null,
      treeLoading: false,
      currentRow: null,
      checkList: [],
      powerList: [],
      powerLoading: false,
    };
  },
  methods: {
    getList() {
      let that = this;
      that.loading = true;
      that.axios
        .post("Sys_Group/GetList", {
          groupName: that.name,
          pageSize: that.pageSize,
          currentPage: that.currentPage,
          total: that.total,
        })
        .then(function (response) {
          that.loading = false;
          that.total = response.data.data.total;
          that.tableData = response.data.data.data;
        });
    },
    getELTree() {
      let that = this;
      that.treeLoading = true;
      that.axios.post("Sys_Menu/GetELTree").then(function (response) {
        that.treeLoading = false;
        that.treeData = response.data.data;
      });
    },
    add() {
      let that = this;
      that.$refs.addDialog.visible = true;
      if (that.$refs.addDialog.$refs.form) {
        that.$refs.addDialog.$refs.form.resetFields();
      }
    },
    edit(row) {
      let that = this;
      that.$refs.editDialog.edit(row.id);
    },
    del(row) {
      let that = this;
      that
        .$confirm("确定要删除吗？")
        .then(function () {
          that.axios
            .post("Sys_Group/DelModel", { id: row.id })
            .then((response) => {
              if (response.data.code == 101) {
                that.getList();
              }
            });
        })
        .catch(function () {});
    },
    handleRowClick(row) {
      let that = this;
      that.currentRow = row;
      that.treeLoading = true;
      that.powerLoading = true;
      that.axios
        .post("View_GroupMenu/GetMenuId", { groupId: row.id })
        .then(function (response) {
          that.$refs.tree.setCheckedKeys(response.data.data);
          that.treeLoading = false;
        });
      that.axios
        .post("Sys_Group/GetPowerId", { groupId: row.id })
        .then(function (response) {
          that.checkList = response.data.data;
          that.powerLoading = false;
        });
    },
    SaveALL() {
      let that = this;
      if (that.currentRow) {
        let tmpLoading = that.$loading();
        that.axios.all([that.SaveGroupMenu(), that.SavePower()]).then(
          that.axios.spread(function (response1, response2) {
            tmpLoading.close();
            console.log(response1);
            if (response1.data.code == 101 && response2.data.code == 101) {
              that.$alert("保存成功");
            }
          })
        );
      } else {
        that.$alert("请选择组");
      }
    },
    SaveGroupMenu() {
      let that = this;
      return that.axios.post("View_GroupMenu/SaveGroupMenu", {
        groupId: that.currentRow.id,
        list_MenuId: that.$refs.tree.getCheckedKeys(),
      });
    },
    SavePower() {
      let that = this;
      return that.axios.post("Sys_Group/SavePower", {
        groupId: that.currentRow.id,
        checkList: that.checkList,
      });
    },
    handleGroupUser(row) {
      let that = this;
      that.$refs.userGroupDialog.show(row);
    },
    getPower() {
      let that = this;
      that.powerLoading = true;
      that.axios
        .post("Base_SystemBaseData/GetListByDataType", { dataType: "指定权限" })
        .then(function (response) {
          that.powerLoading = false;
          that.powerList = response.data.data;
        });
    },
  },
  mounted() {
    let that = this;
    this.height = this.$parent.$el.offsetHeight - 150;
    that.getList();
    that.getELTree();
    that.getPower();
  },
};
</script>

<style scoped>
.tree {
  overflow-x: hidden;
  overflow-y: auto;
}
.operate {
  padding-left: 4px;
}
</style>