<template> 
    <div>
        <hr>
          <watches class="bg-gray-200"/>
    </div>


</template>

<script setup>
import watches from './watches.vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()


</script>