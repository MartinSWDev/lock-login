<template>
  <v-form action="" class="d-flex flex-column bg-blue-grey-lighten-5">
    <p>Welcome back!</p>
    <p>Please enter your details</p>
    <v-text-field id="email" type="email"></v-text-field>
    <v-text-field id="password" type="password"></v-text-field>
    <v-text-field id="remember" type="checkbox"></v-text-field>
    <a href="">Forgot Password</a>
    <v-btn id="log-in">Log In</v-btn>
    <v-btn id="google-log-in">Log in with Google</v-btn>
    <p>Don't have an account?<a href="">Sign Up</a></p>
  </v-form>
</template>

<script lang="ts">
export default {}
</script>

<style scoped></style>
