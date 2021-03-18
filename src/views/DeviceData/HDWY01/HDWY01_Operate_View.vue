<template>
  <el-card class="card-hdwy01">
    <ul>
      <li>
        <el-divider></el-divider>
        <div class="item32">
          <div>连接状态</div>
          <div style="color:green" v-if="connectStatus=='已连接'">{{connectStatus}}</div>
          <div style="color:red" v-if="connectStatus=='未连接'">{{connectStatus}}</div>
        </div>
      </li>
      <li>
        <el-divider></el-divider>
        <div class="item32">
          <div>运行状态</div>
          <div style="color:green" v-if="yunXingZhuangTai==1">{{arrYunXingZhuangTai[yunXingZhuangTai]}}</div>
          <div style="color:red" v-if="yunXingZhuangTai==0">{{arrYunXingZhuangTai[yunXingZhuangTai]}}</div>
        </div>
      </li>
      <li>
        <el-divider></el-divider>
        <div class="item32">
          <div>工作模式</div>
          <div>{{arrMoShi[moShi]}}</div>
        </div>
      </li>
      <li>
        <el-divider></el-divider>
        <div class="item32">
          <div>试验编号</div>
          <div>{{shiYanBianHao}}</div>
        </div>
      </li>
      <li v-show="moShi==1">
        <el-divider></el-divider>
        <div class="item32">
          <div>电压设置</div>
          <div>{{dianYaSheZhi}}V</div>
        </div>
      </li>
      <li v-show="moShi==2||moShi==3||moShi==4">
        <el-divider></el-divider>
        <div class="item32">
          <div>电流设置</div>
          <div>{{dianLiuSheZhi}}mA</div>
        </div>
      </li>
      <li v-show="moShi!=1">
        <el-divider></el-divider>
        <div class="item32">
          <div>电压</div>
          <div>{{dianYa}}V</div>
        </div>
      </li>
      <li v-show="moShi==1">
        <el-divider></el-divider>
        <div class="item32">
          <div>电流</div>
          <div>{{dianLiu}}mA</div>
        </div>
      </li>
      <li>
        <el-divider></el-divider>
      </li>
    </ul>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      arrMoShi: ["测量", "恒压", "恒流档位1", "恒流档位2", "恒流档位3"],
      arrYunXingZhuangTai: ["已停止", "运行中"],
    };
  },
  props: [
    "connectStatus",
    "yunXingZhuangTai",
    "moShi",
    "shiYanBianHao",
    "dianYaSheZhi",
    "dianLiuSheZhi",
    "dianYa",
    "dianLiu",
  ],
};
</script>

<style scoped>
.card-hdwy01 {
  background-color: #409eff;
}
.card-hdwy01 ul {
  background-color: white;
  list-style: none;
  padding: 0;
}
.card-hdwy01 ul li {
  margin-left: 20px;
  margin-right: 20px;
  font-weight: bold;
}
.item32 {
  display: flex;
  justify-content: space-between;
}
</style>