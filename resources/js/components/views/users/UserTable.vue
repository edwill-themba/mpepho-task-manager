<template>
    <div>
        <table class="table-users">
            <tr class="header-row">
                <th class="table-user-id">ID</th>
                <th class="table-user-row">Username</th>
                <th class="table-user-row">User Email</th>
                <th class="table-user-row">Register Date</th>
                <th class="table-user-row">Register Time</th>
                <th class="table-user-row">Add User Task</th>
            </tr>
            <tr v-for="(user,index) in  paginatedUsers" :key="index">
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
</template>

<script>
import formatTime from "@/mixins/formatDate.js";
import formatDate from "@/mixins/formatDate.js";
export default {
  name: "UserTable",
  mixins: [formatTime, formatDate],
  props: ["paginatedUsers"],
  created() {
    this.users = this.paginatedUsers;
  },
  data() {
    return {
      users: []
    };
  },
  methods: {
    addtask: function(user) {
      this.$emit("addtask",user);
    }
  }
};
</script>


<style scoped>
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
</style>
