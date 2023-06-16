<template>
    <div class="container-fluid d-flex justify-content-center align-items-center">
        <div class="login-container w-75 d-flex justify-content-center">
            <div class="img-container w-50">
                <img class="h-100 w-100" src="../assets/login.png" alt="" />
            </div>

            <div class="form-container w-50 d-flex align-items-center justify-content-center p-4">
                <form class="login-form" @submit.prevent="userLogin">
                    <h1 class="text-center fw-bold">Login</h1>
                    <div class="avatar-container d-flex justify-content-center mb-3">
                        <img src="../assets/avatar_2x.png" class="avatar" alt="" />
                    </div>

                    <div class="mb-3">
                        <input name="email" type="email" class="form-control" id="email" placeholder="Email*"
                            v-model="employeeStore.emp.email" @input="validateEmail('email')" />
                        <p class="vAlert emailErr"></p>
                    </div>

                    <div class="mb-4">
                        <input name="password" type="password" class="form-control" id="password" placeholder="Password*"
                            v-model="employeeStore.emp.password" @input="validatePassword('password')" />
                        <p class="vAlert passwordErr mb-3"></p>
                    </div>

                    <div class="d-flex justify-content-center">
                        <button class="btn btn-primary w-50 py-2 fw-bold" type="submit">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { auth } from '@/includes/firebase';
import router from '@/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEmployeeStore } from "../stores/employees"
import { onBeforeUnmount } from 'vue';
import type Employee from '@/types/employee';

const employeeStore = useEmployeeStore()

const validateEmail = (id: string): boolean => {
    const inputEle = document.querySelector("#" + id) as HTMLFormElement
    const errClass = document.querySelector("." + id + "Err") as HTMLParagraphElement
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(inputEle.value)) {
        inputEle.style.border = "1px solid #dee2e6"
        errClass.textContent = ""
        return true;
    } else {
        inputEle.style.border = "1px solid red";
        errClass.textContent = "Please enter valid email address"
        return false;
    }
}

const validatePassword = (id: string): boolean => {
    const inputEle = document.querySelector("#" + id) as HTMLFormElement
    const errClass = document.querySelector("." + id + "Err") as HTMLParagraphElement

    if (inputEle.value === "") {
        inputEle.style.border = "1px solid red";
        errClass.textContent = "Please enter password"
        return false;
    } else {
        inputEle.style.border = "1px solid #dee2e6"
        errClass.textContent = ""
        return true;
    }
}

const userLogin = async (e: Event): Promise<void> => {
    if (validateEmail('email') && validatePassword('password')) {
        const target = e.target as HTMLFormElement
        const email = target.email.value;
        const password = target.password.value;

        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
            if (auth.currentUser) {
                localStorage.setItem("isLoggedIn", true)
                employeeStore.isLoggedIn = localStorage.getItem("isLoggedIn")
                router.push("/")
            }
        } catch (err: any) {
            alert(err.code);
        }
    } else {
        validatePassword('password')
    }
}

onBeforeUnmount(() => {
    employeeStore.emp = { department: "Select Department*" } as Employee
})

</script>

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

input {
    height: 50px;
}

.vAlert {
    height: 15px;
    color: red;
    margin-bottom: 10px;
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