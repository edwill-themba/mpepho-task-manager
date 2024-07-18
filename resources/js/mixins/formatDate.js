import moment from 'moment';

const formatDate = {
    methods: {
        formatDate(task_date) {
            return moment(task_date).format("DD MMMM YYYY");
        },
        formatTime(task_date) {
            return moment(task_date).format("HH:MM");
        },
        daysLeft(task_date) {
            const td = moment(task_date).format("YYYY-MM-DD");
            return moment(td).fromNow();
        }
    },
}

export default formatDate