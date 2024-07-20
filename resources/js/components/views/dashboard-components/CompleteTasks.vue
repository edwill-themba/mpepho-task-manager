<template>
  <div>
    <!-- display if is loading -->
    <div class="loading" v-if="isLoading">
      <p>loading...</p>
    </div>
    <!-- if isLoading is false -->
    <div v-else>
      <div v-if="serverError" class="error">
        {{ error }}
      </div>
      <div v-if="completeTaskLength <= 0" class="no-tasks">
        <p>no complete are tasks found</p>
      </div>
      <div v-else class="complete-tasks">
        <div v-for="(task,index) in completeTasks" :key="index">
          <h5>
            <span class="task-number">{{ index + 1 }}</span>{{ task.task_name }}</h5>
          <p>Completed at: {{ formatDate(task.updated_at) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formatDate from "@/mixins/formatDate.js";
import isLoading from "@/mixins/isLoading.js";
export default {
  mixins: [formatDate, isLoading],
  name: "CompleteTask",
  data() {
    return {
      completeTasks: [],
      serverError: false,
      error: undefined,
      completeTaskLength: undefined
    };
  },
  created() {
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
  height: 520px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  overflow-y: auto;
}
.complete-tasks div {
  width: 96%;
  height: 60px;
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
  font-size: 17px;
  color: #e4e4e4;
  font-weight: 300;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
}
.complete-tasks div h5 .task-number {
  z-index: 99;
  border-radius: 50%;
  background: green;
  width: 30px;
  height: 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-content: center;
  font-size: 17px;
  font-weight: bold;
  margin-right: 15px;
  padding-top: 4px;
}
.complete-tasks div p {
  font-weight: 400;
  font-size: 15px;
  color: green;
  margin-top: 0px;
  margin-bottom: 2px;
  padding-bottom: 5px;
  margin-left: 4%;
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

@media (max-width: 768px) {
  .complete-tasks {
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    overflow-y: scroll;
  }
  .complete-tasks div {
    height: auto;
    padding: 10px;
  }
  .complete-tasks div h5 {
    font-size: 13px;
    font-weight: 500;
  }
  .complete-tasks div h5 .task-number {
    width: 20px;
    height: 20px;
    font-size: 10px;
  }
  .complete-tasks div p {
    font-size: 12px;
  }
}
</style>
