<template>
<div class="bg-gray-700">
      <div class="text-center">
        <h1 class="text-2xl font-medium center text-white pt-15">WatchFinder</h1>
       <div v-if="user" class="text-right text-white font-medium">
            <button @click="goToProfile" class="mr-1">View profile</button>
            <button @click="logout" class="ml-1">Logout</button>
        </div>
     <div v-else class="text-right text-white font-medium">
      <router-link to="/register" class="mr-1">
        <button>Register</button>
      </router-link>
      <router-link to="/login" class="ml-1">
        <button>Login</button>
      </router-link>
    </div>
      </div>
</div>
</template>

<script setup>
import {ref,onMounted,watchEffect} from 'vue'
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()

let user = ref(null);
let role = ref(null);

const goToProfile = () =>{
  router.push('/profile')
}

const token = localStorage.getItem("token")

const checkUser = () =>{
  user.value = localStorage.getItem("user")
  role.value = localStorage.getItem("role")

}

const logout = () => {
    localStorage.removeItem("user"); 
    localStorage.removeItem("role"); 
    localStorage.removeItem("token") 
    user.value = null; 
    role.value = null; 
  
    window.location.reload();
};

onMounted(checkUser)

watchEffect(() => {
  user.value = localStorage.getItem("user");
  role.value = localStorage.getItem("role");
});
</script>
