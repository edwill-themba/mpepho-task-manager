<template>
    <div class="sidebar-content">
        <h2>Dashboard</h2>
       <ul class="view-my-task">
        <li>
         <span><FontAwesomeIcon icon="list" /></span>
          <h3>VIEW MY TASKS</h3>
       </li>
       <li v-on:click="activate">
         <span><FontAwesomeIcon icon="plus"  /></span>
          <h3>ADD NEW TASK</h3>
       </li>
        <li>
         <span><FontAwesomeIcon icon="user" /></span>
          <h3>VIEW EMPLOYEES</h3>
       </li>
        <li class="complete">
         <span><FontAwesomeIcon icon="list" /></span>
          <h3>COMPLETE TASKS</h3>
       </li>
        <li class="incomplete">
         <span><FontAwesomeIcon icon="list" /></span>
          <h3>INCOMPLETE TASK</h3>
       </li>
        <li v-on:click="goBack">
          <span><FontAwesomeIcon icon="home" /></span> 
          <p>Home</p>
       </li>
       <li  v-on:click="signOut">
          <span><FontAwesomeIcon icon="power-off"  /></span> 
          <p>Sign Out</p>
       </li>
       </ul>
    </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      
    };
  },
  methods: {
    signOut: function() {
      this.$router.push({ path: "/signout" });
    },
    goBack: function() {
      this.$router.push({ path: "/" });
    },
    activate: function() {
      this.$store.dispatch("activateAddTask", true);
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
  color: purple;
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
}
.view-my-task .incomplete span {
  color: orangered;
}
.view-my-task .complete span {
  color: green;
}

.view-my-task li p {
  font-size: 17px;
  margin-left: 10px;
}
.view-my-task li:hover {
  color: coral;
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
