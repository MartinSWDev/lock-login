<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
const imageUrl = new URL('/lock.png', import.meta.url).href
</script>

<template>
  <main class="d-flex justify-center align-center h-screen bg-blue-grey-lighten-4">
    <div class="d-flex justify-center elevation-1 w-75 mx-16 rounded-xl bg-grey-lighten-5">
      <div class="d-flex flex-column hideMe">
        <div class="d-flex align-center ml-8 mt-4">
          <span class="mdi mdi-lock text-deep-purple-accent-2 lock-icon"></span>
          <p class="font-weight-bold">Lock Login</p>
        </div>
        <img class="image-fit" :src="imageUrl" />
      </div>
      <LoginForm />
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
.image-fit {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

@media (max-width: 1000px) {
  .image-fit {
    display: none;
  }

  .hideMe {
    display: none !important;
  }
}
</style>
