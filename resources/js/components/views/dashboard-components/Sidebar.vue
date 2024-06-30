<template>
    <div class="sidebar-content">
       <div class="view-my-task">
         <span><FontAwesomeIcon icon="list" /></span>
          <h3>{{ viewTask ? 'VIEW MY TASKS' : 'HIDE MY TASKS'}}</h3>
       </div>
       <div class="add-task">
         <span><FontAwesomeIcon icon="plus" /></span>
          <h3>ADD NEW TASK</h3>
       </div>
       <div class="logout-area" v-on:click="signOut">
          <span><FontAwesomeIcon icon="arrow-left" /></span> 
           <p>Sign Out</p>
       </div>
    </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      viewTask: true
    };
  },
  methods: {
    signOut: function() {
      this.$router.push({ path: "/signout" });
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
/** view my task **/
.view-my-task {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-top: 20px;
}
.view-my-task h3 {
  margin-left: 15px;
  font-size: 20px;
}
/** add new task **/
.add-task {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-top: 20px;
}
.add-task h3 {
  margin-left: 15px;
  font-size: 20px;
}
/** logout area **/
.logout-area {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-top: 20px;
}
.logout-area span {
  font-size: 17px;
  border-radius: 50%;
  text-align: center;
  background: #111111;
  color: #fff;
}
.logout-area p {
  margin-left: 15px;
  font-size: 17px;
}
.logout-area:hover {
  color: coral;
}
@media (max-width: 800px) {
  .logout-area p {
    display: none;
  }
  .view-my-task h3 {
    display: none;
  }
  .add-task h3 {
    display: none;
  }
}
</style>
