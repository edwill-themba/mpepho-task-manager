<template>
    <div>
      <div v-if="serverError" class="error">
        {{ error }}
      </div>
      <!-- InComplete task item -->
      <div v-if="incompleteTaskLength <= 0" class="no-tasks">
          <p>no incomplete are tasks found</p>
      </div>
      <div v-else  class="incomplete-tasks">
         <div v-for="(task,index) in incompleteTasks" :key="index">
           <h5>{{ task.task_name }}</h5>
           <p>Removed at: {{ formatDate(task.created_at) }}</p>
           <span class="delete-task"><FontAwesomeIcon icon="times" /></span>
           <span class="task_time"><FontAwesomeIcon icon="clock" /> {{ formatTime(task.created_at) }}</span>
         </div>
      </div>
    </div>
</template>

<script>
import formatDate from "@/mixins/formatDate.js";
import formatTime from "@/mixins/formatDate.js";
export default {
  mixins: [formatDate],
  name: "IncompleteTask",
  data() {
    return {
      incompleteTasks: [],
      serverError: false,
      error: undefined,
      incompleteTaskLength: undefined
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
          this.incompleteTasks = response.data.incomplete_tasks;
          this.incompleteTaskLength = this.incompleteTasks.length;
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
.incomplete-tasks {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
.incomplete-tasks div {
  width: 250px;
  height: auto;
  margin: 2px 10px;
  border: 1px solid #1111;
  border-radius: 6px;
  background: #c1c1c1;
  color: #111111;
  padding: 10px 5px 12px 10px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  position: relative;
}
.incomplete-tasks div h5 {
  font-size: 16px;
  font-weight: 300;
}
.incomplete-tasks div p {
  font-weight: 400;
  font-size: 13.5px;
  color: #111111;
  margin-top: 5px;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.incomplete-tasks div .delete-task {
  position: absolute;
  bottom: 5px;
  right: 10px;
  color: red;
  font-weight: bold;
  cursor: pointer;
}
.incomplete-tasks div .task_time {
  position: absolute;
  bottom: 5px;
  left: 10px;
  color: green;
  font-weight: bold;
  cursor: pointer;
  font-size: 13px;
  font-weight: 300;
}
</style>
