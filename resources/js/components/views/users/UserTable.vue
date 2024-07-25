<template>
  <div class="table-response">
    <!-- table display all users who are sarbordinates -->
    <table class="table-users">
      <tr class="header-row">
        <th class="table-user-id">ID</th>
        <th class="table-user-row">Username</th>
        <th class="table-user-row">User Email</th>
        <th class="table-user-row">Register Date</th>
        <th class="table-user-row">Register Time</th>
        <th class="table-user-row">Add User Task</th>
      </tr>
      <tr v-for="(user,index) in  allusers" :key="index">
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
    <!-- end table -->
  </div>
</template>

<script>
import formatTime from "@/mixins/formatDate.js";
import formatDate from "@/mixins/formatDate.js";
export default {
  name: "UserTable",
  mixins: [formatTime, formatDate],
  props: ["allusers"],
  created() {
    this.users = this.allusers;
  },
  data() {
    return {
      users: []
    };
  },
  methods: {
    addtask: function(user) {
      this.$emit("addtask", user);
    }
  }
};
</script>


<style scoped>
.table-response {
  height: 500px;
  overflow: auto;
  margin-top: 20px;
}
.table-users {
  border-collapse: collapse;
  margin-top: 25px;
}
.table-users tr:nth-child(even) {
  background: #ccc;
  color: #111111;
}
.table-user-id {
  width: 80px;
  height: auto;
  padding-left: 15px;
  font-weight: 400;
  font-size: 15px;
  text-align: center;
}
.header-row {
  background: darkgreen;
}
.create-task {
  color: coral;
  cursor: pointer;
}
.table-user-row {
  width: 200px;
  height: auto;
  padding: 10px;
  font-weight: 400;
  font-size: 15px;
  text-align: center;
}

.table-user-row-date {
  width: 80px;
  height: auto;
  padding-left: 10px;
  font-weight: 400;
  font-size: 15px;
  text-align: center;
}
@media (max-width: 1188px) {
  .table-response {
    margin-top: 20px;
    height: 400px;
    width: 100vw;
    overflow: scroll;
    position: fixed;
    left: 25%;
    top: 25%;
    right: 25%;
    bottom: 0;
  }
  .table-users {
    width: 100%;
    height: 100%;
    white-space: nowrap;
    margin-left: 0;
    table-layout: fixed;
    position: absolute;
    left: 0;
    top: 0;
  }

  .table-user-id {
    display: none;
  }
  .table-user-row {
    width: 150px;
    font-size: 13px;
  }
  .table-user-row-header {
    width: 150px;
    font-size: 13px;
  }
  .table-user-row-date {
    font-size: 13px;
  }
}
</style>
