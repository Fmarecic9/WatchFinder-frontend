<template>
    <div v-if="watches">
         <button v-if="role === 'admin'" @click="addWatch">Add Watch</button>
         <button v-if="role === 'admin'" @click="addWatch">Inbox</button>
        <div v-for="w in watches" :key="w._id">
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
import axios from 'axios'


let watches = ref([])
let role = localStorage.getItem('role')



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
    console.log('Editing watch with ID:', id);
};

const deleteWatch = (id) => {
    console.log('Deleting watch with ID:', id);
};

const addWatch = () => {
    console.log('Adding a new watch');
};


</script>