<template>
    <div class="dashboard-content">
       <div class="pending">
          <h3>Current Pending Tasks</h3>
          <!-- current pending task  -->
          <MyTasks v-bind:tasks="tasks" />
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
</template>


<script>
import NoTask from "../tasks-components/NoTask.vue";
import CompleteTasks from "./CompleteTasks.vue";
import IncompleteTasks from "./IncompleteTasks.vue";
import MyTasks from "./MyTasks.vue";
export default {
  name: "Content",
  components: {
    NoTask,
    MyTasks,
    CompleteTasks,
    IncompleteTasks
  },
  computed: {
    currentName() {
      return this.$store.getters.currentName;
    }
  },
  data() {
    return {
      tasks: [] // tasks of the user logged in
    };
  },
  mounted() {
    this.allMyTasks();
  },
  methods: {
    allMyTasks() {
      this.$store
        .dispatch("userTasks")
        .then(response => {
          this.tasks = response.data.myTasks;
        })
        .catch(error => {
          console.log("error" + error);
        });
    }
  }
};
</script>

<style scoped>
.dashboard-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}
.pending {
  margin: 10px;
}
.pending h3 {
  padding: 5px;
  margin: 5px auto;
  font-size: 25px;
}
.in-complete-task {
  margin: 30px 10px;
}
.in-complete-task h3 {
  padding: 5px;
  margin: 5px auto;
  font-size: 25px;
  color: blue;
}
</style>
