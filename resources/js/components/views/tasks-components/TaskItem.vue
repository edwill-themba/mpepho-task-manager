<template>
    <div class="tasks-list">
       <div  v-for="task in  paginatedTasks" :key="task.id">
         <div :class="task.priority" class="box">
            <h6>{{ task.task_name }}</h6>
            <p>{{task.name}}</p>
            <span>{{ task.email }}</span>
            <span>
              Creation Date 
             <FontAwesomeIcon icon="calendar" />
             {{ formatDate(task.created_at) }} at
              <FontAwesomeIcon icon="clock" />
             {{ formatTime(task.created_at) }}
            </span>
            <span>Scheduled for 
             <FontAwesomeIcon icon="calendar" /> 
              {{ formatDate(task.task_date) }}
            </span>
        </div>
       </div>
    </div>
</template>

<script>
import formatDate from "@/mixins/formatDate.js";
import formatTime from "@/mixins/formatDate.js";
export default {
  mixins: [formatDate],
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
