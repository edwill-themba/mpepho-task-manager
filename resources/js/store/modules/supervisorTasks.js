import auth from './auth'
import tasks from './tasks'
import axios from 'axios'


export default {
    state: {
        supervisedTasks: [], // all the supervised tasks
    },
    getters: {
        // current supervised task by the user
        mySupervisedTasks(state) {
            return state.supervisedTasks;
        }
    },
    mutations: {
        // supervisor adds  task to user
        addSupervisorTask: (task) => {
            tasks.state.tasks.unshift(task);
        },
        // all the task the supervisor supervises
        allSupervisedTasks: (state, supervisedTasks) => {
            state.supervisedTasks = supervisedTasks;
        },
        // update the supervisor task
        updateSupervisorTask: (state, task) => {
            if (task.status == 'complete') {
                tasks.state.complete_tasks.unshift(task);
                state.supervisedTasks = state.supervisedTasks.filter((t) => t.id !== task.id)
                tasks.state.tasks = tasks.state.tasks.filter((t) => t.id !== task.id);
            }
        },
        // the supervisor 
        deleteMySupervisedTask: (state, id) => {
            state.supervisedTasks = state.supervisedTasks.filter((t) => t.id !== id);
            tasks.state.tasks = tasks.state.tasks.filter((t) => t.id !== id);
        }
    },
    actions: {
        /**
         * all the tasks the user supervises
         * @param {*} param0 
         */
        allSupervisedTasks({
            commit
        }) {
            return new Promise((resolve, reject) => {
                commit('changeIsLoading', true, {
                    root: true
                })
                axios.get('api/supervisors/my_supervisor_task', {
                        headers: {
                            'Authorization': 'Bearer ' + auth.state.$token,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        commit('allSupervisedTasks', response.data.supervisor_tasks)
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
        },
        /**
         * supervisor add task to user
         * @param {*} param0 
         * @param {*} id 
         * @param {*} formData
         */
        addSupervisorTask({
            commit
        }, formData) {
            return new Promise((resolve, reject) => {
                commit('changeIsLoading', true, {
                    root: true
                })
                axios.post('api/supervisors/task/user/' + formData.userId, {
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
                        commit('addSupervisorTask', response.data.task)
                        commit('changeIsLoading', false, {
                            root: true
                        })
                        resolve(response)
                    })
                    .catch((error) => {
                        commit('changeIsLoading', false, {
                            root: true
                        })
                        reject(error);
                    })
            })
        },
        /**
         * the supervisor edit the task that he/she supervised
         * @param {*} param0 
         * @param {*} task 
         */
        updateSupervisorTask({
            commit
        }, task) {
            return new Promise((resolve, reject) => {
                commit('changeIsLoading', true, {
                    root: true
                })
                axios.put('api/supervisors/task/' + task.id, {
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
                        commit('updateSupervisorTask', response.data.task)
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
        },
        /**
         * deletes a task that user supervised
         * @param {*} param0 
         * @param {*} task 
         */
        deleteMySupervisedTask({
            commit
        }, task) {
            return new Promise((resolve, reject) => {
                axios.delete('api/supervisors/task/' + task.id, {
                        headers: {
                            'Authorization': 'Bearer ' + auth.state.$token,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        commit('deleteMySupervisedTask', task.id)
                        resolve(response)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
    } // end actions
}