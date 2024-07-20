<!-- component for display supervised task -->
<template>
  <div>
    <!-- if is loading is true -->
    <div v-if="isLoading" class="loading">
      <p>please wait...</p>
    </div>
    <!-- if isLoading is false -->
    <div v-else class="container-table">
      <div v-if="serverError" class="message">
        <Error v-bind:error="error" />
      </div>
      <div class="tasks-for-users">
        <!-- display no tasks if supervised tasks are empty -->
        <div v-if="tasksLength <= 0">
          <NoTask />
        </div>
        <div v-else class="supervised-tasks">
          <!-- displays table of the tasks the supervisor supervised -->
          <TaskTable v-bind:supervisedTasks="supervisedTasks" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Error from "../server-error/Error.vue"; //error message in case of server error
import NoTask from "../tasks-components/NoTask.vue"; // no task if length is less tha 0
import TaskTable from "./TaskTable.vue"; // table for supervised task
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
      serverError: false, // serverError set to false
      error: undefined, //error message set to undefinded
      supervisedTasks: [], // supervised task
      tasksLength: undefined // supervised task length
    };
  },
  // call the method on mounted
  created() {
    this.getSupervisedTasks();
  },
  methods: {
    // get all supervised by the current supervisor on store
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
