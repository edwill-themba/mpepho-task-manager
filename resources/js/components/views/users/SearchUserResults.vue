<template>
    <div>
        <div class="results">
            <div v-if="searchResultsLength <= 0" class="no-user-found">
                <h3>the user or users you are looking are not found</h3>
            </div>
            <div v-else>
                <div class="search-resuls-found">
                    <div v-for="(user,index) in searchResults" :key="index">
                        <div class="box">
                            <p>
                                <strong>Full Names </strong>
                                {{ user.name }}
                            </p>
                            <p>
                                <strong>Email Address </strong>
                                {{ user.email }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "SearchUserResults",
  props: ["searchResults", "searchResultsLength"]
};
</script>

<style scoped>
.no-user-found {
  width: 70vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.no-user-found h3 {
  font-size: 19px;
  font-weight: 300;
}
.results {
  margin-top: 70px;
}
.search-resuls-found {
  width: 65vw;
  height: auto;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 6px;
  margin-top: 25px;
  margin-left: 5px;
}
.search-resuls-found .box {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.search-resuls-found .box p {
  color: #e4e4e4;
  padding: 5px;
}
.email {
  margin-left: 10px;
}
@media (max-width: 900px) {
  .results {
    margin-top: 60px;
  }
  .no-user-found h3 {
    font-size: 15px;
  }
  .search-resuls-found {
    margin-top: 80px;
  }
  .search-resuls-found .box p {
    display: flex;
    flex-direction: column;
    font-size: 13px;
  }
}
</style>
