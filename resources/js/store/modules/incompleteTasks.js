export default {
    state: {
        incomplete_tasks: [], // all incomplete tasks,
    },
    getters: {
        // gets all the incomplete tasks
        getIncompleteTasks(state) {
            return state.incomplete_tasks;
        },
    },
    mutations: {
        // returns all the tasks auth user did not complete
        allIncompleteTasks: (state, incomplete_tasks) => {
            state.incomplete_tasks = incomplete_tasks;
        },
    },
    actions: {
        /**
         * Gets user incomplete tasks
         * @param {*} param0 
         */
        getIncompleteTasks({
            commit
        }) {
            return new Promise((resolve, reject) => {
                commit('changeIsLoading', true);
                axios.get('api/incomplete_tasks', {
                        headers: {
                            'Authorization': 'Bearer ' + auth.state.$token,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        commit('allIncompleteTasks', response.data.incomplete_tasks)
                        commit('changeIsLoading', false)
                        resolve(response);
                    })
                    .catch((error) => {
                        commit('changeIsLoading', false)
                        reject(error)
                    })
            })
        },

    },
}