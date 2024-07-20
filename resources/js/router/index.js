import {
    createRouter,
    createWebHistory
} from 'vue-router'
import Tasks from '../components/views/Tasks.vue'
import SignIn from '../components/views/SignIn.vue'
import Dashboard from '../components/views/Dashboard.vue'
import SignOut from '../components/views/SignOut.vue'
import TaskForUser from '../components/views/users/TaskForUser.vue'
import store from '../store/index'


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
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/signout',
        name: 'SignOut',
        component: SignOut,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/taskforuser',
        name: 'TaskForUser',
        component: TaskForUser,
        meta: {
            requiresAuth: true
        }
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLoggin) {
            next({
                path: '/signin',
                query: {
                    redirect: to.fullPath
                }
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggin) {
            next({
                path: '/dashboard',
                query: {
                    redirect: to.fullPath
                }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router