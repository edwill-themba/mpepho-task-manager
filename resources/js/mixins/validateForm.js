const validateForm = {
    methods: {

        validateForm: function(field) {
            const errors = {};
            if (!field.task_name) errors.task_name = "The field name is required";
            if (!field.task_date) errors.task_date = "The field date is required";
            if (!field.priority) errors.priority = "The field priority is required";
            return errors;
        }
    },

}

export default validateForm