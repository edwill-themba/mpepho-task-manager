import axios from 'axios'
import auth from './auth'

export default {
    state: {
        tasks: [], // all tasks
        myTasks: [], // a tasks belongs to user
        addtask: false,
        isloading: false,
        complete_tasks: [],
        incomplete_tasks: [],
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
        },
        isLoading(state) {
            return state.isloading;
        },
        getIncompleteTasks(state) {
            return state.incomplete_tasks;
        },
        getCompleteTasks(state) {
            return state.complete_tasks;
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
        },
        changeIsLoading: (state, value) => {
            state.isloading = value;
        },
        addNewTask: (state, task) => {
            state.tasks.unshift(task);
            state.myTasks.unshift(task);
        },
        updateTask: (state, task) => {
            state.tasks = task;
            state.myTasks = task;
        },
        deleteTask: (state, id) => {
            state.tasks = state.tasks.filter((t) => t.id !== id);
            state.myTasks = state.myTasks.filter((t) => t.id !== id);
        },
        allIncompleteTasks: (state, incomplete_tasks) => {
            state.incomplete_tasks = incomplete_tasks;
        },
        allCompleteTasks: (state, complete_tasks) => {
            state.complete_tasks = complete_tasks;
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
            commit('changeIsLoading', true)
            return new Promise((resolve, reject) => {
                axios.get('api/users/tasks')
                    .then((response) => {
                        commit('allTasks', response.data.tasks)
                        commit('changeIsLoading', false)
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
                        resolve(response)
                    })
                    .catch((error) => {
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
        }, formData) {
            return new Promise((resolve, reject) => {
                axios.put('api/users/task/' + formData.id, {
                        task_name: formData.task_name,
                        task_date: formData.task_date,
                        priority: formData.priority,
                        status: formData.status
                    }, {
                        headers: {
                            'Authorization': 'Bearer ' + auth.state.$token,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        commit('updateTask', response.data.task)
                        resolve(response)
                    })
                    .catch((error) => {
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
                axios.get('api/incomplete_tasks', {
                        headers: {
                            'Authorization': 'Bearer ' + auth.state.$token,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        commit('allIncompleteTasks', response.data.incomplete_tasks)
                        resolve(response);
                    })
                    .catch((error) => {
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
                axios.get('api/complete_tasks', {
                        headers: {
                            'Authorization': 'Bearer ' + auth.state.$token,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        commit('allCompleteTasks', response.data.complete_tasks)
                        resolve(response);
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