import Swal from "sweetalert2";
import axios from "axios";

const changeTaskDate = {
    methods: {
        changeTaskDate: function(task) {
            axios
                .get("api/user_has_task/" + task.user_id + "/" + task.task_date, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("accessToken"),
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    this.serverError = true;
                    this.error = error.response.data.message;
                    new Swal({
                        icon: "warning",
                        title: error.response.data.message,
                        timer: 5000
                    });
                });
        }
    },
}

export default changeTaskDate