import {
    createStore
} from 'vuex'
import auth from './modules/auth'
import tasks from './modules/tasks'
import createPersistedState from 'vuex-persistedstate'


export default createStore({
    modules: {
        auth,
        tasks
    },
    plugins: [createPersistedState()]
})