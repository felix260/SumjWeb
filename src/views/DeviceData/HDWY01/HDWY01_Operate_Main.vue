<template>
  <div>
    <el-form>
      <el-form-item label="选择设备">
        <el-radio-group v-model="selectDevice" @change="handleChange">
          <el-radio-button v-for="(value,key) in myHDWY01List" :key="key" @click="hanldeClick" :label="value.serialNumber"></el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <HDWY01_Operate :serialNumber="selectDevice"></HDWY01_Operate>
  </div>
</template>

<script>
import HDWY01_Operate from "../HDWY01/HDWY01_Operate";
export default {
  components: { HDWY01_Operate },
  data() {
    return {
      myHDWY01List: [],
      menuHeight: 0,
      selectDevice: this.$route.query.serialNumber,
    };
  },
  methods: {
    handleChange(serialNumber) {
      this.$router.push({
        name: "HDWY01_Operate_Main",
        query: { serialNumber: serialNumber },
      });
    },
    hanldeClick(e) {
      console.log(e);
    },
  },
  watch: {
    $route(to) {
      this.selectDevice = to.query.serialNumber;
    },
  },
  computed: {
    // selectDevice: function () {
    //   return this.$route.query.serialNumber;
    // },
  },
  mounted() {
    let that = this;
    this.axios
      .post("HDWY01/GetMyDevice", {
        deviceType: "HDWY01",
      })
      .then(function (response) {
        that.myHDWY01List = response.data.data;
      });
    this.menuHeight = this.$parent.$el.offsetHeight - 100;
  },
};
</script>

<style>
</style>