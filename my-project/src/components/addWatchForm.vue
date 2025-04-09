<template>
  <div v-if="role === 'admin'" class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Add a New Watch</h2>

    <form @submit.prevent="addWatch" class="space-y-4">
      <div v-for="field in watchFields" :key="field.name" class="flex flex-col">
        <label :for="field.name" class="text-gray-700 font-medium">{{ field.label }}:</label>
        <input v-model="watch[field.name]" :id="field.name" :type="field.type" required 
               class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <h3 class="text-lg font-semibold text-gray-800 mt-4">Dimensions</h3>
      <div class="grid grid-cols-3 gap-4">
        <div class="flex flex-col">
          <label for="length" class="text-gray-700 font-medium">Length:</label>
          <input v-model="watch.dimensions.length" id="length" type="number" required 
                 class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="flex flex-col">
          <label for="width" class="text-gray-700 font-medium">Width:</label>
          <input v-model="watch.dimensions.width" id="width" type="number" required 
                 class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="flex flex-col">
          <label for="height" class="text-gray-700 font-medium">Height:</label>
          <input v-model="watch.dimensions.height" id="height" type="number" required 
                 class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <h3 class="text-lg font-semibold text-gray-800 mt-4">Features</h3>
      <div class="flex flex-col">
        <label for="features" class="text-gray-700 font-medium">Features (comma separated):</label>
        <input v-model="featuresInput" id="features" type="text" 
               class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="button" @click="addFeature"
                class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">Add Feature</button>
        <ul class="mt-2 space-y-1">
          <li v-for="(feature, index) in watch.features" :key="index" class="text-gray-600">{{ feature }}</li>
        </ul>
      </div>

      <h3 class="text-lg font-semibold text-gray-800 mt-4">Images</h3>
      <div class="flex flex-col">
        <label for="images" class="text-gray-700 font-medium">Image URL:</label>
        <input v-model="imageUrlInput" id="images" type="text" 
               class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="button" @click="addImageUrl"
                class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">Add Image</button>
        <div v-for="(imageUrl, index) in watch.images" :key="index" class="mt-2 text-gray-600">✔ Added image</div>
      </div>

      <button type="submit" class="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
        Add Watch
      </button>
    </form>
  </div>

  <div v-else class="max-w-lg mx-auto bg-red-100 text-red-600 text-center p-4 rounded-lg shadow-md">
    <h1 class="text-xl font-semibold">⚠ Only admins can add a watch</h1>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

let role = ref(localStorage.getItem("role"))
const router = useRouter()

const featuresInput = ref("")
const imageUrlInput = ref("")

const watch = ref({
  brand: '',
  model: '',
  price: '',
  color: '',
  type: '',
  materialHousing: '',
  materialBracelet: '',
  braceletDiameter: '',
  weight: '',
  dimensions: {
    length: '',
    width: '',
    height: ''
  },
  features: [],
  images: []
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
  { name: 'weight', label: 'Weight', type: 'number' },
];

const addFeature = () => {
  if (featuresInput.value.trim() !== '') {
    watch.value.features.push(featuresInput.value.trim());
    featuresInput.value = '';
  }
}
const addImageUrl = () => {
  if (imageUrlInput.value.trim() !== '') {
    watch.value.images.push(imageUrlInput.value.trim());
    imageUrlInput.value = '';
  }
}

const addWatch = async () => {
  try {
    const token = localStorage.getItem("token")
   
    await axios.post('http://localhost:3000/watches', watch.value, 
    {headers: { Authorization: `Bearer ${token}`}});

    role.value = localStorage.getItem("role")
    setTimeout(() => {
        router.push('/home'); 
    }, 100);


  } catch (e) {
    console.error('Error:', e);
  }
};
</script>