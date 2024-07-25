<template>
  <div>
    <!-- error message -->
    <div v-if="serverError" class="error message">
      <p v-on:click="close">{{ error }}
        <span>
          <FontAwesomeIcon icon="times" />
        </span>
      </p>
    </div>
    <!-- supervisor add task modal form -->
    <div v-if="!serverError" class="supervisor-task">
      <h5>Supervisor Add Task</h5>
      <div class="input-div">
        <input type="text" name="task_name" v-model="formData.task_name" placeholder="enter task name" class="input">
        <p>{{ fieldErrors.task_name }}</p>
      </div>
      <div class="input-div">
        <input type="datetime-local" name="task_date" v-model="formData.task_date" class="input">
        <p>{{ fieldErrors.task_date }}</p>
      </div>
      <div class="input-div">
        <select name="priority" v-model="formData.priority" class="input">
          <option value="">please select task priority</option>
          <option value="high">high</option>
          <option value="medium">medium</option>
          <option value="low">low</option>
        </select>
        <p>{{ fieldErrors.priority }}</p>
      </div>
      <div class="button">
        <button type="button" class="btn-save" v-on:click="addSupervisorTask">
          {{ !isLoading ? 'save' : 'wait..'}}
        </button>
        <button type="button" class="btn-close" v-on:click="close">
          close
        </button>
      </div>
    </div>
    <!-- end modal form -->
  </div>
</template>


<script>
import validateForm from "@/mixins/validateForm.js";
import isLoading from "@/mixins/isLoading.js";
import Swal from "sweetalert2";
export default {
  name: "SupervisorTask",
  mixins: [validateForm, isLoading],
  props: ["userId"],
  data() {
    return {
      fieldErrors: {
        task_date: undefined,
        task_name: undefined,
        priority: undefined
      }, // field error object
      formData: {
        task_date: "",
        task_name: "",
        priority: "",
        userId: this.userId
      }, // form data object
      serverError: false,
      error: undefined
    };
  },
  methods: {
    // emit close modal to the parent component
    close: function() {
      this.$emit("closeModal");
    },
    // add task to user and make some validations
    addSupervisorTask: function() {
      this.fieldErrors = this.validateForm(this.formData);
      if (Object.keys(this.fieldErrors).length) return;
      this.$store
        .dispatch("addSupervisorTask", this.formData)
        .then(response => {
          // display success message if succefully
          new Swal({
            icon: "success",
            title: "task created successfully,check my supervised task",
            timer: 4000
          });
          // clear inputs
          this.formData.task_name = "";
          this.formData.task_date = "";
          this.formData.priority = "";
        })
        .catch(error => {
          this.serverError = true;
          this.error = error.response.data.message;
          // display error message
          new Swal({
            icon: "warning",
            title: error.response.data.message,
            timer: 4000
          });
          // clears inputs
          this.formData.task_name = "";
          this.formData.task_date = "";
          this.formData.priority = "";
          this.$router.push({ path: "/dashboard" });
        });
    }
  }
};
</script>

<style scoped>
.supervisor-task {
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
.supervisor-task h5 {
  color: #111111;
  margin-top: 15px;
  font-size: 17px;
  font-weight: 300;
}
</style>
