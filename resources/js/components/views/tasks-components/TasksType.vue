<template>
  <ul class="task-type">
    <li class="priority">
      <span>Task Priority</span>
    </li>
    <li class="priority-high">
      <span>
        <FontAwesomeIcon icon="square" />
      </span>High</li>
    <li class="priority-medium">
      <span>
        <FontAwesomeIcon icon="square" />
      </span>Medium</li>
    <li class="priority-low">
      <span>
        <FontAwesomeIcon icon="square" />
      </span>Low</li>
  </ul>
</template>


<script>
export default {
  name: "TasksType"
};
</script>
 
 <style scoped>
.task-type {
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.task-type li {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
}
.task-type li span {
  font-size: 14px;
  font-weight: 200;
}
.task-type .priority span {
  font-size: 16px;
  font-weight: 400;
}
.task-type .priority-high {
  color: #e4e4e4;
}
.task-type .priority-high span {
  color: #ce1010;
  margin: 5px;
}
.task-type .priority-medium {
  color: #e4e4e4;
}
.task-type .priority-medium span {
  color: orange;
  margin: 5px;
}
.task-type .priority-low {
  color: #e4e4e4;
}
.task-type .priority-low span {
  color: limegreen;
  margin: 5px;
}
@media (max-width: 800px) {
  .task-type {
    font-size: 14px;
  }
}
</style>
 