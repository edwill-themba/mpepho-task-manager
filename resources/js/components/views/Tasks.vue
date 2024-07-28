<template>
  <div>
    <div class="wrapper">
      <div class="task-header">
        <h1>Task Management System</h1>
      </div>
      <!-- is loading -->
      <div class="loading" v-if="isLoading">
        <p>please wait this will take some time...</p>
      </div>
      <!-- end is loading element -->
      <div class="wrapper-container" v-if="!isLoading">
        <!-- task type is the priority & pagination  components-->
        <TasksType />
        <Pagination :totalPages="tasks.length" :perPageOptions=[12] v-on:getPage="getPage" />
      </div>
      <div v-if="serverError">
        <!-- the component for server errors  & pass error as prop -->
        <Error v-bind:error="error" />
      </div>
      <div v-if="taskLength <= 0">
        <!-- component appears if no task found -->
        <NoTask />
      </div>
      <div v-else>
        <!-- component for displaying tasks -->
        <TaskItem v-bind:paginatedTasks="paginatedTasks" />
      </div>
    </div>
  </div>
</template>

<script>
import TasksType from "./tasks-components/TasksType.vue"; // task priority
import Pagination from "./tasks-components/Pagination.vue"; // pagination
import Error from "./server-error/Error.vue"; // error component
import NoTask from "./tasks-components/NoTask.vue"; // no task found
import TaskItem from "./tasks-components/TaskItem.vue"; // each task
import isLoading from "@/mixins/isLoading.js";
const perPageOptions = [12];
export default {
  mixins: [isLoading],
  name: "Tasks",
  components: {
    TasksType,
    Pagination,
    Error,
    NoTask,
    TaskItem
  },
  computed: {
    // paginates tasks
    paginatedTasks() {
      const firstIndex = (this.page - 1) * this.perPage;
      const lastIndex = this.page * this.perPage;
      return this.tasks.slice(firstIndex, lastIndex);
    }
  },
  data() {
    return {
      serverError: false, // serverError set to null
      error: undefined, // error message set to undefined
      tasks: [], // all tasks array
      page: 1, // starting page
      perPage: perPageOptions[0], // how many to display per page
      taskLength: undefined // number of task length
    };
  },
  methods: {
    // tells the store dispatch all the tasks
    getUserTasks: function() {
      this.$store
        .dispatch("getAllTasks")
        .then(response => {
          this.tasks = response.data.tasks;
          this.taskLength = this.tasks.length;
        })
        .catch(error => {
          this.serverError = true;
          this.error = error.response.data.message;
          console.log(this.error);
        });
    },
    // get tasks page from pagination component
    getPage(page, perPage) {
      this.page = page;
      this.perPage = perPage;
    }
  },
  created() {
    this.getUserTasks(); // gets all the tasks when components is created
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
