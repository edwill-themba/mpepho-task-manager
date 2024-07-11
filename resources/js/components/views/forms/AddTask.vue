<template>
  <div class="modal" v-if="showModal">
   <div class="modal-form">
       <!-- if server error -->
        <div v-if="error" class="error message">
          <p v-on:click="closeModal">{{ errorMessage}}  <FontAwesomeIcon icon="times" /></p>
        </div>
        <!-- end server error -->
        <div v-if="!error">
        <form  class="frm-add-task">
          <h4>Add New Task</h4>
            <div class="input-div">
              <input type="text" name="task_name" v-model="formData.task_name" placeholder="enter task name" class="input">
              <p>{{ fieldErrors.task_name }}</p>
            </div>
            <div class="input-div">
             <input type="datetime-local" name="task_date" v-model="formData.task_date"   class="input">
             <p>{{ fieldErrors.task_date }}</p>
            </div>
            <div class="input-div">
             <select  name="priority" v-model="formData.priority" class="input">
              <option value="">please select task priority</option>
              <option value="high">high</option>
              <option value="medium">medium</option>
              <option value="low">low</option>
             </select>
             <p>{{ fieldErrors.priority }}</p>
            </div>
            <div class="button">
             <button type="button" class="btn-save" v-on:click="addTask">
              save
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
export default {
  name: "AddTask",
  mixins: [validateForm],
  computed: {
    showModal() {
      return this.$store.getters.addingTask;
    }
  },
  data() {
    return {
      modal: false,
      formData: {
        task_date: "",
        task_name: "",
        priority: ""
      },
      error: false,
      errorMessage: undefined,
      fieldErrors: {
        task_date: undefined,
        task_name: undefined,
        priority: undefined
      }
    };
  },
  methods: {
    closeModal: function() {
      this.$store.dispatch("activateAddTask", false);
    },
    addTask: function(e) {
      e.preventDefault();
      this.fieldErrors = this.validateForm(this.formData);
      if (Object.keys(this.fieldErrors).length) return;
      this.$store
        .dispatch("addNewTask", this.formData)
        .then(response => {
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
          // clears input
          this.formData.task_name = "";
          this.formData.task_date = "";
          this.formData.priority = "";
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
