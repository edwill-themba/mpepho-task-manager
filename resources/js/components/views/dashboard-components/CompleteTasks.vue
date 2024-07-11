<template>
    <div>
     <div v-if="serverError" class="error">
        {{ error }}
      </div>
     <div v-if="completeTaskLength <= 0" class="no-tasks">
          <p>no complete are tasks found</p>
      </div>
      <div v-else  class="complete-tasks">
         <div v-for="(task,index) in completeTasks" :key="index">
           <h5>{{ task.task_name }}</h5>
           <p>Completed at: {{ formatDate(task.updated_at) }}</p>
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
  name: "CompleteTask",
  data() {
    return {
      completeTasks: [],
      serverError: false,
      error: undefined,
      completeTaskLength: undefined
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
          this.completeTasks = response.data.complete_tasks;
          this.completeTaskLength = this.completeTasks.length;
        })
        .catch(error => {
          this.serverError = true;
          this.error;
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.complete-tasks {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
.complete-tasks div {
  width: 250px;
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
.complete-tasks div h5 {
  font-size: 15px;
  font-weight: 300;
}
.complete-tasks div p {
  font-weight: 400;
  font-size: 13.5px;
  color: coral;
  margin-top: 5px;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.complete-tasks div .delete-task {
  position: absolute;
  bottom: 5px;
  right: 10px;
  color: red;
  font-weight: bold;
  cursor: pointer;
}
.complete-tasks div .task_time {
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
