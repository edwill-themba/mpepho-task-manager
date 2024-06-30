<template>
    <div class="dashboard-content">
       <h1>Welcome to our new website !!</h1>
       <p><strong>{{ currentUser }}, we appreciate to work with you.</strong></p>
    </div>
</template>


<script>
export default {
  name: "Content",
  props: ["userName"],
  data() {
    return {
      currentUser: localStorage.getItem("currentUserName")
    };
  }
};
</script>

<style scoped>
.dashboard-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 10px;
  margin: 30px;
}
.dashboard-content h1 {
  text-transform: uppercase;
  font-size: 25px;
}
.dashboard-content p {
  font-size: 17px;
}
</style>
