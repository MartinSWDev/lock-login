<template>
  <v-form id="form" action="" class="d-flex flex-column text-center ma-4 bg-blue-grey-lighten-5">
    <v-container class="d-flex flex-column justify-center">
      <p class="mt-16 text-h5 font-weight-bold">Welcome back!</p>
      <p class="mb-16 text-grey-darken-1">Please enter your details</p>
      <v-text-field
        id="email"
        type="email"
        label="Email"
        variant="solo"
        class="mx-4"
        v-model="input.email"
      ></v-text-field>
      <v-text-field
        id="password"
        type="password"
        label="Password"
        variant="solo"
        class="mx-4"
        v-model="input.password"
      ></v-text-field>
      <v-row class="d-flex align-center justify-between mb-16 mx-4">
        <v-checkbox
          id="remember"
          type="checkbox"
          label="Remember Me"
          class="d-flex align-center ml-n3 remember font-weight-bold"
          color="deep-purple-accent-2"
        ></v-checkbox>
        <a href="" class="text-deep-purple-accent-2 forgot font-weight-bold">Forgot Password</a>
      </v-row>
      <v-btn id="log-in" rounded="xl" size="x-large" class="text-none mb-6 mx-4">Log In</v-btn>
      <v-btn id="google-log-in" rounded="xl" size="x-large" class="text-none mx-4 mb-16 px-12"
        ><img src="@/assets/svg/google.svg?url" width="30" /> Log in with Google</v-btn
      >
      <p class="mb-16">
        Don't have an account?
        <a href="" class="text-deep-purple-accent-2 font-weight-bold">Sign Up</a>
      </p>
    </v-container>
  </v-form>
</template>

<script lang="ts">
export default {
  name: 'LoginForm',
  data() {
    return {
      input: {
        email: '',
        password: ''
      }
    }
  }
}
</script>

<style scoped>
#form {
  border-radius: 16px;
  min-width: 33%;
}

.remember :deep(.v-label) {
  font-size: 0.75em;
  opacity: 0.9;
}

a {
  text-decoration: none;
}

.forgot {
  font-size: 0.75em;
}

#log-in {
  background: linear-gradient(to right, #6423fa, #ffc936, #7d08fa);
  color: white;
  cursor: pointer;
  transition: 0.5s;
  background-size: 225% auto;
  font-size: medium;
}
#log-in:hover {
  background-position: right center;
}

#google-log-in {
  letter-spacing: 0.01em;
  font-size: medium;
}
</style>
