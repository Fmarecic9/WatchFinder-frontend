<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Login</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form  @submit.prevent="userLogin" class="space-y-6" action="#" method="POST">
      <div>
        <label for="username" class="block text-sm/6 font-medium text-gray-900">Username</label>
        <div class="mt-2">
          <input 
          v-model="username"
          type="username" 
          name="username" 
          id="username" autocomplete="username" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
          <div class="text-sm">
          </div>
        </div>
        <div class="mt-2">
          <input v-model="password" type="password" name="password" id="password" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
      </div>
    </form>

  </div>
</div>

</template>


<script setup>
import axios from 'axios'
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'

let username = ref("")
let password = ref("")

const router = useRouter()

const userLogin = async() =>{
    const loginData = {
        username: username.value,
        password: password.value
    }
    try{
        let response = await axios.post('http://localhost:3000/users/login', loginData)
    
        username.value = ""
        password.value = ""

    
        localStorage.setItem('user', response.data.user);
        localStorage.setItem('token', response.data.jwt);
        localStorage.setItem('role', response.data.role);

        setTimeout(() => {
          router.push('/home'); 
        }, 100);
    }
    catch(e){
        alert("Wrong login data")
        username.value = ""
        password.value = ""
        console.error(`Error: ${e}`)
    }
} 
</script>
