<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <button v-on:click="test">dfdfdf</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  components: {},
  methods: {
    test: function () {
      alert("fddfddf");
      axios
        .post("http://localhost:5000/weatherforecast/GetList")
        .then(function (res) {
          alert(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>
