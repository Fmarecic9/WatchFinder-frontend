<template>
    <div>
        <div v-if="role == 'admin'">
            <button @click="goBack">Back</button>
            <h2>Inbox</h2>
            <div v-for="m in messages" :key = "m._id">
                 <strong>{{ m.user }}:</strong> 
                 {{ m.message.message }} {{ new Date(m.timestamp).toLocaleString() }}
                 <button @click="removeMsg(m._id)">Remove</button>
            </div>
        </div>
        <div v-else>
            You are not an admin, how did you get here?
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