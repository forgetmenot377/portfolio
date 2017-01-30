define(['SearchView','autocomplete', 'forecast', 'eventAggregator', 'CityCollection', 'CityModel'], function (SearchView, autocomplete, forecast, eventAggregator, CityCollection, CityModel) {

  function initialize(prediction) {
    SearchView.render(prediction);
  }

  eventAggregator.on('startSearch', function (suggestion) {
    autocomplete.getSuggestion(suggestion, function (prediction) {
      initialize(prediction);
    });
  });

  eventAggregator.on('addSelected', function (placeID) {
    for(var i = 0; i < placeID.length; i++) {
      autocomplete.getCityById(placeID[i], function(city) {
        CityCollection.add(city);
      });
    }
  });

  eventAggregator.on('getCity', function (city) {
    forecast.getForecastByCity(city);
  });

  eventAggregator.on('addCity', function (data) {
    CityCollection.add(new CityModel(data.city, data.forecast));
    eventAggregator.trigger('renderCity', data);
  });

  return {
    initialize: initialize
  };

});
