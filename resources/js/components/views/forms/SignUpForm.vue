<template>
    <form class="frm-register-login" v-on:submit="registerUser">
       <div class="input-group">
          <span><FontAwesomeIcon icon="user" /></span>
          <input type="text" name="name" class="frm-input" v-model="formData.name" placeholder="enter your full name">
           <p class="frm-errors">{{ fieldErrors.name }}</p>
       </div>
       <div class="input-group">
          <span><FontAwesomeIcon icon="envelope" /></span>
          <input type="email" name="email" class="frm-input" v-model="formData.email" placeholder="enter email address">
           <p class="frm-errors">{{ fieldErrors.email }}</p>
       </div>
       <div class="input-group">
          <span><FontAwesomeIcon icon="lock" /></span>
          <input type="password" name="password" class="frm-input" v-model="formData.password" placeholder="enter password">
          <p class="frm-errors">{{ fieldErrors.password }}</p>
       </div>
       <div class="input-group">
          <span><FontAwesomeIcon icon="lock" /></span>
          <input type="password" name="password_confirmation" class="frm-input" v-model="formData.password_confirmation" placeholder="re-type your password">
          <p class="frm-errors">{{ fieldErrors.password_confirmation }}</p>
       </div>
       <button type="submit" class="btn-register-login">
           {{ !clicked ? 'sign up' : 'please wait...' }}
       </button>
        <span class="account" v-on:click="toggleLogin()">do you have an account? sign in</span>
    </form>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "SignUnForm",
  data() {
    return {
      clicked: false,
      formData: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      fieldErrors: {
        name: undefined,
        email: undefined,
        password: undefined,
        password_confirmation: undefined
      }
    };
  },
  methods: {
    toggleLogin: function() {
      this.$emit("toggleLogin");
    },
    registerUser: function(e) {
      e.preventDefault();
      this.clicked = true;
      setTimeout(() => {
        this.clicked = false;
      }, 3000);
      this.fieldErrors = this.validateForm(this.formData);
      if (Object.keys(this.fieldErrors).length) return;
      this.$store
        .dispatch("userRegister", this.formData)
        .then(response => {
          console.log(response);
          new Swal({
            icon: "success",
            title: "Thank you for choosing us, Go to sign in",
            timer: 3000
          });
          this.formData.name = "";
          this.formData.email = "";
          this.formData.password = "";
          this.formData.password_confirmation = "";
          this.toggleLogin();
        })
        .catch(error => {
          console.log(error);
          new Swal({
            icon: "warning",
            title: error.response.data.message,
            timer: 5000
          });
          this.formData.name = "";
          this.formData.email = "";
          this.formData.password = "";
          this.formData.password_confirmation = "";
        });
    },
    validateForm: function(fields) {
      const errors = {};
      if (!fields.name) errors.name = "The name is required!!";
      if (!fields.email) errors.email = "The email is required!!";
      if (!fields.password) errors.password = "The password is required!!";
      if (!fields.password_confirmation)
        errors.password_confirmation = "The  confirmation is required!!";
      return errors;
    }
  }
};
</script>