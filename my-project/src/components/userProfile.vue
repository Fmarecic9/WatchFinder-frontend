<template>
  <div> 
    <button @click="goBack">Back</button>
    <div v-if="user">
            <h2>Hello {{user.username}} </h2>
        <div v-if="ownedWatches.length">
            <h2>Owned Watches:</h2>
        <div v-for="watch in ownedWatches" :key="watch._id">
            <p>{{ watch.brand }} {{ watch.model }} <button  @click="removeFromOwned(watch._id)">Remove</button></p>
        </div>
        </div>
        <div v-else>
        You don't own any watches.
        </div>

        <div v-if="wishlist.length">
            <h2>Wishlist:</h2>
        <div v-for="watch in wishlist" :key="watch._id">
            <p>{{ watch.brand }} {{ watch.model }} <button @click="removeFromWishlist(watch._id)">Remove</button></p>
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
const token = localStorage.getItem("token")

onMounted (async()=>{
    try{
        let response = await axios.get('http://localhost:3000/profile',
         { headers: { Authorization: `Bearer ${token}` }})

        ownedWatches.value = response.data.ownedWatches || []
        wishlist.value = response.data.wishlist || []
        user.value = response.data.user 
    }
    catch(e){
        console.error(`Error: ${e}`)
    }
})

const removeFromWishlist = async(idWatch) =>{
    const confirmed = confirm("Are you sure you want to remove watch from wishlist?")
    if (!confirmed){ return }
    try{
        axios.patch(`http://localhost:3000/profile/wishlist/${idWatch}`, {}, 
        { headers: { Authorization: `Bearer ${token}` }})
        window.location.reload()
    }
  catch(e){
        console.error(`Error: ${e}`)
    }
}

const removeFromOwned = async(idWatch) =>{
    const confirmed = confirm("Are you sure you want to remove watch from owned watches?")
    if (!confirmed){ return }
    try{
        axios.patch(`http://localhost:3000/profile/owned/${idWatch}`, {},
        { headers: { Authorization: `Bearer ${token}` }})
        window.location.reload()
  
    }
    catch(e){
        console.error(`Error: ${e}`)
    }
}
</script>
