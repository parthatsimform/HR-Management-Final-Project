<template>
    <div class="profile">
        <div class="profile-wrapper mx-auto">
            <div class="profile-name-image d-flex mt-4 ms-4">
                <div class="profile-image mx-3 mt-4 d-flex align-items-center justify-content-center">
                    <h1 class="fs-1 ">JD</h1>
                </div>
                <div class="profile-name pt-4 px-5 mt-4">
                    <h2 class="fs-1">John Doe</h2>
                    <h6 class="mt-3 mb-3">FrontEnd</h6>
                    <p>TRAINEE</p>
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
import { shallowRef, ref } from 'vue'
import TimeLine from '@/components/TimeLine.vue'
import About from '@/components/About.vue'

const profileTab = shallowRef(About)
const isActive = ref('About')

console.log(profileTab.value)
function changeTab(tabName: string) {
    tabName === 'About' ? profileTab.value = About : profileTab.value = TimeLine
    tabName === 'About' ? isActive.value = "About" : isActive.value = "TimeLine"
}
</script>

<style scoped>
.profile {
    display: flex;
    align-items: center;
    height: 100vh;
}

.profile-wrapper {
    box-shadow: 5px 10px 18px rgb(136, 136, 136, 0.5);
    width: 700px;
    height: 800px;
    border-radius: 20px;
}

.profile-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #E2E2E2;
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
    transform: translatex(-100px);
}

.tab-change-leave-active {
    transition: all 0.3s ease-in;
}

.isActive {
    background-color: #0b5ed7;
}
</style>