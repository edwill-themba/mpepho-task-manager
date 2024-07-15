<template>
 <div>
  <div v-if="isLoading" class="loading">
    <p>please wait...</p>
  </div>
  <div v-else>
    <div class="container-table">
       <div v-if="serverError"  class="message">
          <Error v-bind:error="error"  />
       </div>
       <div class="tasks-for-users">
          <div v-if="tasksLength <= 0">
             <NoTask  />
          </div>
          <div v-else class="supervised-tasks">
            <TaskTable v-bind:supervisedTasks="supervisedTasks" />
          </div>
       </div>
    </div>
    </div>
 </div>
</template>

<script>
import Error from "../server-error/Error.vue";
import NoTask from "../tasks-components/NoTask.vue";
import TaskTable from "./TaskTable.vue";
import isLoading from "@/mixins/isLoading.js";
export default {
  mixins: [isLoading],
  name: "TaskForUser",
  components: {
    Error,
    NoTask,
    TaskTable
  },
  data() {
    return {
      serverError: false,
      error: undefined,
      supervisedTasks: [],
      tasksLength: undefined
    };
  },
  mounted() {
    this.getSupervisedTasks();
  },
  methods: {
    getSupervisedTasks: function() {
      this.$store
        .dispatch("allSupervisedTasks")
        .then(response => {
          this.supervisedTasks = response.data.supervisor_tasks;
          this.tasksLength = this.supervisedTasks.length;
        })
        .catch(error => {
          this.serverError = true;
          this.error = error;
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.supervised-tasks {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
