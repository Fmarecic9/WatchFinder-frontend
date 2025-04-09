<template>
  <div v-if="watches" class="bg-white px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <button v-if="role === 'admin'" @click="addWatch" class="mr-1 mr-1 px-3 py-1 bg-blue-500 text-white rounded">Add Watch</button> 
        <button v-if="role === 'admin'" @click="goToInbox" class="ml-1 mr-1 px-3 py-1 bg-blue-500 text-white rounded">Inbox</button> 
        <button v-if="role === 'user'" @click="sendMessage" class="ml-1 mr-1 px-3 py-1 bg-blue-500 text-white rounded">Send a message</button> 
       
    <h2 class="text-2xl font-bold tracking-tight text-gray-900">Featured Watches</h2>

    <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mt-6">
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
          <button @click="editWatch(w._id)" class="mr-1 px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
          <button @click="deleteWatch(w._id)" class="ml-1 px-3 py-1 bg-red-500 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>>

<script setup>
import {ref, onMounted } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

let watches = ref([])
let role = ref(localStorage.getItem('role')) 


onMounted (async()=>{
    try{
    const token = localStorage.getItem('token');
        
    let res = await axios.get('http://localhost:3000/watches', 
        { headers: { Authorization: `Bearer ${token}` }})
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
        await axios.delete(`http://localhost:3000/watches/${id}`, 
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

</script>