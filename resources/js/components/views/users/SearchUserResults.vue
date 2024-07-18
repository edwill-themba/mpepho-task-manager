<template>
    <div>
        <div class="search-user-results">
            <div v-if="searchResultsLength <= 0" class="no-user-found">
                <h3>the user or users you are looking are not found</h3>
            </div>
            <div v-else>
                <div class="search-resuls-found">
                    <div v-for="(user,index) in searchResults" :key="index">
                        <div class="user-box">
                            <p>
                                <span class="user">
                                    <FontAwesomeIcon icon="user" />
                                </span>
                                {{ user.name }}
                            </p>
                            <p>
                                <span class="email">
                                    <FontAwesomeIcon icon="envelope" />
                                </span>
                                {{ user.email }}
                            </p>
                            <p>
                                <span class="register">
                                    <FontAwesomeIcon icon="calendar" />
                                </span>
                                {{ formatDate(user.created_at) }}
                            </p>
                            <p>
                                <span class="register-time">
                                    <FontAwesomeIcon icon="clock" />
                                </span>
                                {{ formatTime(user.created_at) }}
                            </p>
                        </div>
                    </div>
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
.search-resuls-found .user-box {
  margin-top: 25px;
  width: 68vw;
  border: 1px solid #ccc;
  height: auto;
  padding: 10px;
  border-radius: 6px;
  width: 68vw;
  border: 1px solid #ccc;
  height: auto;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-wrap: wrap;
  background: #111;
}
.search-resuls-found .user-box p {
  font-size: 17px;
}
.user {
  margin-right: 10px;
  color: green;
}
.register {
  color: blue;
}
.register-time {
  color: purple;
}
.email {
  color: yellow;
  font-size: 17px;
}
</style>
