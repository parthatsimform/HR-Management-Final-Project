<template>
  <div class="timeline">
    <div class="timeline-wrapper mx-auto d-flex  flex-column mt-5 align-items-center">
      <div class="timeline-space" v-for="item in items">
        <div class="timeline-card d-flex justify-content-center align-items-center">{{ item.message }}</div>
        <div class="timeline-hr mx-auto"></div>
      </div>
      <div class="timeline-end"></div>
    </div>
  </div>
</template>

<style>
.timeline-wrapper {
  max-width: 600px;
  height: 430px;
  overflow-y: scroll;
}

.timeline-card {
  width: 300px;
  height: 100px;
  border-radius: 10px;
  background-color: #E2E2E2;
}

.timeline-hr {
  border: 3px solid #0d6efd;
  height: 25px;
  width: 1px;
  ;
}

.timeline-end {
  border: 10px solid #0d6efd;
  border-radius: 50%;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
const items = ref([{ message: 'Foo' }, { message: 'Bar' }, { message: 'Foo' }, { message: 'Bar' }])
</script>