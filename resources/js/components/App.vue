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
.frm-register-login {
  width: 350px;
  height: auto;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.frm-register-login .account {
  margin: 10px;
  font-size: 14px;
  text-align: center;
  color: blue;
  cursor: pointer;
}
.input-group {
  width: 80%;
  height: auto;
  padding: 5px;
  margin-right: 30px;
  position: relative;
  border-bottom: 2px solid #111111;
}
.input-group:nth-child(2) {
  margin-top: 20px;
}
.input-group:nth-child(3) {
  margin-top: 20px;
}
.input-group:nth-child(4) {
  margin-top: 20px;
}
.input-group .frm-input {
  width: 70%;
  height: 35px;
  background: transparent;
  border: none;
  outline: none;
  margin-left: 10px;
  font-size: 15px;
}
.input-group p {
  position: absolute;
  margin: 5px auto;
  color: red;
  padding: 2px;
}
.btn-register-login {
  margin-top: 35px;
  width: 85%;
  height: 35px;
  background: #111111;
  color: #e4e4e4;
  font-size: 17px;
  font-weight: 400;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.btn-register-login:hover {
  border: 2px solid #111111;
  color: #111111;
  background: transparent;
}
.tasks-list {
  height: 100%;
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
}
.tasks-list .box {
  width: 280px;
  height: auto;
  padding: 5px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 6px;
  color: #111111;
  border: none;
}
.box h6 {
  font-size: 15px;
  color: #111111;
  font-weight: 800;
  width: 100%;
  text-decoration: underline;
  text-transform: uppercase;
}
.box span {
  font-size: 13px;
  font-weight: bold;
}
.low {
  background: limegreen;
}
.medium {
  background: orange;
}
.high {
  background: red;
}
@media (max-width: 900px) {
  .frm-register-login {
    margin-left: 40px;
  }
}
</style>
