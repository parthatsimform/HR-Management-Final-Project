<template>
    <div class="container-fluid p-0 d-flex justify-content-center align-items-center">
        <div class="registration-container d-flex justify-content-center mb-5">
            <div class="img-container pe-3 ps-3 w-50 d-flex align-items-center justify-content-center">
                <img class="h-100 w-100" src="../assets/Signup.svg" alt="">
            </div>
            <div class="form-container w-50 d-flex align-items-center justify-content-center p-4">
                <form class="registration-form" @submit.prevent="registerUser">
                    <h2 Register class="text-center fw-bold mb-3">Register</h2>
                    <div class="mb-1 form-fields">
                        <input type="text" id="name" placeholder="Full name*" v-model="employeeStore.emp.fullName"
                            @input="validateName('name')">
                        <p class="vAlert nameErr"></p>
                    </div>
                    <div class="mb-1 form-fields">
                        <input type="email" id="email" placeholder="Email*" v-model="employeeStore.emp.email"
                            @input="isValidEmail('email')">
                        <p class="vAlert emailErr"></p>
                    </div>
                    <div class="input-group form-fields">
                        <div class="w-100 d-flex flex-roe">
                            <input type="password" class="p-ip" id="password" placeholder="Password*"
                                v-model="employeeStore.emp.password" @input="validatePassword('password')">
                            <span class="passwordTipIcon d-flex justify-content-center align-items-center"
                                id="basic-addon1">
                                ?
                                <span class="passwordTip">
                                    Password must be 8-12 characters long and contain at least one numeric digit and a
                                    special
                                    character.
                                </span>
                            </span>
                        </div>
                        <p class="vAlert passwordErr"></p>
                    </div>
                    <div class="mb-1 form-fields">
                        <input type="password" id="cPassword" placeholder="Confirm Password*"
                            v-model="employeeStore.emp.cPassword" @input="validateCPassword('cPassword')">
                        <p class="vAlert cPasswordErr"></p>
                    </div>
                    <div class="mb-1 form-fields">
                        <select id="dept" aria-label="Department" v-model="employeeStore.emp.department"
                            @change="validateDept('dept')">
                            <option disabled>Select Department*</option>
                            <option value="FrontEnd">FrontEnd</option>
                            <option value="BackEnd">BackEnd</option>
                            <option value="DevOps">DevOps</option>
                            <option value="Ui/Ux">Ui/Ux</option>
                        </select>
                        <p class="vAlert deptErr"></p>
                    </div>
                    <div class="mb-1 form-fields">
                        <input type="tel" id="mobile" placeholder="Mobile Number*" v-model="employeeStore.emp.mobile"
                            @input="validateMobile('mobile')">
                        <p class="vAlert mobileErr"></p>
                    </div>
                    <div class="mb-1 form-fields">
                        <label for="dob" class="form-label">Date of Birth*</label>
                        <input type="date" id="dob" v-model="employeeStore.emp.dob" @input="validateDOB('dob')">
                        <p class="vAlert dobErr"></p>
                    </div>
                    <div class="mb-1 form-fields">
                        <label for="dob" class="form-label">Joining Date*</label>
                        <input type="date" id="joinDate" v-model="employeeStore.emp.joiningDate" min="1950-01-01"
                            max="2023-06-30" @input="validateJoinDate('joinDate')">
                        <p class="vAlert joinDateErr"></p>
                    </div>
                    <div class="d-flex justify-content-center mb-2">
                        <button class="btn btn-primary w-75 fw-medium py-2" type="submit">Register</button>
                    </div>
                    <p class="text-center">Already have an account? <RouterLink :to="{ name: 'Login' }">Login</RouterLink>
                        here. </p>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type Employee from "@/types/employee";
import { useEmployeeStore } from "../stores/employees"
import { db, auth } from "../includes/firebase"
import { collection, addDoc, type DocumentData, DocumentReference } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import router from "@/router"
import { onBeforeUnmount } from "vue";
import { useToggleFormAlert } from '../composables/useToggleFormAlert'
import { useValidateIP } from '../composables/useValidateIP'

const { displayAlert, removeAlert } = useToggleFormAlert()
const { isValidEmail } = useValidateIP()
import Swal from 'sweetalert2'

const employeeStore = useEmployeeStore()
const registerUser = async (): Promise<void> => {
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
    if (validateForm()) {
        const newUser: Employee = {
            fullName: employeeStore.emp.fullName,
            email: employeeStore.emp.email,
            password: employeeStore.emp.password,
            department: employeeStore.emp.department,
            mobile: employeeStore.emp.mobile,
            dob: employeeStore.emp.dob,
            joiningDate: employeeStore.emp.joiningDate,
            isAdmin: false,
            leaveBallance: 10,
            uid: '',
            techStackTimeLine: []
        }

        try {
            const { user } = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
            if (user) {
                newUser.uid = user.uid
                const empRef: DocumentReference<DocumentData> = await addDoc(collection(db, "employees"), newUser)
                if (empRef) {
                    await updateProfile(user, { displayName: newUser.fullName })
                    localStorage.setItem("isLoggedIn", 'true')
                    employeeStore.isLoggedIn = localStorage.getItem("isLoggedIn")
                    router.push("/")
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: 'Error creating user!!'
                    })
                }
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'Error registering user!!'
                })
            }
        } catch (err: any) {
            let errMsg: string = "";
            switch (err.code) {
                case "auth/credential-already-in-use":
                case "auth/email-already-in-use":
                    errMsg = "Email already in use.\nTry with a different email"
                    break;

                case "auth/too-many-requests":
                    errMsg = "Too many requests.\nPlease try after some time."
                    break;

                default:
                    errMsg = err.code
                    break;
            }
            Toast.fire({
                icon: 'error',
                title: errMsg
            })
        }
    } else {
        validateName('name')
        isValidEmail('email')
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
        isValidEmail('email') &&
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
    if (inputEle.value === "") {
        displayAlert(inputEle, "Please enter your full name")
        return false;
    } else {
        removeAlert(inputEle)
        return true;
    }
}

