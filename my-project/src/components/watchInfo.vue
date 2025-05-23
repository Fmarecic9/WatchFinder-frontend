<template>
  <div class="centered-container">
    <div v-if="watch" class="content">
      <button @click="goBack" class="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">Back</button>
      <h1>{{ watch.brand }} {{ watch.model }}</h1>
      
      <!-- Updated Image Layout -->
      <div class="image-grid">
        <span v-for="(image, index) in watch.images" :key="index" class="image-item">
          <img :src="image" alt="Watch Image" />
        </span>
      </div>

      <strong><p>{{ watch.price }}€</p></strong>
      <p>Color: {{ watch.color }}</p>
      <p>Type: {{ watch.type }}</p>
      <p>Dimensions: {{ watch.dimensions.length }}x{{ watch.dimensions.width }}x{{ watch.dimensions.height }} mm</p>
      <p>Weight: {{ watch.weight }}g</p>
      <div v-if="role">
        <button @click="addToWishlist(watch._id)" class="mt-4 px-6 py-2 font-semibold rounded-md border border-black-800 text-gray-900 bg-cyan-800 text-white">
          Add to Wishlist
        </button>
        <button @click="addToOwnedWatches(watch._id)" class="mt-4 px-6 py-2 font-semibold rounded-md border border-black-800 text-gray-900 bg-cyan-800 text-white">
          Add to Owned Watches
        </button>
      </div>
      
      <p class="mt-2 text-sm text-gray-600">Features:</p>
      <ul>
        <li v-for="(feature, index) in watch.features" :key="index" class="text-gray-700">
          {{ feature }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Loading watch details...</p>
    </div>
  </div>
</template>


<style scoped>
  .centered-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; 
    padding: 20px;
  }

  .content {
    background: #f3f4f6;
    padding: 20px;
    border-radius: 10px;
    width: 50%;
    max-width: 600px;  
  }
  .image-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); 
    gap: 10px; 
    justify-content: center;
    align-items: center;
  }

  .image-item {
    background: white;
    padding: 5px;
    border-radius: 8px;
  }

  .image-item img {
    width: 100%; 
    height: auto;
    border-radius: 8px;
    object-fit: cover;
  }
</style>


<script setup>
import {ref, onMounted} from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router';
import {useRouter} from 'vue-router'

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const route = useRoute()
const router = useRouter()

let watch = ref(null)
let user = ref(null)

const role = localStorage.getItem("role")
const token = localStorage.getItem("token")

let idWatch = route.params.id

const goBack = () =>{
  router.push('/home')
}

onMounted(async()=>{
    try{
        let response = await axios.get(`${baseUrl}/watches/${idWatch}`)
        watch.value = response.data.watch
    }
    catch(e){
        console.error(`Error: ${e}`)
    }
})

const addToWishlist = async(idWatch) =>{
  try{
      await axios.post(`${baseUrl}/profile/wishlist/${idWatch}`, 
      {},
      { headers: { Authorization: `Bearer ${token}` }})
      alert("Added to wishlist")
      router.push('/profile')
  }
  catch(e){
    console.error(`Error:  ${e}`)
  }
}

const addToOwnedWatches = async(idWatch) =>{
  try{
      await axios.post(`${baseUrl}/profile/owned/${idWatch}`, 
      {},
      { headers: { Authorization: `Bearer ${token}` }})
      alert("Added to owned watches")
      router.push('/profile')
  }

  catch(e){
    console.error(`Error: ${e}`)
  }
}
</script>