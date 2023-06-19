<template>
    <div class="profile">
        <div class="profile-wrapper mx-auto">
            <div class="profile-name-image d-flex mt-4 ms-4">
                <div class="profile-image mx-3 mt-4 d-flex align-items-center justify-content-center">
                    <h1 class="fs-1 m-0">{{ empInitials(employeeStore.emp_details.fullName) }}</h1>
                </div>
                <div class="profile-name pt-4 px-5 mt-4">
                    <h2 class="fs-1">{{ formattedString(employeeStore.emp_details.fullName) }}</h2>
                    <h6 class="mt-3 mb-3">{{ employeeStore.emp_details.department }}</h6>
                    <p>{{ employeeStore.emp_details.emp_role }}</p>
                </div>
            </div>
            <div class="profile-desc d-flex justify-content-center mt-5">
                <div class="profile-about pt-2 text-center" :class="isActive == 'About' ? 'isActive' : ''"
                    @click="changeTab('About')">About
                </div>
                <div class="profile-timeline pt-2 text-center" :class="isActive == 'TimeLine' ? 'isActive' : ''"
                    @click="changeTab('TimeLine')">Timeline</div>
            </div>
            <div class="profile-content">
                <transition name="tab-change" mode="out-in">
                    <component :is="profileTab" />
                </transition>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { shallowRef, ref, onBeforeMount } from 'vue'
import TimeLine from '@/components/TimeLine.vue'
import About from '@/components/About.vue'
import { useRoute } from 'vue-router'
import { useEmployeeStore } from '../stores/employees'
import { useFormatName } from '../composables/useFormatName'
import { useDuration } from '../composables/useDuration'

const { calculateDuration } = useDuration()
const employeeStore = useEmployeeStore();
const route = useRoute()

await employeeStore.getEmpDetails(route.params.id)
const { empInitials } = useFormatName()
const profileTab = shallowRef(TimeLine)
const isActive = ref<string>('About')

function changeTab(tabName: string): void {
    tabName === 'About' ? profileTab.value = About : profileTab.value = TimeLine
    tabName === 'About' ? isActive.value = "About" : isActive.value = "TimeLine"
}
const today: Date = new Date()

const duration: number[] = calculateDuration(employeeStore.emp_details.joiningDate, today.toString())
if (duration[0] >= 1 || (duration[0] < 1 && duration[1] >= 6)) {
    employeeStore.emp_details.emp_role = "EMPLOYEE"
    if (duration[0] > 5) {
        employeeStore.emp_details.emp_role = "MANAGER"
    }
}
function formattedString(inputString: string): string {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

</script>

<style scoped>
.profile {
    margin-top: 100px;
}

.profile-wrapper {
    box-shadow: 5px 10px 18px rgb(136, 136, 136, 0.5);
    width: 700px;
    height: 800px;
    border-radius: 20px;
    overflow: hidden;
    background-color: white;
}

.profile-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #E2E2E2;
    border: 4px solid #0d6efd
}

.profile-name {
    width: 500px;
    height: 150px;
}

.profile-name h6 {
    color: #0d6efd;
}

.profile-name p {
    color: #4e4e4e
}

.profile-about {
    width: 300px;
    height: 40px;
    background-color: #0d6efd;
    color: white;
    cursor: pointer;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.profile-about:hover,
.profile-timeline:hover {
    background-color: #0b5ed7;
}

.profile-timeline {
    width: 300px;
    background-color: #0d6efd;
    border-left: 2px solid rgb(255, 255, 255);
    color: white;
    cursor: pointer;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}

.tab-change-enter-from {
    opacity: 0;
    transform: translateX(100px)
}

.tab-change-enter-active {
    transition: all 0.3s ease-out;
}

.tab-change-leave-to {
    opacity: 0;
    transform: translatex(-80px);
}

.tab-change-leave-active {
    transition: all 0.3s ease-in;
}

.isActive {
    background-color: #0b5ed7;
}

@media screen and (max-width: 768px) {
    .profile {
        margin-top: 50px;
    }

    .profile-wrapper {
        width: 100%;
        height: auto;
        border-radius: 0;
        box-shadow: none;
        padding: 20px;
    }

    .profile-name-image {
        flex-direction: column;
        align-items: center;
    }

    .profile-image {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background-color: #E2E2E2;
    }

    .profile-name {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px !important;
        padding-top: 0px !important;
    }

    .profile-name h2 {
        text-align: center;
    }

    .profile-name-image {
        margin-left: 0px !important;
    }

    .profile-desc {
        margin-top: 0px !important;
    }

    .profile-name h6 {
        margin: 10px !important;
    }
}

@media screen and (max-width: 400px) {
    .profile-image {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #E2E2E2;
    }
}
</style>