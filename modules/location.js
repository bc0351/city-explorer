require('dotenv').config();

const axios = require('axios').default;

function getCityInfo(city) {
  let params = {
      key: process.env.REACT_APP_LOC_IQ_API_KEY,
      q: city
  };

  return axios.get(url, params)
    .then(response => response.data.results.map(city => { return new Location(city) }))
    .then(filteredCities => res.status(200).send(filteredCities))
    .catch(error => next(error));
}

class Location {
  constructor(location) {
    this.place_id = location.place_id
    this.licence = location.licence
    this.osm_type = location.osm_type
    this.osm_id = location.osm_id
    this.boundingbox = location.boundingbox
    this.lat = location.lat
    this.lon = location.lon
    this.display_name = location.display_name
    this.class = location.class
    this.type = location.type
    this.importance = location.importance
    this.icon = location.icon
  }
}

module.exports = [getCityInfo];
