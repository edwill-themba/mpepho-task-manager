import axios from 'axios'
import auth from './auth'
import completeTasks from './completeTasks'
import incompleteTasks from './incompleteTasks'

export default {
    state: {
        tasks: [], // all tasks
        myTasks: [], // all tasks belongs to user
        isloading: false, // loading status
        search_results: null, // task search results
    },
    getters: {
        // gets all the current tasks
        getTasks(state) {
            return state.tasks
        },
        // gets all the task belongs to a user
        getMyTasks(state) {
            return state.myTasks;
        },
        // returns the current status of is loading
        isLoading(state) {
            return state.isloading;
        },

    },
    mutations: {
        // all tasks of users
        allTasks: (state, tasks) => {
            state.tasks = tasks
        },
        // tasks that belongs to auth person
        myTasks: (state, myTasks) => {
            state.myTasks = myTasks
        },
        // commits the is loading status
        changeIsLoading: (state, value) => {
            state.isloading = value;
        },
        // adds task for user for himself/herself
        addNewTask: (state, task) => {
            state.tasks.unshift(task);
            state.myTasks.unshift(task);
        },
        // updates task for the authorized user
        updateTask: (state, task) => {
            if (task.status == 'complete') {
                completeTasks.state.complete_tasks.unshift(task);
                state.tasks = state.tasks.filter((t) => t.id !== task.id);
                state.myTasks = state.myTasks.filter((t) => t.id !== task.id);
            }
        },
        // removes select task from users tasks and all tasks
        deleteTask: (state, task) => {
            incompleteTasks.state.incomplete_tasks.unshift(task)
            state.tasks = state.tasks.filter((t) => t.id !== task.id);
            state.myTasks = state.myTasks.filter((t) => t.id !== task.id);
        },
        // commit search results
        searchTasks: (state, search_results) => {
            state.search_results = search_results;
        }
    },
    actions: {
        /**
         * searches task based on name dates
         * @param {*} param0 
         * @param {*} query 
         */
        searchTasks({
                commit
            },
            query) {
            return new Promise((resolve, reject) => {
                commit('changeIsLoading', true)
                axios.get('api/task/search/' + query)
                    .then((response) => {
                        commit('searchTasks', response.data.search_results);
                        commit('changeIsLoading', false)
                        resolve(response);
                    })
                    .catch((error) => {
                        commit('changeIsLoading', false)
                        reject(error);
                    })
            })
        },
        /**
         * Gets all the users tasks
         * @param {*} commits 
         */
        getAllTasks({
            commit
        }) {
            return new Promise((resolve, reject) => {
                commit('changeIsLoading', true)
                axios.get('api/users/tasks')
                    .then((response) => {
                        commit('allTasks', response.data.tasks)
                        commit('changeIsLoading', false)
                        resolve(response)
                    })
                    .catch((error) => {
                        commit('changeIsLoading', false)
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
                commit('changeIsLoading', true)
                axios.get('api/users/mytasks', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + auth.state.$token
                        }
                    })
                    .then((response) => {
                        commit('myTasks', response.data.myTasks);
                        commit('changeIsLoading', false)
                        resolve(response)
                    })
                    .catch((error) => {
                        commit('changeIsLoading', false)
                        reject(error)
                    })
            })
        },
        /**
         * Adds new Task for user
         * @param {*} param0 
         * @param {*} formData 
         */
        addNewTask({
            commit
        }, formData) {
            return new Promise((resolve, reject) => {
                commit('changeIsLoading', true)
                axios.post('api/users/task', {
                        task_name: formData.task_name,
                        task_date: formData.task_date,
                        priority: formData.priority
                    }, {
                        headers: {
                            'Authorization': 'Bearer ' + auth.state.$token,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        commit('addNewTask', response.data.task)
                        commit('changeIsLoading', false)
                        resolve(response)
                    })
                    .catch((error) => {
                        commit('changeIsLoading', false)
                        reject(error)
                    })
            })
        },
        /**
         * updates user task
         * @param {*} param0 
         * @param {*} formData 
         */
        updateTask({
            commit
        }, task) {
            return new Promise((resolve, reject) => {
                commit('changeIsLoading', true)
                axios.put('api/users/task/' + task.id, {
                        task_name: task.task_name,
                        task_date: task.task_date,
                        priority: task.priority,
                        status: task.status
                    }, {
                        headers: {
                            'Authorization': 'Bearer ' + auth.state.$token,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        commit('updateTask', task)
                        commit('changeIsLoading', false)
                        resolve(response)
                    })
                    .catch((error) => {
                        commit('changeIsLoading', false)
                        reject(error)
                    })
            })
        },
        /**
         * deletes user task 
         * @param {*} param0 
         * @param {*} id 
         */
        deleteTask({
            commit
        }, task) {

            return new Promise((resolve, reject) => {
                axios.delete('api/users/task/' + task.id, {
                        headers: {
                            'Authorization': 'Bearer ' + auth.state.$token,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        commit('deleteTask', task)
                        resolve(response)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
    }
    //end actions
}
// end store