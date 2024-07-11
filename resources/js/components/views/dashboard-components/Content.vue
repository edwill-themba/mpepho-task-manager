<template>
 <div>
   <p class="user-name">Hello {{ userName }}</p>
  <div class="dashboard-content">
      <div class="pending">
        <h3>Current Pending Tasks</h3>
         <!-- current pending task  -->
         <MyTasks/>
      </div>   
      <div class="in-complete-task">
         <!-- incomplete task by the user -->
          <h3>Incomplete Tasks</h3>
         <IncompleteTasks />
      </div>
      <div class="complete-task">
        <!-- complete tasks -->
        <h3>Complete Tasks</h3>
        <CompleteTasks />
      </div>
    </div>
 </div>
</template>


<script>
import CompleteTasks from "./CompleteTasks.vue";
import IncompleteTasks from "./IncompleteTasks.vue";
import MyTasks from "./MyTasks.vue";

export default {
  name: "Content",
  components: {
    MyTasks,
    CompleteTasks,
    IncompleteTasks
  },
  computed: {
    // get the current login users name
    userName() {
      return this.$store.getters.currentName;
    }
  }
};
</script>

<style scoped>
.user-name {
  margin-top: 10px;
  margin-left: 20px;
  padding-top: 10px;
  padding-left: 10px;
  color: #e4e4e4;
  font-size: 18px;
  font-weight: bold;
  color: darkgray;
}
.dashboard-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  color: #e4e4e4;
}
.pending {
  margin: 15px;
}
.pending h3 {
  padding: 5px;
  margin: 15px 10px;
  font-size: 21px;
  font-weight: 300;
  color: #e4e4e4;
}
.in-complete-task {
  margin: 30px 10px;
}
.in-complete-task h3 {
  margin: 9px auto;
  font-size: 22px;
  color: #e4e4e4;
  text-align: center;
  font-weight: 300;
}
.complete-task {
  margin: 30px;
}
.complete-task h3 {
  padding: 5px;
  margin: 5px auto;
  font-size: 22px;
  color: #e4e4e4;
  text-align: center;
  font-weight: 300;
}
</style>
