define(['CitiesGalleryItemView', 'eventAggregator', 'CityCollection'],
  function (CitiesGalleryItemView, eventAggregator, CityCollection) {
    eventAggregator.on('deleteCities', function (indexes) {
      CityCollection.removeCities(indexes);
    });

    eventAggregator.on('updateForecast', function () {
      CityCollection.update()
    });

    eventAggregator.on('slideChanged', function (index) {
     var city = CityCollection.getCityByIndex(index);
      eventAggregator.trigger('showBackground', city);
    });
});
