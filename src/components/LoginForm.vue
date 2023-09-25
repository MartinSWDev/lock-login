<template>
  <v-form
    @keyup.enter="submit"
    id="form"
    class="d-flex flex-column text-center ma-4 bg-blue-grey-lighten-5"
  >
    <v-container class="d-flex flex-column justify-center">
      <p class="mt-16 text-h5 font-weight-bold">Welcome back!</p>
      <p class="mb-16 text-grey-darken-1">Please enter your details</p>
      <v-text-field
        id="email"
        type="email"
        label="Email"
        variant="solo"
        class="mx-4"
        :rules="emailRules"
        required
        v-model="input.email"
        test-id="email"
      ></v-text-field>
      <v-text-field
        id="password"
        type="password"
        label="Password"
        variant="solo"
        class="mx-4"
        v-model="input.password"
        :rules="passwordRules"
      ></v-text-field>
      <v-row class="d-flex align-center justify-between mb-16 mx-4">
        <v-checkbox
          id="remember"
          type="checkbox"
          v-model="input.rememberMe"
          label="Remember Me"
          class="d-flex align-center ml-n3 remember font-weight-bold"
          color="deep-purple-accent-2"
        ></v-checkbox>
        <a
          id="forgot"
          @click.prevent="forgotPassword"
          href=""
          class="text-deep-purple-accent-2 forgot font-weight-bold"
          >Forgot Password</a
        >
      </v-row>
      <v-btn
        id="log-in"
        @click="submit"
        rounded="xl"
        size="x-large"
        class="text-none mb-6 mx-4"
        form="form"
        >Log In</v-btn
      >
      <v-btn
        id="google-log-in"
        @click.prevent="logInWithGoogle"
        rounded="xl"
        size="x-large"
        class="text-none mx-4 mb-16 px-12"
        ><img src="@/assets/svg/google.svg?url" width="30" /> Log in with Google</v-btn
      >
      <p class="mb-16">
        Don't have an account?
        <a
          id="signUp"
          @click.prevent="signUp"
          href=""
          class="text-deep-purple-accent-2 font-weight-bold"
          >Sign Up</a
        >
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
        password: '',
        rememberMe: false
      },
      emailRules: [
        (v: string) => !!v || 'E-mail is required',
        (v: string) =>
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
            v
          ) || 'E-mail must be valid',
        (v: string) => (v && v.length <= 100) || 'E-mail must be less than 100 characters'
      ],
      passwordRules: [
        (v: string) => !!v || 'Password is required',
        (v: string) => (v && v.length >= 8) || 'Password must be at least 8 characters',
        (v: string) => /[A-Z]/.test(v) || 'Password must have at least one uppercase character',
        (v: string) => /[a-z]/.test(v) || 'Password must have at least one lowercase character',
        (v: string) => /\d/.test(v) || 'Password must have at least one number',
        (v: string) =>
          /[!@#$%^&*()\-=+[\]{}|;:'",.<>?/]/.test(v) ||
          'Password must have at least one special character',
        (v: string) => !/\s/.test(v) || 'Password must not contain spaces'
      ]
    }
  },

  methods: {
    forgotPassword() {
      console.log('forgot')
    },
    submit() {
      if (this.isFormValid) {
        console.log('submitted')
        this.$emit('submit', {
          email: this.input.email,
          password: this.input.password,
          rememberMe: this.input.rememberMe
        })
      }
    },
    logInWithGoogle() {
      console.log('g log in')
      this.$emit('google')
    },
    signUp() {
      console.log('sign up')
    }
  },

  computed: {
    isFormValid() {
      return (
        this.emailRules.every((rule) => rule(this.input.email) === true) &&
        this.passwordRules.every((rule) => rule(this.input.password) === true)
      )
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
