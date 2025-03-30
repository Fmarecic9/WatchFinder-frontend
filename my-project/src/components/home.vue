<template> 
    <div>
        <h1>Home page</h1>

     <div class="button-container">
      <router-link to="/register">
        <button>Register</button>
      </router-link>
      <router-link to="/login">
        <button>Login</button>
      </router-link>
    </div>
        
         <div>
        <hr>
         <watches/>
         </div>
    </div>


</template>

<script setup>
import watches from './watches.vue'
import axios from 'axios'
import { useRoute } from 'vue-router';




/*
onMounted(async()=>{
 try{
  const token = localStorage.getItem("jwt_token"); 
    if (!token) {
      console.error("JWT token not found!");
      return;
    }
  let response = await axios.get('http://localhost:8000/watches',
    {headers: {Authorization: `Bearer ${token}`}})
  
    let podaci = response.data

  
 }
 catch(e){
  console.error("Error", e)
 }
})*/
</script>