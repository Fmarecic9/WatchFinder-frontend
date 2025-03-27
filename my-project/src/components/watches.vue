<template>
    <div v-if="watches">
        <div v-for="w in watches" :key="w">
           <h3> {{w.brand}}  {{w.model}} </h3>
        </div>
    </div>
</template>


<style scoped>

</style>>

<script setup>
import {ref, onMounted } from 'vue'
import axios from 'axios'

let watches = ref([])

onMounted (async()=>{
    try{
        const res = await axios.get('http://localhost:3000/watches')
        watches.value = res.data
    }
    catch(e){
        console.error(`Error: ${e}`)
    }
})








</script>