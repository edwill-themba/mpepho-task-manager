<template>
    <div>
        
    </div>
</template>

<script>
export default {
  name: "CompleteTask",
  data() {
    return {
      complete_tasks: []
    };
  },
  mounted() {
    this.getCompleteTask();
  },
  methods: {
    getCompleteTask: function() {
      this.$store
        .dispatch("getCompleteTasks")
        .then(response => {
          this.complete_tasks = response.data.complete_tasks;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
</style>
