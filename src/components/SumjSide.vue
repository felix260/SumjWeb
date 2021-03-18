<template>
  <el-menu ref="elMenu" :router="true" :default-active="this.$route.path" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <el-submenu v-for="menu in Sys_Menu.filter((p) => { return p.pid==0;})" :key="menu.id" :index="menu.id+''">
      <template slot="title"><i class="el-icon-location"></i><span>{{ menu.name }}</span></template>
      <el-menu-item v-for="submenu in Sys_Menu.filter((p) => {return p.pid === menu.id;})" :key="submenu.id" :route="{name: submenu.vueName,params: { },}" :index="submenu.vueUrl">{{ submenu.name}}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  name: "SumjSide",
  props: ["navHeader"],
  data() {
    return {
      Sys_Menu: [],
      defaultActive: "",
    };
  },
  methods: {
    getMenu: function () {
      var tmp_this = this;
      this.axios
        .post("Sys_Menu/GetMyMenu", {
          nav_Header: tmp_this.navHeader,
        })
        .then(function (response) {
          tmp_this.Sys_Menu = response.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
  mounted: function () {
    this.getMenu();
  },
};
</script>
