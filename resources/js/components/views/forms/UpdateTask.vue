<template>
  <div>
    <!-- the modal form -->
    <div class="modal">
      <h5>Update Task</h5>
      <div class="input-div">
        <input type="text" name="task_name" v-model="task.task_name" class="input">
      </div>
      <div class="input-div">
        <input type="datetime-local" name="task_date" v-model="task.task_date" class="input">
      </div>
      <div class="input-div">
        <select name="priority" v-model="task.priority" class="input">
          <option value="">please select task priority</option>
          <option value="high">high</option>
          <option value="medium">medium</option>
          <option value="low">low</option>
        </select>
      </div>
      <div class="input-div">
        <select name="status" v-model="task.status" class="input">
          <option value="">please select task status</option>
          <option value="incomplete">incomplete</option>
          <option value="complete">complete</option>
        </select>
      </div>
      <div class="button">
        <button type="button" class="btn-save" v-on:click="updateTask">
          {{ !isLoading ? 'save' : 'wait...'}}
        </button>
        <button type="button" class="btn-close" v-on:click="close">
          close
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import Swal from "sweetalert2";
import isLoading from "@/mixins/isLoading.js";
export default {
  name: "UpdateTask",
  mixins: [isLoading],
  props: ["task"],
  methods: {
    // closes the modal
    close: function() {
      this.$emit("closeModal");
    },
    // tells the store to updates selected task
    updateTask: function() {
      this.$store
        .dispatch("updateTask", this.task)
        .then(response => {
          new Swal({
            icon: "success",
            title: "task was updated successfuly",
            timer: 4000
          });
          this.close();
        })
        .catch(error => {
          new Swal({
            icon: "warnig",
            title: error.response.data.message,
            timer: 4000
          });
        });
    }
  }
};
</script>


<style scoped>
.modal {
  background: #e4e4e4;
  height: auto;
  width: 300px;
  padding: 10px 5px;
  left: 10px;
  top: 10px;
  margin-top: 10px;
  position: absolute;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.modal h5 {
  color: #111111;
  font-size: 19px;
  font-weight: 300;
}
</style>
