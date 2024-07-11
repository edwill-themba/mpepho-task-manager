import moment from 'moment';

const formatDate = {
    methods: {
        formatDate(task_date) {
            return moment(task_date).format("DD MMMM YYYY");
        },
        formatTime(task_date) {
            return moment(task_date).format("HH:MM");
        }
    },
}

export default formatDate