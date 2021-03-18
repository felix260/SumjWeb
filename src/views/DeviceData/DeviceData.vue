<template>
  <el-container>
    <el-aside>
      <SumjSide style="height: 100%" :navHeader="0"></SumjSide>
    </el-aside>
    <el-container>
      <el-main>
        <breadcrumb></breadcrumb>
        <el-divider></el-divider>
        <router-view></router-view>
      </el-main>
      <el-footer class="footer">
        <el-link type="primary">由斯姆捷科技有限公司提示技术支持</el-link>
      </el-footer>
    </el-container>
  </el-container>
</template>
<script>
import SumjSide from "../../components/SumjSide";
import Breadcrumb from "../StockManage/Breadcrumb";
export default {
  components: { SumjSide, Breadcrumb },
  methods: {
    test: function () {
      console.log(this.$store.state.phone);
    },
  },
};
</script>
<style>
.footer {
  display: flex;
  justify-content: center;
}
</style>