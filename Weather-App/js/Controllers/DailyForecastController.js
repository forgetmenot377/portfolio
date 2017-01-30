define(['DailyForecastListView', 'eventAggregator' ], function(DailyForecastListView, eventAggregator) {

  eventAggregator.on('changeDays', function(duration) {
    var cities = JSON.parse(localStorage.getItem("cities")) || {};
    DailyForecastListView.render(cities, duration);
  });

  eventAggregator.on('cityRendered', function (data) {
    var duration = JSON.parse(localStorage.getItem("settings")) || {};
    DailyForecastListView.addNewCity(data, duration.daysCount);
  });

});
