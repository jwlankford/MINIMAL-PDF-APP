<template>
    <div>
      <label for="firstName">First Name:</label>
      <input type="text" id="firstName" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      modelValue: String,
      error: String,
    },
    emits: ['update:modelValue'],
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>