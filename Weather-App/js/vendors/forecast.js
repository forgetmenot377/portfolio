define(['eventAggregator'], function (eventAggregator) {
  function Forecast() {
    this.url = 'https://api.forecast.io/forecast/4a4608998d754ec363b476a47a34cb4e/';
  }

  Forecast.prototype.getForecastByCity = function(city) {
    $.ajax({
      url: this.url + city.lat + ',' + city.lng + '?units=si',
      dataType: "jsonp",
      success: function (forecast) {
        eventAggregator.trigger('addCity', {
          city: city,
          forecast: forecast
        });
      }
    });
  };

  Forecast.prototype.updateForecast = function(city, callback, context) {
    $.ajax({
      type: 'GET',
      url: this.url + city.city.lat + ',' + city.city.lng + '?units=si',
      dataType: "jsonp",
      timeout: 10000,
      success: function (forecast) {
        callback.call(context, forecast);
      },
      error: function() {
        eventAggregator.trigger('noConnection');
      }
    });
  };

  return new Forecast();

});
