<template>
    <nav class="navbar navbar-expand-lg fixed-top border-bottom">
        <div class="container-fluid h-100">
            <router-link class="navbar-brand fw-bolder" :to='{ name: "Home" }'
                exact-active-class="no-active">HRMS</router-link>
            <button class="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 h-100">
                    <li class="nav-item h-100 d-flex align-items-center">
                        <router-link class="nav-link" :to='{ name: "Home" }'>Home</router-link>
                    </li>
                    <li class="nav-item h-100 d-flex align-items-center">
                        <router-link class="nav-link" :to='{ name: "Directory" }'>Employee-Directory</router-link>
                    </li>
                    <li class="nav-item h-100 d-flex align-items-center">
                        <router-link class="nav-link" :to='{ name: "ApplyLeave" }'>Leave</router-link>
                    </li>
                    <div class="hidden-links d-none" v-if="employeeStore.isLoggedIn">
                        <li class="nav-item h-100 d-flex align-items-center">
                            <router-link class="nav-link"
                                :to="{ name: 'Profile', params: { id: 123 } }">Profile</router-link>
                        </li>
                        <li class="nav-item h-100 d-flex align-items-center border-bottom-0">
                            <a class="nav-link link-danger">LogOut</a>
                        </li>
                    </div>
                </ul>
                <div class="profile-container" v-if="employeeStore.isLoggedIn">
                    <div class="dropdown">
                        <div class="dropdown-toggle profile d-flex align-items-center justify-content-center rounded-circle p-2"
                            id="navbarDropdown" role="button" aria-expanded="false">
                            {{ empInitials(employeeStore.emp_details.fullName ? employeeStore.emp_details.fullName : '') }}
                        </div>
                        <ul class="dropdown-menu position-absolute p-0" aria-labelledby="navbarDropdown">
                            <li class="d-flex">
                                <router-link class="profile-item p-2"
                                    :to="{ name: 'Profile', params: { id: employeeStore.userId } }">Profile</router-link>
                            </li>
                            <li>
                                <hr class="dropdown-divider p-0 m-0">
                            </li>
                            <li class="d-flex"><a class="logout-btn link-danger p-2">LogOut</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts" setup>
import { useEmployeeStore } from '../stores/employees'
const employeeStore = useEmployeeStore();
import { useInitials } from '../composables/useInitials'
const { empInitials } = useInitials()
</script>

<style scoped>
.navbar {
    background-color: #f7faff !important;
    font-weight: 500;
}

.container-fluid {
    width: 90%;
}

.navbar-brand {
    color: #0d6efd;
}

.profile {
    background-color: #e9ecef;
    cursor: pointer;
}

.dropdown-toggle {
    width: 40px;
    /* height: 30px; */
}

.dropdown:hover>.dropdown-menu {
    display: block;
    margin-top: 0px;
    background-color: #f7faff !important;
}

.nav-item {
    margin-right: 20px;
    border-radius: 5px;
    overflow: hidden;
}

.nav-item:first-child {
    margin-left: 20px;
}

.nav-item:last-child {
    margin-right: 0px;
}

.nav-item:hover a {
    color: #0d6efd !important;
    background-color: #edf2ff;
}

.dropdown-toggle::after {
    display: none;
}

.dropdown-menu {
    left: -120px;
}

.profile-item,
.logout-btn {
    width: 100%;
    text-decoration: none;
    text-align: center;
    padding: 5px 5px;
    cursor: pointer;
}

.profile-item:hover,
.logout-btn:hover {
    background-color: #fdfdfd !important;
}

.active-nav-link {
    color: #0d6efd !important;
    background-color: #edf2ff;
}


@media (max-width:991px) {

    /* .navbar-collapse{
        border-top: 1px solid #e2e2e2;
    } */
    .navbar-toggler {
        border: none;
    }

    .profile-container {
        display: none;
    }

    .hidden-links {
        display: block !important;
    }

    .nav-item {
        border-bottom: 1px solid #e2e2e2;
    }
}
</style>