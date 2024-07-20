<template>
  <div class="wrapper">
    <div class="login-container">
      <div class="login-content">
        <img src="../../../images/gears.jpg">
      </div>
      <transition name="sign-in">
        <div class="sign-in-form" v-if="sign_in">
          <h3>Sign In</h3>
          <!-- form sign in  component -->
          <SignInForm v-on:toggleRegister="toggleSignUp()" />
        </div>
      </transition>
      <transition name="sign-up">
        <div class="sign-up-form" v-if="sign_up">
          <h3>Sign Up</h3>
          <SignUpForm v-on:toggleLogin="toggleSignIn()" />
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
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggin;
    }
  },
  created() {
    // checks if user is logged if is user logged is pushed back to dashboard
    if (this.isLoggedIn) {
      this.$router.push({ path: "/dashboard" });
    }
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
  position: absolute;
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
  font-size: 22px;
  text-transform: uppercase;
  font-weight: 500;
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
  font-size: 22px;
  text-transform: uppercase;
  font-weight: 500;
}
/** sign in **/
.sign-in-enter-active,
.sign-in-leave-active {
  transition: 0.8s ease;
}
.sign-in-enter-from,
.sign-in-leave-to {
  transform: translateX(100%);
}
.sign-in-enter-to {
  transform: translateX(0px);
}
.sign-in-leave-active {
  position: absolute;
}
/** sign up **/
.sign-up-enter-active,
.sign-up-leave-active {
  transition: 0.8s ease;
}
.sign-up-enter-from,
.sign-up-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.sign-up-enter-to {
  transform: translateX(0px);
}
.sign-up-leave-active {
  position: absolute;
}
@media (max-width: 1246px) {
  .login-content {
    width: 65%;
  }
  .sign-in-form {
    width: 35%;
    justify-content: flex-start;
    align-items: center;
  }
  .sign-up-form {
    width: 35%;
    justify-content: flex-start;
    align-items: center;
  }
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
  .sign-in-form h3 {
    font-weight: 500;
  }
  .sign-in-form {
    width: 100%;
    background: transparent;
    justify-content: flex-start;
    align-items: center;
  }
  .sign-up-form h3 {
    font-weight: 500;
  }
}
</style>
