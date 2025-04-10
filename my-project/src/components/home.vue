<template> 
    <div>
        <hr>
          <watches/>
    </div>


</template>

<style scoped>


</style>

<script setup>
import watches from './watches.vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()


</script>