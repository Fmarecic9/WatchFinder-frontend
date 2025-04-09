<template>
  <div class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
    <button @click="goBack" class="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">Back</button>

    <h2 class="text-2xl font-bold text-gray-800 mb-4">Send a Suggestion</h2>

    <form @submit.prevent="sendMessage" class="space-y-4">
      <div>
        <label for="message" class="text-gray-700 font-medium block mb-2">Your Message:</label>
        <textarea v-model="message" id="message" placeholder="Type your message here..." rows="4"
                  class="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
      </div>

      <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
        Send
      </button>
    </form>

    <p v-if="feedback" class="mt-4 text-green-500 font-medium">{{ feedback }}</p>
  </div>
</template>



<script setup>
import axios from 'axios'
import {useRouter} from 'vue-router'
import {ref,onMounted} from 'vue'

const router = useRouter()
let user = ref(null)
let message = ref(null)

const token = localStorage.getItem("token")

const goBack = () =>{
    router.push('/home')
}

const sendMessage = async() => {
    const newMessage = {
        message: message.value
    }
    try{
        await axios.post('http://localhost:3000/inbox', newMessage,
        {headers: { Authorization: `Bearer ${token}` }})
        alert("Message posted")
        window.location.reload()
    }
    catch(e){
        console.error(`Error: ${e}`)
    }
}
</script>