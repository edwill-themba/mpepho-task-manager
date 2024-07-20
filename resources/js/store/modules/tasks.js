import axios from 'axios'
import auth from './auth'

export default {
    state: {
        tasks: [], // all tasks
        myTasks: [], // all tasks belongs to user
        isloading: false, // loading status
        complete_tasks: [], // tracks all the tasks user has completed
        incomplete_tasks: [], // all incomplete tasks,
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
        // gets all the incomplete tasks
        getIncompleteTasks(state) {
            return state.incomplete_tasks;
        },
        // gets all the complete tasks
        getCompleteTasks(state) {
            return state.complete_tasks;
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
                state.complete_tasks.unshift(task);
                state.tasks = state.tasks.filter((t) => t.id !== task.id);
                state.myTasks = state.myTasks.filter((t) => t.id !== task.id);
            }
        },
        // removes select task from users tasks and all tasks
        deleteTask: (state, id) => {
            state.tasks = state.tasks.filter((t) => t.id !== id);
            state.myTasks = state.myTasks.filter((t) => t.id !== id);
        },
        // returns all the tasks auth user did not complete
        allIncompleteTasks: (state, incomplete_tasks) => {
            state.incomplete_tasks = incomplete_tasks;
        },
        // adds deleted task to incomplete task
        addToIncompleteTask: (state, task) => {
            state.incomplete_tasks.unshift(task);
        },
        // commits tasks the user has completed
        allCompleteTasks: (state, complete_tasks) => {
            state.complete_tasks = complete_tasks;
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
                        commit('addToIncompleteTask', task);
                        commit('deleteTask', task.id)
                        resolve(response)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
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

    }
    //end actions
}
// end store