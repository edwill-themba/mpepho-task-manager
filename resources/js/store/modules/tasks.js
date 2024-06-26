import axios from 'axios'

export default {
    state: {
        tasks: [],
    },
    getters: {
        getTasks(state) {
            return state.tasks
        }
    },
    mutations: {
        allTasks: (state, tasks) => {
            state.tasks = tasks
        },



    },
    actions: {
        /**
         * Gets all the users tasks
         * @param {*} commits 
         */
        getAllTasks({
            commit
        }) {
            return new Promise((resolve, reject) => {
                axios.get('api/users/tasks')
                    .then((response) => {
                        commit('allTasks', response.data.tasks)
                        resolve(response)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        }
    },

}