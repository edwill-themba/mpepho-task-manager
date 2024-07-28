<template>
  <div>
    <!-- error message -->
    <div v-if="serverError" class="error message">
      <p v-on:click="close">{{ error }}
        <FontAwesomeIcon icon="times" />
      </p>
    </div>
    <!-- the modal form -->
    <div class="update-supervisor-modal">
      <h5>Update this task</h5>
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
        <button type="button" class="btn-save" v-on:click="updateSupervisorTask(task)">
          {{ !isLoading ? 'save': 'wait...' }}
        </button>
        <button type="button" class="btn-close" v-on:click="close">
          close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import validateForm from "@/mixins/validateForm.js";
import isLoading from "@/mixins/isLoading.js";
import changeTaskDate from "@/mixins/changeTaskDate.js";
import Swal from "sweetalert2";
export default {
  name: "UpdateSupervisorTask",
  mixins: [validateForm, isLoading, changeTaskDate],
  props: ["task"],
  data() {
    return {
      serverError: false,
      error: undefined
    };
  },
  methods: {
    close: function() {
      this.$emit("closeModal");
    },
    updateSupervisorTask: function() {
      this.$store
        .dispatch("updateSupervisorTask", this.task)
        .then(response => {
          this.close();
          new Swal({
            icon: "success",
            title: "task was successfully updated",
            timer: 4000
          });
        })
        .catch(error => {
          this.serverError = true;
          this.error = error;
          new Swal({
            icon: "warning",
            title: error,
            timer: 6000
          });
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.update-supervisor-modal {
  background: #e4e4e4;
  height: auto;
  width: 300px;
  padding: 10px 5px;
  left: 10px;
  top: 60px;
  margin-top: 10px;
  position: absolute;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.update-supervisor-modal h5 {
  color: olive;
  margin-top: 15px;
  font-size: 17px;
  font-weight: 500;
  padding-right: 10px;
}
</style>
