import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../App.vue';

describe('App.vue', () => {
  it('renders the heading', () => {
    const wrapper = mount(App);
    expect(wrapper.find('h1').text()).toContain('PDF Letter Generator');
  });
});