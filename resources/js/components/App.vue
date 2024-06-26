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
  font-family: poppins, Helvetica, Arial, sans-serif;
  background: #111111;
  color: #e4e4e4;
  overflow: hidden;
}
.wrapper {
  width: 100%;
  height: 100%;
}
.wrapper-container {
  width: 90%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  position: relative;
}
</style>
