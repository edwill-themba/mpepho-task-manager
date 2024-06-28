<template>
    <div class="search-area">
        <form  class="frm-search">
           <input type="search" class="search-input" placeholder="search...">
           <button type="submit" class="btn-search">
               <FontAwesomeIcon icon="search" />
           </button>
        </form>
    </div>
</template>

<script>
export default {
  name: "SearchForm"
};
</script>

<style scoped>
.search-area {
  height: 100%;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
}
.frm-search {
  border: 2px solid #e4e4e4;
  border-radius: 6px;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}
.search-input {
  width: 100%;
  height: 100%;
  background: transparent;
  outline: none;
  padding-left: 4px;
  font-size: 17px;
  font-weight: 500;
  border: none;
  color: #e4e4e4;
}
.search-input::placeholder {
  color: #e4e4e4;
}
.btn-search {
  border: none;
  background: transparent;
  color: #e4e4e4;
  font-size: 17px;
  cursor: pointer;
  padding-right: 4px;
}
@media (max-width: 768px) {
  .search-area {
    width: 280px;
  }
  .frm-search {
    height: 20px;
  }
  .search-input {
    font-size: 14px;
  }
  .btn-search {
    font-size: 14px;
  }
}
</style>
