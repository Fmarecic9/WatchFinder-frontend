<template>
    <div v-if="watches" class="bg-white w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <button v-if="role === 'admin'" @click="addWatch" class="mr-1 mr-1 px-3 py-1 bg-green-800 text-white rounded">Add Watch</button> 
        <button v-if="role === 'admin'" @click="goToInbox" class="ml-1 mr-1 px-3 py-1 bg-cyan-800 text-white rounded">Inbox</button> 
        <button v-if="role === 'user'" @click="sendMessage" class="ml-1 mr-1 px-3 py-1 bg-cyan-800 text-white rounded">Send a message</button>
        <button v-if="role === 'user'" @click="watchMap" class="ml-1 mr-1 px-3 py-1 bg-cyan-800 text-white rounded">Find a store</button>  
      
    <h2 class="text-2xl font-bold tracking-tight text-gray-900">Featured Watches</h2>

    <details class="mb-6 border rounded p-4">
      <summary class="cursor-pointer text-lg font-semibold">Filter</summary>
        <div class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input v-model="filters.brand" placeholder="Brand" class="border p-2 rounded" />
          <input v-model="filters.color" placeholder="Color" class="border p-2 rounded" />
          <input v-model="filters.type" placeholder="Type" class="border p-2 rounded" />
          <input v-model="filters.materialHousing" placeholder="Material(housing)" class="border p-2 rounded" />
          <input v-model="filters.materialBracelet" placeholder="Material(bracelet)" class="border p-2 rounded" />
          <input v-model="filters.minPrice" type="number" placeholder="Min Price" class="border p-2 rounded" />
          <input v-model="filters.maxPrice" type="number" placeholder="Max Price" class="border p-2 rounded" />
        <button @click="fetchWatches" class="col-span-1 md:col-span-4 bg-blue-500 text-white px-4 py-2 rounded">Apply Filters</button>
        </div>
    </details>
    
    <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 xl:gap-x-8 mt-6">
      <div v-for="w in watches" :key="w._id" class="group relative">
        <router-link :to="`/watch/${w._id}`">
          <img :src="w.images[0]" alt="Watch Image" class="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80">
        </router-link>
        <div class="mt-4 flex justify-between">
          <div>
            <h3 class="text-sm text-gray-700">
              <router-link :to="`/watch/${w._id}`">
                {{ w.brand }} {{ w.model }}
              </router-link>
            </h3>
            <p class="mt-1 text-sm text-gray-500">{{ w.color }}</p>
          </div>
          <p class="text-sm font-medium text-gray-900">{{ w.price }}€</p>
        </div>
        <div v-if="role === 'admin'" class="mt-2">
          <button @click="editWatch(w._id)" class="mr-1 px-3 py-1 bg-cyan-800 text-white rounded">Edit</button>
          <button @click="deleteWatch(w._id)" class="ml-1 px-3 py-1 bg-red-950 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
  div {
    width: 100%;
    margin: 0;
    padding: 0;
  }
  details{
    width: 100%;
    margin: 5;
    padding: 4;
  }

  .bg-white {
    width: 100%;
    height: 100vh;
    padding-left: 5px;
    padding-right: 20px;
  }

  body, html {
    margin: 0;
    padding: 0;
    
  }
 
</style>

<script setup>
import {ref, onMounted } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const route = useRoute()
const router = useRouter()

let watches = ref([])
let role = ref(localStorage.getItem('role')) 

const filters = ref({
  brand: '',
  color: '',
  type: '',
  materialHousing: '',
  materialBracelet:'',
  minPrice: '',
  maxPrice: ''
})


const fetchWatches = (async()=>{
    try{
    const token = localStorage.getItem('token');
        
    let res = await axios.get(`${baseUrl}/watches`, 
      {headers: { Authorization: `Bearer ${token}` },
      params: {
        brand: filters.value.brand || undefined,
        color: filters.value.color || undefined,
        type: filters.value.type || undefined,
        materialHousing: filters.value.materialHousing ||undefined,
        materialBracelet: filters.value.materialBracelet ||undefined,
        minPrice: filters.value.minPrice || undefined,
        maxPrice: filters.value.maxPrice || undefined }})
        watches.value = res.data
    }
    catch(e){
        console.error(`Error: ${e}`)
    }
})

const editWatch = (id) => {
    router.push(`/editWatch/${id}`)
};

const deleteWatch = async(id) => {
    const token = localStorage.getItem('token');
    const isConfirmed = confirm("Are you sure you want to delete this watch?");
    if (!isConfirmed) return
    try{
        await axios.delete(`${baseUrl}/watches/${id}`, 
        { headers: { Authorization: `Bearer ${token}` }})
        window.location.reload();
    }
    catch(e){
        console.error(`Not good: ${e}`)
    }
};

const addWatch = () => {
    router.push('/addWatch')
};

const goToInbox = () => {
    router.push('/inbox')
};

const sendMessage = () =>{
    router.push('/send')
}
const watchMap = () =>{
   router.push('/map')
}

onMounted(() => {
  fetchWatches()
})
</script>