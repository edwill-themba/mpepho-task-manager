<template>
  <div>
    <div v-if="serverError" class="error message">
      <p v-on:click="close">{{ error }}
        <FontAwesomeIcon icon="times" />
      </p>
    </div>
    <!-- the modal form -->
    <div class="modal">
      <h5>Update Task</h5>
      <div class="input-div">
        <input type="text" v-model="task.task_name" class="input">
      </div>
      <div class="input-div">
        <input type="datetime-local" v-model="task.task_date" v-on:change="changeTaskDate(task)" class="input">
      </div>
      <div class="input-div">
        <select v-model="task.priority" class="input">
          <option value="">please select task priority</option>
          <option value="high">high</option>
          <option value="medium">medium</option>
          <option value="low">low</option>
        </select>
      </div>
      <div class="input-div">
        <select v-model="task.status" class="input">
          <option value="">please select task status</option>
          <option value="incomplete">incomplete</option>
          <option value="complete">complete</option>
        </select>
      </div>
      <div class="button" v-if="!serverError">
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
import changeTaskDate from "@/mixins/changeTaskDate.js";
export default {
  name: "UpdateTask",
  mixins: [isLoading, changeTaskDate],
  props: ["task"],
  data() {
    return {
      serverError: false,
      error: undefined
    };
  },
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
            icon: "warning",
            title: error.response.data.message,
            timer: 4000
          });
          this.$store.dispatch("userTasks");
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
