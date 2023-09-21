import { shallowMount } from '@vue/test-utils'
import Login from '@/components/LoginForm.vue'
import { describe, test, expect } from 'vitest'
// Tests needed

// That we have a form
describe('LoginForm', () => {
  test('should display form element', () => {
    const wrapper = shallowMount(Login)
    expect(wrapper.find('form').exists()).toBe(true)
  })

  // That it has an Email Input
  // That it has a Password Input
  test('should contain input fields for email and password', () => {
    const wrapper = shallowMount(Login)
    expect(wrapper.find('input[type=email]').exists()).toBe(true)
    expect(wrapper.find('input[type=password]').exists()).toBe(true)
  })
  // That there is a 'Remember me' checkbox
  test('should contain checkbox for remember user', () => {
    const wrapper = shallowMount(Login)
    expect(wrapper.find('input[type=checkbox]').exists()).toBe(true)
  })
  // That there is a 'Forgot Password' link
  test('should contain Forgot Password link', () => {
    const wrapper = shallowMount(Login)
    expect(wrapper.findAll('a')[0].text()).toBe('Forgot Password')
  })
  // That there is a 'Log in' button
  test('should contain Log In button', () => {
    const wrapper = shallowMount(Login)
    expect(wrapper.find('#log-in').exists()).toBe(true)
    expect(wrapper.findAll('button')[0].text()).toBe('Log In')
  })

  // That there is a log in with Google button
  test('should contain Log in with Google button', () => {
    const wrapper = shallowMount(Login)
    expect(wrapper.find('#google-log-in').exists()).toBe(true)
    expect(wrapper.findAll('button')[1].text()).toBe('Log in with Google')
  })

  // That there is a 'Sign Up' link
  test('should contain Sign Up link', () => {
    const wrapper = shallowMount(Login)
    expect(wrapper.findAll('a')[1].text()).toBe('Sign Up')
  })
})

// Possible annimation test on image
