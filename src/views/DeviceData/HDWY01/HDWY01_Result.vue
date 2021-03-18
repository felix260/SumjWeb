<template>
  <div>
    <el-row>
      <el-col>
        <el-form>
          <el-form-item label="日期选择">
            <el-date-picker v-model="kaiShiShiJian" @change="currentPage=1;getGroupList();"></el-date-picker>
          </el-form-item>
        </el-form>
        <el-col :span="12">
          <el-table :data="tableData" v-loading="tableLoading" highlight-current-row @row-click="getGroupDetail">
            <el-table-column label="序列号" prop="serialNumber"></el-table-column>
            <el-table-column label="试验时间" prop="kaiShiShiJian"></el-table-column>
            <el-table-column label="试验编号" prop="shiYanBianHao"></el-table-column>
            <el-table-column label="工作模式" prop="moShi" :formatter="(row)=>{return moShi_Text[row.moShi]}"></el-table-column>
          </el-table>
          <el-pagination @current-change="getGroupList" background :total="total" :page-size="pageSize" :current-page.sync="currentPage"></el-pagination>
        </el-col>
        <el-col :span="12">
          <div id="HDWY01_Charts"></div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from "moment";
import HighCharts from "highcharts";
export default {
  data() {
    return {
      moShi_Text: ["测量", "恒压", "恒流档位1", "恒流档位2", "恒流档位3"],
      pageSize: 10,
      total: 0,
      currentPage: 1,
      tableData: [],
      tableLoading: false,
      kaiShiShiJian: new Date(),
      chartData: [],
      label1: "电压",
      label2: "V",
    };
  },
  methods: {
    getGroupList: function () {
      let that = this;
      that.tableLoading = true;
      this.axios
        .post("HDWY01/GetGroupList", {
          pageSize: that.pageSize,
          total: that.total,
          currentPage: that.currentPage,
          kaiShiShiJian: that.kaiShiShiJian,
        })
        .then(function (response) {
          if (response) {
            that.tableData = response.data.data.data;
            that.total = response.data.data.total;
            that.tableLoading = false;
          }
        })
        .catch(function () {});
    },
    getGroupDetail(row) {
      let that = this;
      that.axios
        .post("HDWY01/GetGroupDetail", row)
        .then(function (response) {
          let tmpChartData = [];

          if (row.moShi == 1) {
            response.data.data.forEach((element) => {
              tmpChartData.push([
                moment(element.jiLuShiJian).valueOf(),
                element.dianLiu,
              ]);
            });
            that.label1 = "电流";
            that.label2 = "mA";
          } else {
            response.data.data.forEach((element) => {
              tmpChartData.push([
                moment(element.jiLuShiJian).valueOf(),
                element.dianYa,
              ]);
            });
            that.label1 = "电压";
            that.label2 = "V";
          }
          that.chartData = tmpChartData;
          that.loadChart();
        });
    },
    loadChart() {
      let that = this;
      HighCharts.chart("HDWY01_Charts", {
        lang: {
          viewFullscreen: "全屏",
          printChart: "打印图表",
          downloadJPEG: "导出 JPEG",
          downloadPDF: "导出 PDF",
          downloadPNG: "导出 PNG",
          downloadSVG: "导出 SVG",
        },
        title: {
          text: that.label1 + "图",
        },
        tooltip: {
          formatter: function () {
            return (
              that.label1 +
              "：" +
              this.y +
              that.label2 +
              "<br />时间：" +
              moment(this.x).format("YYYY-MM-DD HH:mm:ss")
            );
          },
        },
        xAxis: {
          title: {
            text: "时间",
          },
          type: "datetime",
          dateTimeLabelFormats: {
            millisecond: "%H:%M:%S.%L",
            second: "%H:%M:%S",
            minute: "%H:%M",
            hour: "%H:%M",
            day: "%m-%d",
            week: "%m-%d",
            month: "%Y-%m",
            year: "%Y",
          },
        },
        yAxis: {
          title: {
            text: that.label1 + "(" + that.label2 + ")",
          },
        },
        series: [
          {
            name: that.label1 + "/时间",
            data: that.chartData,
          },
        ],
        credits: {
          enabled: false,
        },
      });
    },
  },
  mounted() {
    this.getGroupList();
  },
};
</script>

<style scoped>
</style>