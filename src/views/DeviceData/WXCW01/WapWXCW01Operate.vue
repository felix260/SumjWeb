<template>
  <div>
    <el-card class="card" v-loading="loading">
      <van-cell-group class="cellgroup">
        <van-cell title="序列号" :value="serialNumber" />
        <van-cell title="温度返回时间" :value="wxcw01.dataTime" />
        <van-cell title="T1" :value="wxcw01.t1==2500?'-':wxcw01.t1+'℃'" />
        <van-cell title="T2" :value="wxcw01.t2==2500?'-':wxcw01.t2+'℃'" />
        <van-cell title="T3" :value="wxcw01.t3==2500?'-':wxcw01.t3+'℃'" />
        <van-cell title="T4" :value="wxcw01.t4==2500?'-':wxcw01.t4+'℃'" />
        <van-cell title="T5" :value="wxcw01.t5==2500?'-':wxcw01.t5+'℃'" />
        <van-cell title="T6" :value="wxcw01.t6==2500?'-':wxcw01.t6+'℃'" />
        <van-cell title="T7" :value="wxcw01.t7==2500?'-':wxcw01.t7+'℃'" />
        <van-cell title="T8" :value="wxcw01.t8==2500?'-':wxcw01.t8+'℃'" />
        <van-cell title="电量">
          <el-progress :text-inside="true" :stroke-width="23" :percentage="wxcw01.dianLiang" :status="wxcw01.dianLiang>20?'success':'exception'"></el-progress>
        </van-cell>
      </van-cell-group>
    </el-card>
    <van-button class="xuanfu" type="primary" round icon="replay" @click="getLastTemperature"></van-button>
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
      serialNumber: this.$route.query.serialNumber,
      wxcw01: {},
      loading: false,
    };
  },
  methods: {
    getLastTemperature() {
      let that = this;
      that.loading = true;
      that.axios
        .post("WXCW01/GetLastTemperature", {
          serialNumber: that.serialNumber,
        })
        .then(function (response) {
          that.loading = false;
          that.wxcw01 = response.data.data;
        });
    },
  },
  mounted() {
    let that = this;
    document.title = "无线测温仪";
   
    that.getLastTemperature();
  },
};
</script>

<style scoped>
.card {
  background-color: #409eff;
}
.xuanfu {
  position: absolute;
  bottom: 20px;
  left: 15px;
}
</style>