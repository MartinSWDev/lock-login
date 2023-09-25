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
    vi.resetAllMocks()
    wrapper.unmount()
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
      it('should update v-model value for password when entered', async () => {
        const passwordInput = wrapper.get('input[type=password]')
        await passwordInput.setValue('password')
        expect((wrapper.vm as any).input.password).toBe('password')
      })
      it('should show error for missing password', async () => {
        const passwordInput = wrapper.get('input[type=password]')
        await passwordInput.trigger('focus')
        await passwordInput.trigger('blur')
        await wrapper.vm.$nextTick()
        const errorMessage = wrapper.get('#password-messages')
        expect(errorMessage.text()).toBe('Password is required')
      })
      it('should show error for password shorter than 8 characters', async () => {
        const passwordInput = wrapper.get('input[type=password]')
        await passwordInput.setValue('Short1!')
        await passwordInput.trigger('keyup')
        await wrapper.vm.$nextTick()
        const errorMessage = wrapper.get('#password-messages')
        expect(errorMessage.text()).toBe('Password must be at least 8 characters')
      })
      it('should show error for password without uppercase characters', async () => {
        const passwordInput = wrapper.get('input[type=password]')
        await passwordInput.setValue('alllowercase1!')
        await passwordInput.trigger('keyup')
        await wrapper.vm.$nextTick()
        const errorMessage = wrapper.get('#password-messages')
        expect(errorMessage.text()).toBe('Password must have at least one uppercase character')
      })
      it('should show error for password without lowercase characters', async () => {
        const passwordInput = wrapper.get('input[type=password]')
        await passwordInput.setValue('ALLUPPER1!')
        await passwordInput.trigger('keyup')
        await wrapper.vm.$nextTick()
        const errorMessage = wrapper.get('#password-messages')
        expect(errorMessage.text()).toBe('Password must have at least one lowercase character')
      })
      it('should show error for password without numbers', async () => {
        const passwordInput = wrapper.get('input[type=password]')
        await passwordInput.setValue('NoNumbers!')
        await passwordInput.trigger('keyup')
        await wrapper.vm.$nextTick()
        const errorMessage = wrapper.get('#password-messages')
        expect(errorMessage.text()).toBe('Password must have at least one number')
      })
      it('should show error for password without special characters', async () => {
        const passwordInput = wrapper.get('input[type=password]')
        await passwordInput.setValue('NoSpecials1')
        await passwordInput.trigger('keyup')
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()
        const errorMessage = wrapper.get('#password-messages')
        expect(errorMessage.text()).toBe('Password must have at least one special character')
      })
      it('should show error for password containing spaces', async () => {
        const passwordInput = wrapper.get('input[type=password]')
        await passwordInput.setValue('Has Space1!')
        await passwordInput.trigger('keyup')
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()
        const errorMessage = wrapper.get('#password-messages')
        expect(errorMessage.text()).toBe('Password must not contain spaces')
      })
      it('should not show any error for a valid password', async () => {
        const passwordInput = wrapper.get('input[type=password]')
        await passwordInput.setValue('ValidPass1!')
        await passwordInput.trigger('keyup')
        await wrapper.vm.$nextTick()
        const errorMessage = wrapper.get('#password-messages')
        expect(errorMessage.text()).not.toContain('Password must')
      })
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
      // issues with tests, using emit as alternative to haveBeenCalled
      it('should trigger submit function on click', async () => {
        const emailInput = wrapper.find('input[type=email]')
        const passwordInput = wrapper.find('input[type=password]')
        await emailInput.setValue('test@example.com')
        await passwordInput.setValue('password123')
        await wrapper.get('#log-in').trigger('click')
        expect(wrapper.emitted()).toHaveProperty('submit')
      })
      it('should call submit method when form is submitted', async () => {
        // const logInSpy = vi.spyOn(wrapper.vm, 'submit')
        const emailInput = wrapper.get('input[type=email]')
        emailInput.setValue('test@example.com')
        await wrapper.get('#form').trigger('submit')
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted()).toHaveProperty('submit')
        // expect(logInSpy).toHaveBeenCalled()
      })
      it('should trigger submit function on click', async () => {
        const emailInput = wrapper.find('input[type=email]')
        const passwordInput = wrapper.find('input[type=password]')
        await emailInput.setValue('test@example.com')
        await passwordInput.setValue('password123')
        await wrapper.get('#log-in').trigger('click')
        expect(wrapper.emitted()).toHaveProperty('submit')
      })
      it('should trigger submit function on enter', async () => {
        const emailInput = wrapper.find('input[type=email]')
        const passwordInput = wrapper.find('input[type=password]')
        await emailInput.setValue('test@example.com')
        await passwordInput.setValue('password123')
        await wrapper.get('#form').trigger('keyup.enter')
        expect(wrapper.emitted()).toHaveProperty('submit')
      })
      it('should not trigger submit when only email is filled', async () => {
        const emailInput = wrapper.find('input[type=email]')
        await emailInput.setValue('test@example.com')
        await wrapper.get('#log-in').trigger('click')
        expect(wrapper.emitted()).not.toHaveProperty('submit')
      })
      it('should not trigger submit when only password is filled', async () => {
        const passwordInput = wrapper.find('input[type=password]')
        await passwordInput.setValue('password123')
        await wrapper.get('#log-in').trigger('click')
        expect(wrapper.emitted()).not.toHaveProperty('submit')
      })
      it('should trigger submit when both email and password are filled', async () => {
        const emailInput = wrapper.find('input[type=email]')
        const passwordInput = wrapper.find('input[type=password]')
        await emailInput.setValue('test@example.com')
        await passwordInput.setValue('password123')
        await wrapper.get('#log-in').trigger('click')
        expect(wrapper.emitted()).toHaveProperty('submit')
      })
    })
    describe('Log in with Google', () => {
      it('should trigger logInWithGoogle function on click', async () => {
        wrapper.get('#google-log-in').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted()).toHaveProperty('google')
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
