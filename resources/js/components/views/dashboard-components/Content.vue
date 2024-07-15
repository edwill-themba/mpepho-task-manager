<template>
 <div>
  <div class="dashboard-content">
      <div class="dashboard-header">
          <div class="date-time">
             <span><FontAwesomeIcon icon="calendar" /></span> 
              <strong>{{ formatDate(todayDate) }}</strong>
          </div>
          <div class="user-name">
             <p><span><FontAwesomeIcon icon="user" /></span> {{ userName }}</p>
          </div>
      </div>
      <div  v-if="view == views.viewPendingTasks" class="pending" >
       <h3>Current Pending Tasks</h3>
         <!-- current pending task  -->
         <MyTasks/>
       </div>   
      <div v-else-if="view == views.viewIncompleteTasks" class="in-complete-task">
         <!-- incomplete task by the user -->
          <h3>Incomplete Tasks</h3>
         <IncompleteTasks />
      </div>
      <div v-else-if="view == views.viewCompleteTasks" class="complete-task">
        <!-- complete tasks -->
        <h3>Complete Tasks</h3>
        <CompleteTasks />
      </div>
      <div v-else-if="view == views.viewUsers" class="users">
        <!-- users component -->
        <h3>Users</h3>
        <Users />
      </div>
      <div v-else-if="view == views.viewSupervisedTasks" class="task-supervised">
        <!-- users component -->
        <h3>My Supervised Tasks</h3>
        <TaskForUser />
      </div>
    </div>
 </div>
</template>


<script>
import CompleteTasks from "./CompleteTasks.vue";
import IncompleteTasks from "./IncompleteTasks.vue";
import MyTasks from "./MyTasks.vue";
import Users from "../users/Users.vue";
import TaskForUser from "../users/TaskForUser.vue";

import formatDate from "@/mixins/formatDate.js";
import formatTime from "@/mixins/formatDate.js";
export default {
  name: "Content",
  mixins: [formatDate, formatTime],
  components: {
    MyTasks,
    CompleteTasks,
    IncompleteTasks,
    Users,
    TaskForUser
  },
  computed: {
    // get the current login users name
    userName() {
      return this.$store.getters.currentName;
    },
    view() {
      return this.$store.getters.isView;
    }
  },
  data() {
    return {
      views: {
        viewPendingTasks: "view_tasks",
        viewIncompleteTasks: "incomplete_tasks",
        viewCompleteTasks: "complete_tasks",
        viewUsers: "users",
        viewSupervisedTasks: "supervised_tasks"
      },
      todayDate: new Date()
    };
  }
};
</script>

<style scoped>
/** dashboard **/
.dashboard-header {
  width: 100%;
  height: auto;
  background: #646a6a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.dashboard-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  color: #e4e4e4;
  flex-direction: column;
}
/** end dashboard **/
/** dashboard header styling **/
.user-name {
  color: #e4e4e4;
  font-size: 15px;
  font-weight: 300;
  color: #e4e4e4;
  height: 100%;
  padding-top: 13px;
  padding-left: 15px;
  padding-bottom: 15px;
  padding-right: 20px;
}
.user-name span {
  margin-right: 5px;
  color: limegreen;
}
.date-time {
  margin-left: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 14px;
}
.date-time span {
  margin-left: 0px;
  padding-left: 10px;
  color: limegreen;
}
.date-time strong {
  margin-left: 7px;
  font-weight: 300;
}

/** end dashboard styling **/
.pending {
  width: 100%;
  margin: 0px;
}
.pending h3 {
  padding: 5px 10px;
  margin-left: 0px;
  margin-bottom: 10px;
  font-size: 21.5px;
  font-weight: 300;
  color: #fff;
  background: orange;
}
.in-complete-task {
  margin: 0px;
  width: 100%;
}
.in-complete-task h3 {
  padding: 5px 10px;
  margin-left: 0px;
  margin-bottom: 10px;
  font-size: 21.5px;
  font-weight: 300;
  color: #fff;
  background: red;
}
.complete-task {
  margin: 0px;
  width: 100%;
}
.complete-task h3 {
  padding: 5px 10px;
  margin-left: 0px;
  margin-bottom: 10px;
  font-size: 21.5px;
  font-weight: 300;
  color: #fff;
  background: green;
}
.users {
  margin: 0px;
  width: 100%;
}
.users h3 {
  padding: 5px 10px;
  margin-left: 0px;
  margin-bottom: 10px;
  font-size: 21.5px;
  font-weight: 300;
  color: #fff;
  background: green;
}
.task-supervised {
  margin: 0px;
  width: 100%;
}
.task-supervised h3 {
  padding: 5px 10px;
  margin-left: 0px;
  margin-bottom: 10px;
  font-size: 21.5px;
  font-weight: 300;
  color: #fff;
  background: yellowgreen;
}
</style>
