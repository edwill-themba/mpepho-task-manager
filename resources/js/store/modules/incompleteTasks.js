import axios from 'axios'
import auth from './auth'
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
        // updates the state with new incomplete tasks
        allIncompleteTasks: (state, incomplete_tasks) => {
            state.incomplete_tasks = incomplete_tasks;
        },
        // updates the state and remove select task
        removeInCompleteTask: (state, task) => {
            state.incomplete_tasks = state.incomplete_tasks.filter((t) => t.id !== task.id)
        },
        // update the state to remove all elements on array
        removeAllInCompleteTask: (state) => {
            state.incomplete_tasks = []
        }
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
                commit('changeIsLoading', true, {
                    root: true
                })
                axios.get('api/incomplete_tasks', {
                        headers: {
                            'Authorization': 'Bearer ' + auth.state.$token,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        commit('allIncompleteTasks', response.data.incomplete_tasks)
                        commit('changeIsLoading', false, {
                            root: true
                        })
                        resolve(response);
                    })
                    .catch((error) => {
                        commit('changeIsLoading', false, {
                            root: true
                        })
                        reject(error)
                    })
            })
        },
        /**
         * removes one selected incomplete task
         * @param {*} param0 
         * @param {*} task 
         */
        removeInCompleteTask({
            commit
        }, task) {
            return new Promise((resolve, reject) => {
                axios.delete('api/incomplete_task/' + task.id, {
                        headers: {
                            'Authorization': 'Bearer ' + auth.state.$token,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        commit('removeInCompleteTask', task)
                        resolve(response)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        /**
         * removes all incomplete task for that user
         * @param {*} param0 
         */
        removeAllInCompleteTask({
            commit
        }, user_id) {
            return new Promise((resolve, reject) => {
                commit('changeIsLoading', true, {
                    root: true
                })
                axios.delete('api/incomplete_task/all/' + user_id, {
                        headers: {
                            'Authorization': 'Bearer ' + auth.state.$token,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        commit('removeAllInCompleteTask')
                        commit('changeIsLoading', false, {
                            root: true
                        })
                        resolve(response)
                    })
                    .catch((error) => {
                        commit('changeIsLoading', false, {
                            root: true
                        })
                        reject(error)
                    })
            })
        }

    },
}