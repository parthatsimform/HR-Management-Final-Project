<template>
  <div class="about">
    <div class="about-wrapper">
      <div class="about-personal-info mx-auto">
        <h3 class="fs-3 mt-5">Employee Details</h3>
        <hr />
        <div class="personal-detail">
          <div class="container ms-4">
            <div class="row">
              <div class="col-4">Name</div>
              <div class="col-8">{{ employeeStore.emp_details.fullName }}</div>
            </div>
            <div class="row">
              <div class="col-4">Email</div>
              <div class="col-8">{{ employeeStore.emp_details.email }}</div>
            </div>
            <div class="row">
              <div class="col-4">Mobile</div>
              <div class="col-8">{{ employeeStore.emp_details.mobile }}</div>
            </div>
            <div class="row">
              <div class="col-4">Joining Date</div>
              <div class="col-8">{{ employeeStore.emp_details.joiningDate }}</div>
            </div>
            <div class="row">
              <div class="col-4">DOB</div>
              <div class="col-8">{{ employeeStore.emp_details.dob }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEmployeeStore } from '@/stores/employeeStore'
const employeeStore = useEmployeeStore();
</script>

<style scoped>
.about-personal-info {
  max-width: 600px;
}

.about-personal-info h3 {
  margin-top: 80px;
}

.about-personal-info h3,
col-4,
col-8 {
  color: #4e4e4e;
}

.row {
  height: 40px;
}

.container {
  max-width: 550px;
}

.personal-detail {
  overflow-x: scroll;
}

.personal-detail::-webkit-scrollbar {
  display: none;
}

@media screen and (max-width: 400px) {
  .container{
    margin: 0 !important;
  }
  .about-personal-info h3 {
    margin-top: 0px
  }
}
</style>
