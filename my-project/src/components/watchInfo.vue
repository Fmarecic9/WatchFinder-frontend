<template>
  <div v-if="watch" class="bg-gray-200 p-4 rounded-md">
    <button @click="goBack">Back</button>
    <h1>{{ watch.brand }} {{ watch.model }}</h1>
    <span v-for="(image, index) in watch.images" :key="index" class="bg-white">
      <img :src="image" alt="Watch Image" class="w-48 h-auto" />
    </span>
    <strong><p>{{ watch.price }}€</p></strong>
    <p>Color: {{ watch.color }}</p>
    <p>Type: {{ watch.type }}</p>
    <p>Dimensions: {{ watch.dimensions.length }}x{{ watch.dimensions.width }}x{{ watch.dimensions.height }} mm</p>


    <button @click="addToWishlist(watch._id)" class="mt-4 px-6 py-2 font-semibold rounded-md border border-black-800 text-gray-900 bg-blue-500 text-white">
      Add to Wishlist
    </button>
    <button @click="addToOwnedWatches(watch._id)" class="mt-4 px-6 py-2 font-semibold rounded-md border border-black-800 text-gray-900 bg-blue-500 text-white">
      Add to Owned Watches
    </button>

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
</template>



<script setup>
import {ref, onMounted} from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router';
import {useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()

let watch = ref(null)
let user = ref(null)

const token = localStorage.getItem("token")

let idWatch = route.params.id

const goBack = () =>{
  router.push('/home')
}

onMounted(async()=>{
    try{
        let response = await axios.get(`http://localhost:3000/watches/${idWatch}`)
        watch.value = response.data.watch
    }
    catch(e){
        console.error(`Error: ${e}`)
    }
})

const addToWishlist = async(idWatch) =>{
  try{
      await axios.post(`http://localhost:3000/profile/wishlist/${idWatch}`, 
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
      await axios.post(`http://localhost:3000/profile/owned/${idWatch}`, 
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