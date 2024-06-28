<template>
    <div>
        <div v-if="serverError">
           <Error v-bind:error="error" />
        </div>
        <div v-else class="logout">
           <h2>{{ message }}</h2>
        </div>
    </div>
</template>

<script>
import Error from "./server-error/Error.vue";
import Swal from "sweetalert2";
export default {
  name: "SignOut",
  components: {
    Error
  },
  data() {
    return {
      serverError: null,
      error: null,
      message: ""
    };
  },
  created() {
    this.logout();
  },
  methods: {
    logout: function() {
      this.$store
        .dispatch("userLogout")
        .then(() => {
          new Swal({
            icon: "success",
            title: "you have successfully logged out",
            timer: 2000
          });
          this.message = "you have successfully logged out";
          this.$router.push({ path: "/signin" });
        })
        .catch(error => {
          this.serverError = true;
          this.error = error;
        });
    }
  }
};
</script>

<style scoped>
</style>
