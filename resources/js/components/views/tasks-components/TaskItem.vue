<template>
    <div class="tasks-list">
       <div  v-for="task in tasks" :key="task.id">
         <div :class="task.priority" class="box">
            <h6>{{ task.task_name }}</h6>
            <p>{{task.name}}</p>
            <span>{{ task.email }}</span>
            <span>Created at {{ task.created_at }}</span>
            <span>Deadline is {{ task.task_date }}</span>
        </div>
       </div>
    </div>
</template>

<script>
//import luxon from "luxon";
export default {
  name: "TaskItem",
  props: ["tasks"],
  data() {
    return {};
  }
};
</script>

<style scoped>
.tasks-list {
  height: 100%;
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
}
.tasks-list .box {
  width: 280px;
  height: auto;
  padding: 5px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 6px;
  color: #111111;
  border: none;
}
.box h6 {
  font-size: 15px;
  color: #111111;
  font-weight: 800;
  width: 100%;
  text-decoration: underline;
  text-transform: uppercase;
}
.box span {
  font-size: 13px;
  font-weight: bold;
}
.low {
  background: limegreen;
}
.medium {
  background: orange;
}
.high {
  background: red;
}
</style>
