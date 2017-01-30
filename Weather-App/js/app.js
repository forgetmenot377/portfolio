requirejs.config({
  paths: {
    jquery: 'lib/jquery-2.1.4.min',
    ui: 'lib/jquery-ui.min',
    bxslider: 'lib/jquery.bxslider.min',
    scrollbar: 'lib/perfect-scrollbar.jquery.min',
    text: 'lib/text',
    async: 'lib/async',
    underscore: 'lib/underscore-min',
    backbone: 'lib/backbone-min',
    eventAggregator: 'utils/eventAggregator',

    Settings: 'Models/Settings',
    CityModel: 'Models/CityModel',
    CityCollection: 'Models/CityCollection',

    MainView: 'Views/MainView',
    SettingsView: 'Views/SettingsView',
    CitiesListView: 'Views/CitiesListView',
    CitiesGalleryItemView: 'Views/CitiesGalleryItemView',
    SearchView: 'Views/SearchView',
    DailyForecastListView: 'Views/DailyForecastListView',

    SettingsController: 'Controllers/SettingsController',
    CitiesListController: 'Controllers/CitiesListController',
    CitiesGalleryController: 'Controllers/CitiesGalleryController',
    DailyForecastController: 'Controllers/DailyForecastController',
    SearchController: 'Controllers/SearchController',
    autocomplete: 'vendors/autocomplete',
    forecast: 'vendors/forecast',
    dateHelper: 'helpers/dateHelper',
    weatherHelper: 'helpers/weatherHelper'
  }
});

require(['jquery', 'SettingsController', 'CitiesGalleryController', 'SearchController','DailyForecastController', 'CitiesListView', 'MainView', 'CityCollection'],
  function ($, SettingsController, CitiesGalleryController, SearchController, DailyForecastController, CitiesListView, MainView, CityCollection) {

    MainView.render();
    CityCollection.getCitiesFromLS();
    SettingsController.initialize();
    MainView.initialize();
  });

