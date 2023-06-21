<template>
    <div class="container-fluid p-0 d-flex justify-content-center align-items-center">
        <div class="login-container d-flex justify-content-center mb-5">
            <div class="img-container w-50 d-flex align-items-center justify-content-center">
                <img class="h-100 w-100" src="../assets/login.png" alt="" />
            </div>
            <div class="form-container w-50 d-flex align-items-center justify-content-center pe-5 ps-5">
                <form class="login-form" @submit.prevent="userLogin">
                    <h2 class="text-center fw-bold mb-3">Login</h2>
                    <div class="avatar-container d-flex justify-content-center mb-3">
                        <img src="../assets/avatar_2x.png" class="avatar" alt="" />
                    </div>
                    <div class=" form-fields">
                        <input name="email" type="email" id="email" placeholder="Email*" v-model="employeeStore.emp.email"
                            @input="isValidEmail('email')" />
                        <p class="vAlert emailErr"></p>
                    </div>
                    <div class=" form-fields">
                        <input name="password" type="password" id="password" placeholder="Password*"
                            v-model="employeeStore.emp.password" @input="validatePassword('password')" />
                        <p class="vAlert passwordErr mb-3"></p>
                    </div>
                    <div class="d-flex justify-content-center mb-2">
                        <button class="btn btn-primary w-75 py-2 fw-medium" type="submit">
                            Sign In
                        </button>
                    </div>
                    <p class="text-center">Don't an account? <RouterLink :to="{ name: 'Register' }">Register</RouterLink>
                        here.
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { auth } from '@/includes/firebase';
import router from '@/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEmployeeStore } from "@/stores/employeeStore"
import { onBeforeUnmount } from 'vue';
import type Employee from '@/types/employee';
import { useToggleFormAlert } from '@/composables/useToggleFormAlert'
import { useValidateIP } from '@/composables/useValidateIP'
import Swal from 'sweetalert2'

const { displayAlert, removeAlert } = useToggleFormAlert()
const { isValidEmail } = useValidateIP()

const employeeStore = useEmployeeStore()

const validatePassword = (id: string): boolean => {
    const inputEle = document.querySelector(`#${id}`) as HTMLFormElement;
    if (!inputEle.value) {
        displayAlert(inputEle, "Please enter password");
        return false;
    }
    removeAlert(inputEle);
    return true;
};

const userLogin = async (e: Event): Promise<void> => {
    if (isValidEmail('email') && validatePassword('password')) {
        const target = e.target as HTMLFormElement
        const email: string = target.email.value;
        const password: string = target.password.value;
        try {
            await signInWithEmailAndPassword(auth, email, password)
            if (auth.currentUser) {
                localStorage.setItem("isLoggedIn", 'true')
                employeeStore.isLoggedIn = localStorage.getItem("isLoggedIn")
                router.push("/")
            }
        } catch (err: any) {
            let errMsg: string = err.code;
            switch (err.code) {
                case "auth/wrong-password":
                case "auth/invalid-email":
                case "auth/user-not-found":
                    errMsg = "Invalid Credentials"
                    break;
                case "auth/too-many-requests":
                    errMsg = "Too many requests.\nPlease try after some time."
                    break;
                default:
                    errMsg = err.code
                    break;
            }

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                customClass: {
                    container: 'mt-5'
                }
            })
            Toast.fire({
                icon: 'error',
                title: errMsg
            })
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
    height: 600px;
    width: 80%;
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
    width: 325px;
}

.form-fields {
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
}

.form-fields input {
    border: 1px solid #e4e4e4 !important;
    background-color: #fff !important;
    height: 40px;
    border-radius: 8px;
    padding: 5px 10px;
}

.form-fields input:focus {
    outline: 2px solid #2f69fe;
}

.form-fields input::placeholder {
    font-weight: 600;
    font-size: 15px;
}

.form-fields p {
    font-size: 12px;
    height: 15px;
    margin-bottom: 10px;
    color: #ff0000;
}

@media (max-width:1200px) {
    .login-container {
        width: 85% !important;
    }
}

@media (max-width:1024px) {
    .login-container {
        width: 90% !important;
    }
}

@media (max-width: 800px) {
    .login-container {
        padding: 0 !important;
        width: 75% !important;
    }

    .img-container {
        display: none !important;
    }

    .form-container {
        padding: 0 !important;
        width: 70% !important;
    }

    .login-form {
        width: 90%;
    }
}

@media (max-width: 600px) {
    .login-container {
        width: 100% !important;
        height: 450px;
    }

    .form-container {
        width: 80% !important;
    }
}

@media (max-width: 400px) {
    .login-form {
        width: 90%;
    }

    .form-container {
        width: 100% !important;
    }
}
</style>