const fetch = require("node-fetch").default;
require('dotenv').config();
const mapToken = process.env.MAP_TOKEN;

async function geocode(address) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapToken}&limit=1`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      // Mapbox returns [longitude, latitude]
      return data.features[0].center;
    }
    // Default/fallback
    return [0, 0];
  }

module.exports = geocode;