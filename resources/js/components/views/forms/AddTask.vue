<template>
    <div class="modal" v-if="showModal">
     <div class="modal-form">
         <transition name="modal-menu">
            <form  class="frm-add-task">
               <h4>Add New Task</h4>
            </form>
        </transition>  
       </div>
      <div class="modal-handler" v-on:click="closeModal"></div>
    </div>
</template>

<script>
export default {
  name: "AddTask",
  computed: {
    showModal() {
      return this.$store.getters.addingTask;
    }
  },
  data() {
    return {
      modal: true
    };
  },
  methods: {
    closeModal: function() {
      //alert("Hi");
      this.$store.dispatch("activateAddTask", false);
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
.frm-add-task {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: #fff;
  width: 300px;
  height: 300px;
  margin-top: 20px;
  border-radius: 6px;
  margin-left: 10px;
  padding: 10px;
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
.modal-menu-enter-active,
.modal-menu-leave-active {
  transition: 0.8s all;
}
.modal-menu-enter-from,
.modal-menu-leave-to {
  transform: translateX(-250px);
}
.modal-menu-enter-to {
  transform: translateX(0px);
}
</style>
