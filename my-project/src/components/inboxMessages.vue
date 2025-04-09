<template>
<div>
<button @click="goBack" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ">Back</button>
  <div v-if="role === 'admin'" class="w-96 mx-auto text-gray-700 rounded bg-white shadow-md">
    <div class="head flex border p-3 rounded-t bg-gray-600 text-white">
      <h2 class="text-xl font-semibold">Inbox</h2>  
      <div class="count border p-1 px-2 font-semibold bg-red-500 text-white rounded-full text-xs cursor-pointer font-mono ml-2">
        {{ messages.length }}
      </div>
    </div>

    <div class="body border overflow-y-auto h-96 bg-gray-100">
      <div v-if="messages.length">
        <div v-for="m in messages" :key="m._id" class="msg px-4 py-4 border-l-2 border-blue-500 flex text-sm shadow-sm text-gray-600 cursor-pointer hover:bg-gray-200">
          <div class="name font-medium mr-2 text-blue-500 flex-none">{{ m.user }}</div>
          <div class="text my-auto mr-2">{{ m.message.message }}</div>
          <div class="time text-xs mt-1 text-gray-500 font-thin flex-none ml-auto">{{ new Date(m.timestamp).toLocaleString() }}</div>
          <button @click="removeMsg(m._id)" class="ml-4 text-red-500 hover:underline text-xs">Remove</button>
        </div>
      </div>
      <div v-else class="text-center text-gray-500 py-4">No messages yet.</div>
    </div>

  </div>

  <div v-else class="max-w-md mx-auto bg-red-100 text-red-600 text-center p-4 rounded-lg shadow-md">
    <h1 class="text-xl font-semibold">⚠ You are not an admin, how did you get here?</h1>
  </div>
</div>
</template>

<script setup>
import axios from 'axios'
import {useRouter} from 'vue-router'
import {ref, onMounted} from 'vue'


let user = ref(null)
let role = ref(null)
let messages = ref([])

const router = useRouter()
const token = localStorage.getItem("token")

onMounted (async()=>{
    try{
        let response = await axios.get('http://localhost:3000/inbox', 
        {headers: { Authorization: `Bearer ${token}` }})
        
        role.value = localStorage.getItem("role")
        messages.value = response.data
    }
    catch(e){
        console.error(`Error: ${e}`)
    }
})

const removeMsg = async(msgId) =>{
    let confirmed = confirm("Are you sure you want to delete this message")
    if (!confirmed){return}
    try{
        await axios.delete(`http://localhost:3000/inbox/${msgId}`,  
        {headers: { Authorization: `Bearer ${token}` }})
        window.location.reload()
    }
    catch(e){
        console.error(`Error: ${e}`)
    }
}
const goBack = () =>{
    router.push('/home')
}
</script>