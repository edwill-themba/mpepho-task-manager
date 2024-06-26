<template>
    <div>
        tasks is working
    </div>
</template>

<script>
export default {
  name: "Tasks",
  methods: {
    getUserTasks: function() {
      this.$store
        .dispatch("getAllTasks")
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getUserTasks();
  }
};
</script>