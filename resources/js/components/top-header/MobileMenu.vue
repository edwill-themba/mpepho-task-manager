<template>
  <div>
    <ul class="mobile-menu" v-on:click="closeMobileMenu">
      <li>
        <router-link to="/">Tasks</router-link>
      </li>
      <li v-if="!isLoggin">
        <router-link to="/signin">Sign In</router-link>
      </li>
      <li v-if="isLoggin" class="username">{{ currentUserName }}</li>
      <li v-if="isLoggin">
        <router-link to="/dashboard">Dashboard</router-link>
      </li>
      <li v-if="isLoggin">
        <router-link to="/signout">Sign Out</router-link>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "MobileMenu",
  methods: {
    // close mobile menu
    closeMobileMenu: function() {
      this.$emit("closeMobileMenu");
    }
  }
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
  margin-top: 50px;
}
.mobile-menu li {
  list-style: none;
  margin: 5px 30px;
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
.username {
  color: purple;
  font-size: 17px;
  font-weight: 500;
}
.mobile-menu .router-link-active,
.mobile-menu .router-link-exact-active {
  color: coral;
}
</style>
