<template>
  <div>
    <div class="wrapper-container">
      <!-- check for server error -->
      <div v-if="serverError" class="error">
        <p>{{ error }}</p>
      </div>
      <div v-if="!serverError" class="users-tasks">
        <!-- checks if task length is zero -->
        <div v-if="usersLength <= 0 " class="no-tasks">
           <p>no users are found</p>
        </div>
        <div v-else class="users-list">
             <table class="table-users">
               <tr class="header-row">
                 <th class="table-user-id">User No</th>
                 <th class="table-user-row">Username</th>
                 <th class="table-user-row">User Email</th>
                 <th class="table-user-row">Register Date</th>
                 <th class="table-user-row">Register Time</th>
                 <th class="table-user-row">Add User Task</th>
               </tr>
               <tr v-for="(user,index) in users" :key="index">
                 <td class="table-user-id">{{ index + 1 }}</td>
                 <td class="table-user-row">{{ user.name }}</td>
                 <td class="table-user-row">{{ user.email }}</td>
                 <td class="table-user-row-date">{{ formatDate(user.created_at) }}</td>
                 <td class="table-user-row-date">{{ formatTime(user.created_at) }}</td>
                 <td class="table-user-row" v-on:click="addtask(user)">
                   <span class="create-task">create task for this user</span>
                 </td>
               </tr>
           </table>
        </div>
      </div>
    </div>
    <!-- add supervisor task modal -->
    <teleport to="#supervisor-user-task-modal">
      <transition name="supervisor-task">
         <div class="supervisor-task-modal" 
           v-if="createTask">
           <SupervisorTask 
            v-bind:userId="userId"
            v-on:closeModal="closeModal"
            />
         </div>
      </transition>
    </teleport>
    <!-- end supervisor task modal -->
  </div>
</template>

<script>
import formatDate from "@/mixins/formatDate.js";
import formatTime from "@/mixins/formatDate.js";
import SupervisorTask from "../forms/SupervisorTask.vue";
export default {
  mixins: [formatDate],
  name: "Users",
  components: {
    SupervisorTask
  },
  data() {
    return {
      users: [],
      serverError: false,
      error: undefined,
      usersLength: undefined,
      createTask: false,
      userId: ""
    };
  },
  mounted() {
    this.getAllUsers();
  },
  methods: {
    getAllUsers: function() {
      this.$store
        .dispatch("getUsers")
        .then(response => {
          this.users = response.data.users;
          this.usersLength = this.users.length;
        })
        .catch(error => {
          this.serverError = true;
          this.error = error;
          console.log(error);
        });
    },
    addtask: function(user) {
      this.createTask = true;
      this.userId = user.id;
    },
    closeModal: function() {
      this.createTask = false;
    }
  }
};
</script>

<style scoped>
.users-tasks {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.users-list {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.table-users {
  border-collapse: collapse;
  border: 2px solid #e4e4e4;
  margin-top: 15px;
}
.table-user-id {
  width: 80px;
  height: auto;
  padding-left: 10px;
  border: 2px solid #e4e4e4;
  font-weight: 400;
  font-size: 15px;
}
.header-row {
  background: darkgreen;
}
.create-task {
  color: lime;
  cursor: pointer;
}
.table-user-row {
  width: 200px;
  height: auto;
  padding: 10px;
  border: 2px solid #e4e4e4;
  font-weight: 400;
  font-size: 15px;
}
.table-user-row-date {
  width: 80px;
  height: auto;
  padding: 10px;
  border: 2px solid #e4e4e4;
  font-weight: 400;
  font-size: 15px;
}
.supervisor-task-modal {
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
.supervisor-task-enter-active,
.supervisor-task-leave-active {
  transition: 0.8s ease;
}
.supervisor-task-enter-from,
.supervisor-task-leave-to {
  opacity: 0;
}
.supervisor-task-enter-to {
  opacity: 1;
}
.supervisor-task-leave-active {
  position: absolute;
}
</style>
