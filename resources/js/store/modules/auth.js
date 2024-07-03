import axios from 'axios'
export default {
    state: {
        $token: localStorage.getItem('accessToken') || null,
        $current_user: localStorage.getItem('currentUserName') || null,
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
        }

    },
    mutations: {
        login: (state, token) => {
            state.$token = token;
        },
        logout: (state) => {
            state.$token = null;
        },
        currentUser: (state, current_user) => {
            state.$current_user = current_user;
        },

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
                            resolve(response)
                            localStorage.setItem('accessToken', response.data)
                            commit('login', response.data)
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
                        resolve(response)
                        commit('register', response.data)
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
                        commit('currentUser', response.data.name)
                        resolve(response)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })

        }
    },

}