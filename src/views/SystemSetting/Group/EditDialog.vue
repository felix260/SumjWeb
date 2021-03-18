<template>
  <el-dialog :visible.sync="visible" title="增加组" v-loading="loading" :close-on-click-modal="false">
    <el-form :rules="rules" :model="form" ref="form">
      <el-form-item label="组名称" label-width="100px" prop="groupName">
        <el-input v-model="form.groupName"></el-input>
      </el-form-item>
      <el-form-item label="备注" label-width="100px">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
      <el-row type="flex" justify="end">
        <el-button type="primary" @click="updateModel">保存</el-button>
        <el-button @click="visible=false">取消</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      visible: false,
      form: {},
      rules: { groupName: [{ required: true, message: "必填" }] },
    };
  },
  methods: {
    updateModel() {
      let that = this;
      that.$refs.form.validate((valid) => {
        if (valid) {
          that.loading = true;
          that.axios
            .post("Sys_Group/UpdateModel", that.form)
            .then(function (response) {
              if (response.data.code == 101) {
                that.visible = that.loading = false;
                that.$parent.getList();
              }
            });
        } else return false;
      });
    },
    getModel(id) {
      let that = this;
      that.axios
        .post("Sys_Group/GetModel", { id: id })
        .then(function (response) {
          that.form = response.data.data;
        });
    },
    edit(id) {
      let that = this;
      that.getModel(id);
      that.visible = true;
    },
  },
};
</script>

<style>
</style>