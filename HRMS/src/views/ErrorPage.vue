<template>
    <section class="container-fluid p-0 m-0 d-flex justify-content-center align-items-center">
        <div class="d-flex justify-content-center align-items-center flex-column">
            <img class="object-fit-contain w-100" src="../assets/404.png" alt="Page Not Found" />
            <router-link :to="{ name: 'Home' }" class="btn btn-outline-primary fw-medium">Go Home</router-link>
        </div>
    </section>
</template>

<script lang="ts">
</script>

<style scoped>
.container-fluid {
    height: 100vh;
    margin-top: -50px !important;
}

.btn {
    width: 200px;
}
</style>