import axios from 'axios'
export default {
    state: {
        tasks: [],
    },
    getters: {},
    mutations: {
        allTasks: (state, tasks) => {
            state.tasks = tasks
        },



    },
    actions: {
        async getAllTasks({
            commit
        }) {
            try {
                const response = await axios.get('/api/tasks')
                commit('allTasks', response.data.tasks)
            } catch (err) {
                console.log(err)
            }
        }
    },

}