const validatePassword = (id: string): boolean => {
    const inputEle = document.querySelector("#" + id) as HTMLFormElement
    const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/;

    if (passwordRegex.test(inputEle.value)) {
        removeAlert(inputEle)
        return true;
    } else {
        displayAlert(inputEle, "Please enter valid password")
        return false;
    }
}

const validateCPassword = (id: string): boolean => {
    const inputEle = document.querySelector("#" + id) as HTMLFormElement
    if (inputEle.value === employeeStore.emp.password) {
        removeAlert(inputEle)
        return true;
    } else if (!inputEle.value) {
        displayAlert(inputEle, "Please enter your password again")
        return false
    } else {
        displayAlert(inputEle, "Please enter same password again")
        return false;
    }
}

const validateDept = (id: string): boolean => {
    const inputEle = document.querySelector("#" + id) as HTMLFormElement
    if (inputEle.value === "Select Department*") {
        displayAlert(inputEle, "Please select department")
        return false;
    } else {
        removeAlert(inputEle)
        return true;
    }
}

const validateMobile = (id: string): boolean => {
    const inputEle = document.querySelector("#" + id) as HTMLFormElement
    const indiaPhoneRegex: RegExp = /^[6-9]\d{9}$/;
    const usPhoneRegex: RegExp = /^(\+?1-?)?\d{3}-?\d{3}-?\d{4}$/;
    if (indiaPhoneRegex.test(inputEle.value) || usPhoneRegex.test(inputEle.value)) {
        removeAlert(inputEle)
        return true;
    } else {
        displayAlert(inputEle, "Please enter valid mobile number")
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
    if (inputEle.value === "") {
        displayAlert(inputEle, "Please select your date of birth")
        return false;
    } else if (!validDate(inputEle.value)) {
        displayAlert(inputEle, "Please select valid DOB")
        return false;
    } else {
        removeAlert(inputEle)
        return true;
    }
}

const validateJoinDate = (id: string): boolean => {
    const inputEle = document.querySelector("#" + id) as HTMLFormElement
    if (inputEle.value === "") {
        displayAlert(inputEle, "Please select your Joining Date")
        return false;
    } else if (!validDate(inputEle.value)) {
        displayAlert(inputEle, "Please select valid joining date")
        return false;
    } else if (inputEle.value <= employeeStore.emp.dob) {
        displayAlert(inputEle, "Joining date can't be less than DOB")
        return false;
    } else {
        removeAlert(inputEle)
        return true;
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

.img-container {
    background-color: #005ae2;
}

.registration-container {
    width: 80%;
    border-radius: 20px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0px 7px 50px 0px rgba(0, 0, 0, 0.1);
}

.registration-form {
    width: 325px;
}

.form-fields {
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
}

.form-fields input,
.form-fields select {
    border: 1px solid #e4e4e4 !important;
    background-color: #fff !important;
    height: 40px;
    border-radius: 8px;
    padding: 5px 10px;
}

.p-ip {
    width: 90%;
    border-radius: 8px 0px 0px 8px !important;
}

.form-fields input:focus,
.form-fields select:focus {
    outline: 2px solid #2f69fe;
}

.form-fields input::placeholder,
.form-fields select::placeholder {
    font-weight: 600;
    font-size: 15px;
}

.passwordTipIcon {
    width: 10%;
    cursor: pointer;
    background-color: #f8f9fa;
    color: gray;
    padding: 12px;
    border: 1px solid #dee2e6;
    border-radius: 0px 8px 8px 0px !important;
    height: 40px;
}

.passwordTipIcon .passwordTip {
    font-size: 13px;
    text-align: justify;
    visibility: hidden;
    width: 250px;
    background-color: #555;
    color: white;
    border-radius: 8px;
    padding: 10px 15px;
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

.form-fields p {
    font-size: 12px;
    height: 15px;
    margin-bottom: 10px;
    color: #ff0000;
}

@media (max-width:1200px) {
    .registration-container {
        width: 85% !important;
    }
}

@media (max-width:1024px) {
    .registration-container {
        width: 90% !important;
    }
}

@media (max-width: 800px) {
    .img-container {
        display: none !important;
    }

    .form-container {
        width: 70% !important;
    }

    .registration-form {
        width: 90%;
    }
}


@media (max-width:600px) {
    .registration-container {
        width: 100% !important;
    }

    .form-container {
        width: 100% !important;
    }
}

@media (max-width:400px) {
    .form-container {
        padding: 20px 0px !important;
    }
}
</style>