<template>
    <div class="d-flex align-items-center py-4 bg-body-tertiary form-signin w-100 m-auto">
        <form>
            <h1>Register</h1>
            <h1 class="h3 mb-3 fw-normal">Please sign up</h1>

            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Full Name</label>
            </div>
            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Confirm Password">
                <label for="floatingPassword">Confirm Password</label>
            </div>
            <div class="mb-3">
                <select class="form-select" aria-label="Department">
                    <option selected disabled>Select Department</option>
                    <option value="frontend">FrontEnd</option>
                    <option value="backend">BackEnd</option>
                    <option value="devops">DevOps</option>
                    <option value="uiux">UI/UX</option>
                </select>
            </div>
            <div class="form-floating mb-3">
                <input type="tel" class="form-control" id="floatingPassword" placeholder="Mobile Number">
                <label for="floatingPassword">Mobile Number</label>
            </div>
            <div class="form-floating mb-3">
                <input type="date" class="form-control" id="floatingPassword" placeholder="DOB">
                <label for="floatingPassword">Date of Birth</label>
            </div>
            <button class="btn btn-primary w-100 py-2" type="submit">Sign Up</button>
        </form>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped></style>