<template>
  <div v-if="role === 'admin'" class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
     <button @click="goBack" class="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">Back</button>
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Edit Watch</h2>

    <div v-if="watch">
      <form @submit.prevent="editWatch(watchId)" class="space-y-4">
        <div class="flex flex-col">
          <label class="text-gray-700 font-medium">Brand:</label>
          <input v-model="watch.brand" placeholder="Brand" 
                 class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500" />
        </div>

        <div class="flex flex-col">
          <label class="text-gray-700 font-medium">Model:</label>
          <input v-model="watch.model" placeholder="Model"
                 class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label class="text-gray-700 font-medium">Price:</label>
            <input v-model="watch.price" type="number" placeholder="Price"
                   class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="flex flex-col">
            <label class="text-gray-700 font-medium">Color:</label>
            <input v-model="watch.color" placeholder="Color"
                   class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div class="flex flex-col">
          <label class="text-gray-700 font-medium">Type:</label>
          <input v-model="watch.type" placeholder="Type"
                 class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500" />
        </div>

        <h3 class="text-lg font-semibold text-gray-800 mt-4">Materials & Dimensions</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label class="text-gray-700 font-medium">Material (Housing):</label>
            <input v-model="watch.materialHousing" placeholder="Material Housing"
                   class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="flex flex-col">
            <label class="text-gray-700 font-medium">Material (Bracelet):</label>
            <input v-model="watch.materialBracelet" placeholder="Material Bracelet"
                   class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <div class="flex flex-col">
            <label class="text-gray-700 font-medium">Weight (grams):</label>
            <input v-model="watch.weight" placeholder="Weight"
                   class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <h3 class="text-lg font-semibold text-gray-800 mt-4">Dimensions (mm)</h3>
        <div class="grid grid-cols-3 gap-4">
          <div class="flex flex-col">
            <label class="text-gray-700 font-medium">Length:</label>
            <input v-model="watch.dimensions.length" placeholder="Length"
                   class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="flex flex-col">
            <label class="text-gray-700 font-medium">Width:</label>
            <input v-model="watch.dimensions.width" placeholder="Width"
                   class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="flex flex-col">
            <label class="text-gray-700 font-medium">Height:</label>
            <input v-model="watch.dimensions.height" placeholder="Height"
                   class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <h3 class="text-lg font-semibold text-gray-800 mt-4">Features</h3>
        <div class="flex flex-col">
          <label class="text-gray-700 font-medium">Edit Features:</label>
          <div v-for="(feature, index) in watch.features" :key="index" class="flex space-x-2">
            <input v-model="watch.features[index]" placeholder="Edit features"
                   class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <h3 class="text-lg font-semibold text-gray-800 mt-4">Images</h3>
        <div class="flex flex-col">
          <label class="text-gray-700 font-medium">Edit Images:</label>
          <div v-for="(imageUrl, index) in watch.images" :key="index" class="flex space-x-2">
            <input v-model="watch.images[index]" placeholder="Edit images"
                   class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <button type="submit" class="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
          Update Watch
        </button>
      </form>
    </div>

    <div v-else class="text-center text-gray-600 mt-4">
      <p>⏳ Loading...</p>
    </div>
  </div>

  <div v-else class="max-w-lg mx-auto bg-red-100 text-red-600 text-center p-4 rounded-lg shadow-md">
    <h1 class="text-xl font-semibold">⚠ You are not an admin</h1>
  </div>
</template>





<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const router = useRouter()
const route = useRoute()


let watch = ref(null)
const role = ref(localStorage.getItem("role"))
const token = localStorage.getItem("token")

let watchId = route.params.id
onMounted (async()=>{
    try{
    let response = await axios.get(`${baseUrl}/watches/${watchId}`)
        watch.value = response.data.watch;
    }
    catch(e){
        console.error(`Error: ${e}`)
    }
})

const editWatch = async(watchId) => {
    try{
        const updatedWatch = { ...watch.value }
        delete updatedWatch._id

        await axios.patch(`${baseUrl}/watches/${watchId}`, updatedWatch, 
         { headers: { Authorization: `Bearer ${token}` }})
        alert("Watch updated successfully!")
        router.push('/home')
    }
    catch(e){
        console.error(`Not good: ${e}`)
    }
};

const goBack=()=>{
  router.push('/home')
}
</script>