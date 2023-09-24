import { shallowMount, mount } from '@vue/test-utils'
import LoginForm from '@/components/LoginForm.vue'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

describe('LoginForm', () => {
  describe('Content', () => {
    let wrapper = null
    beforeEach(() => {
      wrapper = shallowMount(LoginForm)
    })
    afterEach(() => {
      wrapper.unmount()
    })
    it('should display form element', () => {
      expect(wrapper.find('v-form').exists()).toBe(true)
    })
    it('should contain input fields for email and password', () => {
      expect(wrapper.find('v-text-field[type=email]').exists()).toBe(true)
      expect(wrapper.find('v-text-field[type=password]').exists()).toBe(true)
    })
    it('should contain checkbox for remember user', () => {
      expect(wrapper.find('v-checkbox[type=checkbox]').exists()).toBe(true)
    })
    it('should contain Forgot Password link', () => {
      expect(wrapper.findAll('a')[0].text()).toBe('Forgot Password')
    })
    it('should contain Log In button', () => {
      expect(wrapper.find('#log-in').exists()).toBe(true)
      expect(wrapper.findAll('v-btn')[0].text()).toBe('Log In')
    })
    it('should contain Log in with Google button', () => {
      expect(wrapper.find('#google-log-in').exists()).toBe(true)
      expect(wrapper.findAll('v-btn')[1].text()).toBe('Log in with Google')
    })
    it('should contain Sign Up link', () => {
      expect(wrapper.findAll('a')[1].text()).toBe('Sign Up')
    })
  })

  describe('Functionality', () => {
    describe('Email Input', () => {
      // email value should update
      it('should update v-model value for email when entered', async () => {
        const wrapper = mount(LoginForm)
        const emailInput = wrapper.get('v-text-field[type=email]')
        emailInput.element.value = 'test@example.com'
        emailInput.trigger('input')
        expect((wrapper.vm as any).input.email).toBe('test@example.com')
      })
      // accepts valid emails
      // doesnt accept invalid emails
      // displays invalid message
    })
    describe('Password Input', () => {
      // password value should update
      it('should update v-model value for password when entered', async () => {
        const wrapper = mount(LoginForm)
        const passwordInput = wrapper.get('v-text-field[type=password]')
        passwordInput.element.value = 'password'
        passwordInput.trigger('input')
        expect((wrapper.vm as any).input.password).toBe('password')
      })
      //   // accepts valid passwords
      //   // doesnt accept invalid passwords
      //   // displays invalid message
    })
    describe('Checkbox', () => {
      it('should update v-model value for checkbox', async () => {
        const wrapper = mount(LoginForm)
        const checkboxInput = wrapper.get('v-checkbox[type=checkbox]')
        checkboxInput.element.checked = true
        await checkboxInput.trigger('change')
        expect((wrapper.vm as any).input.rememberMe).toBe(true)
      })
    })
    describe('Forgot Password', () => {
      it('should trigger forgotPassword function', async () => {
        const wrapper = mount(LoginForm)
        const forgotPasswordMock = vi.fn()
        wrapper.vm.forgotPassword = forgotPasswordMock
        wrapper.get('#forgot').trigger('click')
        await wrapper.vm.$nextTick()
        expect(forgotPasswordMock).toHaveBeenCalled()
      })
    })
    describe('Log in', () => {
      it('should trigger logIn function on click', async () => {
        const wrapper = mount(LoginForm)
        const logInMock = vi.fn()
        wrapper.vm.logIn = logInMock
        await wrapper.get('#log-in').trigger('click')
        expect(logInMock).toHaveBeenCalled()
      })
      it('should call logIn method when form is submitted', async () => {
        const wrapper = mount(LoginForm)
        const logInMock = vi.fn()
        wrapper.vm.logIn = logInMock
        await wrapper.get('#form').trigger('submit.prevent')
        expect(logInMock).toHaveBeenCalled()
      })
      // Keyboard Enter triggers
      // Triggers if email and password complete
      // Doesnt trigger if one / both fields empty
    })
    describe('Log in with Google', () => {
      it('should trigger logInWithGoogle function on click', async () => {
        const wrapper = mount(LoginForm)
        const logInWithGoogleMock = vi.fn()
        wrapper.vm.logInWithGoogle = logInWithGoogleMock
        await wrapper.get('#google-log-in').trigger('click')
        expect(logInWithGoogleMock).toHaveBeenCalled()
      })
    })
    describe('Sign Up', () => {
      it('should trigger signUp function', async () => {
        const wrapper = mount(LoginForm)
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
