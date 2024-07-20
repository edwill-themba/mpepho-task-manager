<!-- search user form component -->
<template>
  <div>
    <div class="search-user">
      <form class="frm-search-user" v-on:submit="search">
        <input type="search" name="search" v-model="query" placeholder="enter user name or email address">
        <button type="button" class="btn-search">
          <FontAwesomeIcon icon="search" />
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchUser",
  data() {
    return {
      query: "" // search query sent to database
    };
  },
  methods: {
    // call the search method on parent component
    search: function(e) {
      e.preventDefault();
      this.$emit("search", this.query);
      this.query = "";
    }
  }
};
</script>

<style scoped>
.search-user {
  height: 100%;
  width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #e4e4e4;
  border-radius: 6px;
  height: 35px;
  margin-left: 5px;
  background: transparent;
}
.frm-search-user {
  width: 100%;
  height: 100%;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.frm-search-user input[type="search"] {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: #e4e4e4;
  padding-left: 10px;
  font-size: 15px;
}
.frm-search-user input[type="search"]::placeholder {
  color: #e4e4e4;
}
.frm-search-user input[type="submit"] {
  background: transparent;
  color: #e4e4e4;
  border: none;
  height: 100%;
  font-size: 16px;
}
</style>
