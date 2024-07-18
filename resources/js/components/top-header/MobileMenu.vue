<template>
  <ul class="mobile-menu">
    <li>
      <router-link to="/">Tasks</router-link>
    </li>
    <li>
      <router-link to="/signin">Sign In</router-link>
    </li>
    <li>
      <router-link to="/dashboard">Dashboard</router-link>
    </li>
    <li>
      <router-link to="/signout">Sign Out</router-link>
    </li>
  </ul>
</template>


<script>
export default {
  name: "MobileMenu"
};
</script>

<style scoped>
.mobile-menu {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.mobile-menu li:nth-child(1) {
  margin-top: 30px;
}
.mobile-menu li {
  list-style: none;
  margin: 5px 20px;
}
.mobile-menu li a {
  color: #e4e4e4;
  text-decoration: none;
  text-transform: capitalize;
  font-size: 17px;
  font-weight: 500;
}
.mobile-menu li a:hover {
  color: coral;
}
.mobile-menu .router-link-active,
.mobile-menu .router-link-exact-active {
  color: coral;
}
</style>
