import axios from 'axios'
import auth from './auth'

export default {
    state: {
        tasks: [], // all tasks
        myTasks: [], // a tasks belongs to user
        addtask: false,
    },
    getters: {
        getTasks(state) {
            return state.tasks
        },
        getMyTasks(state) {
            return state.myTasks;
        },
        addingTask(state) {
            return state.addtask;
        }
    },
    mutations: {
        allTasks: (state, tasks) => {
            state.tasks = tasks
        },
        myTasks: (state, myTasks) => {
            state.myTasks = myTasks
        },
        activateAddTask: (state, value) => {
            state.addtask = value;
        }
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
        },
        /**
         * Gets tasks of the auth user
         * @param {*} commits 
         */
        userTasks({
            commit
        }) {
            return new Promise((resolve, reject) => {
                axios.get('api/users/mytasks', {
                        headers: {
                            'Authorization': 'Bearer ' + auth.state.$token,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        commit('myTasks', response.data.myTasks);
                        resolve(response)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        /**
         * Activates add tasks
         * @param {*} param0 
         */
        activateAddTask({
            commit
        }, value) {
            commit('activateAddTask', value)
        }
    },

}