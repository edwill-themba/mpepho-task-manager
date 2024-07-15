import axios from 'axios'
import tasks from './tasks'
export default {
    state: {
        $token: localStorage.getItem('accessToken') || null,
        $current_user: localStorage.getItem('currentUserName') || null,
        $users: [],
        $roleId: localStorage.getItem('roleID') || null, // checks if user is a supervisor or subordinates
    },
    getters: {
        isLoggin(state) {
            if (state.$token == null) {
                return false;
            } else {
                return true;
            }
        },
        currentName(state) {
            return state.$current_user;
        },
        getUsers(state) {
            return state.$users;
        },
        getUserRoleId(state) {
            return state.$roleId;
        }

    },
    mutations: {
        login: (state, token) => {
            state.$token = token;
        },
        logout: (state) => {
            state.$token = null;
            state.isLoggin = false;
            state.current_user = null;
        },
        currentUser: (state, current_user) => {
            state.$current_user = current_user;
        },
        allUsers: (state, users) => {
            state.$users = users;
        },
        userRole: (state, roleID) => {
            state.$roleId = roleID;
        }
    },
    actions: {
        // logs the user in
        userLogin({
            commit
        }, formData) {
            return new Promise((resolve, reject) => {
                axios.get('/sanctum/csrf-cookie').then(response => {
                    axios.post('api/login', {
                            email: formData.email,
                            password: formData.password
                        })
                        .then((response) => {
                            localStorage.setItem('accessToken', response.data)
                            commit('login', response.data)
                            resolve(response)
                        })
                        .catch((error) => {
                            reject(error)
                        })
                })
            })
        },
        // logs the user out
        userLogout({
            commit
        }) {
            return new Promise((resolve, reject) => {
                axios.post('api/logout', {}, {
                        headers: {
                            'Authorization': 'Bearer ' + this.state.auth.$token,
                            'Content-type': 'application/json'
                        }
                    })
                    .then((response) => {
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('currentUserName');
                        commit('logout');
                        resolve(response);
                    })
                    .catch((error) => {
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('currentUserName');
                        commit('logout');
                        reject(error)
                    })
            })
        },
        // register new users
        userRegister({
            commit
        }, formData) {
            return new Promise((resolve, reject) => {
                axios.post('api/register', {
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                        password_confirmation: formData.password_confirmation
                    })
                    .then((response) => {
                        commit('register', response.data)
                        resolve(response)
                    })
                    .catch((error) => {
                        reject(error)
                    })

            })
        },
        // get current user
        getCurrentUser({
            commit
        }) {
            return new Promise((resolve, reject) => {
                axios.get('api/user', {
                        headers: {
                            'Authorization': 'Bearer ' + this.state.auth.$token,
                            'Content-type': 'application/json'
                        }
                    })
                    .then((response) => {
                        localStorage.setItem('currentUserName', response.data.name);
                        localStorage.setItem('roleID', response.data.role_id);
                        commit('currentUser', response.data.name);
                        commit('userRole', response.data.role_id);
                        resolve(response)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })

        },
        /**
         * retrieves all users that are subordiates
         * @param {*} param0 
         */
        getUsers({
            commit
        }) {
            return new Promise((resolve, reject) => {
                commit('changeIsLoading', true, {
                    root: true
                });
                axios.get('api/allusers', {
                        headers: {
                            'Authorization': 'Bearer ' + this.state.auth.$token,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        commit('allUsers', response.data.users);
                        commit('changeIsLoading', false, {
                            root: true
                        });
                        resolve(response)
                    })
                    .catch((error) => {
                        reject(error)
                    })

            })
        }
    },

}