<template>
  <div>
    <div v-if="hasPower!=null&&hasPower" v-loading="loading">
      <van-cell-group title="注册机">
        <van-field label="产品名称" is-link readonly v-model="selectProduct.productName" @click="handleClick" input-align="right"></van-field>
        <van-field label="序列号" v-model="serialNumber" input-align="right"></van-field>
      </van-cell-group>
      <van-divider />
      <van-button type="info" block @click="handleClickRegister">注册</van-button>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker :columns="columns" show-toolbar @cancel="showPicker=false" @confirm="handleConfirm" value-key="productName"></van-picker>
      </van-popup>
      <van-divider />
      <el-alert v-if="responseCode==101" :title="responseData" center type="success" :closable="false">
      </el-alert>
      <el-alert v-else-if="responseCode==201" :title="responseData" center type="error" :closable="false">
      </el-alert>
    </div>
    <el-alert v-else-if="hasPower!=null&&!hasPower" class="sumjcenter1" title="无权限" center type="warning" :closable="false">
    </el-alert>
  </div>
</template>

<script>
import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);

export default {
  data() {
    return {
      selectProduct: {},
      showPicker: false,
      columns: [],
      loading: false,
      serialNumber: "",
      responseCode: "",
      responseData: "",
      hasPower: null,
    };
  },
  methods: {
    getProduct() {},
    handleClick() {
      let that = this;
      that.showPicker = true;
    },
    handleConfirm(obj) {
      let that = this;
      that.selectProduct = obj;
      that.showPicker = false;
    },
    handleClickRegister() {
      let that = this;
      that.loading = true;
      that.responseCode = "";
      that.axios
        .post("Base_Device/Register", {
          productName: that.selectProduct.productName,
          serialNumber: that.serialNumber,
          deviceType: that.selectProduct.productType,
        })
        .then(function (response) {
          that.loading = false;
          that.responseCode = response.data.code;
          that.responseData = response.data.data;
        });
    },
  },
  mounted() {
    let that = this;
    document.title = "注册机";
    //获取权限
    that.axios
      .post("Base/HasPower", { powerKey: "SerialNumberRegister" })
      .then(function (response) {
        that.hasPower = response.data.data;
      });
    that.axios.get("Product/GetHasNumber").then(function (response) {
      that.columns = response.data.data;
    });
  },
};
</script>

<style scoped>
.sumjcenter1 {
  margin-top: 50%;
}
</style>
