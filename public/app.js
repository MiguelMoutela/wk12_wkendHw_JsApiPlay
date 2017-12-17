let countries = [];

const app = function () {

// map coords on init
  // const center = {
  //   lat: 55.946962,
  //   lng: -3.20195
  // }
  // console.log(center)

// countries select things
  const select = document.querySelector('#countries-list');
  select.addEventListener('change', handleSelectChange);

  const countriesUrl = 'https://restcountries.eu/rest/v2/all';
  makeRequest(countriesUrl, requestComplete);
}

// countries api stuff

const makeRequest =  function(genericUrl, callback){
  const request = new XMLHttpRequest;
  request.open('GET', genericUrl);
  request.send();
  request.addEventListener('load', callback)
}

const requestComplete = function(){
  if(this.status != 200) return;
  const jsonString = this.responseText;
  const data = JSON.parse(jsonString);
  countries = data
  // console.log(countries);
  populateSelectDropDown(countries);
}

const populateSelectDropDown = function(countries){
  const select = document.querySelector('#countries-list');
  countries.forEach(function(country, index){
    const option = document.createElement('option');
    option.innerText = country.name;
    option.value = index;
    select.appendChild(option);
  })
}

const storeLastSelected = function(country) {
  const jsonString = JSON.stringify(country);
  localStorage.setItem('country', jsonString)
}

const handleSelectChange = function() {
  storeLastSelected(countries[this.value]);
  const jsonString = localStorage.getItem('country');
  const savedCountry = JSON.parse(jsonString);
  const ul = document.querySelector('#country-details');
  ul.innerHTML = '';
  const liName = document.createElement('li');
  const liPopulation = document.createElement('li');
  const liCapital = document.createElement('li');
  liName.innerText = "Name: " + savedCountry.name;
  liPopulation.innerText = "Population: " + savedCountry.population;
  liCapital.innerText = "Capital: " + savedCountry.capital;
  ul.appendChild(liName);
  ul.appendChild(liPopulation);
  ul.appendChild(liCapital);
  const coords = savedCountry.latlng;
  createMap(coords);
}

// map things
const createMap = function() {
  const container = document.querySelector('#map');
  const countryMap = new MapWrapper(container, coords, 18);
  countryMap.addMarker(coords);
}


document.addEventListener('DOMContentLoaded', app);
