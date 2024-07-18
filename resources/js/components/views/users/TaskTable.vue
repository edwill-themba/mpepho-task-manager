<template>
  <div>
    <div class="container-table">
      <div class="my-supervisor-task">
        <!-- table of the task supervised by the user -->
        <table class="my-supervisor-task-table">
          <tr class="row-header">
            <th class="col-id">Task ID</th>
            <th class="col-name">Task Name</th>
            <th class="col-date">Task Date</th>
            <th class="col-name">Task Assign To</th>
            <th class="col-name">supervisor Name</th>
            <th class="col-date">edit task</th>
            <th class="col-date">delete task</th>
          </tr>
          <tr v-for="(task,index) in allSupervisedTasks" :key="index">
            <td class="id">{{ index + 1 }}</td>
            <td class="col">{{ task.task_name }}</td>
            <td class="col-date-body">{{ formatDate(task.task_date) }}</td>
            <td class="col">{{ task.name }}</td>
            <td class="col">{{ supervisorName }}</td>
            <td class="col-date-body" v-on:click="openModal(task)">
              <span class="edit">
                <FontAwesomeIcon icon="pencil" /> edit
              </span>
            </td>
            <td class="col-date-body" v-on:click="removeTask(task)">
              <span class="delete">
                <FontAwesomeIcon icon="times" /> delete
              </span>
            </td>
          </tr>
        </table>
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
import UpdateSupervisorTask from "../forms/UpdateSupervisorTask.vue";
import Swal from "sweetalert2";

export default {
  mixins: [formatDate],
  props: ["supervisedTasks"],
  name: "TaskTable",
  components: {
    UpdateSupervisorTask
  },
  data() {
    return {
      updateTask: false,
      task: {
        id: "",
        task_name: "",
        task_date: "",
        priority: "",
        status: ""
      }
    };
  },
  computed: {
    supervisorName() {
      return this.$store.getters.currentName;
    },
    allSupervisedTasks() {
      return this.$store.getters.mySupervisedTasks;
    }
  },
  methods: {
    // opens the modal form
    openModal: function(task) {
      this.task = task;
      this.updateTask = true;
    },
    // close the modal form
    closeModal: function() {
      this.updateTask = false;
    },
    // remove the selected task supervised by the user
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
.my-supervisor-task-table {
  border-collapse: collapse;
  margin-top: 20px;
}
.row-header {
  background: #ccc;
}
/** col header styling **/
.col-id {
  width: 70px;
  padding-left: 5px;
  color: #111111;
  border: 2px solid #e4e4e4;
}
.col-name {
  width: 180px;
  padding-left: 5px;
  color: #111111;
  border: 2px solid #e4e4e4;
}
.col-date {
  width: 120px;
  padding-left: 5px;
  color: #111111;
  border: 2px solid #e4e4e4;
}
/** end of table header styling **/
/** body column styling **/
.id {
  width: 70px;
  padding-left: 10px;
  border: 2px solid #e4e4e4;
}
.col {
  width: 180px;
  padding-left: 5px;
  border: 2px solid #e4e4e4;
}
.col-date-body {
  width: 120px;
  padding-left: 5px;
  border: 2px solid #e4e4e4;
}
.col-date-body .edit {
  color: green;
  margin-left: 10px;
  cursor: pointer;
}
.col-date-body .delete {
  color: red;
  margin-left: 10px;
  cursor: pointer;
}
.create-task {
  margin-top: 5px 5px;
  cursor: pointer;
}
.create-task a {
  color: #e4e4e4;
  text-decoration: none;
}
.create-task a:hover {
  color: coral;
}
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
</style>
