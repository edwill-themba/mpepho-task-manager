<template>
    <div class="no-tasks">
        <h3>No Tasks Found</h3>
        <p>You need to create an account and sign in to be able to create tasks.</p>
    </div>
</template>

<script>
export default {
  name: "NoTask"
};
</script>

<style scoped>
.no-tasks {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
}
.no-tasks h3 {
  margin-top: 30px;
  font-size: 25px;
  text-align: center;
}
.no-tasks p {
  margin-top: 10px;
  font-size: 17px;
}
</style>
