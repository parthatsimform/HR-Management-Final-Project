<template>
    <div class="timeline">
        <div class="timeline-wrapper mx-auto d-flex  flex-column mt-5">
            <div class="d-flex justify-content-center align-items-center ">
                <div class="timeline-dot-end timeline-start"></div>
            </div>
            <div class="timeline-space" v-for="( item, index) in timeLineList" :key="item.message">
                <div class="d-flex flex-row-reverse align-items-center card-wrapper" v-if="index % 2 == 0">
                    <transition-group class="timeline-card-content" name="timeline-card-content" tag="div"
                        @before-enter="beforeEnter" @enter="enter" appear>
                        <div class="timeline-card d-flex justify-content-center align-items-center px-4 flex-column text-center"
                            :key="`card-${index}`">
                            <div
                                class="card-content card-content-right mx-1 d-flex justify-content-center align-items-center flex-column ">
                                <div class="timeline-message mx-1">{{ item.message }}</div>
                                <div class="timeline-date">{{ item.date }}</div>
                            </div>
                        </div>
                    </transition-group>
                    <div class="d-flex flex-column justify-content-end">
                        <div class="timeline-hr mx-auto"></div>
                        <div class="timeline-dot"></div>
                        <div class="timeline-hr after-hr mx-auto"></div>
                    </div>
                </div>
                <div class="d-flex flex-row align-items-center card-wrapper" v-else>
                    <transition-group class="timeline-card-content" name="timeline-card-content" tag="div"
                        @before-enter="beforeEnterLeft" @enter="enterLeft" appear>
                        <div class="timeline-card d-flex justify-content-center align-items-center px-4 flex-column text-center"
                            :key="`card-${index}`">
                            <div
                                class="card-content card-content-left mx-1  d-flex justify-content-center align-items-center flex-column ">
                                <div class="timeline-message mx-1">{{ item.message }}</div>
                                <div class="timeline-date">{{ item.date }}</div>
                            </div>
                        </div>
                    </transition-group>
                    <div>
                        <div class="timeline-hr mx-auto"></div>
                        <div class="timeline-dot"></div>
                        <div class="timeline-hr after-hr mx-auto"></div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center align-items-center">
                <div class="timeline-dot-end "></div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useEmployeeStore } from '@/stores/employeeStore'
import { useDuration } from '@/composables/useDuration'
import { useFormattedDate } from '@/composables/useFormatedDate';
import gsap from 'gsap'

const { calculateDuration } = useDuration()
const { formattedDate } = useFormattedDate()
const employeeStore = useEmployeeStore();
const dateToday: Date = new Date()
const duration: number[] = calculateDuration(employeeStore.emp_details.joiningDate, formattedDate(dateToday.toISOString()));

function addYear(date: string | Date, noOfYears: number): string {
    let year: number = new Date(date).getUTCFullYear() + noOfYears
    let month: string = (new Date(date).getUTCMonth() + 1).toString().padStart(2, '0')
    let day: string = (new Date(date).getUTCDate()).toString().padStart(2, '0')
    return `${year}-${month}-${day}`
}

function calculateMonth(date: string | Date, noOfMoth: number): string {
    let month: number = (new Date(date).getUTCMonth() + 1)
    let year: number = new Date(date).getUTCFullYear()
    let day: string = new Date(date).getUTCDate().toString().padStart(2, '0')
    month = month + noOfMoth
    if (month % 12 > 0 && month > 12) {
        month = month % 12
        year += 1
    }
    const finalMonth: string = month.toString().padStart(2, '0')
    return `${year}-${finalMonth}-${day}`
}

interface timeLineContent {
    message: string;
    date: string;
}
const items = ref<timeLineContent[]>([{ message: 'Joined as a Trainee', date: formattedDate(employeeStore.emp_details.joiningDate) }])

function displayTimeLineYear(): void {
    if (duration[0] >= 1 || (duration[0] < 1 && duration[1] >= 6)) {
        items.value.push({
            message: `Congratulations!! Successfully joined as an Employee`,
            date: calculateMonth(employeeStore.emp_details.joiningDate, 6),
        });
    }
    for (let i = 0; i < duration[0]; i++) {
        const eventDate: Date = employeeStore.emp_details.joiningDate;
        if (i >= 5) {
            if ((i + 1) % 5 == 0) {
                items.value.push({
                    message: `You have successfully completed ${i + 1} years`,
                    date: addYear(eventDate, i + 1),
                });
            }
        }
        else {
            items.value.push({
                message: `You have successfully completed ${i + 1} ${i === 0 ? "year" : "years"}`,
                date: addYear(eventDate, i + 1),
            });
        }

    }
}

