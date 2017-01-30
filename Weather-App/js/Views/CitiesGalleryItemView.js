define(['text!../templates/cityItem.html', 'eventAggregator', 'dateHelper', 'weatherHelper'], function (cityTemplate, eventAggregator, dateHelper, weatherHelper) {

  var template = cityTemplate,
    el = $('#cities__list');

  function render(city) {
    var tmpl = _.template(template);
    $('#cities__list').append(tmpl({
      context: city,
      dateHelper: dateHelper,
      weatherHelper: weatherHelper
    }));

    eventAggregator.trigger('cityRendered', city);
  }

  eventAggregator.on('renderCity', render);

  eventAggregator.on('forecastUpdated', function(cities) {
    $('.main__cities').html('<ul id="cities__list" class="cities__list forecast"></ul>');
    for(var i = 0; i < cities.length; i++){
      render(cities[i]);
    }

    eventAggregator.trigger('updatesApplied');
  });

  return {
    render: render
  };

});