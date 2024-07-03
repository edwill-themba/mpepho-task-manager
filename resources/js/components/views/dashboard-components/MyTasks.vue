<template>
    <div class="my-tasks" style="margin:20px auto;">
        <table class="my-tasks-table">
          <tr class="t-header">
             <th class="table-id">No</th>
            <th class="table-header">Task Name</th>
            <th class="table-header">Created Date</th>
            <th class="table-header">Deadline Date</th>
            <th class="table-header">Task Priorty</th>
            <th></th>
            <th></th>
          </tr>
          <tr v-for="(task,index) in userTasks" :key="index" :class="task.priority">
             <td class="colum-task-id">{{ index + 1 }}</td>
             <td class="colum-task-name">{{ task.task_name }}</td>
             <td class="colum-task">{{ task.created_at }}</td>
             <td class="colum-task">{{ task.task_date }}</td>
             <td class="colum-task">{{ task.priority }}</td>
             <td class="colum-task-operation"><span><FontAwesomeIcon icon="trash" /></span></td>
             <td class="colum-task-operation"><span><FontAwesomeIcon icon="pen" /></span></td>
          </tr>
        </table>
    </div>
</template>

<script>
export default {
  name: "MyTasks",
  props: ["userTasks"]
};
</script>

<style scoped>
@import "bootstrap/dist/css/bootstrap.min.css";
@import "bootstrap";

.my-tasks {
  margin-top: 30px;
  width: 850px;
  overflow-x: auto;
}
.t-header {
  background: #ccc;
}
.my-tasks-table {
  border: 1px solid #111;
  padding: 10px;
  margin-right: 20px;
}
.table-id {
  width: 60px;
  border: 1px solid #111;
  padding-left: 5px;
}
.table-header {
  width: 250px;
  text-align: left;
  margin: 5px 10px;
  border: 1px solid #111;
  padding-left: 10px;
}
.colum-task-id {
  width: 60px;
  border: 1px solid #111;
  padding-left: 5px;
}
.colum-task-name {
  width: 250px;
  border: 1px solid #111;
  padding-left: 10px;
}
.colum-task {
  width: 90px;
  border: 1px solid #111;
  padding-left: 10px;
}
.colum-task-operation {
  width: 40px;
  border: 1px solid #111;
  padding-left: 10px;
}

@media (max-width: 800px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }
}
</style>
