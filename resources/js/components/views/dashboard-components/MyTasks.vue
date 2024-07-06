<template>
  <div>
    <div v-if="serverError">
       <Error v-bind:error="error" />
    </div>
    <div  class="pending-tasks">
      <div v-for="(task,index) in mytasks" :key="index">
          <h5>{{ task.task_name }}</h5>
          <p>Due Date : {{ formatDate(task.task_date) }}</p>
          <span class="delete-task" v-on:click="deleteTask(task)"><FontAwesomeIcon icon="trash" /></span>
          <button class="btn-complete">complete task</button>
      </div>
    </div>
 </div>
</template>

<script>
import moment from "moment";
import Error from "../server-error/Error.vue";
export default {
  name: "MyTasks",
  props: ["tasks"],
  components: {
    Error
  },
  data() {
    return {
      serverError: false,
      error: undefined,
      task: {
        id: null,
        task_name: null,
        task_date: null,
        priority: null,
        status: null
      }
    };
  },
  computed: {
    mytasks() {
      return this.$store.getters.getMyTasks;
    }
  },
  methods: {
    formatDate: function(task_date) {
      return moment(task_date).format("DD-MM-YYYY");
    },
    formatTime: function(task_time) {
      return moment(task_time).format("HH:MM");
    },
    deleteTask: function(task) {
      this.task = task;
      let deleteTask = confirm("are you sure you want to delete this task?");
      if (deleteTask) {
        this.$store
          .dispatch("deleteTask", this.task)
          .then(() => {
            console.log("task was removed successful");
          })
          .catch(error => {
            this.serverError = true;
            this.error = error;
            console.log("error message" + this.errorMessage);
          });
      }
    }
  }
};
</script>

<style scoped>
.pending-tasks {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
.pending-tasks div {
  width: 300px;
  height: auto;
  margin: 2px 10px;
  border: 1px solid #1111;
  border-radius: 6px;
  background: #111111;
  color: #e4e4e4;
  padding: 10px 5px 12px 10px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  position: relative;
}
.pending-tasks div h5 {
  font-size: 15px;
  color: orangered;
}
.pending-tasks div p {
  font-weight: 700;
  font-size: 13.5px;
  margin-top: 2px;
  color: blueviolet;
}
.pending-tasks div .delete-task {
  position: absolute;
  bottom: 5px;
  right: 10px;
  color: red;
  font-weight: bold;
  cursor: pointer;
}
.btn-complete {
  background: green;
  width: 70%;
  height: 35px;
  border: none;
  border-radius: 6px;
  color: #fff;
  margin-top: 10px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
}
</style>
