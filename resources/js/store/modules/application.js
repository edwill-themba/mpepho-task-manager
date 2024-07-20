export default {
    state: {
        addtask: false,
        action: localStorage.getItem('displayView') || 'view_tasks', // dash display view name
    },
    getters: {
        // return the status of activating adding task
        addingTask(state) {
            return state.addtask;
        },
        // returns what to display on the dash
        isView(state) {
            return state.action;
        }
    },
    mutations: {
        // activates the add tasks modal
        activateAddTask: (state, value) => {
            state.addtask = value;
        },
        // commits what to display on the dash
        dashBoardDisplay: (state, value) => {
            state.action = value;
        },
    },
    actions: {
        /**
         * Activates add user tasks 
         * @param {*} param0 
         */
        activateAddTask({
            commit
        }, value) {
            commit('activateAddTask', value)
        },
        /**
         * tell the app which item should be displayed
         * @param {*} param0 
         * @param {*} value 
         */
        dashBoardDisplay({
            commit
        }, value) {
            localStorage.setItem('displayView', value);
            commit('dashBoardDisplay', value);
        }
    },

}