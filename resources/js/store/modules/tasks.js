import axios from 'axios'
export default {
    state: {
        tasks: [],
    },
    getters: {},
    mutations: {},
    actions: {
        async getAllTasks({ commit }) {
            try {
                const response = await axios.get('/api/tasks')
                console.log(response)
            } catch (err) {
                console.log(err)
            }
        }
    },

}