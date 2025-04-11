<template>
  <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
    <button @click="goBack" class="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">Back</button>

    <div v-if="user">
      <h2 class="text-2xl font-bold text-gray-800">Hello {{ user.username }}</h2>

      
      <div class="mt-4 flex space-x-4 border-b pb-2">
        <button @click="activeTab = 'owned'" :class="activeTab === 'owned' ? 'border-b-2 border-blue-500 text-blue-500' : ''" class="px-4 py-2 font-medium text-gray-700 hover:text-blue-500">
          Owned Watches
        </button>
        <button @click="activeTab = 'wishlist'" :class="activeTab === 'wishlist' ? 'border-b-2 border-blue-500 text-blue-500' : ''" class="px-4 py-2 font-medium text-gray-700 hover:text-blue-500">
          Wishlist
        </button>
      </div>

     
      <div v-if="activeTab === 'owned'" class="mt-4">
        <h3 class="text-lg font-semibold text-gray-800">Owned Watches:</h3>
        <div v-if="ownedWatches.length">
          <div v-for="watch in ownedWatches" :key="watch._id" class="bg-gray-100 p-4 rounded-md shadow-sm flex justify-between items-center mt-2">
            <p class="text-gray-700">{{ watch.brand }} {{ watch.model }}</p>
            <button @click="removeFromOwned(watch._id)" class="text-red-500 hover:underline">Remove</button>
          </div>
        </div>
        <div v-else class="text-gray-500 mt-4">You don't own any watches.</div>
      </div>


      <div v-if="activeTab === 'wishlist'" class="mt-4">
        <h3 class="text-lg font-semibold text-gray-800">Wishlist:</h3>
        <div v-if="wishlist.length">
          <div v-for="watch in wishlist" :key="watch._id" class="bg-gray-100 p-4 rounded-md shadow-sm flex justify-between items-center mt-2">
            <p class="text-gray-700 text-center">{{ watch.brand }} {{ watch.model }}</p>
            <button @click="removeFromWishlist(watch._id)" class="text-red-500 hover:underline">Remove</button>
          </div>
        </div>
        <div v-else class="text-gray-500 mt-4">No watches on your wishlist.</div>
      </div>
    </div>

    <div v-else class="mt-4 text-gray-500">No user logged in.</div>
  </div>
</template>



<script setup>
import axios from 'axios'
import {useRoute, useRouter} from 'vue-router'
import {ref, onMounted} from 'vue'

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const router = useRouter()
const route = useRoute()

const activeTab = ref("owned");
let ownedWatches = ref([])
let wishlist = ref([])
let user = ref(null)

const goBack = () =>{
  router.push('/home')
}
const token = localStorage.getItem("token")

onMounted (async()=>{
    try{
        let response = await axios.get(`${baseUrl}/profile`,
         { headers: { Authorization: `Bearer ${token}` }})

        ownedWatches.value = response.data.ownedWatches || []
        wishlist.value = response.data.wishlist || []
        user.value = response.data.user 
    }
    catch(e){
        console.error(`Error: ${e}`)
    }
})

const removeFromWishlist = async(idWatch) =>{
    const confirmed = confirm("Are you sure you want to remove watch from wishlist?")
    if (!confirmed){ return }
    try{
        axios.patch(`${baseUrl}/profile/wishlist/${idWatch}`, {}, 
        { headers: { Authorization: `Bearer ${token}` }})
        window.location.reload()
    }
  catch(e){
        console.error(`Error: ${e}`)
    }
}

const removeFromOwned = async(idWatch) =>{
    const confirmed = confirm("Are you sure you want to remove watch from owned watches?")
    if (!confirmed){ return }
    try{
        axios.patch(`${baseUrl}/profile/owned/${idWatch}`, {},
        { headers: { Authorization: `Bearer ${token}` }})
        window.location.reload()
  
    }
    catch(e){
        console.error(`Error: ${e}`)
    }
}
</script>
