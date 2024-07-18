<template>
  <div>
    <div v-if="isLoading" class="loading">
      <p>wait for search results...</p>
    </div>
    <div v-else>
      <div class="results-container">
        <div>
          <div class="search-results-found">
            <h1 v-if="searchResultsLength > 0">
              <span>
                <FontAwesomeIcon icon="circle" />
              </span> search results
            </h1>
            <div v-if="searchResultsLength == 0" class="no-results-found">
              <h3>sorry, no results are found, try a different query</h3>
              <p>please make sure that spellings are correct or try again later</p>
            </div>
            <div v-for="(result,index) in searchResultsArray" :key="index">
              <div class="task-box">
                <h4>{{ result.task_name }}</h4>
                <div class="results-date-time">
                  <span class="results-date">
                    Date
                    <FontAwesomeIcon icon="calendar" /> {{ formatDate(result.task_date) }}
                  </span>
                  <span class="results-time">
                    Time
                    <FontAwesomeIcon icon="clock" /> {{ formatTime(result.task_date) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import isLoading from "@/mixins/isLoading.js";
import formatDate from "@/mixins/formatDate.js";
import formatTime from "@/mixins/formatDate.js";
export default {
  name: "SearchResults",
  props: ["searchResultsArray", "searchResultsLength"],
  mixins: [isLoading, formatDate, formatTime]
};
</script>

<style scoped>
.results-container {
  width: 90%;
  height: 100%;
  margin: 0px auto;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  color: #e4e4e4;
}

.search-results-found {
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.no-results-found {
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.no-results-found h3 {
  font-size: 23px;
  font-weight: 300;
  padding-bottom: 10px;
  text-align: center;
  margin-top: 30px;
}
.no-results-found p {
  font-size: 19px;
}
.search-results-found h1 {
  font-size: 23px;
  font-weight: 300;
  text-transform: uppercase;
  margin-top: 20px;
}
.search-results-found h1 span {
  color: orange;
}
.search-results-found .task-box {
  width: 89vw;
  border: 1px solid #cccc;
  margin-top: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
}
.search-results-found .task-box h4 {
  font-weight: 300;
  font-size: 17px;
}
.results-date-time {
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.results-date {
  color: orange;
}
.results-time {
  color: lime;
  font-size: 13.5px;
}
</style>
