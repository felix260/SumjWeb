<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-form inline v-model="searchForm">
          <el-form-item label="数据类型">
            <el-select v-model="searchForm.selValue" @change="getList">
              <el-option v-for="item in optionsDataType" :key="item" :value="item">{{item}}</el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="5">
        <el-button-group>
          <el-button type="primary" @click="addData">增加</el-button>
          <el-button type="info" @click="editData">编辑</el-button>
          <el-button type="danger" @click="delData">删除</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-table ref="tbList" v-loading="loading" :data="tableData" highlight-current-row @row-click="rowClick">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="文本" prop="dataText"></el-table-column>
      <el-table-column label="值" prop="dataValue"></el-table-column>
      <el-table-column label="数据类型" prop="dataType"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
      <el-table-column label="创建时间" prop="insertTime"></el-table-column>
      <el-table-column label="创建人" prop="insertUserName"></el-table-column>
      <el-table-column label="最后更新时间" prop="updateTime"></el-table-column>
      <el-table-column label="最后更新人" prop="updateUserName"></el-table-column>
    </el-table>
    <el-pagination @current-change="getList" background :total="total" :page-size="pageSize" :current-page.sync="currentPage"></el-pagination>
    <el-drawer :visible.sync="editDialogVisible" :wrapperClosable="false">
      <el-form ref="editForm" :rules="rules" class="editForm" v-loading="formLoading" :model="editModel" label-width="80px">
        <el-form-item label="文本" prop="dataText">
          <el-input v-model="editModel.dataText"></el-input>
        </el-form-item>
        <el-form-item label="值" prop="dataValue">
          <el-input v-model="editModel.dataValue"></el-input>
        </el-form-item>
        <el-form-item label="数据类型" prop="dataType">
          <el-input v-model="editModel.dataType"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="editModel.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveData">保存</el-button>
          <el-button @click="editDialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      total: 0,
      searchForm: {
        selValue: "",
      },
      optionsDataType: [],
      tableData: [],
      editDialogVisible: false,
      editModel: {
        id: 0,
        dataText: "",
        dataValue: "",
        dataType: "",
        remark: "",
        // InsertTime: "",
        // InsertUserId: "",
        // InsertUserName: "",
        // UpdateTime: "",
        // UpdateUserId: "",
        // UpdateUserName: "",
      },
      formLoading: false,
      loading: false,
      rules: {
        dataText: [
          { required: true, message: "请输入文本", trigger: "change" },
        ],
        dataValue: [{ required: true, message: "请输入值", trigger: "change" }],
        dataType: [
          { required: true, message: "请输入数据类型", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    getList: function () {
      var that = this;
      that.loading = true;
      this.axios
        .post("Base_SystemBaseData/GetList", {
          DataType: that.searchForm.selValue,
          pageSize: that.pageSize,
          currentPage: that.currentPage,
          total: that.total,
        })
        .then(function (response) {
          that.tableData = response.data.data.data;
          that.total = response.data.data.total;
          that.loading = false;
        });
    },
    rowClick: function () {
      //   this.$refs.tbList.clearSelection();
      //   this.$refs.tbList.toggleRowSelection(row);
    },
    addData: function () {
      this.editDialogVisible = true;
      this.editModel = {
        id: 0,
        dataText: "",
        dataValue: "",
        dataType: "",
        remark: "",
      };
    },
    saveData: function () {
      var that = this;
      if (
        that.$refs["editForm"].validate(function (valid) {
          if (valid) {
            that.formLoading = true;
            that.axios
              .post("Base_SystemBaseData/SaveData", that.editModel)
              .then(function (response) {
                if (response.data.code == 101) {
                  that.editDialogVisible = false;
                  that.formLoading = false;
                  that.getList();
                }
              });
          } else return false;
        })
      );
    },
    editData: function () {
      let that = this;
      if (that.$refs["tbList"].selection.length == 0) {
        that.$alert("请选择记录");
      } else {
        that.editModel = that.$refs["tbList"].selection[0];
        that.editDialogVisible = true;
      }
    },
    delData: function () {
      let that = this;
      if (that.$refs["tbList"].selection.length == 0) {
        that.$alert("请选择记录");
      } else {
        that
          .$confirm("确定要删除吗？")
          .then(function () {
            let ids = "";
            that.$refs["tbList"].selection.forEach((element) => {
              ids += element.id + ",";
            });
            that.axios
              .post("Base_SystemBaseData/DelData", { ids: ids })
              .then(function () {
                that.getList();
              });
          })
          .catch(function () {});
        //that.axios.post("Base");
      }
    },
  },

  created: function () {
    //加载数据类型
    var that = this;
    this.axios
      .post("Base_SystemBaseData/getDataType")
      .then(function (response) {
        that.optionsDataType = response.data.data;
        that.searchForm.selValue = response.data.data[0];
        that.getList();
      });
  },
};
</script>

<style scoped>
.editForm {
  padding-left: 20px;
}
</style>
