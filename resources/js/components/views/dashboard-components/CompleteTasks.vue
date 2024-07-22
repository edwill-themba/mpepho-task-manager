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
        <!-- remove all task -->
        <span class="remove" v-on:click="removeAllComplete">remove all complete</span>
        <div v-for="(task,index) in complete" :key="index">
          <h5>
            <span class="task-number">{{ index + 1 }}</span>{{ task.task_name }}</h5>
          <p>Completed at: {{ formatDate(task.updated_at) }}</p>
          <span class="remove-complete" v-on:click="removeCompleteTask(task)">
            <FontAwesomeIcon icon="times" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formatDate from "@/mixins/formatDate.js";
import isLoading from "@/mixins/isLoading.js";
import Swal from "sweetalert2";
export default {
  mixins: [formatDate, isLoading],
  name: "CompleteTask",
  computed: {
    complete() {
      return this.$store.getters.getCompleteTasks;
    }
  },
  data() {
    return {
      completeTasks: [], // complete tasks set to an empty array
      serverError: false, // server error set to false
      error: undefined, // error set to undefied
      completeTaskLength: undefined, // task length set to undefined
      user_id: null
    };
  },
  created() {
    this.getCompleteTask();
  },
  methods: {
    // dispatch the store to get all complete task
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
    },
    // dispatch the store to remove selected task
    removeCompleteTask: function(task) {
      const confirmation = confirm("Are you sure you want to delete this task");
      if (confirmation) {
        this.$store
          .dispatch("removeCompleteTask", task)
          .then(() => {
            new Swal({
              icon: "success",
              title: "task was removed successfuly",
              timer: 4000
            });
          })
          .catch(error => {
            new Swal({
              icon: "warning",
              title: error.response.data.message,
              timer: 4000
            });
          });
      }
    },
    //dispatch action to remove all tasks for that specific user
    removeAllComplete: function() {
      this.user_id = this.completeTasks[0].user_id;
      const confirmation = confirm("Are you sure you want to remove all task");
      if (confirmation) {
        this.$store
          .dispatch("removeAllCompleteTask", this.user_id)
          .then(() => {
            new Swal({
              icon: "success",
              title: "all tasks were removed successfully",
              timer: 4000
            });
          })
          .catch(error => {
            new Swal({
              icon: "warning",
              title: error.response.data.message,
              timer: 4000
            });
          });
      }
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
.complete-tasks .remove {
  margin: 10px 10px 15px;
  text-transform: capitalize;
  border: none;
  width: 200px;
  text-align: center;
  border-radius: 6px;
  height: 30px;
  padding-top: 10px;
  background: #111;
  cursor: pointer;
  color: #e4e4e4;
  font-size: 14px;
}
.complete-tasks .remove:hover {
  border: 2px solid green;
  background: transparent;
  color: green;
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
.complete-tasks .remove-complete {
  position: absolute;
  right: 10px;
  top: 10px;
  color: red;
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
