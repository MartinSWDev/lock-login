import { shallowMount, mount } from '@vue/test-utils'
import LoginForm from '@/components/LoginForm.vue'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'

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
        const emailInput = wrapper.get('v-text-field[type=password]')
        emailInput.element.value = 'password'
        emailInput.trigger('input')
        expect((wrapper.vm as any).input.password).toBe('password')
      })
      //   // accepts valid passwords
      //   // doesnt accept invalid passwords
      //   // displays invalid message
    })
    // describe('Checkbox', () => {
    //   // Some trigger
    // })
    // describe('Forgot Password', () => {
    //   // Some trigger
    // })
    // describe('Log in', () => {
    //   // Some trigger
    //   // Keyboard Enter triggers
    //   // Triggers if email and password complete
    //   // Doesnt trigger if one / both fields empty
    // })
    // describe('Log in with Google', () => {
    //   // Some trigger
    // })
    // describe('Sign Up', () => {
    //   // Some trigger
    // })
    // // Can trigger Log in button
    // // Can trigger Log in with Google button
    // // Can trigger forgot password
    // // Can trigger sign up
  })
})

// Possible annimation test on image
