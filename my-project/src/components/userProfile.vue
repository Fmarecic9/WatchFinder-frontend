<template>
  <div> 
    <button @click="goBack">Back</button>
    <div v-if="user">
            <h2>Hello {{user.username}} </h2>
        <div v-if="ownedWatches.length">
            <h2>Owned Watches:</h2>
        <div v-for="watch in ownedWatches" :key="watch._id">
            <p>{{ watch.brand }} {{ watch.model }}</p>
        </div>
        </div>
        <div v-else>
        You don't own any watches.
        </div>

        <div v-if="wishlist.length">
            <h2>Wishlist:</h2>
        <div v-for="watch in wishlist" :key="watch._id">
            <p>{{ watch.brand }} {{ watch.model }}</p>
        </div>
        </div>
        <div v-else>
            No watches on your wishlist.
        </div>
    </div>
    <div v-else>
        No user logged in
    </div>
  </div>
</template>



<script setup>
import axios from 'axios'
import {useRoute, useRouter} from 'vue-router'
import {ref, onMounted} from 'vue'

const router = useRouter()
const route = useRoute()

let ownedWatches = ref([])
let wishlist = ref([])
let user = ref(null)

const goBack = () =>{
  router.push('/home')
}

onMounted (async()=>{
    const token = localStorage.getItem("token")
    try{
        let response = await axios.get('http://localhost:3000/userProfile',
         { headers: { Authorization: `Bearer ${token}` }})

        ownedWatches.value = response.data.ownedWatches || []
        wishlist.value = response.data.wishlist || []
        user.value = response.data.user 

    }
    catch(e){
        console.error(`Error: ${e}`)
    
    }

})

</script>
