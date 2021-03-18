<template>
  <el-dialog :visible.sync="visible" title="编辑菜单" :close-on-click-modal="false">
    <el-form :rules="rules" :model="form" ref="editForm" v-loading="loading">
      <el-row>
        <el-col :span="8">
          <el-form-item label="Pid" label-width="90px" prop="pid">
            <el-input v-model.number="form.pid"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Name" label-width="90px" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Url" label-width="90px" prop="url">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="Icon" label-width="90px" prop="icon">
            <el-input v-model="form.icon"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="HaveChild" label-width="90px" prop="haveChild">
            <el-switch v-model="form.haveChild"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="IsChecked" label-width="90px" prop="isChecked">
            <el-input v-model.number="form.isChecked"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="VueUrl" label-width="90px" prop="vueUrl">
            <el-input v-model="form.vueUrl"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="VueName" label-width="90px" prop="vueName">
            <el-input v-model="form.vueName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8"></el-col>
      </el-row>

      <el-row type="flex" justify="end">
        <el-form-item>
          <el-button type="primary" @click="updateModel">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      form: {},
      rules: {
        pid: [{ required: true, type: "number", message: "请输入数字" }],
        name: [{ required: true, message: "必填" }],
        isChecked: [{ type: "number", message: "请输入数字" }],
      },
      loading: false,
    };
  },
  methods: {
    getModel(id) {
      let that = this;
      that.axios
        .post("Sys_Menu/GetModel", { id: id })
        .then(function (response) {
          that.form = response.data.data;
        });
    },
    cancel() {
      let that = this;
      that.visible = false;
    },
    edit: function (id) {
      let that = this;
      that.getModel(id);
      that.visible = true;
    },
    updateModel() {
      let that = this;
      that.$refs.editForm.validate((valid) => {
        if (valid) {
          that.loading = true;
          that.axios
            .post("Sys_Menu/UpdateModel", that.form)
            .then(function (response) {
              that.loading = false;
              if (response.data.code == 101) {
                that.visible = false;
                that.$parent.getList();
              }
            });
        } else return false;
      });
    },
  },
};
</script>

<style>
</style>