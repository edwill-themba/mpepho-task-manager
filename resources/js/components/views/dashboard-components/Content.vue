<template>
    <div class="dashboard-content">
       <h1>Welcome to our new website !!</h1>
       <p><strong>{{ currentName }}</strong></p>
       <!--- if user has tasks -->
       <div v-if="tasks.length > 0">
          <div class="my-tasks">
             <h3>Your current Tasks</h3>
             <MyTasks v-bind:userTasks="userTasks" />
          </div>
       </div>
       <!-- if user has no tasks -->
       <div v-if="tasks.length === 0">
           <NoTask />
       </div>
    </div>
</template>


<script>
import NoTask from "../tasks-components/NoTask.vue";
import MyTasks from "./MyTasks.vue";
export default {
  name: "Content",
  components: {
    NoTask,
    MyTasks
  },
  computed: {
    currentName() {
      return this.$store.getters.currentName;
    },
    userTasks() {
      return this.$store.getters.getMyTasks;
    }
  },
  data() {
    return {
      tasks: [] // tasks of the user logged in
    };
  },
  created() {
    this.allMyTasks();
  },
  methods: {
    allMyTasks() {
      this.$store
        .dispatch("userTasks")
        .then(response => {
          this.tasks = response.data.myTasks;
          console.log(this.tasks);
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
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-right: 10px;
  margin-right: 20px;
  margin-top: 30px;
}
.dashboard-content h1 {
  text-transform: uppercase;
  font-size: 30px;
}
.dashboard-content p {
  font-size: 20px;
}
.my-tasks {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.my-tasks h3 {
  font-size: 23px;
  color: coral;
  text-transform: uppercase;
}
@media (max-width: 900px) {
  .dashboard-content {
    margin: 30px 1px;
    align-items: flex-start;
  }
  .dashboard-content h1 {
    font-size: 19px;
    margin-right: 10px;
  }
  .dashboard-content p {
    font-size: 17px;
  }
}
</style>
