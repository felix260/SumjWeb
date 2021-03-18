<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-upload ref="GJXSUpload" multiple :action="uploadUrl" :on-change="handleChange" :before-upload="handleBeforeUpload" :on-preview="handlePreview" :before-remove="handleBeforeRemove" :on-success="handSuccess" accept=".dat" :file-list.sync="fileList">
          <el-button type="primary">选择DAT文件</el-button>
        </el-upload>
      </el-col>
      <el-col :span="16">
        <el-tabs ref="tab" v-model="selectTab" @tab-click="handleTabClick" :stretch="true">
          <el-tab-pane label="DAT数据" name="tabDat">
            <el-table :data="tableList.slice((pm_pagination.currentPage-1)*pm_pagination.pageSize,(pm_pagination.currentPage-1)*pm_pagination.pageSize+pm_pagination.pageSize)">
              <el-table-column :label="currentFileName" align="center">
                <el-table-column label="时间" prop="recodeTime" width="160" :formatter="recodeTime_Formatter"></el-table-column>
                <el-table-column label="试验编号" prop="briquetteNumber" align="right"></el-table-column>
                <el-table-column label="测量模式" prop="selectSystemMode" :formatter="selectSystemMode_Formatter"></el-table-column>
                <el-table-column label="电压设置" v-if="selectSystemMode==1" :formatter="setVoltage_Formatter" prop="setVoltage" align="right"></el-table-column>
                <el-table-column label="电流设置" v-if="selectSystemMode==2" :formatter="setElectricCurrent_Formatter" prop="setElectricCurrent" align="right"></el-table-column>
                <el-table-column label="设置电流档位" v-if="selectSystemMode==2" prop="setElectricCurrentGear" :formatter="setElectricCurrentGear_Formatter"></el-table-column>
                <el-table-column label="记录间隔时间" prop="recodeIntervalTime" align="right"></el-table-column>
                <el-table-column label="电压" v-if="selectSystemMode!=1" prop="voltage" align="right"></el-table-column>
                <el-table-column label="电流" v-if="selectSystemMode==1" prop="electricCurrent" align="right"></el-table-column>
                <!-- <el-table-column label="CRC16" prop="gwv_CRC16"></el-table-column> -->
              </el-table-column>
            </el-table>
            <el-pagination background :total="pm_pagination.total" :page-size="pm_pagination.pageSize" :current-page.sync="pm_pagination.currentPage"></el-pagination>
          </el-tab-pane>
          <el-tab-pane label="电压图" v-if="selectSystemMode!=1" name="tabDianYa">
            <div id="Echart_GJXS_DianYa"></div>
          </el-tab-pane>
          <el-tab-pane label="电流图" v-if="selectSystemMode==1" name="tabDianLiu">
            <div id="Echart_GJXS_DianLiu"></div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from "moment";
import HighCharts from "highcharts";
import Exporting from "highcharts/modules/exporting";

export default {
  data() {
    return {
      pm_pagination: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      },
      moShi_Text: ["测量", "恒压", "恒流档位1", "恒流档位2", "恒流档位3"],
      uploadUrl: process.env.VUE_APP_BaseUrl + "HDWY01/LoadData",
      fileList: [],
      tableList: [],
      currentFileName: "",
      selectTab: "tabDat",
      selectSystemMode: 0,
    };
  },
  methods: {
    handleTabClick: function (tab) {
      if (tab.name == "tabDianYa") {
        //把数据拼接成HighCharts的数据格式
        let data = [];
        this.tableList.forEach((obj) => {
          data.push([obj.recodeTime, obj.voltage]);
        });
        this.loadDianYa(data);
      } else if (tab.name == "tabDianLiu") {
        //把数据拼接成HighCharts的数据格式
        let data = [];
        this.tableList.forEach((obj) => {
          data.push([obj.recodeTime, obj.electricCurrent]);
        });
        this.loadDianLiu(data);
      }
    },
    handleChange: function () {},
    handleBeforeUpload: function (file) {
      var existFile = this.fileList.find((f) => f.name == file.name);
      if (existFile) {
        this.$message.warning("存在相同的文件");
        return false;
      }
      this.fileList.push(file);
    },
    handleBeforeRemove: function (file, fileList) {
      this.fileList.splice(fileList.indexOf(file), 1);
    },
    handSuccess: function (response, file) {
      this.tableList = response.data;
      this.pm_pagination.total = response.data.length;
      this.currentFileName = file.name;
      this.selectTab = "tabDat";
      this.selectSystemMode = response.data[0].selectSystemMode;
    },
    handlePreview: function (file) {
      this.tableList = file.response.data;
      this.pm_pagination.total = file.response.data.length;
      this.currentFileName = file.name;
      this.selectTab = "tabDat";
      this.selectSystemMode = file.response.data[0].selectSystemMode;
    },
    setVoltage_Formatter: function (row) {
      return row.setVoltage.toFixed(3);
    },
    setElectricCurrent_Formatter: function (row) {
      return row.setElectricCurrent.toFixed(3 - row.setElectricCurrentGear);
    },
    selectSystemMode_Formatter(row) {
      return this.moShi_Text[row.selectSystemMode];
    },
    setElectricCurrentGear_Formatter(row) {
      if (row.setElectricCurrentGear == 0) {
        return "3位小数";
      } else if (row.setElectricCurrentGear == 1) {
        return "2位小数";
      } else {
        return "1位小数";
      }
    },
    recodeTime_Formatter(row) {
      return moment(row.recodeTime).format("YYYY-MM-DD HH:mm:ss");
    },
    loadDianYa(data) {
      HighCharts.chart("Echart_GJXS_DianYa", {
        lang: {
          viewFullscreen: "全屏",
          printChart: "打印图表",
          downloadJPEG: "导出 JPEG",
          downloadPDF: "导出 PDF",
          downloadPNG: "导出 PNG",
          downloadSVG: "导出 SVG",
        },
        title: {
          text: "电压图",
        },
        tooltip: {
          formatter: function () {
            return (
              "电压：" +
              this.y +
              "V<br />时间：" +
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
            text: "电压(V)",
          },
        },
        series: [
          {
            name: "电压/时间",
            data: data,
          },
        ],
        credits: {
          enabled: false,
        },
      });
    },
    loadDianLiu: function (data) {
      HighCharts.chart("Echart_GJXS_DianLiu", {
        lang: {
          viewFullscreen: "全屏",
          printChart: "打印图表",
          downloadJPEG: "导出 JPEG",
          downloadPDF: "导出 PDF",
          downloadPNG: "导出 PNG",
          downloadSVG: "导出 SVG",
        },
        title: {
          text: "电流图",
        },
        tooltip: {
          formatter: function () {
            return (
              "电流：" +
              this.y +
              "mA<br />时间：" +
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
            text: "电流(mA)",
          },
        },
        series: [
          {
            name: "电流/时间",
            data: data,
          },
        ],
        credits: {
          enabled: false,
        },
      });
    },
  },
  mounted() {
    Exporting(HighCharts);
  },
};
</script>

<style scoped>
</style>

