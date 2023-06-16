<template>
    <div class="container-fluid d-flex justify-content-center align-items-center">
        <div class="registration-container w-75 d-flex justify-content-center">
            <div class="img-container w-50">
                <img class="h-100 w-100" src="../assets/Signup.svg" alt="">
            </div>
            <div class="form-container w-50 d-flex align-items-center justify-content-center p-4">
                <form class="registration-form" @submit.prevent="registerUser">
                    <h1 Register class="text-center fw-bold">Register</h1>
                    <div class="mb-3">
                        <input type="text" id="name" class="form-control" placeholder="Full name*"
                            v-model="employee.emp.fullName" @input="validateName('name')">
                        <p class="vAlert nameErr"></p>
                    </div>
                    <div class="mb-3">
                        <input type="email" id="email" class="form-control" placeholder="Email*"
                            v-model="employee.emp.email" @input="validateEmail('email')">
                        <p class="vAlert emailErr"></p>
                    </div>
                    <div class="input-group">
                        <input type="password" id="password" class="form-control" placeholder="Password*"
                            v-model="employee.emp.password" @input="validatePassword('password')">
                        <span class="passwordTipIcon" id="basic-addon1">
                            ?
                            <span class="passwordTip">
                                Password must be 8-12 characters long and contain at least one numeric digit and a
                                special
                                character.
                            </span>
                        </span>
                    </div>
                    <p class="vAlert passwordErr mb-3"></p>
                    <div class="mb-3">
                        <input type="password" id="cPassword" class="form-control" placeholder="Confirm Password*"
                            v-model="employee.emp.cPassword" @input="validateCPassword('cPassword')">
                        <p class="vAlert cPasswordErr"></p>
                    </div>
                    <div class="mb-3">
                        <select class="form-select" id="dept" aria-label="Department" v-model="employee.emp.department"
                            @change="validateDept('dept')">
                            <option disabled>Select Department*</option>
                            <option value="frontend">FrontEnd</option>
                            <option value="backend">BackEnd</option>
                            <option value="devops">DevOps</option>
                            <option value="uiux">UI/UX</option>
                        </select>
                        <p class="vAlert deptErr"></p>
                    </div>
                    <div class="mb-3">
                        <input type="tel" id="mobile" class="form-control" placeholder="Mobile Number*"
                            v-model="employee.emp.mobile" @input="validateMobile('mobile')">
                        <p class="vAlert mobileErr"></p>
                    </div>
                    <div class="mb-3">
                        <label for="dob" class="form-label">Date of Birth*</label>
                        <input type="date" class="form-control" id="dob" v-model="employee.emp.dob"
                            @input="validateDOB('dob')">
                        <p class="vAlert dobErr"></p>
                    </div>
                    <div class="mb-3">
                        <label for="dob" class="form-label">Joining Date*</label>
                        <input type="date" id="joinDate" class="form-control" v-model="employee.emp.joiningDate"
                            min="1950-01-01" max="2023-06-30" @input="validateJoinDate('joinDate')">
                        <p class="vAlert joinDateErr"></p>
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
import { app, db, auth } from "../includes/firebase"
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, type UserCredential } from "firebase/auth";
import router from "@/router";

const employee = useEmployeeStore()
const registerUser = async () => {
    if (validateForm()) {
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
            uid: ''
        }

        let user;
        try {
            user = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
            if (user) {
                newUser.uid = user.uid
                const empRef = await addDoc(collection(db, "employees"), newUser)
                if (empRef) {
                    router.push("/")
                } else {
                    alert("Error creating user")
                }
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        validateName('name')
        validateEmail('email')
        validatePassword('password')
        validateCPassword('cPassword')
        validateDept('dept')
        validateMobile('mobile')
        validateDOB('dob')
        validateJoinDate('joinDate')
    }

}

const validateForm = (): boolean => {
    if (validateName('name') &&
        validateEmail('email') &&
        validatePassword('password') &&
        validateCPassword('cPassword') &&
        validateDept('dept') &&
        validateMobile('mobile') &&
        validateDOB('dob') &&
        validateJoinDate('joinDate')) {
        return true
    } else {
        return false
    }
}

const validateName = (id: string): boolean => {
    const inputEle = document.querySelector("#" + id) as HTMLFormElement
    const errClass = document.querySelector("." + id + "Err") as HTMLParagraphElement
    if (inputEle.value === "") {
        inputEle.style.border = "1px solid red";
        errClass.textContent = "Please enter your full name"
        return false;
    } else {
        inputEle.style.border = "1px solid #dee2e6"
        errClass.textContent = ""
        return true;
    }
}

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
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/;

    if (passwordRegex.test(inputEle.value)) {
        inputEle.style.border = "1px solid #dee2e6"
        errClass.textContent = ""
        return true;
    } else {
        inputEle.style.border = "1px solid red";
        errClass.textContent = "Please enter valid password"
        return false;
    }
}