function displayTimeLineStack(): void {
    for (let i = 0; i < employeeStore.emp_details.techStackTimeLine.length; i++) {
        items.value.push({ message: `Tech Stack Changed to ${employeeStore.emp_details.techStackTimeLine[i].techStack}`, date: employeeStore.emp_details.techStackTimeLine[i].date });
    }
}

const timeLinedata: () => void = () => {
    displayTimeLineYear()
    displayTimeLineStack()
}
timeLinedata()

items.value.sort((a: timeLineContent, b: timeLineContent): number => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
});
let timeLineList = ref<timeLineContent[]>([])
for (let i = 0; i < items.value.length; i++) {
    setTimeout(() => {
        timeLineList.value.push(items.value[i])
    }, (i + 1) * 250)
}

function beforeEnter(el: { style: { opacity: number; transform: string; }; } | Element) {
    const element = el as HTMLElement;
    element.style.opacity = '0';
    element.style.transform = 'translateX(100px)'
}
function enter(el: { dataset: { index: number; }; } | Element, done: () => void) {
    gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        onComplete: done
    })
}
function beforeEnterLeft(el: { style: { opacity: number; transform: string; }; } | Element) {
    const element = el as HTMLElement;
    element.style.opacity = '0';
    element.style.transform = 'translateX(-100px)'
}
function enterLeft(el: { dataset: { index: number; }; } | Element, done: () => void) {
    gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        onComplete: done
    })
}
</script>

<style>
.timeline-wrapper {
    max-width: 600px;
    height: 430px;
    overflow-y: scroll;
}

.timeline-wrapper::-webkit-scrollbar {
    display: none;
}

.timeline-card {
    width: 290px;
    height: 100px;
    border-radius: 10px;
    background-color: #ffffff;
}

.card-content {
    background-color: #0d6efd;
    color: white;
    border-radius: 10px;
    height: 70px;
    width: 236px;
}

.timeline-hr {
    border: 2px solid #aeaeae;
    height: 45px;
    width: 1px;
}

.timeline-dot {
    border: 10px solid #0d6efd;
    border-radius: 50%;
    height: 2px
}

.timeline-card-content-leave-active {
    transition: all 0.5s ease;
    position: absolute;
}

.timeline-card-content-move {
    transition: all 0.5s ease;
}

.card-content-left::after {
    content: "";
    position: absolute;
    top: 18%;
    left: 100%;
    margin-left: -30px;
    border-width: 32px;
    border-style: solid;
    border-color: transparent transparent transparent #0d6efd;
}

.card-content-right::after {
    content: "";
    position: absolute;
    top: 15%;
    right: 88.5%;
    margin-left: -30px;
    border-width: 35px;
    border-style: solid;
    border-color: transparent #0d6efd transparent transparent;
}

.timeline-dot-end {
    border: 10px solid #0d6efd;
    border-radius: 50%;
    height: 2px;
    width: 2px;
}

@media screen and (max-width: 641px) {
    .timeline-start {
        display: none;
    }

    .profile-name-image {
        margin: 0px !important;
    }

    .card-wrapper {
        display: flex;
        flex-direction: column !important;
    }

    .card-content-left::after {
        content: "";
        display: none;
    }

    .card-content-right::after {
        content: "";
        display: none;
    }

    .timeline-hr {
        height: 25px;
    }

    .timeline-dot {
        display: none;
    }

    .after-hr::after {
        content: "";
        margin-top: 100px;
        margin-left: -10px;
        border-width: 10px;
        border-style: solid;
        border-color: #0d6efd transparent transparent transparent;
    }

    .timeline-dot-end {
        border: 10px solid #0d6efd;
        border-radius: 50%;
        height: 2px;
        width: 2px;
    }

    .timeline-card {
        background-color: #E2E2E2;
    }
}

@media screen and (max-width: 390px) {
    .timeline-card {
        width: 230px;
        height: 100px;
        border-radius: 10px;
        background-color: #E2E2E2;
    }

    .card-content {
        background-color: #0d6efd;
        color: white;
        border-radius: 10px;
        height: 70px;
        width: 186px;
    }

    .timeline-message,
    .timeline-date {
        font-size: 12.5px;
    }
}
</style>