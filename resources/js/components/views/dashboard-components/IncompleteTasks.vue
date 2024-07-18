<template>
  <div>
    <div class="loading" v-if="isLoading">
      <p>loading...</p>
    </div>
    <div v-else>
      <div v-if="serverError" class="error">
        {{ error }}
      </div>
      <!-- InComplete task item -->
      <div v-if="incompleteTaskLength <= 0" class="no-tasks">
        <p>no incomplete are tasks found</p>
      </div>
      <div v-else class="incomplete-tasks">
        <div v-for="(task,index) in incompleteTasks" :key="index">
          <h5>
            <span class="task-number">{{ index + 1 }}</span>{{ task.task_name }}</h5>
          <p>Removed at: {{ formatDate(task.created_at) }}
            <span>
              <FontAwesomeIcon icon="clock" />{{ formatTime(task.created_at) }}
            </span>
          </p>
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
  height: 520px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  overflow-y: scroll;
}
.incomplete-tasks div {
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
.incomplete-tasks div h5 {
  font-size: 17px;
  color: #e4e4e4;
  font-weight: 300;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
}
.incomplete-tasks div h5 .task-number {
  z-index: 99;
  border-radius: 50%;
  background: red;
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
.incomplete-tasks div p {
  font-weight: 400;
  font-size: 15px;
  color: orange;
  margin-top: 0px;
  margin-bottom: 2px;
  padding-bottom: 5px;
  margin-left: 4%;
}
.incomplete-tasks div p span {
  margin-left: 7px;
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
