<template>
    <header>
       <nav class="navbar">
          <div class="nav-container">
            <!-- main menu if is a big screen -->
             <ul class="menu" v-if="!mobile">
                <li><router-link to="/">Tasks</router-link></li>
                <li><router-link to="/signin" v-if="!isLoggin">Sign In</router-link></li>
                <li><router-link to="/dashboard" v-if="isLoggin">Dashboard</router-link></li>
                <li><router-link to="/signout" v-if="isLoggin">Sign Out</router-link></li>
             </ul>
             <!-- open this menu if is mobile or small screen -->
             <transition name="nav-mobile" class="mobile-nav" v-if="mobile">
                <MobileMenu v-if="mobile_menu" />
             </transition>
             <!-- search area -->
             <div class="search">
                 <SearchForm />
             </div>
             <!-- search area -->
          </div>
          <div class="mobile-toggler" v-if="mobile" v-on:click="toggleMobileMenu">
            <FontAwesomeIcon icon ="bars" />
          </div>
       </nav>
    </header>
</template>

<script>
import SearchForm from "./Search.vue";
import MobileMenu from "./MobileMenu.vue";
export default {
  name: "navbar",
  components: {
    SearchForm,
    MobileMenu
  },
  computed: {
    isLoggin() {
      return this.$store.getters.isLoggin;
    }
  },
  data() {
    return {
      mobile: null,
      mobile_menu: false
    };
  },
  created() {
    window.addEventListener("resize", this.checkMobileScreen);
    this.checkMobileScreen();
  },
  methods: {
    // check window size
    checkMobileScreen: function() {
      if (window.innerWidth < 768) {
        this.mobile = true;
        return this.mobile;
      }
      this.mobile = false;
      return this.mobile;
    },
    // toggleMobileMenu
    toggleMobileMenu: function() {
      this.mobile_menu = !this.mobile_menu;
    }
  }
};
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  position: relative;
}
.nav-container {
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  position: relative;
}
.menu {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.menu li {
  list-style: none;
  margin-left: 10px;
}
.menu li a {
  color: #e4e4e4;
  text-decoration: none;
  text-transform: capitalize;
  font-size: 17px;
  font-weight: 500;
}
.menu li a:hover {
  color: coral;
}
.menu li .router-link-active,
.menu li .router-link-exact-active {
  color: coral;
}
.search {
  height: 100%;
  height: 100%;
  position: absolute;
  right: 0%;
}
.mobile-toggler {
  color: #e4e4e4;
  position: absolute;
  left: 4%;
  font-size: 17px;
}
.mobile-nav {
  height: 100%;
  width: 100%;
  max-width: 250px;
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  margin-top: 65px;
  background: #111111;
}
.nav-mobile-enter-active,
.nav-mobile-leave-active {
  transition: 0.8s all;
}
.nav-mobile-enter-from,
.nav-mobile-leave-to {
  transform: translateX(-250px);
}
.nav-mobile-enter-to {
  transform: translateX(0px);
}
</style>

