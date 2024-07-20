<template>
  <div class="modal" v-if="showModal">
    <div class="modal-form">
      <!-- if server error -->
      <div v-if="error" class="error message">
        <p v-on:click="closeModal">{{ errorMessage}}
          <FontAwesomeIcon icon="times" />
        </p>
      </div>
      <!-- end server error -->
      <div v-if="!error">
        <form class="frm-add-task">
          <h4>Add New Task</h4>
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
            <button type="button" class="btn-save" v-on:click="addTask">
              {{ !isLoading ? 'save':'wait...' }}
            </button>
            <button type="button" class="btn-close" v-on:click="closeModal">
              close
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="modal-handler"></div>
  </div>
</template>

<script>
import validateForm from "@/mixins/validateForm.js";
import isLoading from "@/mixins/isLoading.js";
import Swal from "sweetalert2";
export default {
  name: "AddTask",
  mixins: [validateForm, isLoading],
  computed: {
    // returns status of show add task modal
    showModal() {
      return this.$store.getters.addingTask;
    }
  },
  data() {
    return {
      modal: false, // show modal set to false
      formData: {
        task_date: "",
        task_name: "",
        priority: ""
      }, // user inputs
      error: false, // error set false
      errorMessage: undefined, // error message
      fieldErrors: {
        task_date: undefined,
        task_name: undefined,
        priority: undefined
      } // fields to check front end errors
    };
  },
  methods: {
    // closes modal form and deactivates add task
    closeModal: function() {
      this.$store.dispatch("activateAddTask", false);
    },
    // add user task
    addTask: function(e) {
      e.preventDefault();
      this.fieldErrors = this.validateForm(this.formData);
      if (Object.keys(this.fieldErrors).length) return;
      this.$store
        .dispatch("addNewTask", this.formData)
        .then(response => {
          new Swal({
            icon: "success",
            title: "task wask created successfully,please view my task",
            timer: 4000
          });
          // clears input
          this.formData.task_name = "";
          this.formData.task_date = "";
          this.formData.priority = "";
          console.log(response);
          this.closeModal();
        })
        .catch(error => {
          this.error = true;
          this.errorMessage = error.response.data.message;
          new Swal({
            icon: "warning",
            title: error.response.data.message,
            timer: 4000
          });
          // clears input
          this.formData.task_name = "";
          this.formData.task_date = "";
          this.formData.priority = "";
          this.closeModal();
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.modal {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10000;
  background-color: #cccc;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-form {
  background: transparent;
  color: olive;
  height: 100%;
  width: 30%;
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0px;
}
.modal-handler {
  height: 100%;
  width: 70%;
  top: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  background: transparent;
}
.error {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}
.error span {
  color: red;
  font-size: 15px;
  padding: 10px;
  text-align: left;
}
.message {
  text-align: center;
  margin-top: 20px;
}
</style>
