<template>
   <div v-if="watch">
    <button @click="goBack">Back</button>
    <h1>{{ watch.brand }} {{ watch.model }}</h1>
    <p>Color: {{ watch.color }}</p>
    <p>Type: {{ watch.type }}</p>
    <p>Dimensions: {{watch.length}}x{{watch.width}}x{{watch.height}} mm</p>
    <p>Price: {{watch.price}}€</p>
  </div>
  <div v-else>
    <p>Loading watch details...</p>
  </div>
</template>



<script setup>
import {ref, onMounted} from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router';
import {useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()

let watch = ref(null)

const goBack = () =>{
  router.push('/home')

}

onMounted(async()=>{
    let idWatch = route.params.id
    try{
        let response = await axios.get(`http://localhost:3000/watches/${idWatch}`)
        console.log("API Response:", response.data); 
        watch.value = response.data.watch
    }
    catch(e){
        console.error(`Error: ${e}`)
    }
})
    
</script>