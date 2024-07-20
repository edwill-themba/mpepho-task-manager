<template>
  <div class="sidebar-content">
    <h2>Dashboard</h2>
    <ul class="view-my-task">
      <li v-on:click="displayPendingTask">
        <span v-tooltip="'pending tasks'">
          <FontAwesomeIcon icon="list" />
        </span>
        <h3>VIEW MY TASKS</h3>
      </li>
      <li class="complete" v-on:click="displayCompleteTasks">
        <span v-tooltip="'complete tasks'">
          <FontAwesomeIcon icon="list" />
        </span>
        <h3>COMPLETE TASKS</h3>
      </li>
      <li class="incomplete" v-on:click="displayInCompleteTasks">
        <span v-tooltip="'incomplete tasks'">
          <FontAwesomeIcon icon="list" />
        </span>
        <h3>INCOMPLETE TASK</h3>
      </li>
      <li v-on:click="activate">
        <span v-tooltip="'add task'">
          <FontAwesomeIcon icon="plus" />
        </span>
        <h3>ADD NEW TASK</h3>
      </li>
      <!-- if user is supervisor -->
      <li v-if="roleID == supervisorRoleID" v-on:click="displayUsers">
        <span v-tooltip="'view users'">
          <FontAwesomeIcon icon="user" />
        </span>
        <h3>VIEW USERS</h3>
      </li>
      <!-- if user is supervisor -->
      <li v-if="roleID == supervisorRoleID" v-on:click="displaySupervisedTask">
        <span v-tooltip="'my supervised tasks'">
          <FontAwesomeIcon icon="user" />
        </span>
        <h3>MY SUPERVISED TASK</h3>
      </li>
      <li v-on:click="goBack">
        <span v-tooltip="'home page'">
          <FontAwesomeIcon icon="home" />
        </span>
        <p>Home</p>
      </li>
      <li v-on:click="signOut">
        <span v-tooltip="'sign out'">
          <FontAwesomeIcon icon="power-off" />
        </span>
        <p>Sign Out</p>
      </li>
    </ul>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "Sidebar",
  data() {
    return {
      supervisorRoleID: 1
    };
  },
  computed: {
    roleID() {
      return this.$store.getters.getUserRoleId;
    }
  },
  methods: {
    // logs the user out
    signOut: function() {
      this.$router.push({ path: "/signout" });
    },
    // go back to home page
    goBack: function() {
      this.$router.push({ path: "/" });
    },
    // activates the add task modal
    activate: function() {
      this.$store.dispatch("activateAddTask", true);
    },
    // the action to be taken to display on right side of the dashboard
    displayPendingTask: function() {
      this.$store.dispatch("dashBoardDisplay", "view_tasks").catch(error => {
        new Swal({
          icon: "warning",
          title: "sorry can't display something went,please refresh",
          timer: 5000
        });
      });
    },
    // display complete tasks
    displayCompleteTasks: function() {
      this.$store
        .dispatch("dashBoardDisplay", "complete_tasks")
        .catch(error => {
          new Swal({
            icon: "warning",
            title: "sorry can't display something went,please refresh",
            timer: 5000
          });
        });
    },
    // displays complete tasks
    displayInCompleteTasks: function() {
      this.$store
        .dispatch("dashBoardDisplay", "incomplete_tasks")
        .catch(error => {
          new Swal({
            icon: "warning",
            title: "sorry can't display something went,please refresh",
            timer: 5000
          });
        });
    },
    // display users
    displayUsers: function() {
      this.$store.dispatch("dashBoardDisplay", "users").catch(error => {
        new Swal({
          icon: "warning",
          title: "sorry can't display something went,please refresh",
          timer: 5000
        });
      });
    },
    // display supervised task
    displaySupervisedTask: function() {
      this.$store
        .dispatch("dashBoardDisplay", "supervised_tasks")
        .catch(error => {
          new Swal({
            icon: "warning",
            title: "sorry can't display something went,please refresh",
            timer: 5000
          });
        });
    }
  }
};
</script>

<style scoped>
.sidebar-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 10px;
  margin: 30px;
}
.sidebar-content h2 {
  color: darkgray;
  font-weight: 500;
  font-size: 21px;
}
/** view my task **/
.view-my-task {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  cursor: pointer;
  margin-top: 20px;
}
.view-my-task li {
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  margin-top: 25px;
}

.view-my-task li h3 {
  margin-left: 15px;
  font-size: 20px;
  font-weight: 300;
}
.view-my-task .incomplete span {
  color: red;
}
.view-my-task .complete span {
  color: green;
}

.view-my-task li p {
  font-size: 16px;
  margin-left: 10px;
}
.view-my-task li:hover {
  color: coral;
}
@media (max-width: 1148px) {
  .view-my-task {
    margin-left: -10px;
  }
  .sidebar-content h2 {
    font-size: 17px;
  }
  .view-my-task li h3 {
    font-size: 16px;
  }
}
@media (max-width: 947px) {
  .view-my-task li p {
    display: none;
  }
  .view-my-task li h3 {
    display: none;
  }
  .sidebar-content h2 {
    display: none;
  }
}
@media (max-width: 800px) {
  .view-my-task li p {
    display: none;
  }
  .view-my-task li h3 {
    display: none;
  }
  .sidebar-content h2 {
    display: none;
  }
}
</style>
