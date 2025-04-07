<template>
    <div>
      <label for="firstName">First Name:</label>
      <input type="text" id="firstName" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import '../App.css'; // Import the CSS file
  export default {
    props: {
      modelValue: String,
      error: String,
    },
    emits: ['update:modelValue'],
  };
  </script>
  

 