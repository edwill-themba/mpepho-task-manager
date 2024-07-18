<template>
  <div class="error">
    <p>{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "Error",
  props: ["error"]
};
</script>

<style scoped>
.error {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
}
.error p {
  color: red;
  font-size: 20px;
  font-weight: 500;
}
</style>
