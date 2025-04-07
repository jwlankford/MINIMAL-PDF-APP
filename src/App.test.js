import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import App from './App.vue';

describe('App.vue', () => {
  it('renders the heading', () => {
    const wrapper = mount(App);
    expect(wrapper.find('h1').text()).toContain('PDF Letter Generator');
  });

  it('renders input fields and labels', () => {
    const wrapper = mount(App);
    expect(wrapper.find('label[for="firstName"]').exists()).toBe(true);
    expect(wrapper.find('input[id="firstName"]').exists()).toBe(true);

    expect(wrapper.find('label[for="lastName"]').exists()).toBe(true);
    expect(wrapper.find('input[id="lastName"]').exists()).toBe(true);

    expect(wrapper.find('label[for="address"]').exists()).toBe(true);
    expect(wrapper.find('textarea[id="address"]').exists()).toBe(true);

    expect(wrapper.find('label[for="city"]').exists()).toBe(true);
    expect(wrapper.find('input[id="city"]').exists()).toBe(true);

    expect(wrapper.find('label[for="state"]').exists()).toBe(true);
    expect(wrapper.find('select[id="state"]').exists()).toBe(true);

    expect(wrapper.find('label[for="zip"]').exists()).toBe(true);
    expect(wrapper.find('input[id="zip"]').exists()).toBe(true);

    expect(wrapper.find('label[for="template"]').exists()).toBe(true);
    expect(wrapper.find('select[id="template"]').exists()).toBe(true);

    expect(wrapper.find('button').text()).toContain('Generate PDF');
  });

  it('updates input fields', async () => {
    const wrapper = mount(App);

    await wrapper.find('input[id="firstName"]').setValue('John');
    await wrapper.find('input[id="lastName"]').setValue('Doe');
    await wrapper.find('textarea[id="address"]').setValue('123 Main St');
    await wrapper.find('input[id="city"]').setValue('Anytown');
    await wrapper.find('select[id="state"]').setValue('CA');
    await wrapper.find('input[id="zip"]').setValue('12345');

    expect(wrapper.vm.formData.firstName).toBe('John');
    expect(wrapper.vm.formData.lastName).toBe('Doe');
    expect(wrapper.vm.formData.address).toBe('123 Main St');
    expect(wrapper.vm.formData.city).toBe('Anytown');
    expect(wrapper.vm.formData.state).toBe('CA');
    expect(wrapper.vm.formData.zip).toBe('12345');
  });

  it('selects a template', async () => {
    const wrapper = mount(App);
    await wrapper.find('select[id="template"]').setValue(1);
    expect(wrapper.vm.selectedTemplate).toBe(1);
  });

  it('calls generatePDF on button click', async () => {
    const wrapper = mount(App);
    const generatePDF = vi.spyOn(wrapper.vm, 'generatePDF');

    await wrapper.find('button').trigger('click');

    expect(generatePDF).toHaveBeenCalled();
  });
});