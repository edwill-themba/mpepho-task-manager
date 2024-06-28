<template>
    <div class="wrapper">
        <div class="login-container">
             <div class="login-content">
                <img src="../../../images/gears.jpg" alt="gears">
             </div>
             <transition name="sign-in" v-if="sign_in">
                 <div class="sign-in-form">
                      <h3>Sign In</h3>
                      <!-- form sign in  component -->
                      <SignInForm  v-on:toggleRegister="toggleSignUp()"/>
                 </div>
             </transition>
             <transition name="sign-up" v-if="sign_up">
                  <div class="sign-up-form">
                    <h3>Sign Up</h3>
                    <SignUpForm  v-on:toggleLogin="toggleSignIn()" />
                 </div>
             </transition>
        </div>
    </div>
</template>

<script>
import SignInForm from "./forms/SignInForm.vue";
import SignUpForm from "./forms/SignUpForm.vue";
export default {
  name: "SignIn",
  components: {
    SignInForm,
    SignUpForm
  },
  data() {
    return {
      sign_in: true,
      sign_up: false
    };
  },
  methods: {
    toggleSignUp: function() {
      this.sign_up = true;
      this.sign_in = false;
    },
    toggleSignIn: function() {
      this.sign_up = false;
      this.sign_in = true;
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 90%;
  height: 520px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: #e4e4e4;
  border-radius: 2px;
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
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
/** sign in form **/
.sign-in-form {
  width: 35%;
  height: 100%;
  position: absolute;
  background: transparent;
  right: 0;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
}
.sign-in-form h3 {
  margin: 10% 15% 3%;
  font-size: 25px;
  text-transform: uppercase;
}
/** sign up form **/
.sign-up-form {
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
.sign-up-form h3 {
  margin: 7% 15% 3%;
  font-size: 25px;
  text-transform: uppercase;
}
/** sign in **/
.sign-in-enter-active,
.sign-in-leave-active {
  transition: 0.8s all;
}
.sign-in-enter-from,
.sign-in-leave-to {
  transform: translateX(-250px);
}
.sign-in-enter-to {
  transform: translateX(0px);
}
/** sign up **/
.sign-up-enter-active,
.sign-up-leave-active {
  transition: 0.8s all;
}
.sign-up-enter-from,
.sign-up-leave-to {
  transform: translateX(-250px);
}
.sign-up-enter-to {
  transform: translateX(0px);
}

@media (max-width: 900px) {
  .login-content {
    display: none;
  }
  .sign-up-form {
    width: 100%;
    background: transparent;
    justify-content: flex-start;
    align-items: center;
  }
  .sign-in-form {
    width: 100%;
    background: transparent;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
