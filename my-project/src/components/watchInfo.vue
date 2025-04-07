<template>
   <div v-if="watch">
    <button @click="goBack">Back</button>
    <h1>{{ watch.brand }} {{ watch.model }}</h1>
    <p>Color: {{ watch.color }}</p>
    <p>Type: {{ watch.type }}</p>
    <p>Dimensions: {{watch.length}}x{{watch.width}}x{{watch.height}} mm</p>
    <p>Price: {{watch.price}}€</p>
    <button @click="addToWishlist(watch._id)">Add to Wishlish</button>
    <button @click="addToOwnedWatches(watch._id)">Add to Owned watches</button>
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