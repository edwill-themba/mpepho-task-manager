<template>
    <div>
        <Navbar />
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from "./top-header/Navbar.vue";
export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  background: #111111;
}
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
