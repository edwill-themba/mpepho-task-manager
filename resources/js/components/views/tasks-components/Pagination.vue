<template>
  <div>
    <p class="pagination">
      <FontAwesomeIcon icon="angle-double-left" v-on:click="changePage(0)" />
      <FontAwesomeIcon icon="angle-left" class="middle-link" v-on:click="changePage(-1)" />
      <span class="pages">showing page {{ page }} of {{ pages }}</span>
      <FontAwesomeIcon icon="angle-right" class="middle-link" v-on:click="changePage(1)" />
      <FontAwesomeIcon icon="angle-double-right" v-on:click="changePage(pages)" />
    </p>
  </div>
</template>

<script>
export default {
  name: "pagination",
  props: ["totalPages", "perPageOptions"],
  data() {
    return {
      page: 1,
      perPage: this.perPageOptions[0]
    };
  },
  computed: {
    pages() {
      const remainder = this.totalPages % this.perPageOptions[0];
      if (remainder > 0) {
        return Math.floor(this.totalPages / this.perPageOptions[0]) + 1;
      } else {
        return this.totalPages / this.perPageOptions[0];
      }
    }
  },
  methods: {
    changePage: function(val) {
      switch (val) {
        case 0:
          this.page = 1;
          break;
        case -1:
          this.page =
            this.page > 1 ? (this.page = this.page - 1) : (this.page = 1);
          break;
        case 1:
          this.page =
            this.page < this.pages ? this.page + 1 : (this.pages = this.pages);
          break;
        case this.pages:
          this.page = this.pages;
          break;
        default:
          this.page = 0;
          break;
      }
      this.$emit("getPage", this.page, this.perPageOptions[0]);
    }
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-right: 10px;
}
.pagination svg {
  font-size: 19px;
  margin-left: 10px;
  cursor: pointer;
  color: coral;
}
.pagination .middle-link {
  color: blueviolet;
}
.pagination span {
  margin-left: 10px;
  color: #e4e4e4;
  text-transform: capitalize;
}
</style>
