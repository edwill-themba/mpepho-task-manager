<template>
    <div class="wrapper">
      <div class="task-header">
        <h1>Task Management System</h1>
     </div>
     <div class="wrapper-container">
        <!-- task type is the priority & pagination  component-->
        <TasksType />
        <Pagination /> 
     </div>
     <div v-if="serverError">
        <!-- the component for server errors -->
        <Error v-bind:error="error" />
     </div>
     <div v-if="!tasks">
         <!-- component appears if no task found -->
         <NoTask />
     </div>
     <div v-if="tasks">
       <!-- component for each task item -->
       <TaskItem  v-bind:tasks="tasks"/>
     </div>
    </div>
</template>

<script>
import TasksType from "./tasks-components/TasksType.vue"; // task priority
import Pagination from "./tasks-components/Pagination.vue"; // pagination
import Error from "./server-error/Error.vue"; // error component
import NoTask from "./tasks-components/NoTask.vue"; // no task found
import TaskItem from "./tasks-components/TaskItem.vue"; // each task
export default {
  name: "Tasks",
  components: {
    TasksType,
    Pagination,
    Error,
    NoTask,
    TaskItem
  },
  data() {
    return {
      serverError: null,
      error: null,
      tasks: []
    };
  },
  methods: {
    getUserTasks: function() {
      this.$store
        .dispatch("getAllTasks")
        .then(response => {
          this.tasks = response.data.tasks;
        })
        .catch(error => {
          this.serverError = true;
          this.error = error;
        });
    }
  },
  created() {
    this.getUserTasks();
  }
};
</script>

<style scoped>
.task-header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #e4e4e4;
  margin-top: 10px;
}
.task-header h1 {
  color: #111111;
  text-transform: uppercase;
}

@media (max-width: 800px) {
  .task-header h1 {
    font-size: 20px;
  }
  .wrapper-container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
