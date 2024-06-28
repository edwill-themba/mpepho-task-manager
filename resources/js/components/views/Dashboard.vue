<template>
    <div>
        Dashboard working
    </div>
</template>


<script>
export default {
  name: "Dashboard",
  data() {
    return {
      user_name: null,
      user_email: null
    };
  },
  created() {
    this.$store
      .dispatch("getCurrentUser")
      .then(response => {
        this.user_name = response.data.name;
        this.user_email = response.data.email;
        console.log(this.user_name, this.user_email);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {}
};
</script>

<style scoped>
</style>
