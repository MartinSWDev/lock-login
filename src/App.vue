<script setup lang="ts">
import LoginFormVue from '@/components/LoginForm.vue'
</script>

<template>
  <main class="d-flex justify-center align-center h-screen bg-blue-grey-lighten-4">
    <div class="d-flex justify-space-between elevation-1 w-75 mx-16 rounded-xl bg-grey-lighten-5">
      <div class="d-flex flex-column">
        <div class="d-flex align-center ml-8 mt-4">
          <span class="mdi mdi-lock text-deep-purple-accent-2 lock-icon"></span>
          <p class="font-weight-bold">Lock Login</p>
        </div>
        <img src="lock.png" width="100%" />
      </div>
      <LoginFormVue />
    </div>
  </main>
</template>

<style scoped>
.lock-icon {
  font-size: 3em;
}

p {
  font-size: 1.25em;
}
</style>
