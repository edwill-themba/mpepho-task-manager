<template>
    <div class="tasks-list">
       <div  v-for="task in  paginatedTasks" :key="task.id">
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
  props: ["paginatedTasks"],
  data() {
    return {};
  },
  created() {
    console.log(this.paginatedTasks);
  }
};
</script>

<style scoped>
</style>
