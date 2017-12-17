let countries = [];

const app = function () {

// map coords on init
  const center = {
    lat: 55.946962,
    lng: -3.20195
  }
  console.log(center)

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
  countries = data;
  console.log(countries);
}

const handleSelectChange = function(){}

// map things

const container = document.querySelector('#map');

const countryMap = new MapWrapper(container, center, 18);
countryMap.addMarker(center);

document.addEventListener('DOMContentLoaded', app);
