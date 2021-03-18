<template>
  <el-dialog title="增加序列号" :visible.sync="visible" :close-on-click-modal="false">
    <el-form v-loading="formLoading" :model="form" ref="form" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="产品名称" label-width="100px" prop="name">
            <el-select v-model="form.name" filterable @change="handleChange" value-key="id">
              <el-option v-for="item in list_Product" :key="item.id" :label="item.productName" :value="item">
                <el-row type="flex" justify="space-between">
                  <span>{{item.productName}}</span>
                  <span>{{item.productType}}</span>
                </el-row>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="序列号" label-width="100px" prop="serialNumber">
            <el-input v-model="form.serialNumber" @blur="handleBlur">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="出厂日期" label-width="100px" prop="dateOfProduction">
            <el-date-picker v-model="form.dateOfProduction" placeholder="请选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="版本" label-width="100px" prop="edition">
            <el-input v-model="form.edition"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="过期天数" label-width="100px" prop="expiresDay">
            <el-input v-model.number="form.expiresDay"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注" label-width="100px" prop="remark">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="密钥" label-width="100px" prop="pwd">
            <el-input v-model="form.pwd"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12"></el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-row type="flex" justify="end">
        <el-button type="primary" @click="addModel">保存</el-button>
        <el-button @click="visible=false">取消</el-button>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      form: {
        expiresDay: 365,
        pwd: "",
        edition: "V1.0",
        dateOfProduction: new Date(),
      },
      visible: false,
      formLoading: false,
      list_Product: [],
      rules: {
        name: [{ required: true, message: "必填" }],
        serialNumber: [{ required: true, message: "必填" }],
        dateOfProduction: [{ required: true, message: "必填" }],
        edition: [{ required: true, message: "必填" }],
        expiresDay: [{ type: "number", required: true, message: "请输入数字" }],
      },
    };
  },
  methods: {
    add() {
      let that = this;
      that.visible = true;
      if (that.$refs.form) {
        that.$refs.form.resetFields();
      }
      that.axios.all([that.getProductList()]).then(
        that.axios.spread(function (response1) {
          that.list_Product = response1.data.data;
        })
      );
    },
    addModel() {
      let that = this;
      that.$refs.form.validate((valid) => {
        if (valid) {
          that.formLoading = true;
          that.axios.post("Base_Device/AddModel", that.form).then(function () {
            that.formLoading = that.visible = false;
            that.$parent.getList();
          });
        } else return false;
      });
    },
    getProductList() {
      let that = this;
      return that.axios.get("Product/GetAll");
    },
    handleChange(v) {
      let that = this;
      that.form.deviceType = v.productType;
      that.form.name = v.productName;
    },
    handleBlur() {
      let that = this;
      that.axios
        .post("Base_Device/GetPWD", {
          serialNumber: that.form.serialNumber,
          productName: that.form.name,
        })
        .then(function (response) {
          that.form.pwd = response.data.data;
        });
    },
  },
  mounted() {},
};
</script>

<style>
</style>