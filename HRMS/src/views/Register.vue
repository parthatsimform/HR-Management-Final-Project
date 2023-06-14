<template>
    <div class="container-fluid d-flex justify-content-center align-items-center">
        <div class="registration-container w-75 d-flex justify-content-center">
            <div class="img-container w-50">
                <img class="h-100 w-100" src="../assets/Signup.svg" alt="">
            </div>
            <div class="form-container w-50 d-flex align-items-center justify-content-center p-4">
                <form class="registration-form" @submit.prevent="registerUser">
                    <h1 Register class="text-center fw-bold">Register</h1>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com"
                            v-model="employee.emp.fullName">
                        <label for="floatingInput">Full Name</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
                            v-model="employee.emp.email">
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                            v-model="employee.emp.password">
                        <label for="floatingPassword">Password</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Confirm Password"
                            v-model="employee.emp.cPassword">
                        <label for="floatingPassword">Confirm Password</label>
                    </div>
                    <div class="mb-3">
                        <select class="form-select" aria-label="Department" v-model="employee.emp.department">
                            <option disabled>Select Department</option>
                            <option value="frontend">FrontEnd</option>
                            <option value="backend">BackEnd</option>
                            <option value="devops">DevOps</option>
                            <option value="uiux">UI/UX</option>
                        </select>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="tel" class="form-control" id="floatingPassword" placeholder="Mobile Number"
                            v-model="employee.emp.mobile">
                        <label for="floatingInput">Mobile Number</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="date" class="form-control" id="floatingPassword" v-model="employee.emp.dob">
                        <label for="floatingInput">Date of Birth</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="date" class="form-control" id="floatingPassword" v-model="employee.emp.joiningDate">
                        <label for="floatingInput">Joining Date</label>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-primary w-50 py-2 fw-bold" type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type Employee from "@/types/employee";
import { useEmployeeStore } from "../stores/employees"
import { useUserStore } from '../stores/userStore'

const employee = useEmployeeStore()
const userStore = useUserStore()
const registerUser = async () => {
    const newUser: Employee = {
        fullName: employee.emp.fullName,
        email: employee.emp.email,
        password: employee.emp.password,
        department: employee.emp.department,
        mobile: employee.emp.mobile,
        dob: employee.emp.dob,
        joiningDate: employee.emp.joiningDate,
        isAdmin: false,
        leaveBallance: 10,
        uid: ""
    }

    await userStore.registerUser(newUser)
}
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

.img-container {
    background-color: #005ae2;
}

.registration-container {
    border-radius: 20px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0px 7px 50px 0px rgba(0, 0, 0, 0.1);
}

.registration-form {
    width: 300px;
}

@media (max-width:1200px) {
    .img-container {
        display: none;
    }

    .form-container {
        width: 80% !important;
    }

    .registration-form {
        width: 400px;
    }
}

@media (max-width:600px) {
    .registration-container {
        width: 95% !important;
    }
}

@media (max-width:600px) {
    .registration-container {
        width: 100% !important;
    }

    .form-container {
        width: 90% !important;
    }
}

@media (max-width:400px) {
    .form-container {
        width: 95% !important;
    }
}
</style>