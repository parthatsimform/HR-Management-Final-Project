<template>
  <Nav></Nav>
  <Suspense>
    <router-view></router-view>
  </Suspense>
</template>

<script setup lang="ts">
import { useEmployeeStore } from './stores/employees'
const employeeStore = useEmployeeStore();
import { auth } from "./includes/firebase"
if (auth.currentUser) {
  employeeStore.userId = auth.currentUser.uid
  employeeStore.isLoggedIn = true
}
</script>