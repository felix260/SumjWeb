<template>
  <el-dialog :title="row.name" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="form" v-loading="loading">
      <el-row>
        <el-col :span="12">
          <el-form-item label="字符串值" prop="str" label-width="100px">
            <el-input v-model="form.str"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="center">
            <el-image :src="imageUrl" fit="fill"></el-image>
          </el-row>

        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-row type="flex" justify="end">
        <el-button type="primary" @click="getQRCode">重新生成</el-button>
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
      loading: false,
      form: { str: "" },
      imageUrl: "",
      row: {},
    };
  },
  methods: {
    show(row) {
      let that = this;
      that.row = row;
      that.form.str = "http://www.bjlcyq.cn/S?s=" + row.serialNumber;
      that.getQRCode();
      that.visible = true;
      console.log(row);
    },
    getQRCode() {
      let that = this;
      that.loading = true;
      that.axios
        .post("QRCode/GetQRCodeImage64", { str: that.form.str })
        .then(function (response) {
          that.loading = false;
          that.imageUrl = "data:image/png;base64," + response.data.data;
        });
    },
  },
};
</script>

<style>
</style>