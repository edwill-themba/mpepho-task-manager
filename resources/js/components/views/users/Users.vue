<template>
  <div>
    <!-- set isLoading when component load -->
    <div v-if="isLoading" class="loading">
      <p>please wait...</p>
    </div>
    <div v-else class="wrapper-container">
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
          <!-- search user and pagination -->
          <div class="find-user">
            <SearchUser v-on:search="search" />
            <DashPagination v-if="!searchUser" v-bind:usersLength="usersLength" v-bind:perPage="5" v-on:getPage="getPage" />
          </div>
          <!-- search user results -->
          <div class="search-user-results" v-if="searchUser">
            <SearchUserResults v-bind:searchResultsLength="searchResultsLength" v-bind:searchResults="searchResults" />
          </div>
          <div class="table-wrapper" v-if="!searchUser">
            <!--  table to display all users -->
            <UserTable v-bind:paginatedUsers="paginatedUsers" v-on:addtask="addtask" />
            <!-- end table to display users -->
          </div>
        </div>
      </div>
    </div>
    <!-- add supervisor task modal -->
    <teleport to="#supervisor-user-task-modal">
      <transition name="supervisor-task">
        <div class="supervisor-task-modal" v-if="createTask">
          <SupervisorTask v-bind:userId="userId" v-on:closeModal="closeModal" />
        </div>
      </transition>
    </teleport>
    <!-- end supervisor task modal -->
  </div>
</template>

<script>
import isLoading from "@/mixins/isLoading.js";
import SupervisorTask from "../forms/SupervisorTask.vue"; // supervisor add task modal
import SearchUser from "./SearchUser.vue"; // search user component
import SearchUserResults from "./SearchUserResults.vue";
import DashPagination from "../dashboard-components/DashPagination.vue";
import UserTable from "./UserTable.vue";
import Swal from "sweetalert2";
export default {
  name: "Users",
  components: {
    SupervisorTask,
    SearchUser,
    SearchUserResults,
    DashPagination,
    UserTable
  },
  data() {
    return {
      users: [], // empty array users
      serverError: false, // server error set to false
      error: undefined, // error message set to undefined
      usersLength: undefined, // number of users
      createTask: false, // activates create task set to false
      userId: "", // user id for creation of user tasks
      searchUser: false, // search user set to false
      searchResults: null, // search results set to null
      searchResultsLength: undefined, // number of users found in that search results
      page: 1, // starting page set default to 1
      perPage: 6 // displayed per page
    };
  },
  // call get users on mounted
  created() {
    this.getAllUsers();
  },
  computed: {
    // get the number of users displayed per page
    paginatedUsers() {
      const firstIndex = (this.page - 1) * this.perPage;
      const lastIndex = this.page * this.perPage;
      return this.users.slice(firstIndex, lastIndex);
    }
  },
  methods: {
    // gets all users that are subordinates
    getAllUsers: function() {
      this.$store
        .dispatch("getUsers")
        .then(response => {
          this.users = response.data.users;
          this.usersLength = this.users.length;
        })
        .catch(error => {
          this.serverError = true; // sets the server error to true
          this.error = error; // sets the error message to error
          console.log(error);
        });
    },
    // activates add supervisor task
    addtask: function(user) {
      this.createTask = true;
      this.userId = user.id;
    },
    // closes the add supervisor task modal
    closeModal: function() {
      this.createTask = false;
    },
    // calls the search for specific user or users
    search: function(query) {
      this.searchUser = true; // sets the search user to true
      this.$store
        .dispatch("searchUser", query)
        .then(response => {
          this.searchResults = response.data.search_results;
          this.searchResultsLength = this.searchResults.length;
        })
        .catch(error => {
          new Swal({
            icon: "warning",
            title: error.response.data.message,
            timer: 4000
          });
          console.log(error);
        });
    },
    // gets the current page number and number to display
    getPage: function(page, perPage) {
      this.page = page;
      this.perPage = perPage;
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
.search-user-results {
  margin-top: 30px;
  padding: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.supervisor-task-enter-active,
.supervisor-task-leave-active {
  transition: all 0.8s ease;
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
