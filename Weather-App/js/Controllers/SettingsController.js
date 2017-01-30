define(['SettingsView', 'eventAggregator', 'Settings'], function (SettingsView, eventAggregator, Settings) {

  var refreshInterval;

  function initialize() {
    var configs = JSON.parse(localStorage.getItem('settings')) || {},
        settings = new Settings(configs.daysCount, configs.timeout, configs.unit);

    localStorage.settings = JSON.stringify(settings);
    SettingsView.render(settings);
    autoRefreshForecast(settings.timeout);
  }

  eventAggregator.on('changeDays', function (config) {
    var settings = JSON.parse(localStorage.getItem("settings")) || {};

    settings.daysCount = config;
    localStorage.setItem("settings", JSON.stringify(settings));
  });

  eventAggregator.on('changeTimeout', function (config) {
    var settings = JSON.parse(localStorage.getItem("settings")) || {};

    settings.timeout = config;
    localStorage.setItem("settings", JSON.stringify(settings));

    autoRefreshForecast(config)
  });

  eventAggregator.on('convertUnits', function(unit) {
    var settings = JSON.parse(localStorage.getItem("settings")) || {};
    settings.unit = unit;
    localStorage.setItem("settings", JSON.stringify(settings));
  });

  function autoRefreshForecast(time) {
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }
    refreshInterval = setInterval(function () {
      eventAggregator.trigger('updateForecast');
    }, time * 1000 * 60);
  }

  return {
    initialize: initialize
  };

});
