<template>
  <div v-if="role === 'admin'">
    <h2>Add a New Watch</h2>
    <form @submit.prevent="addWatch">
      <div v-for="field in watchFields" :key="field.name">
        <label :for="field.name">{{ field.label }}:</label>
        <input v-model="watch[field.name]" :id="field.name" :type="field.type" required />
      </div>

      <h3>Dimensions</h3>
      <div>
        <label for="length">Length:</label>
        <input v-model="watch.dimensions.length" id="length" type="number" required />
      </div>
      <div>
        <label for="width">Width:</label>
        <input v-model="watch.dimensions.width" id="width" type="number" required />
      </div>
      <div>
        <label for="height">Height:</label>
        <input v-model="watch.dimensions.height" id="height" type="number" required />
      </div>


      <h3>Features</h3>
      <div>
        <label for="features">Features (comma separated):</label>
        <input v-model="featuresInput" id="features" type="text" />
        <button type="button" @click="addFeature">Add Feature</button>
        <ul>
          <li v-for="(feature, index) in watch.features" :key="index">{{ feature }}</li>
        </ul>
      </div>

      <h3>Images</h3>
      <div>
        <label for="images">Images:</label>
        <input v-model="imageUrlInput" id="images" type="text" />
        <button type="button" @click="addImageUrl">Add Image</button>
        <div v-for="(imageUrl, index) in watch.images" :key="index">Added image </div>
           
       
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