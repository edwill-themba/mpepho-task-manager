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
        <!-- remove all task -->
        <span class="remove-all" v-on:click="removeAll">remove all incomplete</span>
        <div v-for="(task,index) in incomplete" :key="index">
          <h5>
            <span class="task-number">{{ index + 1 }}</span>{{ task.task_name }}</h5>
          <p>Removed at: {{ formatDate(task.created_at) }}
            <span>
              <FontAwesomeIcon icon="clock" />{{ formatTime(task.created_at) }}
            </span>
          </p>
          <span class="remove-incomplete" v-on:click="removeInCompleteTask(task)">
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
  name: "IncompleteTask",
  data() {
    return {
      incompleteTasks: [], // incomplete tasks
      serverError: false, // server set to false
      error: undefined, // error set to undefined
      incompleteTaskLength: undefined, // incomplete task length set to undefined
      user_id: null //user id of the authorized user
    };
  },
  computed: {
    // gets current incomplete task
    incomplete() {
      return this.$store.getters.getIncompleteTasks;
    }
  },
  created() {
    this.getIncompleteTasks();
  },
  methods: {
    // dispatch the action to get all incomplete task
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
    },
    // dispatch action to remove the selected task
    removeInCompleteTask: function(task) {
      const confirmation = confirm("Are you sure you want to delete this task");
      if (confirmation) {
        this.$store
          .dispatch("removeInCompleteTask", task)
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
    removeAll: function() {
      this.user_id = this.incompleteTasks[0].user_id;
      const confirmation = confirm("Are you sure you want to remove all task");
      if (confirmation) {
        this.$store
          .dispatch("removeAllInCompleteTask", this.user_id)
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
.incomplete-tasks .remove-all {
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
.incomplete-tasks .remove-all:hover {
  border: 2px solid coral;
  background: transparent;
  color: coral;
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
.incomplete-tasks div .remove-incomplete {
  position: absolute;
  right: 10px;
  top: 10px;
  color: red;
  cursor: pointer;
}
@media (max-width: 768px) {
  .incomplete-tasks div {
    height: auto;
    padding: 10px;
  }
  .incomplete-tasks div h5 {
    font-size: 13px;
    font-weight: 500;
  }
  .incomplete-tasks div h5 .task-number {
    width: 20px;
    height: 20px;
    font-size: 10px;
  }
  .incomplete-tasks div p {
    font-size: 12px;
    margin-left: 20px;
  }
}
</style>
