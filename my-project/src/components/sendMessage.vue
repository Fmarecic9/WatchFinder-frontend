<template>
  <div>
     <button @click="goBack">Back</button>
    <h2>Send a Suggestion</h2>
    <form @submit.prevent="sendMessage">
      <textarea v-model="message" placeholder="Type your message here..." rows="4" cols="50"></textarea>
      <br />
      <button type="submit">Send</button>
    </form>
    <p v-if="feedback">{{ feedback }}</p>
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