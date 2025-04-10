<template>
  <div v-if="user">
     <button @click="goBack" class="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">Back</button>
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Jewelry stores near you: </h2>
    <label for="country">Select Country:</label>
    <select id="country" v-model="selectedCountry" @change="onCountryChange">
      <option value="si">🇺🇸 Slovenia</option>
      <option value="it">🇮🇹 Italy</option>
      <option value="hr">🇭🇷 Croatia</option>
      <option value="ba">🇭🇷 Bosnia and Herzegovina</option>
    </select>

    <div ref="mapContainer" class="map-container"></div>
  </div>
  <div v-else>
    <button @click="goBack" class="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">Back</button>
    <h1 class="text-xl font-semibold">⚠ You are not logged in</h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useRouter} from 'vue-router'
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let user = ref(localStorage.getItem("user"))

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const router = useRouter()

const storeIcon = L.icon({
  iconUrl: markerIcon, 
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})


const mapContainer = ref(null);
const selectedCountry = ref('hr');
let map = null;
let userLocation = { lat: null, lon: null };

const initMap = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude} = position.coords;
      userLocation.lat = latitude
      userLocation.lon = longitude

      map = L.map(mapContainer.value).setView([latitude, longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map)

      L.marker([latitude, longitude] )
        .addTo(map)
        .bindPopup('You are here')
        .openPopup()

      searchNearbyStores();
    },
    (error) => {
      console.error('Geolocation error:', error);
    },
    { enableHighAccuracy: true }
  )
};

const onCountryChange = () => {
  if (userLocation.lat && userLocation.lon) {
    clearMarkers()
    searchNearbyStores()
  }
};

let storeMarkers = []

const clearMarkers = () => {
  storeMarkers.forEach((marker) => map.removeLayer(marker));
  storeMarkers = []
};

const countrySearchTerms = {
  hr: ['zlatarnica', 'Watch', 'Urar'], 
  si: ['zlatarna', 'Watch'], 
  it: ['gioielleria', 'Orologi'], 
  ba: ['zlatara', 'Sat', 'Urar'], 
};

const searchNearbyStores = async () => {
  const { lat, lon } = userLocation
  const countryCode = selectedCountry.value
  const searchTerms = countrySearchTerms[countryCode]

    try {
    let allResults = [];

    for (let term of searchTerms) {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(term)}&limit=5&countrycodes=${countryCode}`
      const res = await fetch(url, {
        headers: { 'User-Agent': 'YourAppName/1.0' },
      })

      const results = await res.json()
      allResults = [...allResults, ...results]
    }

    if (allResults.length === 0) {
      console.log('No results found.')
    }

    allResults.forEach((store) => {
      const marker = L.marker([store.lat, store.lon], { icon: storeIcon })
        .addTo(map)
        .bindPopup(`<strong>Jewelry Store</strong><br>${store.display_name}`)
      storeMarkers.push(marker)
    })
  } catch (err) {
    console.error('Error fetching stores:', err)
  }
}

const goBack = () =>{
    router.push('/home')
}
onMounted(() => {
  initMap()
})
</script>


<style scoped>
.map-container {
  width: 100%;
  height: 400px;
  margin-top: 1rem;
  border-radius: 10px;
}
select {
  margin-bottom: 1rem;
  padding: 0.5rem;
}
</style>