import axios from 'axios'
import auth from './auth'

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
        // update state to remove selected task
        removeCompleteTask: (state, task) => {
            state.complete_tasks = state.complete_tasks.filter((t) => t.id !== task.id);
        },
        removeAllCompleteTask: (state) => {
            state.complete_tasks = [];
        }
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
        /**
         * removes one selected incomplete task
         * @param {*} param0 
         * @param {*} task 
         */
        removeCompleteTask({
            commit
        }, task) {
            return new Promise((resolve, reject) => {
                axios.delete('api/complete_task/' + task.id, {
                        headers: {
                            'Authorization': 'Bearer ' + auth.state.$token,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        commit('removeCompleteTask', task)
                        resolve(response)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        /**
         * removes all complete task for that user
         * @param {*} param0 
         */
        removeAllCompleteTask({
            commit
        }, user_id) {
            return new Promise((resolve, reject) => {
                commit('changeIsLoading', true, {
                    root: true
                })
                axios.delete('api/complete_task/all/' + user_id, {
                        headers: {
                            'Authorization': 'Bearer ' + auth.state.$token,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        commit('removeAllCompleteTask')
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