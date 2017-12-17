const MapWrapper = function(container, coords, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom:zoom
  });
  this.markers = []
}

MapWrapper.prototype.addClickEvent = function() {
  google.maps.event.addListener(this.googleMap, 'click', function(event) {
    const position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    this.addMarker(position);
  }.bind(this));
}

const prettyGPS = function(coords) {
  return `you are at ${coords.lat}${coords.lng}.`
}

MapWrapper.prototype.addMarker = function(coords)  {
  const infoWindowLocation = new google.maps.InfoWindow({
    content: prettyGPS(coords)
  });
  const marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap,
    infoWindow: infoWindowLocation
    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindowLocation.open(this.googleMap, this);
  });
  this.markers.push(marker);
}
