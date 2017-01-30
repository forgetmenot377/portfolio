define(['eventAggregator', 'forecast', 'CityModel'], function (eventAggregator, forecast, CityModel) {
  function CityCollection() {
    this._cities = [];
  }

  CityCollection.prototype.add = function (city) {
    this._cities.push(city);
    localStorage.setItem("cities", JSON.stringify(this._cities));
  };

  CityCollection.prototype.removeCities = function (indexes) {
    for (var i = 0; i < indexes.length; i++) {
      this._cities.splice(indexes[i] - i, 1);
    }
    localStorage.setItem("cities", JSON.stringify(this._cities));
  };

  CityCollection.prototype.getCitiesFromLS = function () {
    var data = JSON.parse(localStorage.getItem('cities')) || [];

    for (var i = 0; i < data.length; i++) {
      this._cities.push(new CityModel(data[i].city, data[i].forecast));
      eventAggregator.trigger('renderCity', this._cities[i]);
    }
  };

  CityCollection.prototype.getCityByIndex = function (index) {
    return this._cities[index];
  };

  CityCollection.prototype.update = function () {
    _.forEach(this._cities, function (item, index) {
      forecast.updateForecast(item, function (newForecast) {
        this._cities[index] = _.assign(item, {forecast: newForecast});
        if (index === this._cities.length - 1) {
          localStorage.setItem("cities", JSON.stringify(this._cities));
          eventAggregator.trigger('forecastUpdated', this._cities);
        }
      }, this);
    }, this);
  };

  return new CityCollection;
});
