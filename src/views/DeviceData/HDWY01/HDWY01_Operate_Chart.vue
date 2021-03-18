<template>
  <div id="hdwy01_chart_operate"></div>
</template>

<script>
import HighCharts from "highcharts";
import moment from "moment";
import dark from "highcharts/themes/dark-unica";
import exportHighChart from "highcharts/modules/exporting";
exportHighChart(HighCharts);
dark(HighCharts);
export default {
  data() {
    return {
      chartInterval: null,
    };
  },
  props: ["serialNumber", "shiYanBianHao", "moShi", "yunXingZhuangTai"],
  watch: {
    yunXingZhuangTai: function (n) {
      clearInterval(this.chartInterval);
      if (n == 1) {
        this.getGroupDetail();
      }
    },
  },
  computed: {
    labelText() {
      return this.moShi == 1 ? "电流" : "电压";
    },
    labelUnit() {
      return this.moShi == 1 ? "mA" : "V";
    },
  },
  methods: {
    getGroupDetail() {
      let that = this;
      that.axios
        .post("HDWY01/GetGroupDetail", {
          deviceType: "HDWY01",
          serialNumber: that.serialNumber,
          shiYanBianHao: that.shiYanBianHao,
          moShi: that.moShi,
        })
        .then(function (response) {
          let chartData = [];
          response.data.data.forEach((element) => {
            chartData.push([
              moment(element.jiLuShiJian).valueOf(),
              element.moShi == 1 ? element.dianLiu : element.dianYa,
            ]);
          });
          that.loadCharts(chartData);
        });
    },
    loadCharts(chartData) {
      var that = this;
      HighCharts.chart("hdwy01_chart_operate", {
        lang: {
          viewFullscreen: "全屏",
          printChart: "打印图表",
          downloadJPEG: "导出 JPEG",
          downloadPDF: "导出 PDF",
          downloadPNG: "导出 PNG",
          downloadSVG: "导出 SVG",
        },
        tooltip: {
          formatter: function () {
            return (
              that.labelText +
              "：" +
              this.y +
              that.labelUnit +
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
            text: that.labelText + "(" + that.labelUnit + ")",
          },
        },
        chart: {
          events: {
            load: function () {
              let tmp_Series = this.series[0];
              that.chartInterval = setInterval(function () {
                that.axios
                  .post("HDWY01/GetPoint", {
                    serialNumber: that.serialNumber,
                    shiYanBianHao: that.shiYanBianHao,
                    jiLuShiJian:
                      tmp_Series.xData.length > 0
                        ? new moment(
                            tmp_Series.xData[tmp_Series.xData.length - 1]
                          )
                        : null,
                  })
                  .then(function (response) {
                    if (response.data.data) {
                      tmp_Series.addPoint([
                        moment(response.data.data.jiLuShiJian).valueOf(),
                        response.data.data.moShi == 1
                          ? response.data.data.dianLiu
                          : response.data.data.dianYa,
                      ]);
                    }
                  });
              }, 60000);
            },
          },
        },
        title: { text: that.labelText },
        series: [
          {
            name: that.labelText,
            data: chartData,
          },
        ],
        credits: {
          enabled: false,
        },
      });
    },
  },
  mounted() {},
};
</script>

<style>
</style>