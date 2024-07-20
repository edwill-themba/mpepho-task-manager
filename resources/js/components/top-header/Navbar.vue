<template>
  <header>
    <nav class="navbar">
      <div class="nav-container">
        <!-- main menu if is a big screen -->
        <ul class="menu" v-if="!mobile">
          <li>
            <router-link to="/">Tasks</router-link>
          </li>
          <li v-if="!isLoggin">
            <router-link to="/signin">Sign In</router-link>
          </li>
          <li v-if="isLoggin">
            <router-link to="/dashboard">Dashboard</router-link>
          </li>
          <li v-if="isLoggin" class="username">{{ currentUserName }}</li>
          <li v-if="isLoggin">
            <router-link to="/signout">Sign Out</router-link>
          </li>
        </ul>
        <!-- open this menu if is mobile or small screen -->
        <transition name="nav-mobile" class="mobile-nav" v-if="mobile">
          <MobileMenu v-if="mobile_menu" v-on:closeMobileMenu="closeMobileMenu" />
        </transition>
        <!-- search area -->
        <div class="search">
          <SearchForm v-on:searchTasks="searchTasks" />
        </div>
        <!-- search area -->
      </div>
      <div class="mobile-toggler" v-if="mobile" v-on:click="toggleMobileMenu">
        <FontAwesomeIcon icon="bars" />
      </div>
    </nav>
    <!-- display search results -->
    <div class="search-results" v-if="search">
      <transition name="search-results-transition">
        <!-- search results component -->
        <SearchResults v-bind:searchResultsArray="searchResultsArray" v-bind:searchResultsLength="searchResultsLength" v-on:hideSearch="hideSearch" />
      </transition>
    </div>
    <!-- end search results -->
  </header>
</template>

<script>
import SearchForm from "./Search.vue";
import MobileMenu from "./MobileMenu.vue";
import SearchResults from "./SearchResults.vue";
import Swal from "sweetalert2";
export default {
  name: "navbar",
  components: {
    SearchForm,
    MobileMenu,
    SearchResults
  },
  computed: {
    isLoggin() {
      return this.$store.getters.isLoggin;
    },
    currentUserName() {
      return this.$store.getters.currentName;
    }
  },
  data() {
    return {
      mobile: null,
      mobile_menu: false,
      search: false,
      searchResultsArray: [], //search results that will be found on search,
      searchResultsLength: undefined
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
    },
    // close mobile if open
    closeMobileMenu: function() {
      this.mobile_menu = false;
    },
    // dispatch actions search for a task or tasks
    searchTasks: function(query) {
      this.search = true;
      this.$store
        .dispatch("searchTasks", query)
        .then(response => {
          this.searchResultsArray = response.data.search_results;
          this.searchResultsLength = this.searchResultsArray.length;
        })
        .catch(error => {
          this.search = false;
          new Swal({
            icon: "warning",
            title: error.response.data.message,
            timer: 4000
          });
        });
    },
    //hides the search results
    hideSearch: function() {
      this.search = false;
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
.menu .username {
  color: purple;
  font-size: 17px;
  font-weight: 500;
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
.mobile-toggler {
  color: #e4e4e4;
  position: absolute;
  left: 4%;
  font-size: 17px;
}
.mobile-nav {
  height: 100%;
  width: 100%;
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  margin-top: 65px;
  background: #111111;
  display: flex;
  justify-content: center;
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
/** search and search results **/
.search {
  height: 100%;
  height: 100%;
  position: absolute;
  right: 0%;
}
.search-results {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #111;
  z-index: 100;
}

.search-results-transition-enter-active,
.search-results-transition-leave-active {
  transition: 0.8s ease;
}
.search-results-transition-enter-from,
.search-results-transition-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.search-results-transition-enter-to {
  transform: translateX(0px);
}
.search-results-transition-leave-active {
  position: absolute;
}
/** end search **/
</style>

