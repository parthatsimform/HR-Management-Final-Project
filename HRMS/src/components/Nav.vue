<template>
    <nav class="navbar navbar-expand-lg fixed-top border-bottom">
        <div class="container-fluid h-100">
            <router-link class="navbar-brand fw-bolder" :to='{ name: "Home" }'
                exact-active-class="no-active">HRMS</router-link>
            <button class="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                v-if="employeeStore.isLoggedIn">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent" v-if="employeeStore.isLoggedIn">
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
                    <div class="hidden-links d-none">
                        <li class="nav-item h-100 d-flex align-items-center">
                            <router-link class="nav-link"
                                :to="{ name: 'Profile', params: { id: 123 } }">Profile</router-link>
                        </li>
                        <li class="nav-item h-100 d-flex align-items-center border-bottom-0">
                            <a class="nav-link link-danger">LogOut</a>
                        </li>
                    </div>
                </ul>
                <div class="profile-container">
                    <div class="dropdown">
                        <div class="dropdown-toggle profile d-flex align-items-center justify-content-center rounded-circle p-2"
                            id="navbarDropdown" role="button" aria-expanded="false">
                            {{ auth.currentUser!.displayName ? empInitials(auth.currentUser!.displayName) : '' }}
                        </div>
                        <ul class="dropdown-menu position-absolute p-0" aria-labelledby="navbarDropdown">
                            <li class="d-flex">
                                <router-link class="profile-item p-2"
                                    :to="{ name: 'Profile', params: { id: auth.currentUser!.uid } }">Profile</router-link>
                            </li>
                            <li>
                                <hr class="dropdown-divider p-0 m-0">
                            </li>
                            <li class="d-flex" @click="logout"><a class="logout-btn link-danger p-2">LogOut</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="d-flex" v-else>
                <li class="logged-out-usr-links h-100 d-flex align-items-center ms-0 me-3">
                    <router-link class="link-item text-decoration-none pt-2 pb-2 ps-3 pe-3"
                        :to='{ name: "Login" }'>Login</router-link>
                </li>
                <li class="logged-out-usr-links h-100 d-flex align-items-center m-0">
                    <router-link class="link-item text-decoration-none pt-2 pb-2 ps-3 pe-3"
                        :to='{ name: "Register" }'>Register</router-link>
                </li>
            </div>
        </div>
    </nav>
</template>

<script lang="ts" setup>
import { useFormatName } from '../composables/useFormatName'
import { auth } from '@/includes/firebase';
import router from '@/router';
import { useEmployeeStore } from '@/stores/employees';

const { empInitials } = useFormatName()
const employeeStore = useEmployeeStore()

const logout = async (): Promise<void> => {
    await auth.signOut()
    localStorage.removeItem("isLoggedIn")
    employeeStore.isLoggedIn = localStorage.getItem("isLoggedIn")
    router.push("/login")
}
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
}

.dropdown:hover>.dropdown-menu {
    display: block;
    margin-top: 0px;
    background-color: #f7faff !important;
}

.nav-item,
.logged-out-usr-links {
    margin-right: 20px;
    border-radius: 5px;
    overflow: hidden;
}

.logged-out-usr-links a {
    color: #000000
}

.nav-item:first-child {
    margin-left: 20px;
}

.nav-item:last-child {
    margin-right: 0px;
}

.nav-item:hover a,
.logged-out-usr-links:hover a {
    color: #0d6efd;
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
        margin: 0 !important;
        border-radius: 0;
    }

    .nav-item:hover a {
        background-color: transparent !important;
    }

    .logged-out-usr-links a {
        background-color: transparent !important;
    }

    .active-nav-link {
        background-color: transparent !important;
    }
}

@media (max-width:400px) {
    .logged-out-usr-links {
        margin: 0 !important;
    }
}
</style>