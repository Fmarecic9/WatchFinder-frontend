<template> 
    <div>
        <h1>Home page</h1>

        <router-link to="/register">Signup</router-link>
        <router-link to="/login">Login</router-link>
        
         <router-view></router-view>
         <div>
        <hr>
         <watches></watches>
         </div>
    </div>


</template>

<script setup>
import registerUser from './registerUser.vue'
import loginUser from './loginUser.vue'
import watches from './watches.vue'


</script>