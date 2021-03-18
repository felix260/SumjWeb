<template>

  <ul v-infinite-scroll="load" :style="'overflow:auto;height:'+ulHeight+'px;padding-left:20px;list-style:none;'">
    <li v-for="(value,key) in recordList" v-bind:key="key">时间：{{ value.insertTime }}<br />{{ value.recordContent }}
      <el-divider></el-divider>
    </li>
  </ul>

</template>

<script>
export default {
  data() {
    return {
      recordList: [],
      ulHeight: 500,
      currentPage: 1,
      pageSize: 10,
      text: "",
    };
  },
  methods: {
    load() {
      let that = this;
      that.axios
        .post("OfficialAccount/GetList", {
          currentPage: that.currentPage,
          pageSize: that.pageSize,
          text: that.text,
        })
        .then(function (response) {
          that.currentPage++;
          response.data.data.data.forEach((element) => {
            that.recordList.push(element);
          });
        });
    },
  },
  mounted() {
    this.ulHeight = this.$parent.$el.offsetHeight - 150;
  },
};
</script>

<style scoped>
</style>