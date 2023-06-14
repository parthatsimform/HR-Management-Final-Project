<template>
    <div class="container-fluid d-flex justify-content-center align-items-center">
        <div class="login-container w-75 d-flex justify-content-center">
            <div class="img-container w-50">
                <img class="h-100 w-100" src="../assets/login.png" alt="" />
            </div>

            <div class="form-container w-50 d-flex align-items-center justify-content-center p-4">
                <form class="login-form">
                    <h1 class="text-center fw-bold">Login</h1>
                    <div class="avatar-container d-flex justify-content-center mb-3">
                        <img src="../assets/avatar_2x.png" class="avatar" alt="" />
                    </div>

                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label for="floatingInput">Email address</label>
                    </div>

                    <div class="form-floating mb-4">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                        <label for="floatingPassword">Password</label>
                    </div>

                    <div class="d-flex justify-content-center">
                        <button class="btn btn-primary w-50 py-2 fw-bold" type="submit" @click.prevent>
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container-fluid {
    width: 90% !important;

    position: relative;

    top: 100px !important;

    bottom: 0;

    right: 0;

    left: 0;
}

.login-container {
    border-radius: 20px;

    overflow: hidden;

    background-color: #fff;

    box-shadow: 0px 7px 50px 0px rgba(0, 0, 0, 0.1);
}

.img-container {
    background-color: #005ae2;
}

.img-container img {
    object-fit: contain;
}

.avatar {
    width: 125px;

    border-radius: 50%;
}

.login-form {
    width: 300px;
}

@media (max-width: 800px) {
    .img-container {
        display: none;
    }

    .form-container {
        width: 80% !important;
    }
}

@media (max-width: 600px) {
    .login-container {
        width: 95% !important;
    }
}

@media (max-width: 600px) {
    .login-container {
        width: 100% !important;
    }

    .form-container {
        width: 90% !important;
    }
}

@media (max-width: 400px) {
    .form-container {
        width: 100% !important;
    }
}
</style>