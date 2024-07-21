import axios from 'axios'

export default {
    state: {
        complete_tasks: [], // tracks all the tasks user has completed
    },
    getters: {
        // gets all the complete tasks
        getCompleteTasks(state) {
            return state.complete_tasks;
        },
    },
    mutations: {
        // commits tasks the user has completed
        allCompleteTasks: (state, complete_tasks) => {
            state.complete_tasks = complete_tasks;
        },
    },
    actions: {
        /**
         * Gets the complete tasks 
         * @param {*} param0 
         */
        getCompleteTasks({
            commit
        }) {
            return new Promise((resolve, reject) => {
                commit('changeIsLoading', true)
                axios.get('api/complete_tasks', {
                        headers: {
                            'Authorization': 'Bearer ' + auth.state.$token,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        commit('allCompleteTasks', response.data.complete_tasks)
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