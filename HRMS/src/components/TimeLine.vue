<template>
  <div class="timeline">

    <div class="timeline-wrapper mx-auto d-flex  flex-column mt-5">

      <div class="d-flex justify-content-center align-items-center ">

        <div class="timeline-dot-end timeline-start"></div>

      </div>

      <div class="timeline-space" v-for="( item, index) in items" :key="item.uid">




        <div class="d-flex flex-row-reverse align-items-center card-wrapper" v-if="index % 2 == 0">

          <transition-group class="timeline-card-content" name="timeline-card-content" tag="div"
            @before-enter="beforeEnter" @enter="enter" appear>

            <div class="timeline-card d-flex justify-content-center align-items-center px-4 flex-column text-center"
              :key="`card-${index}`">

              <div
                class="card-content card-content-right mx-1 d-flex justify-content-center align-items-center flex-column ">

                <div class="timeline-message">{{ item.message }}</div>

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

                <div class="timeline-message">{{ item.message }}</div>

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

import { useEmployeeStore } from '../stores/employees'

import gsap from 'gsap'

import { useDuration } from '../composables/useDuration'

const { calculateDuration } = useDuration()

import { useFormattedDate } from '../composables/useFormatedDate';

const { formattedDate } = useFormattedDate()




const employeeStore = useEmployeeStore();




const dateToday: Date = new Date()

const duration: number[] = calculateDuration(employeeStore.emp_details.joiningDate, formattedDate(dateToday.toISOString()));




function addYear(date: string, noOfYears: number): string {

  let year = new Date(date).getUTCFullYear() + noOfYears

  let month = (new Date(date).getUTCMonth() + 1).toString().padStart(2, '0')

  let day = (new Date(date).getUTCDate()).toString().padStart(2, '0')

  return `${year}-${month}-${day}`

}




function calculateMonth(date: string, noOfMoth: number): string {

  let month = (new Date(date).getUTCMonth() + 1)

  let year = new Date(date).getUTCFullYear()

  let day = new Date(date).getUTCDate().toString().padStart(2, '0')

  month = month + noOfMoth

  if (month % 12 > 0 && month > 12) {

    month = month % 12

    year += 1

  }

  const finalMonth = month.toString().padStart(2, '0')

  return `${year}-${finalMonth}-${day}`

}





const items = ref([{ message: 'Joined as a Trainee', date: formattedDate(employeeStore.emp_details.joiningDate) }])

if (duration[0] >= 1 || (duration[0] < 1 && duration[1] >= 6)) {

  items.value.push({ message: `Congractulations!! Successfully joined as an Employee`, date: calculateMonth(employeeStore.emp_details.joiningDate, 6) });

}




for (let i = 0; i < duration[0]; i++) {

  setTimeout(() => {

    const eventDate = employeeStore.emp_details.joiningDate

    items.value.push({ message: `You have successfully completed ${i + 1} ${i === 0 ? 'year' : 'years'}`, date: addYear(eventDate, i + 1) });

  }, (i + 1) * 250)

}





for (let i = 0; i < employeeStore.emp_details.techStackTimeLine.length; i++) {

  setTimeout(() => {

    items.value.push({ message: `Teck Stack Changed to ${employeeStore.emp_details.techStackTimeLine[i].techStack}`, date: employeeStore.emp_details.techStackTimeLine[i].date });

  }, (i + 1) * 250)

}

items.value = await items.value.sort((a: Date, b: Date) => new Date(a.date) - new Date(b.date));

console.log(items.value)

console.log(items.value.value);

for (let i = 0; i < items.value[1].length; i++) {

  console.log(items.value[i])

}





function beforeEnter(el: { style: { opacity: number; transform: string; }; }) {

  el.style.opacity = 0;

  el.style.transform = 'translateX(100px)'

}

function enter(el: { dataset: { index: number; }; }, done: boolean) {

  gsap.to(el, {

    opacity: 1,

    x: 0,

    duration: 0.5,

    onComplete: done,

    delay: el.dataset.index * 0.1

  })

}

function beforeEnterLeft(el: { style: { opacity: number; transform: string; }; }) {

  el.style.opacity = 0;

  el.style.transform = 'translateX(-100px)'

}

function enterLeft(el: { dataset: { index: number; }; }, done: boolean) {

  gsap.to(el, {

    opacity: 1,

    x: 0,

    duration: 0.5,

    onComplete: done,

    delay: el.dataset.index * 0.1

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