<template>
    <form class="frm-register-login" v-on:submit="onLogin">
       <div class="input-group">
          <span><FontAwesomeIcon icon="envelope" /></span>
          <input type="email" name="email" v-model="formData.email" class="frm-input" placeholder="enter email address">
           <p class="frm-errors">{{ fieldErrors.email }}</p>
       </div>
       <div class="input-group">
          <span><FontAwesomeIcon icon="lock" /></span>
          <input type="password" name="password" v-model="formData.password" class="frm-input" placeholder="enter password">
          <p class="frm-errors">{{ fieldErrors.password }}</p>
       </div>
       <button type="submit" class="btn-register-login">
           {{ !clicked ? 'sign in' : 'please wait...' }}
       </button>
       <span class="account" v-on:click="toggleRegister()">Go to Sign Up</span>
    </form>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "SignInForm",
  data() {
    return {
      clicked: false,
      formData: {
        email: "",
        password: ""
      },
      fieldErrors: {
        email: undefined,
        password: undefined
      }
    };
  },
  methods: {
    toggleRegister: function() {
      this.$emit("toggleRegister");
    },
    onLogin: function(e) {
      e.preventDefault();
      this.clicked = true;
      setTimeout(() => (this.clicked = false), 1000);
      // call the validate error function
      this.fieldErrors = this.validateForm(this.formData);
      // if gets error rertuns
      if (Object.keys(this.fieldErrors).length) return;
      //call store
      this.$store
        .dispatch("userLogin", this.formData)
        .then(response => {
          this.formData.email = "";
          this.formData.password = "";
          new Swal({
            icon: "success",
            title: "Thank you login was successfuly",
            timer: 3000
          });
          this.$router.push({ path: "/dashboard" });
          console.log(response);
        })
        .catch(error => {
          new Swal({
            icon: "warning",
            title: error.response.data.message,
            timer: 5000
          });
          console.log(error);
          this.formData.email = "";
          this.formData.password = "";
        });
    },
    // validate form
    validateForm: function(field) {
      const errors = {};
      if (!field.email) errors.email = "The email is required!";
      if (!field.password) errors.password = "The password is required!";
      return errors;
    }
  }
};
</script>

<style scoped>
</style>
