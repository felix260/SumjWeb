<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-select v-model="selectMoShi" @change="handleChange" placeholder="请选择工作模式">
          <el-option v-for="(value,key) in arrMoShi" :key="key" :label="value" :value="key"></el-option>
        </el-select>
      </el-col>
      <el-col :span="12" v-if="moShi==1" placeholder="电压设置">
        <el-input v-model="dianYaSheZhi1">
          <el-button slot="append" type="primary" icon="el-icon-upload" @click="handleClick_DianYa"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12" v-if="moShi==2||moShi==3||moShi==4">
        <el-input v-model="dianLiuSheZhi1" placeholder="电流设置">
          <el-button slot="append" type="primary" icon="el-icon-upload" @click="handleClick_DianLiu"></el-button>
        </el-input>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center">
      <el-radio-group v-model="caoZuo" @change="handleCaoZuoChange">
        <el-radio-button label="1">开始</el-radio-button>
        <el-radio-button label="0">停止</el-radio-button>
      </el-radio-group>
    </el-row>

    <el-row>
      <el-col>
        <hdwy01_chart_view :shiYanBianHao="shiYanBianHao" :moShi="moShi" :yunXingZhuangTai="yunXingZhuangTai" :connectStatus="connectStatus" :dianYaSheZhi="dianYaSheZhi" :dianLiuSheZhi="dianLiuSheZhi" :dianYa="dianYa" :dianLiu="dianLiu"> </hdwy01_chart_view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import hdwy01_chart_view from "../HDWY01/HDWY01_Operate_View";
export default {
  components: { hdwy01_chart_view },
  data() {
    return {
      serialNumber: this.$route.query.serialNumber,
      arrMoShi: ["测量", "恒压", "恒流档位1", "恒流档位2", "恒流档位3"],
      websock: null,
      shiYanBianHao: 0,
      moShi: 0,
      dianYaSheZhi: "-",
      dianLiuDangWei: "-",
      dianLiuSheZhi: "-",
      dianYa: "-",
      dianLiu: "-",
      yunXingZhuangTai: 0,
      selectMoShi: "",
      dianYaSheZhi1: "",
      dianLiuSheZhi1: "",
      connectStatus: "未连接",
      caoZuo: "",
    };
  },
  created() {
    this.initWebSocket();
  },
  destroyed() {
    //this.websock.close();
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
      this.websocketsend(
        JSON.stringify({
          deviceType: "HDWY01",
          serialNumber: this.serialNumber,
          command: "32",
        })
      );
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      if (e.data == "0") {
        this.connectStatus = "未连接";
        this.shiYanBianHao = this.dianYaSheZhi = this.dianLiuDangWei = this.dianLiuSheZhi = this.dianLiuSheZhi = this.dianLiu = this.moShi =
          "";
        this.yunXingZhuangTai = 0;
      } else {
        this.connectStatus = "已连接";
        let tmpObj = JSON.parse(e.data);
        this.shiYanBianHao = tmpObj.ShiYanBianHao;
        this.moShi = tmpObj.MoShi;
        this.dianYaSheZhi = tmpObj.DianYaSheZhi;
        this.dianLiuDangWei = tmpObj.DianLiuDangWei;
        this.dianLiuSheZhi = tmpObj.DianLiuSheZhi;
        this.dianYa = tmpObj.DianYa;
        this.dianLiu = tmpObj.DianLiu;
        this.yunXingZhuangTai = tmpObj.YunXingZhuangTai;
      }
      setTimeout(() => {
        this.websocketsend(
          JSON.stringify({
            deviceType: "HDWY01",
            serialNumber: this.serialNumber,
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
    handleChange(moShi) {
      var that = this;
      console.log(moShi);
      this.websocketsend(
        JSON.stringify({
          deviceType: "HDWY01",
          serialNumber: that.serialNumber,
          command: "33",
          data: moShi,
        })
      );
    },
    handleClick_DianYa() {
      this.websocketsend(
        JSON.stringify({
          deviceType: "HDWY01",
          serialNumber: this.serialNumber,
          command: "34",
          data: this.dianYaSheZhi1,
        })
      );
    },
    handleClick_DianLiu() {
      this.websocketsend(
        JSON.stringify({
          deviceType: "HDWY01",
          serialNumber: this.serialNumber,
          command: "35",
          data: this.dianLiuSheZhi1,
        })
      );
    },
    handleCaoZuoChange(v) {
      if (v == 1) {
        this.websocketsend(
          JSON.stringify({
            deviceType: "HDWY01",
            serialNumber: this.serialNumber,
            command: "36",
          })
        );
      } else if (v == 0) {
        this.websocketsend(
          JSON.stringify({
            deviceType: "HDWY01",
            serialNumber: this.serialNumber,
            command: "37",
          })
        );
      }
    },
  },
  mounted() {
    document.title = "恒电位恒电流";
    document.getElementsByName("viewport")[0].content =
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0";
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 2px;
}
</style>