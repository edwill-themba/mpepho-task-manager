<template>
  <div class="wrapper">
    <div class="no-tasks">
      <h3>Sorry No Tasks Found</h3>
      <p>You need to create an account and sign in to be able to create tasks.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoTask"
};
</script>

<style scoped>
.wrapper {
  width: 90%;
  height: 100%;
  margin: 0px auto;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.no-tasks {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
}
.no-tasks h3 {
  margin-top: 30px;
  font-size: 30px;
  text-align: center;
  color: blue;
  text-transform: uppercase;
}
.no-tasks p {
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
  color: red;
}

@media (max-width: 900px) {
  .no-tasks {
    align-items: center;
    padding: auto 10px;
    width: 100%;
  }
  .no-tasks h3 {
    font-size: 17px;
  }
  .no-tasks p {
    font-size: 15px;
  }
}
</style>
