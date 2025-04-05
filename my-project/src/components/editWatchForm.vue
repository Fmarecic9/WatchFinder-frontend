<template>
  <div v-if="role === 'admin'">
    <div v-if="watch">
        <form @submit.prevent="editWatch(watchId)">
        <input v-model="watch.brand" placeholder="Brand" />
        <input v-model="watch.model" placeholder="Model" />
        <input v-model="watch.price" type="number" placeholder="Price" />
        <input v-model="watch.color" placeholder="Color" />
        <input v-model="watch.type" placeholder="Type" />
        <input v-model="watch.materialHousing" placeholder="Material Housing" />
        <input v-model="watch.materialBracelet" placeholder="Material Bracelet" />
        <input v-model="watch.braceletDiameter" placeholder="Bracelet Diameter" />
        <input v-model="watch.length" placeholder="Length" />
        <input v-model="watch.width" placeholder="Width" />
        <input v-model="watch.height" placeholder="Height" />
        <input v-model="watch.weight" placeholder="Weight" />
        <button type="submit">Update Watch</button>
      </form>
    </div>

    <div v-else>
        <p>Loading..</p>
    </div>
  </div>
  <div v-else>
        <p>You are not an admin</p>
    </div>

</template>




<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios';


const router = useRouter()
const route = useRoute()


let watch = ref(null)
let role = ref(localStorage.getItem("role"))
const token = localStorage.getItem("token")

let watchId = route.params.id
onMounted (async()=>{
    try{
    let response = await axios.get(`http://localhost:3000/watches/${watchId}`)
        watch.value = response.data.watch;
    }
    catch(e){
        console.error(`Error: ${e}`)
    }
})

const editWatch = async(watchId) => {
    try{
        const updatedWatch = { ...watch.value }
        delete updatedWatch._id

        await axios.patch(`http://localhost:3000/watches/${watchId}`, updatedWatch, 
         { headers: { Authorization: `Bearer ${token}` }})
        alert("Watch updated successfully!")
        router.push('/home')
    }
    catch(e){
        console.error(`Not good: ${e}`)
    }
};
</script>