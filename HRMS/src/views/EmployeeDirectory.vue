<template>
    <div class="department">
        <div class="dept-wrapper">
            <div class="container">
                <div class="row">
                    <div class="col-6 col-md-3">
                        <div class="common-header d-flex justify-content-center align-items-center fs-5 ">
                            FrontEnd
                        </div>
                        <div class="common-department-content">
                            <div class="users-list" v-for="employee in employeeStore.emp_data">
                                <div class="user-card mx-4 mt-3 mb-3 d-flex flex-column align-items-center" draggable="true"
                                    v-if="employee.department === 'frontend'">
                                    <div
                                        class="profile-image emp-initials mt-2 d-flex align-items-center justify-content-center">
                                        {{ formattedString(employee.fullName) }}</div>
                                    <div class="emp-name">{{ employee.fullName }}</div>
                                    <p class="emp-dept">FrontEnd</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="common-header d-flex justify-content-center align-items-center fs-5 ">
                            BackEnd
                        </div>
                        <div class="common-department-content">
                            <div class="users-list" v-for="employee in employeeStore.emp_data">
                                <div class="user-card mx-4 mt-3 mb-3 d-flex flex-column align-items-center" draggable="true"
                                    v-if="employee.department === 'backend'">
                                    <div
                                        class="profile-image emp-initials mt-2 d-flex align-items-center justify-content-center">
                                        {{ formattedString(employee.fullName) }}</div>
                                    <div class="emp-name">{{ employee.fullName }}</div>
                                    <p class="emp-dept">Backend</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="common-header d-flex justify-content-center align-items-center fs-5 ">
                            UI/UX
                        </div>
                        <div class="common-department-content">
                            <div class="users-list" v-for="employee in employeeStore.emp_data">
                                <div class="user-card mx-4 mt-3 mb-3 d-flex flex-column align-items-center" draggable="true"
                                    v-if="employee.department === 'uiux'">
                                    <div
                                        class="profile-image emp-initials mt-2 d-flex align-items-center justify-content-center">
                                        {{ formattedString(employee.fullName) }}</div>
                                    <div class="emp-name">{{ employee.fullName }}</div>
                                    <p class="emp-dept">UI/UX</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="common-header d-flex justify-content-center align-items-center fs-5 ">
                            Devops
                        </div>
                        <div class="common-department-content">
                            <div class="users-list" v-for="employee in employeeStore.emp_data">
                                <div class="user-card mx-4 mt-3 mb-3 d-flex flex-column align-items-center" draggable="true"
                                    v-if="employee.department === 'devops'">
                                    <div
                                        class="profile-image emp-initials mt-2 d-flex align-items-center justify-content-center">
                                        {{ formattedString(employee.fullName) }}</div>
                                    <div class="emp-name">{{ employee.fullName }}</div>
                                    <p class="emp-dept">DevOps</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useEmployeeStore } from '../stores/employees'
const employeeStore = useEmployeeStore();
await employeeStore.getEmpData();
import { useInitials } from '../composables/useInitials'
const { formattedString } = useInitials()
</script >

<style scoped>
.department {
    margin-top: 140px;
}

.common-header {
    height: 50px;
    background-color: #0d6efd;
    color: white;
    font-weight: bold;
}

.common-department-content {
    height: 600px;
    background-color: #e2e2e2;
    overflow-y: scroll;
}

.user-card {
    height: 120px;
    background-color: white;
    border-radius: 10px;
    cursor: pointer;
}

.common-department-content :hover {
    transform: scale(1.02);
    transition: 0.25s;
}

.emp-dept {
    color: #0d6efd;
}


.profile-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #E2E2E2;
    font-weight: bold;
}

.emp-initials {
    height: 50px;
    width: 50px;
}

.emp-name {
    font-size: 20px;
    font-weight: bold;
}

.emp-dept {
    font-size: 15px;
}


@media (max-width: 767px) {
    .common-department-content {
        height: 350px;
    }

    .common-header {
        margin-top: 20px;
    }
}

@media (max-width: 569px) {

    .emp-name {
        font-size: 15px;
    }

    .emp-dept {
        font-size: 12px;
    }

    .user-card {
        height: 100px;
    }

    .profile-image {
        width: 40px;
        height: 40px;
        font-size: 15px;
    }
}
</style>

<script setup lang="ts"></script>
