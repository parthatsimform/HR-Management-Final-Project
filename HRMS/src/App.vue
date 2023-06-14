<template>
  <Nav></Nav>
  <Suspense>
    <router-view></router-view>
  </Suspense>
</template>

<script setup lang="ts">
import { useUserStore } from './stores/userStore'
const userStore = useUserStore()
import { auth } from "./includes/firebase"
if (auth.currentUser) {
  userStore.userId = auth.currentUser.uid
  userStore.isLoggedIn = true
}
</script>