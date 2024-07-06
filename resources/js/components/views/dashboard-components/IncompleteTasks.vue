<template>
    <div>
        
    </div>
</template>

<script>
export default {
  name: "IncompleteTask",
  data() {
    return {
      incomplete_tasks: []
    };
  },
  mounted() {
    this.getIncompleteTasks();
  },
  methods: {
    getIncompleteTasks: function() {
      this.$store
        .dispatch("getIncompleteTasks")
        .then(response => {
          this.incomplete_tasks = response.data.incomplete_tasks;
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