const validateCPassword = (id: string): boolean => {
    const inputEle = document.querySelector("#" + id) as HTMLFormElement
    const errClass = document.querySelector("." + id + "Err") as HTMLParagraphElement
    if (inputEle.value === employee.emp.password) {
        inputEle.style.border = "1px solid #dee2e6"
        errClass.textContent = ""
        return true;
    } else {
        inputEle.style.border = "1px solid red";
        errClass.textContent = "Please enter same password again"
        return false;
    }
}

const validateDept = (id: string): boolean => {
    const inputEle = document.querySelector("#" + id) as HTMLFormElement
    const errClass = document.querySelector("." + id + "Err") as HTMLParagraphElement
    if (inputEle.value === "Select Department*") {
        inputEle.style.border = "1px solid red";
        errClass.textContent = "Please select department"
        return false;
    } else {
        inputEle.style.border = "1px solid #dee2e6"
        errClass.textContent = ""
        return true;
    }
}

const validateMobile = (id: string): boolean => {
    const inputEle = document.querySelector("#" + id) as HTMLFormElement
    const errClass = document.querySelector("." + id + "Err") as HTMLParagraphElement
    const mobileRegex: RegExp = /^[0-9]{10}$/
    if (mobileRegex.test(inputEle.value)) {
        inputEle.style.border = "1px solid #dee2e6"
        errClass.textContent = ""
        return true;
    } else {
        inputEle.style.border = "1px solid red";
        errClass.textContent = "Please enter 10 digit mobile number"
        return false;
    }
}

const validDate = (dob: Date) => {
    const givenDate: Date = new Date(dob);
    const currDate: Date = new Date();
    if (givenDate.getFullYear() >= 1900 && givenDate < currDate) {
        return true;
    }
    return false;
};

const validateDOB = (id: string): boolean => {
    const inputEle = document.querySelector("#" + id) as HTMLFormElement
    const errClass = document.querySelector("." + id + "Err") as HTMLParagraphElement
    if (inputEle.value === "") {
        inputEle.style.border = "1px solid red";
        errClass.textContent = "Please select your date of birth"
        return false;
    } else if (!validDate(inputEle.value)) {
        inputEle.style.border = "1px solid red";
        errClass.textContent = "Please select valid DOB having year >=1900"
        return false;
    } else {
        inputEle.style.border = "1px solid #dee2e6"
        errClass.textContent = ""
        return true;
    }
}

const validateJoinDate = (id: string): boolean => {
    const inputEle = document.querySelector("#" + id) as HTMLFormElement
    const errClass = document.querySelector("." + id + "Err") as HTMLParagraphElement
    if (inputEle.value === "") {
        inputEle.style.border = "1px solid red";
        errClass.textContent = "Please select your Joining Date"
        return false;
    } else if (!validDate(inputEle.value)) {
        inputEle.style.border = "1px solid red";
        errClass.textContent = "Please select valid date having year >=1900"
        return false;
    } else if (inputEle.value <= employee.emp.dob) {
        inputEle.style.border = "1px solid red";
        errClass.textContent = "Joining date can't be less than DOB"
        return false;
    } else {
        inputEle.style.border = "1px solid #dee2e6"
        errClass.textContent = ""
        return true;
    }
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

.vAlert {
    height: 15px;
    color: red;
    margin-bottom: 10px;
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

input,
select {
    height: 50px;
}

.passwordTipIcon {
    cursor: pointer;
    background-color: #f8f9fa;
    color: gray;
    padding: 12px;
    border: 1px solid #dee2e6;
}

.passwordTipIcon .passwordTip {
    visibility: hidden;
    width: 280px;
    background-color: #555;
    color: white;
    border-radius: 5px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 100%;
    left: 25%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
}

.passwordTipIcon .passwordTip::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
}

.passwordTipIcon:hover .passwordTip {
    visibility: visible;
    opacity: 1;
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