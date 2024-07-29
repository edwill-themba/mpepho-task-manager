<template>
  <div>
    <!-- is loading status -->
    <div class="loading" v-if="isLoading">
      <p>loading...</p>
    </div>
    <div v-else>
      <!-- server error -->
      <div v-if="serverError" class="error">
        {{ error }}
      </div>
      <!-- end server error -->
      <div v-if="mytaskLength <= 0" class="no-tasks">
        <p>no pending tasks are found</p>
      </div>
      <div v-else class="pending-tasks">
        <div v-for="(task,index) in mytasks" :key="task.id">
          <h5>
            <span class="task-number">{{ index + 1 }}</span>
            {{ task.task_name }}
          </h5>
          <p>Due Date : {{ formatDate(task.task_date) }}</p>
          <span class="days">{{ daysLeft(task.task_date) }} to complete</span>
          <span class="delete-task" v-on:click="deleteTask(task)">
            <FontAwesomeIcon icon="trash" />
          </span>
          <span class="finish-task" v-on:click="edit(task)">
            <FontAwesomeIcon icon="pencil" />
          </span>
        </div>
      </div>
    </div>
    <!-- update task -->
    <teleport to="#update-task">
      <transition name="update-task">
        <div class="update-task-modal" v-if="showModal">
          <UpdateTask v-bind:task="task" v-on:closeModal="closeModal" />
        </div>
      </transition>
    </teleport>
    <!-- modal -->
  </div>
</template>

<script>
import Error from "../server-error/Error.vue";
import UpdateTask from "../forms/UpdateTask.vue";
import formatDate from "@/mixins/formatDate.js";
import formatTime from "@/mixins/formatDate.js";
import daysLeft from "@/mixins/formatDate.js";
import isLoading from "@/mixins/isLoading.js";
export default {
  mixins: [formatDate, formatTime, isLoading, daysLeft],
  name: "MyTasks",
  components: {
    Error,
    UpdateTask
  },
  computed: {
    mytasks() {
      return this.$store.getters.getMyTasks;
    },
    mytaskLength() {
      return this.$store.getters.getMyTasksLength;
    }
  },
  data() {
    return {
      serverError: false,
      error: undefined,
      task: {
        id: "",
        task_name: "",
        task_date: "",
        priority: "",
        status: ""
      },
      tasks: [],
      showModal: false // show edit modal
    };
  },
  created() {
    this.myTasks();
  },
  methods: {
    // delete selected user task
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
    },
    // show edit modal
    edit: function(task) {
      this.task = task;
      this.showModal = true;
    },
    // get all the current pending tasks
    myTasks: function() {
      this.$store
        .dispatch("userTasks")
        .then(response => {
          this.tasks = response.data.myTasks;
        })
        .catch(error => {
          this.serverError = true;
          this.error = error;
        });
    },
    // closes modal
    closeModal: function() {
      this.showModal = false;
    }
  }
};
</script>

<style scoped>
.pending-tasks {
  width: 100%;
  height: 520px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  overflow-y: scroll;
}
.pending-tasks div {
  width: 96%;
  height: 85px;
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
  font-size: 17px;
  color: #e4e4e4;
  font-weight: 300;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pending-tasks div p {
  font-weight: 400;
  font-size: 15px;
  color: orange;
  margin-top: 0px;
  margin-bottom: 2px;
  padding-bottom: 5px;
  margin-left: 4%;
}
.pending-tasks div .days {
  font-weight: 400;
  font-size: 15px;
  color: yellowgreen;
  margin-top: 0px;
  margin-bottom: 2px;
  padding-bottom: 5px;
  margin-left: 4%;
}
.pending-tasks div h5 .task-number {
  z-index: 99;
  border-radius: 50%;
  background: orange;
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
.pending-tasks div .delete-task {
  position: absolute;
  bottom: 5px;
  right: 10px;
  color: red;
  font-weight: bold;
  cursor: pointer;
  margin-right: 0.5%;
  font-size: 20px;
}

.pending-tasks div .finish-task {
  position: absolute;
  top: 5px;
  right: 10px;
  color: green;
  font-weight: bold;
  cursor: pointer;
  margin-right: 0.5%;
  font-size: 20px;
}
/** modal **/
.update-task-modal {
  width: 100%;
  height: 100%;
  background: rgba(216, 205, 205, 0.8);
  z-index: 1000;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}
.update-task-enter-active,
.update-task-leave-active {
  transition: 0.8s ease;
}
.update-task-enter-from,
.update-task-leave-to {
  opacity: 0;
}
.update-task-enter-to {
  opacity: 1;
}
.update-task-leave-active {
  position: absolute;
}
/** modal **/

@media (max-width: 1144px) {
  .pending-tasks div {
    height: auto;
    padding: 5px;
  }
  .pending-tasks div h5 {
    font-size: 13.5px;
    font-weight: 500;
  }
  .pending-tasks div h5 .task-number {
    width: 20px;
    height: 20px;
    font-size: 10px;
  }
  .pending-tasks div p {
    font-size: 13px;
    margin-top: 10px;
  }
  .pending-tasks div .days {
    font-size: 13px;
  }
  .pending-tasks div .finish-task {
    font-size: 14px;
  }
  .pending-tasks div .delete-task {
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .pending-tasks div h5 {
    font-size: 13px;
    font-weight: 500;
  }
  .pending-tasks div h5 .task-number {
    width: 20px;
    height: 20px;
    font-size: 10px;
  }
  .pending-tasks div p {
    font-size: 12px;
  }
  .pending-tasks div .days {
    font-size: 12px;
  }
  .pending-tasks div .finish-task {
    font-size: 14px;
  }
  .pending-tasks div .delete-task {
    font-size: 14px;
  }
}
</style>
