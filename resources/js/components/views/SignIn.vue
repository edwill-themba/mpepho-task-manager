<template>
    <div class="wrapper">
        <div class="login-container">
             <div class="login-content">
                <img src="../../../images/gears.jpg" alt="gears">
             </div>
             <transition name="sign-in" v-if="sign_in">
                 <div class="sign-in-form">
                      <h3>Sign In.</h3>
                 </div>
             </transition>
             <transition name="sign-up" v-if="sign_up">
                  <div class="sign-up-form">
                    sign_up is here
                 </div>
             </transition>
        </div>
    </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      sign_in: true,
      sign_up: null
    };
  }
};
</script>

<style scoped>
.login-container {
  width: 90%;
  height: 500px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: #e4e4e4;
  border-radius: 10px;
  border: none;
  color: #111111;
}
.login-content {
  width: 65%;
  height: 100%;
  position: absolute;
  background: transparent;
  left: 0;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}
.login-content img {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}
.sign-in-form {
  width: 35%;
  height: 100%;
  position: absolute;
  background: transparent;
  right: 0;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
}
.sign-up-form {
  width: 35%;
  height: 100%;
  position: absolute;
  background: transparent;
  right: 0;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}
@media (max-width: 900px) {
  .login-content {
    display: none;
  }
  .sign-up-form {
    width: 100%;
    background: transparent;
  }
  .sign-in-form {
    width: 100%;
    background: transparent;
  }
}
</style>
