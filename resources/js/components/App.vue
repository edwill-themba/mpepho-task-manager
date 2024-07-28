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
  font-family: Poppins, Helvetica, Arial, sans-serif;
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
.loading {
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 30px;
}
.loading p {
  font-size: 17px;
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
  width: 80%;
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
.tasks-list .box:hover {
  transform: scale(1.1);
}
.box h6 {
  font-size: 15px;
  color: #111111;
  font-weight: 900;
  width: 100%;
  text-transform: uppercase;
}
.box h6 .ellipsis {
  color: #111;
  font-size: 15px;
  margin-right: 2px;
  padding-left: 2px;
}
.box p {
  font-weight: 500;
  font-size: 15px;
  color: #111;
  padding-left: 5px;
  text-transform: uppercase;
}
.box span {
  font-size: 13px;
  font-weight: 500;
  color: #1a1818;
  margin-left: 5px;
}
.low {
  background: limegreen;
}
.medium {
  background: orange;
}
.high {
  background: #ce1010;
}
.frm-add-task {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background: #fff;
  width: 300px;
  height: auto;
  margin-top: 20px;
  border-radius: 6px;
  margin-left: 10px;
  padding: 10px;
  position: relative;
}
.frm-add-task h4 {
  text-align: center;
  margin: 20px auto 15px auto;
  padding: 5px auto;
  font-size: 19px;
}
.input-div {
  margin: 18px auto;
  padding: 5px 2px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-div .input {
  width: 100%;
  background: transparent;
  padding: 2px 5px;
  border: none;
  outline: none;
  font-size: 15px;
}
.input-div p {
  position: absolute;
  padding-top: 5px;
  color: red;
  margin-top: 16%;
}
.button {
  margin: 20px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: auto;
  padding: 5px auto;
}
.btn-save {
  width: 40%;
  text-align: center;
  height: 35px;
  font-size: 14px;
  font-weight: 600;
  background: olive;
  color: #e4e4e4;
  border: none;
  border-radius: 6px;
}
.btn-save:hover {
  background: transparent;
  border: 2px solid olive;
  color: olive;
}
.btn-close {
  width: 40%;
  text-align: center;
  height: 35px;
  font-size: 14px;
  font-weight: 600;
  background: purple;
  color: #e4e4e4;
  border: none;
  border-radius: 6px;
}
.btn-close:hover {
  background: transparent;
  border: 2px solid purple;
  color: purple;
}
.no-tasks {
  width: 100%;
  height: auto;
  margin: 10px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.no-tasks p {
  color: #e4e4e4;
  font-size: 17px;
  font-weight: bold;
  margin-left: 12px;
}
.error p {
  color: red;
  font-size: 17px;
  font-weight: bold;
  margin-left: 12px;
}
.message {
  text-align: center;
  margin-top: 20px;
}
.contaier-table {
  width: 90%;
  height: 100%;
  margin: 0px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.find-user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
}
.btn-search {
  border: none;
  background: transparent;
  color: #e4e4e4;
  font-size: 17px;
  cursor: pointer;
  padding-right: 4px;
}

@media (max-width: 1246px) {
  .frm-register-login {
    width: 300px;
    margin-left: 20px;
  }
}
@media (max-width: 1032px) {
  .frm-register-login {
    width: 280px;
  }
}
@media (max-width: 900px) {
  .sign-in {
    border-radius: 6px;
  }
  .frm-register-login {
    margin-left: 40px;
    background: #fff;
    padding: 10px;
    border: none;
    border-radius: 6px;
  }
  .input-group {
    width: 95%;
  }
  .btn-register-login {
    width: 100%;
  }
  .tasks-list {
    overflow-y: scroll;
    height: 700px;
    justify-content: center;
    align-items: center;
  }
  .tasks-list .box {
    margin: 15px auto;
  }
  .loading p {
    font-size: 14px;
  }
  .input-div .input {
    font-size: 13px;
  }
}
@media (max-width: 898px) {
  .tasks-list {
    overflow-y: scroll;
    height: 700px;
    justify-content: center;
    align-items: center;
  }
  .tasks-list .box {
    margin-left: 20px;
  }
}
@media (max-width: 768px) {
  .btn-search {
    font-size: 14px;
  }
  .frm-register-login {
    margin-left: -5px;
  }
  .frm-register-login .account {
    font-size: 12px;
  }
  .frm-errors {
    font-size: 13px;
  }
  .btn-save {
    font-size: 14px;
    font-weight: 400;
  }
  .btn-close {
    font-size: 14px;
    font-weight: 400;
  }
}
</style>
