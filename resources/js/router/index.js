import {
    createRouter,
    createWebHistory
} from 'vue-router'
import Tasks from '../components/views/Tasks.vue'
import SignIn from '../components/views/SignIn.vue'
import Dashboard from '../components/views/Dashboard.vue'
import SignOut from '../components/views/SignOut.vue'

const routes = [{
        path: '/',
        name: 'Tasks',
        component: Tasks
    },
    {
        path: '/signin',
        name: 'SignIn',
        component: SignIn
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/signout',
        name: 'SignOut',
        component: SignOut
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router