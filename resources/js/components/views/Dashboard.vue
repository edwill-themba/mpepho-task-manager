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
    <teleport to="#add-task">
      <transition name="modal-menu">
       <AddTask />
      </transition> 
    </teleport>
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
      userEmail: null,
      showModal: false
    };
  },
  created() {
    this.$store
      .dispatch("getCurrentUser")
      .then(response => {
        this.userName = response.data.name;
        this.userEmail = response.data.email;
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.dashboard {
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: -20px;
  position: absolute;
  background: #111111;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.sidebar {
  width: 22%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  background: #111111;
  position: fixed;
}
.main-content {
  width: 78%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  background: #292a2a;
  position: fixed;
  color: #111111;
}

/** add modal styling **/
.modal-menu-enter-active,
.modal-menu-leave-active {
  transition: all 0.8s ease;
}
.modal-menu-enter-from,
.modal-menu-leave-to {
  opacity: 0;
}
.modal-menu-enter-to {
  opacity: 1;
}
.modal-menu-leave-active {
  position: absolute;
}

/** end modal styling **/

@media (max-width: 800px) {
  .sidebar {
    width: 20%;
  }
  .main-content {
    width: 80%;
  }
}
</style>
