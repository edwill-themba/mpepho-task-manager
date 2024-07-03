<template>
  <div>
    <div class="dashboard">
       <div class="sidebar">
         <Sidebar />
      </div>
       <div class="main-content">
         <Content/>
       </div>
    </div>
    <!-- add task -->
    <AddTask />
    <!-- end add task -->
  </div>
</template>


<script>
import Sidebar from "./dashboard-components/Sidebar.vue";
import Content from "./dashboard-components/Content.vue";
import AddTask from "./forms/AddTask.vue";
export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Content,
    AddTask
  },
  data() {
    return {
      userName: null,
      userEmail: null
    };
  },
  created() {
    this.$store
      .dispatch("getCurrentUser")
      .then(response => {
        this.userName = response.data.name;
        this.userEmail = response.data.email;
        //console.log(this.user_name, this.user_email);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {}
};
</script>

<style scoped>
.dashboard {
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  margin: -20px;
  position: absolute;
  background: #111111;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.sidebar {
  width: 30%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  background: #111111;
  position: fixed;
}
.main-content {
  width: 70%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  position: fixed;
  color: #111111;
}

@media (max-width: 800px) {
  .sidebar {
    width: 20%;
  }
  .main-content {
    width: 80%;
  }
}
</style>
