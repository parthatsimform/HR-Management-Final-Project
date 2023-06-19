<template>
  <Nav></Nav>
  <Suspense>
    <RouterView v-slot="{ Component }">
      <Transition name="card" mode="out-in" appear>
        <component :is="Component"></component>
      </Transition>
    </RouterView>
  </Suspense>
</template>

<script setup lang="ts">
</script>

<style>
.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: translateY(300px);
}

.card-enter-active,
.card-leave-active {
  transition: all 0.5s ease;
}
</style>