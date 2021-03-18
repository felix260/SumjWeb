<template>
  <el-dialog :visible.sync="visible" title="编辑产品" :close-on-click-modal="false">
    <el-form ref="form" :model="form" v-loading="formLoading" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="产品名称" label-width="100px" prop="productName">
            <el-input v-model="form.productName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产品类型" label-width="100px" prop="productType">
            <el-select v-model="form.productType">
              <el-option v-for="item in list_ProductType" :key="item.dataValue" :value="item.dataValue"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="规格型号" label-width="100px" prop="specification">
            <el-input v-model="form.specification"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位" label-width="100px" prop="unit">
            <el-input v-model="form.unit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="单位价格" label-width="100px" prop="unitPrice">
            <el-input v-model.number="form.unitPrice"></el-input>
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
          <el-form-item label="试验类型" label-width="100px" prop="examinationType">
            <el-input v-model="form.examinationType"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否注册" label-width="100px" prop="hasNumber">
            <el-switch v-model="form.hasNumber">
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-row type="flex" justify="end">
        <el-button type="primary" @click="updateModel">保存</el-button>
        <el-button @click="visible=false">取消</el-button>
      </el-row>
    </template>
  </el-dialog>

</template>

<script>
export default {
  data() {
    return {
      visible: false,
      formLoading: false,
      form: {},
      rules: {
        productName: [{ required: true, message: "必填" }],
        productType: [{ required: true, message: "必填" }],
        unitPrice: [{ required: true, type: "number", message: "请输入数字" }],
      },
      list_ProductType: [],
    };
  },
  methods: {
    edit(row) {
      let that = this;
      that.visible = true;
      that.formLoading = true;
      that.axios.all([that.getProductTypeList(), that.getModel(row.id)]).then(
        that.axios.spread(function (response1, response2) {
          that.formLoading = false;
          that.list_ProductType = response1.data.data;
          that.form = response2.data.data;
        })
      );
    },
    updateModel() {
      let that = this;
      that.$refs.form.validate((valid) => {
        if (valid) {
          that.formLoading = true;
          that.axios
            .post("Product/UpdateModel", that.form)
            .then(function (response) {
              that.formLoading = false;
              if (response.data.code == 101) {
                that.visible = false;
                that.$parent.getList();
              }
            });
        } else return false;
      });
    },
    getProductTypeList() {
      let that = this;
      return that.axios.post("Base_SystemBaseData/GetListByDataType", {
        dataType: "设备类型",
      });
    },
    getModel(id) {
      let that = this;
      return that.axios.post("Product/GetModel", { id: id });
    },
  },
};
</script>

<style>
</style>