<template>
  <v-form id="form" action="" class="d-flex flex-column text-center ma-4 bg-blue-grey-lighten-5">
    <v-container>
      <p class="mt-14 text-h5 font-weight-bold">Welcome back!</p>
      <p class="mb-14 text-grey-darken-1">Please enter your details</p>
      <v-text-field
        id="email"
        type="email"
        label="Email"
        variant="solo"
        class="mx-4 noborder"
      ></v-text-field>
      <v-text-field
        id="password"
        type="password"
        label="Password"
        variant="solo"
        class="mx-4"
      ></v-text-field>
      <v-row>
        <v-checkbox
          id="remember"
          type="checkbox"
          label="Remember Me"
          class=""
          color="deep-purple-accent-2"
        ></v-checkbox>
        <a href="">Forgot Password</a>
      </v-row>
      <v-btn id="log-in">Log In</v-btn>
      <v-btn id="google-log-in">Log in with Google</v-btn>
      <p>Don't have an account?<a href="">Sign Up</a></p>
    </v-container>
  </v-form>
</template>

<script lang="ts">
export default {}
</script>

<style scoped>
#form {
  border-radius: 16px;
}
</style>
