<template> 
    <div>
      <div class="kao-navbar">
        <h1 class="naslo">WatchFinder</h1>
       <div v-if="user" class="logout-button">
            <p class="username-display">{{user}}</p>
            <button @click="logout">Logout</button>
        </div>
     <div v-else class="button-container">
      <router-link to="/register">
        <button>Register</button>
      </router-link>
      <router-link to="/login">
        <button>Login</button>
      </router-link>
    </div>
    </div>
      <div>
        <hr>
          <watches/>
      </div>
    </div>


</template>

<style>
.naslo{
  text-align: center;
  color: whitesmoke;
}
.logout-button{
  padding-left: 50px;
  padding-right: 50px;
  text-align: right;
}
.button-container{
  padding-left: 50px;
  padding-right: 50px;
  text-align: right;
}
.kao-navbar{
  background-color: gray;
  margin-block-start: 0;
  margin-block-end: 0;
}
.username-display{
  color: white;
}
</style>
<script setup>
import watches from './watches.vue'
import axios from 'axios'
import { useRoute } from 'vue-router';
import {ref,onMounted} from 'vue'

let user = ref(null);
let role = ref(null);


const checkUser = () =>{
  user.value = localStorage.getItem("user")
  role.value = localStorage.getItem("role")

}

const logout = () => {
    localStorage.removeItem("user"); 
    localStorage.removeItem("role");  
    user.value = null; 
    role.value = null; 
    window.location.reload();
};

onMounted(checkUser)
</script>