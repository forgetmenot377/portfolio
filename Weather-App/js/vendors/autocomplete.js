define(['eventAggregator'], function (eventAggregator) {

  function Autocomplete() { }

  Autocomplete.prototype.getSuggestion = function (name, callback) {
    var service = new google.maps.places.AutocompleteService();

    if (name !== "") {
      service.getPlacePredictions({ input: name, types: ['(cities)'], language: "en" }, function (predictions, status) {
        var suggestions = [];

        if (status != google.maps.places.PlacesServiceStatus.OK) {
          return;
        }

        predictions.forEach(function (prediction) {
          if (prediction.types.indexOf("administrative_area_level_3") !== -1) {
            return;
          }
          suggestions.push(prediction);
        });

        callback({predictions: suggestions});
      });
    }
  };

  Autocomplete.prototype.getCityById = function(placeID, callback) {
    var geocoder = new google.maps.Geocoder;
    geocoder.geocode({'placeId': placeID}, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          eventAggregator.trigger('getCity', {
            name: results[0].address_components[0].long_name,
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          });
        }
      }
    })
  };

  return new Autocomplete()

});