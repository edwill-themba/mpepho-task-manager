const isLoading = {
    computed: {
        isLoading() {
            return this.$store.getters.isLoading;
        },
    }
}

export default isLoading