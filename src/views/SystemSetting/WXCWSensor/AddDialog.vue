<template>
  <el-dialog title="增加无线测温仪传感器" :close-on-click-modal="false" :visible.sync="visible">
    <el-form ref="form" :model="form" :rules="rules" v-loading="formLoading">
      <el-form-item label-width="100px" label="序列号" prop="serialNumber">
        <el-input v-model="form.serialNumber" @blur="handleBlur"></el-input>
      </el-form-item>
      <el-form-item label-width="100px" label="温度补偿" prop="temperatureCompensation">
        <el-input v-model.number="form.temperatureCompensation" type="number"></el-input>
      </el-form-item>
      <el-form-item label-width="100px" label="密钥" prop="pwd">
        <el-input v-model="form.pwd" readonly></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-row type="flex" justify="end">
        <el-button type="primary" @click="addModel">保存</el-button>
        <el-button @click="visible=false">关闭</el-button>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    var validateSerialNumber = (rule, value, callback) => {
      if (value && value.length == 16) {
        callback();
      } else {
        callback(new Error("长度必须16"));
      }
    };
    return {
      form: {
        pwd: "",
        serialNumber: "",
        temperatureCompensation: 0.0,
      },
      visible: false,
      rules: {
        serialNumber: [{ validator: validateSerialNumber }],
        temperatureCompensation: [{ type: "number", message: "必须数字" }],
        pwd: [{ required: true, message: "必填" }],
      },
      formLoading: false,
    };
  },
  methods: {
    add() {
      let that = this;
      that.visible = true;
      if (that.$refs.form) {
        that.$refs.form.resetFields();
      }
    },
    addModel() {
      let that = this;
      that.$refs.form.validate((valid) => {
        if (valid) {
          that.formLoading = true;
          that.axios
            .post("WXCW_WXCWSensor/AddModel", that.form)
            .then(function (response) {
              if (response.data.code == 101) {
                that.formLoading = false;
                that.visible = false;
                that.$parent.getList();
              } else if (response.data.code == 201) {
                that.formLoading = false;
                that.$alert(response.data.data);
              }
            });
        } else return false;
      });
    },
    handleBlur() {
      let that = this;
      that.axios
        .post("WXCW_WXCWSensor/GetPWD", {
          serialNumber: that.form.serialNumber,
        })
        .then(function (response) {
          if (response.data.code == 101) {
            that.form.pwd = response.data.data;
          } else {
            that.form.pwd = "";
          }
        });
    },
  },
};
</script>

<style>
</style>