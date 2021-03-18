<template>
  <div>
    <el-col :span="12">
      <el-form ref="elform" label-width="100px" :model="formModel" :rules="rules">
        <el-form-item label="设备序列号" prop="serialNumber">
          <el-input v-model="formModel.serialNumber"></el-input>
        </el-form-item>
        <el-form-item label="经销商电话" prop="phone">
          <el-input v-model="formModel.phone"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formModel.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleClick">保存</el-button>
          <el-button @click="$refs.elform.resetFields()">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-tag v-if="tagCode==101" size="medium">{{tagText}}</el-tag>
          <el-tag v-if="tagCode==201" type="danger" size="medium">{{tagText}}</el-tag>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formModel: {
        serialNumber: "",
        phone: "",
        remark: "",
      },
      tagCode: "",
      tagText: "",
      rules: {
        serialNumber: [{ required: true, message: "请输入序列号" }],
        phone: [{ required: true, message: "请输入经销商电话" }],
        remark: [{ required: true, message: "请输入备注" }],
      },
    };
  },
  methods: {
    handleClick() {
      let that = this;
      that.tagCode = "";
      this.$refs.elform.validate((valid) => {
        if (valid) {
          that.axios
            .post("Base_Device/BindDevice", that.formModel)
            .then(function (response) {
              that.tagCode = response.data.code;
              that.tagText = response.data.msg;
            });
        }
      });
    },
  },
};
</script>

<style>
</style>