import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { shallowMount, mount, flushPromises } from '@vue/test-utils'
import LoginForm from '@/components/LoginForm.vue'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

const vuetify = createVuetify({
  components,
  directives
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('LoginForm', () => {
  let wrapper: any = null
  afterEach(() => {
    wrapper.unmount()
    vi.resetAllMocks()
  })
  beforeEach(() => {
    wrapper = mount(LoginForm, {
      global: {
        plugins: [vuetify]
      }
    })
  })
  describe('Content', () => {
    it('should display form element', () => {
      expect(wrapper.find('form').exists()).toBe(true)
    })
    it('should contain input fields for email and password', () => {
      expect(wrapper.find('input[type=email]').exists()).toBe(true)
      expect(wrapper.find('input[type=password]').exists()).toBe(true)
    })
    it('should contain checkbox for remember user', () => {
      expect(wrapper.find('input[type=checkbox]').exists()).toBe(true)
    })
    it('should contain Forgot Password link', () => {
      expect(wrapper.findAll('a')[0].text()).toBe('Forgot Password')
    })
    it('should contain Log In button', () => {
      expect(wrapper.find('#log-in').exists()).toBe(true)
      expect(wrapper.find('#log-in').text()).toBe('Log In')
    })
    it('should contain Log in with Google button', () => {
      expect(wrapper.find('#google-log-in').exists()).toBe(true)
      expect(wrapper.find('#google-log-in').text()).toBe('Log in with Google')
    })
    it('should contain Sign Up link', () => {
      expect(wrapper.findAll('a')[1].text()).toBe('Sign Up')
    })
  })

  describe('Functionality', () => {
    describe('Email Input', () => {
      it('should update v-model value for email when entered', async () => {
        const emailInput = wrapper.get('input[type=email]')
        emailInput.setValue('test@example.com')
        expect((wrapper.vm as any).input.email).toBe('test@example.com')
      })
      it('should show error when input empty', async () => {
        const emailInput = wrapper.get('input[type=email]')
        await emailInput.trigger('focus')
        await emailInput.trigger('blur')
        await wrapper.vm.$nextTick()
        expect(wrapper.find('#email-messages').text()).toBe('E-mail is required')
      })
      it('should show an error for an invalid email format', async () => {
        const emailInput = wrapper.get('input[type=email]')
        await emailInput.setValue('invalidEmail')
        await emailInput.trigger('blur')
        await wrapper.vm.$nextTick()
        expect(wrapper.find('#email-messages').text()).toBe('E-mail must be valid')
      })
      it('should show an error for email thats > 100 char', async () => {
        const emailInput = wrapper.get('input[type=email]')
        await emailInput.setValue(
          'thisisaverylongemailnameindeedatthisservice@averyspecificandlongsubdomain.exampledomainforillustrationonly.com'
        )
        await emailInput.trigger('blur')
        await wrapper.vm.$nextTick()
        expect(wrapper.find('#email-messages').text()).toBe(
          'E-mail must be less than 100 characters'
        )
      })
      it('should not show an error for a valid email', async () => {
        const emailInput = wrapper.get('input[type=email]')
        await emailInput.setValue('test@example.com')
        await emailInput.trigger('blur')
        await wrapper.vm.$nextTick()
        const errorMessage = wrapper.find('#email-messages')
        expect(errorMessage.text()).toBe('')
      })
    })
    describe('Password Input', () => {
      // password value should update
      it('should update v-model value for password when entered', async () => {
        const passwordInput = wrapper.get('input[type=password]')
        passwordInput.setValue('password')
        expect((wrapper.vm as any).input.password).toBe('password')
      })
      //   // accepts valid passwords
      //   // doesnt accept invalid passwords
      //   // displays invalid message
    })
    describe('Checkbox', () => {
      it('should update v-model value for checkbox', async () => {
        const checkboxInput = wrapper.get('input[type=checkbox]')
        checkboxInput.setChecked(true)
        expect((wrapper.vm as any).input.rememberMe).toBe(true)
      })
    })
    describe('Forgot Password', () => {
      it('should trigger forgotPassword function', async () => {
        const forgotPasswordMock = vi.fn()
        wrapper.vm.forgotPassword = forgotPasswordMock
        wrapper.get('#forgot').trigger('click')
        await wrapper.vm.$nextTick()
        expect(forgotPasswordMock).toHaveBeenCalled()
      })
    })
    describe('Log in', () => {
      it('should trigger logIn function on click', async () => {
        // issues with test, using emit as alternative
        const emailInput = wrapper.get('input[type=email]')
        emailInput.setValue('test@example.com')
        await wrapper.get('#log-in').trigger('click')
        expect(wrapper.emitted()).toHaveProperty('submit')
      })
      it('should call logIn method when form is submitted', async () => {
        // issues with test, using emit as alternative
        // const logInSpy = vi.spyOn(wrapper.vm, 'submit')
        const emailInput = wrapper.get('input[type=email]')
        emailInput.setValue('test@example.com')
        await wrapper.get('#form').trigger('submit')
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted()).toHaveProperty('submit')
        // expect(logInSpy).toHaveBeenCalled()
      })
      // Keyboard Enter triggers
      // Triggers if email and password complete
      // Doesnt trigger if one / both fields empty
    })
    describe('Log in with Google', () => {
      it('should trigger logInWithGoogle function on click', async () => {
        const logInWithGoogleMock = vi.fn()
        wrapper.vm.logInWithGoogle = logInWithGoogleMock
        await wrapper.get('#google-log-in').trigger('click')
        expect(logInWithGoogleMock).toHaveBeenCalled()
      })
    })
    describe('Sign Up', () => {
      it('should trigger signUp function', async () => {
        const signUpMock = vi.fn()
        wrapper.vm.signUp = signUpMock
        wrapper.get('#signUp').trigger('click')
        await wrapper.vm.$nextTick()
        expect(signUpMock).toHaveBeenCalled()
      })
    })
  })
})

// Possible annimation test on image
