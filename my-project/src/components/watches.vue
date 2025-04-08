<template>
    <div v-if="watches">
         <button v-if="role === 'admin'" @click="addWatch">Add Watch</button>
         <button v-if="role === 'admin'" @click="goToInbox">Inbox</button>
         <button v-if="role === 'user'" @click="sendMessage">Send a message</button>
        
       
        <div v-for="w in watches" :key="w._id">
        <span><img :src="w.images[0]" alt="Watch Image" style="width: 200px; height: auto;" /></span>
           <h3> <router-link :to= "`/watch/${w._id}`">{{w.brand}} {{w.model}}</router-link></h3>
            <div v-if="role === 'admin'">
                <button @click="editWatch(w._id)">Edit</button>
                <button @click="deleteWatch(w._id)">Delete</button>
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