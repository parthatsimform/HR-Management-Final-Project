<template>
    <div class="d-flex align-items-center py-4 bg-body-tertiary form-signin w-100 m-auto">
        <form>
            <h1>Login</h1>
            <h1 class="h3 mb-3 fw-normal">Please sign In</h1>

            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-5">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
            </div>

            <button class="btn btn-primary w-100 py-2" type="submit">Sign In</button>
        </form>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped></style>