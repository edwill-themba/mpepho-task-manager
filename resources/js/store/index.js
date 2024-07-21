import {
    createStore
} from 'vuex'
import auth from './modules/auth'
import tasks from './modules/tasks'
import supervisorTasks from './modules/supervisorTasks'
import application from './modules/application'
import completeTasks from './modules/completeTasks'
import incompleteTasks from './modules/incompleteTasks'

export default createStore({
    modules: {
        auth,
        tasks,
        supervisorTasks,
        application,
        incompleteTasks,
        completeTasks
    },
})