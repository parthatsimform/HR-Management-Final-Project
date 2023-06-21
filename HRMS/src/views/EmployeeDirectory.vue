<template>
  <div class="department">
    <div class="dept-wrapper">
      <div class="container-fluid p-0 mb-5 ">
        <div class="row row-dept">
          <div class="col-lg-3 col-md-6 col-sm-6  employee-dept-table" v-for="item in department" :key="item">
            <EmployeeCard :department="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EmployeeCard from '../components/EmployeeCard.vue'
const department = ['FrontEnd', 'BackEnd', 'Ui/Ux', 'DevOps']
</script>


<style scoped>
.container-fluid {
  width: 85%;
}

.department {
  margin-top: 100px;
}

@media (max-width: 1200px) {
  .container-fluid {
    width: 90%;
  }
}

@media (max-width: 991px) {
  .container-fluid {
    display: flex;
    justify-content: center;
  }

  .row-dept {
    width: 80% !important;
  }

  .employee-dept-table {
    width: 50% !important;
  }

}

@media (max-width: 767px) {
  .row-dept {
    width: 90% !important;
  }

  .employee-dept-table {
    width: 50% !important;
  }
}

@media (max-width: 575px) {
  .row-dept {
    display: flex !important;
    justify-content: center !important;
  }

  .employee-dept-table {
    width: 90% !important;
  }
}

@media (max-width: 425px) {
  .employee-dept-table {
    width: 100% !important;
  }
}
</style>