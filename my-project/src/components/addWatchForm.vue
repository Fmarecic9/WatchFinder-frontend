<template>
    <div v-if="role === 'admin'">
    <h2>Add a New Watch</h2>
    <form @submit.prevent="addWatch">
      <div v-for="field in watchFields" :key="field.name">
        <label :for="field.name">{{ field.label }}:</label>
        <input v-model="watch[field.name]" :id="field.name" :type="field.type" required />
      </div>
      <button type="submit">Add Watch</button>
    </form>
  </div>
  <div v-else>
        <h1>Only admins can add a watch</h1>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

let role = ref(localStorage.getItem("role"))
const watch = ref({
  brand: '',
  model: '',
  price: '',
  color: '',
  type: '',
  materialHousing: '',
  materialBracelet: '',
  braceletDiameter: '',
  length: '',
  width: '',
  height: '',
  weight: ''
});

const watchFields = [
  { name: 'brand', label: 'Brand', type: 'text' },
  { name: 'model', label: 'Model', type: 'text' },
  { name: 'price', label: 'Price', type: 'number' },
  { name: 'color', label: 'Color', type: 'text' },
  { name: 'type', label: 'Type', type: 'text' },
  { name: 'materialHousing', label: 'Material (Housing)', type: 'text' },
  { name: 'materialBracelet', label: 'Material (Bracelet)', type: 'text' },
  { name: 'braceletDiameter', label: 'Bracelet Diameter', type: 'number' },
  { name: 'length', label: 'Length', type: 'number' },
  { name: 'width', label: 'Width', type: 'float' },
  { name: 'height', label: 'Height', type: 'float' },
  { name: 'weight', label: 'Weight', type: 'float' }
];


const addWatch = async () => {
  try {
    const token = localStorage.getItem("token");
    
    await axios.post('http://localhost:3000/watches', watch.value, {
      headers: { Authorization: `Bearer ${token}` }
    });
    role.value = localStorage.getItem("role")
    setTimeout(() => {
        router.push('/home'); 
    }, 100);


  } catch (e) {
    console.error('Error:', e);
  }
};
</script>