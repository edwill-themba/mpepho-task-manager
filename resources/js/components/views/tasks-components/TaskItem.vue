<template>
  <div class="tasks-list">
    <div v-for="task in  paginatedTasks" :key="task.id">
      <div :class="task.priority" class="box">
        <h6>
          <span class="ellipsis">
            <FontAwesomeIcon icon="ellipsis-vertical" />
          </span> {{ task.task_name }}
        </h6>
        <p>{{task.name}}</p>
        <span>
          Creation Date
          <FontAwesomeIcon icon="calendar" /> {{ formatDate(task.created_at) }} at
          <FontAwesomeIcon icon="clock" /> {{ formatTime(task.created_at) }}
        </span>
        <span>Scheduled for
          <FontAwesomeIcon icon="calendar" /> {{ formatDate(task.task_date) }}
        </span>
        <span class="days-left">{{ daysLeft(task.task_date) }} left</span>
      </div>
    </div>
  </div>
</template>

<script>
import formatDate from "@/mixins/formatDate.js";
import daysLeft from "@/mixins/formatDate.js";
export default {
  mixins: [formatDate, daysLeft],
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
.days-left {
  font-weight: 400;
  color: #fff;
  background: #2f2828;
  width: 50%;
  border-radius: 50%;
  text-align: center;
  margin: 5px 2px;
}
</style>
