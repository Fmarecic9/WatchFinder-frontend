<template>
<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign up</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form  @submit.prevent="registerUser" class="space-y-6" action="#" method="POST">
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
            <label for="email" class="block text-sm/6 font-medium text-gray-900">E-mail</label>
            <div class="mt-2">
            <input 
            v-model="email"
            type="email" 
            name="email" 
            id="email" autocomplete="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
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
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
      </div>
    </form>

  </div>
</div>

    
</template>



<script setup>
import axios from 'axios'
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const router = useRouter()

let username = ref("")
let email = ref("")
let password = ref("")

const registerUser = async() => {
    const newUser = {
        username: username.value,
        email: email.value,
        password: password.value,
    }
    try{
        await axios.post(`${baseUrl}/users/register`, newUser)
        username.value = ""
        email.value = ""
        password.value = ""
        alert('Registered')
        router.push('/login')

    }
    catch(e){
        console.error(`Error: ${e}`)
    }
}

</script>
