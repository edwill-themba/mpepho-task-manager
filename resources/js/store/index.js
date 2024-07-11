import {
    createStore
} from 'vuex'
import auth from './modules/auth'
import tasks from './modules/tasks'
import supervisorTasks from './modules/supervisorTasks'

export default createStore({
    modules: {
        auth,
        tasks,
        supervisorTasks
    },
})