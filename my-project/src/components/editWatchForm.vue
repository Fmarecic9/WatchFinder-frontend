<template>
  <div v-if="role === 'admin'">
    <div v-if="watch">
        <form @submit.prevent="editWatch(watchId)">
        <label>Brand: </label>
        <input v-model="watch.brand" placeholder="Brand" />
        <label>Model: </label>
        <input v-model="watch.model" placeholder="Model" />
        <label>Price: </label>
        <input v-model="watch.price" type="number" placeholder="Price" />
        <label>Color: </label>
        <input v-model="watch.color" placeholder="Color" />
        <label>Type: </label>
        <input v-model="watch.type" placeholder="Type" />
        <label>Material(housing): </label>
        <input v-model="watch.materialHousing" placeholder="Material Housing" />
        <label>Material(bracelet):</label>
        <input v-model="watch.materialBracelet" placeholder="Material Bracelet" />
        <label>Bracelet diameter</label>
        <input v-model="watch.braceletDiameter" placeholder="Bracelet Diameter" />
        <label>Weight(grams): </label>
        <input v-model="watch.weight" placeholder="Weight" />
        <label>Length(mm): </label>
        <input v-model="watch.dimensions.length" placeholder="Length" />
        <label>Width(mm): </label>
        <input v-model="watch.dimensions.width" placeholder="Width" />
        <label>Height(mm): </label>
        <input v-model="watch.dimensions.height" placeholder="Height" />
        
          
      <h3>Features</h3>
      <div v-for="(feature, index) in watch.features" :key="index">
        <input v-model="watch.features[index]" placeholder="Edit features" />

      </div>

      
      <h3>Images</h3>
       <div v-for="(imageUrl, index) in watch.images" :key="index">
        <input v-model="watch.images[index]" placeholder="Edit images" />
        
      </div>

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
const role = ref(localStorage.getItem("role"))
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