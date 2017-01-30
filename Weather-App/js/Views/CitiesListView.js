define(['text!../templates/cities.html', 'eventAggregator'], function (listTemplate, eventAggregator) {

  var template = listTemplate,
    el = $('#sidebar__cities');

  function render(city) {
    var tmpl = _.template(template);
    $('#sidebar__cities').append(tmpl({context: city}));
  }

   eventAggregator.on('renderCity', function (data) {
     render(data);
  });

  eventAggregator.on('deleteCities', function(citiesIndexes) {
    for(var i = 0; i < citiesIndexes.length; i++) {
      $('.autocomplete__item').eq(citiesIndexes[i] - i).remove();
    }
  });

  eventAggregator.on('forecastUpdated',function(cities) {
    $('#sidebar__cities').html('');

    for(var i = 0; i < cities.length; i++) {
      render(cities[i]);
    }
  });

  return {
    render: render
  };
});