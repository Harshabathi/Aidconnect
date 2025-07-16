const fetch = require('node-fetch').default;
require('dotenv').config();
const MAPBOX_TOKEN = process.env.MAP_TOKEN; // Replace with your token
console.log(process.env.MAP_TOKEN);
async function geocode(address, limit = 1) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_TOKEN}&limit=${limit}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.features && data.features.length > 0) {
        return data.features.map(f => f.center);
        
    }
    return [];
}

// Test the function
(async () => {
    const address = 'Toronto, Canada';
    const results = await geocode(address, 2);
    console.log(`Results for "${address}":`, results);
})();