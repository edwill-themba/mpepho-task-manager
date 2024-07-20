<template>
    <div>
        <div class="search-user-results">
            <div v-if="searchResultsLength <= 0" class="no-user-found">
                <h3>the user or users you are looking are not found</h3>
            </div>
            <div v-else>
                <div class="search-resuls-found">
                    <table class="search-resuls-found-table">
                        <tr class="row-head">
                            <th>Full Names</th>
                            <th>Email Address</th>
                            <th>Registration Date</th>
                        </tr>
                        <tr v-for="(user,index) in searchResults" :key="index">
                            <td class="table-record">
                                {{ user.name }}
                            </td>
                            <td class="table-record">
                                {{ user.email }}
                            </td>
                            <td class="table-record">
                                {{ formatDate(user.created_at) }}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import formatDate from "@/mixins/formatDate.js";
export default {
  mixins: [formatDate],
  name: "SearchUserResults",
  props: ["searchResults", "searchResultsLength"]
};
</script>

<style scoped>
.search-user-results {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.search-resuls-found {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.search-resuls-found-table {
  border-collapse: collapse;
  border-collapse: collapse;
  width: 60vw;
  margin-top: 30px;
}
.search-resuls-found-table .row-head {
  background: #111;
  text-transform: uppercase;
  height: 40px;
  text-align: center;
}
.search-resuls-found-table .row-head th {
  width: 180px;
  border: 2px solid;
}
.search-resuls-found-table tr .table-record {
  width: 180px;
  text-align: center;
  border: 2px solid;
}
</style>
