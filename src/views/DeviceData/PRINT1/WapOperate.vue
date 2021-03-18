<template>
  <div>
    <el-card class="card">
      <el-alert v-if="deviceData32==0" title="设备未连接" center type="error" :closable="false">
      </el-alert>
      <van-cell-group class="cellgroup">
        <van-cell title="序列号" :value="serialNumber" />
        <van-cell title="当前时间" :value="moment().format('yyyy-MM-DD HH:mm:ss')" />
        <van-cell title="设备状态" :value="deviceData32.PRINT1_ZhuangTai!=null?arr_PRINT1_ZhuangTai[deviceData32.PRINT1_ZhuangTai]:'-'" />
      </van-cell-group>
    </el-card>
    <el-row type="flex" :gutter="20">
      <el-col :span="12">
        <van-button type="primary" block @click="print">打印</van-button>
      </el-col>
      <el-col :span="12">
        <van-button type="info" block @click="handleUpgrade">升级</van-button>
      </el-col>
    </el-row>

    <van-popup v-model="popupVisible" position="bottom">
      <van-picker title="选择类型" show-toolbar value-key="dataText" :columns="columns" @confirm="handleConfirm" @cancel="handleCancel" />
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css";
import moment from "moment";

Vue.use(Vant);
export default {
  data() {
    return {
      serialNumber: null,
      arr_PRINT1_ZhuangTai: ["空闲", "忙碌", "-"],
      deviceData32: 0,
      moment: moment,
      popupVisible: false,
      columns: [],
    };
  },
  methods: {
    initWebSocket() {
      const wsuri = process.env.VUE_APP_WebSocketURL;
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      let that = this;
      that.websocketsend(
        JSON.stringify({
          deviceType: "PRINT1",
          serialNumber: that.serialNumber,
          command: "32",
        })
      );
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      let that = this;
      //数据接收
      if (e.data != 0) {
        that.deviceData32 = JSON.parse(e.data);
      } else {
        that.deviceData32 = e.data;
      }

      setTimeout(() => {
        this.websocketsend(
          JSON.stringify({
            deviceType: "PRINT1",
            serialNumber: that.serialNumber,
            command: "32",
          })
        );
      }, 200);
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
    },
    print() {
      let that = this;
      that.popupVisible = true;
    },
    handleCancel() {
      this.popupVisible = false;
    },
    handleConfirm(obj) {
      let that = this;
      that.axios
        .post("PRINT1/CreateSignNumber", {
          signType: parseInt(obj.dataValue),
        })
        .then(function (response) {
          that.popupVisible = false;
          that.websocketsend(
            JSON.stringify({
              deviceType: "PRINT1",
              serialNumber: that.serialNumber,
              command: "33",
              data: "http://www.bjlcyq.cn/S?t=" + response.data.data,
            })
          );
          console.log(response);
        });
    },
    handleUpgrade() {
      let that = this;
      that.$dialog
        .confirm({
          title: "提示",
          message: "确定要升级吗？",
        })
        .then(() => {
          that.websocketsend(
            JSON.stringify({
              deviceType: "PRINT1",
              serialNumber: that.serialNumber,
              command: "47",
            })
          );
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  mounted() {
    let that = this;
    document.title = "云打印机操作";
    that.serialNumber = that.$route.query.serialNumber;
    that.initWebSocket();
    that.axios
      .post("Base_SystemBaseData/GetListByDataType", {
        dataType: "云打印机打印类型",
      })
      .then(function (response) {
        that.columns = response.data.data;
      });
  },
};
</script>

<style>
.card {
  background-color: #409eff;
}
.cellgroup {
  margin-top: 5px;
}
</style>