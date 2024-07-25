<template>
  <div>
    <div class="container-task">
      <div class="my-supervisor-task">
        <!-- supervised tasks -->
        <div v-for="(task,index) in  allSupervisedTasks" :key="index">
          <h5>
            <span>
              <FontAwesomeIcon icon="header" />
            </span>
            {{ task.task_name }}
          </h5>
          <p>Task Assigned To : {{ task.name }}</p>
          <span class="due">Due Date : {{ formatDate(task.task_date) }}</span>
          <span class="update" v-on:click="openModal(task)">
            <FontAwesomeIcon icon="pencil" />
          </span>
          <span class="delete" v-on:click="removeTask(task)">
            <FontAwesomeIcon icon="trash" />
          </span>
        </div>
        <!-- end supervised tasks -->
      </div>
    </div>
    <!-- update supervisor user task modal -->
    <teleport to="#supervisor-update-task-modal">
      <transition name="update-supervisor-task">
        <div class="update-supervisor-task-modal" v-if="updateTask">
          <UpdateSupervisorTask v-on:closeModal="closeModal" v-bind:task="task" />
        </div>
      </transition>
    </teleport>
    <!-- end code for modal -->
  </div>
</template>


<script>
import formatDate from "@/mixins/formatDate.js";
import UpdateSupervisorTask from "../forms/UpdateSupervisorTask.vue"; // update supervisor task
import Swal from "sweetalert2";

export default {
  mixins: [formatDate],
  props: ["supervisedTasks"], // sends supervised task as props
  name: "TaskTable",
  components: {
    UpdateSupervisorTask
  },
  data() {
    return {
      updateTask: false, // activate update set to false
      task: {
        id: "",
        task_name: "",
        task_date: "",
        priority: "",
        status: ""
      } // task object set to empty string
    };
  },
  computed: {
    // gets the current supervisor name
    supervisorName() {
      return this.$store.getters.currentName;
    },
    // gets all tasks supervised by current supervisor
    allSupervisedTasks() {
      return this.$store.getters.mySupervisedTasks;
    }
  },
  methods: {
    // opens the modal form and set this task to task recieved
    openModal: function(task) {
      this.task = task;
      this.updateTask = true;
    },
    // close the modal form
    closeModal: function() {
      this.updateTask = false;
    },
    // remove the selected task supervised by the supervisor
    removeTask: function(task) {
      let deleteTask = confirm("Are you sure you want to remove this task?");
      if (deleteTask) {
        this.$store
          .dispatch("deleteMySupervisedTask", task)
          .then(() => {
            new Swal({
              icon: "success",
              title: "Task was removed successfully",
              timer: 3000
            });
          })
          .catch(error => {
            new Swal({
              icon: "warning",
              title: error.response.data.message,
              timer: 4000
            });
            console.log(error);
          });
      }
    }
  }
};
</script>

<style scoped>
.container-task {
  width: 90%;
  height: 100%;
  margin: 0px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.my-supervisor-task {
  width: 100%;
  height: 520px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  overflow-y: scroll;
}
.my-supervisor-task div {
  width: 81vw;
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

.my-supervisor-task div h5 {
  font-size: 17px;
  color: #e4e4e4;
  font-weight: 300;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
}
.my-supervisor-task div h5 span {
  margin-right: 5px;
  font-size: 15px;
  color: purple;
}
.my-supervisor-task div p {
  font-weight: 400;
  font-size: 15px;
  color: orange;
  margin: 1px 0px 5px 0px;
  padding-bottom: 5px;
  text-transform: uppercase;
}
.my-supervisor-task div .due {
  color: lime;
  font-size: 13px;
  margin-top: -5px;
  margin-bottom: 2px;
  padding-bottom: 5px;
  text-transform: uppercase;
}
.my-supervisor-task div .update {
  position: absolute;
  top: 10px;
  right: 10px;
  color: green;
  cursor: pointer;
}
.my-supervisor-task div .delete {
  position: absolute;
  right: 10px;
  bottom: 10px;
  color: red;
  cursor: pointer;
}
/** update modal styling **/
.update-supervisor-task-modal {
  width: 100%;
  height: 100%;
  background: rgba(216, 205, 205, 0.8);
  z-index: 99;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}
/** modal transition **/
.update-supervisor-task-enter-active,
.update-supervisor-task-leave-active {
  transition: 0.8s ease;
}
.update-supervisor-task-enter-from,
.update-supervisor-task-leave-to {
  opacity: 0;
}
.update-supervisor-task-enter-to {
  opacity: 1;
}
.update-supervisor-task-leave-active {
  position: absolute;
}
@media (max-width: 1144px) {
  .my-supervisor-task {
    height: 500px;
  }
  .my-supervisor-task div {
    height: auto;
    padding: 5px;
  }
  .my-supervisor-task div h5 {
    font-size: 14px;
    font-weight: 500;
  }

  .my-supervisor-task div p {
    font-size: 13px;
    margin-top: 10px;
  }
  .my-supervisor-task div {
    font-size: 13px;
  }
  .my-supervisor-task div .update {
    font-size: 14px;
  }
  .my-supervisor-task div .delete {
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .my-supervisor-task {
    margin-left: -1px;
  }
  .my-supervisor-task div {
    width: 75vw;
    height: auto;
    padding: 10px;
    margin-left: -1px;
  }
  .my-supervisor-task div h5 {
    font-size: 13.5px;
    font-weight: 500;
    margin-left: -1px;
  }
  .my-supervisor-task div p {
    font-size: 13px;
  }

  .my-supervisor-task div .update {
    font-size: 14px;
  }
  .my-supervisor-task div .delete {
    font-size: 14px;
  }
}
</style>
