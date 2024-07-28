<template>
  <div>
    <div v-if="isLoading" class="loading">
      <p>please wait...</p>
    </div>
    <div v-if="!isLoading" class="user">
      <div v-for="(usr,index) in allusers" :key="index">
        <h5>
          <span>
            <FontAwesomeIcon icon="user" />
          </span> {{ usr.name }}
        </h5>
        <p>
          <span>
            <FontAwesomeIcon icon="envelope" />
          </span> {{ usr.email }}
        </p>
        <span class="create-task" v-on:click="addtask(usr)">
          create user task
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import isLoading from "@/mixins/isLoading.js";
export default {
  name: "UserTable",
  mixins: [isLoading],
  props: ["allusers"],
  created() {
    this.users = this.allusers;
  },
  data() {
    return {
      users: []
    };
  },
  methods: {
    addtask: function(user) {
      this.$emit("addtask", user);
    }
  }
};
</script>


<style scoped>
.user {
  width: 72vw;
  height: 450px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  overflow: scroll;
  margin-top: 30px;
}
.user div {
  width: 280px;
  height: 85px;
  margin: 2px 10px;
  border: 1px solid #1111;
  border-radius: 6px;
  background: #111111;
  color: #e4e4e4;
  padding: 10px 5px 12px 10px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  position: relative;
}
.user div h5 span {
  font-size: 15px;
  color: green;
  margin-right: 5px;
}
.user div h5 {
  font-size: 15px;
  color: #e4e4e4;
  font-weight: 300;
  text-transform: uppercase;
}
.user div p span {
  font-size: 14px;
  color: orange;
  margin-right: 5px;
}
.user div p {
  font-size: 14px;
  margin-top: 5px;
}
.create-task {
  width: 96%;
  height: 29px;
  border: none;
  padding-top: 5px;
  margin-top: 5px;
  font-size: 13.5px;
  text-align: center;
  border-radius: 6px;
  background: green;
}
</style>
