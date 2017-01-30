define(['text!../templates/settings.html', 'eventAggregator',  'ui'], function (configTemplate, eventAggregator) {
  var template = configTemplate,
      el =  $('#sidebar__config');

  function render(settings) {

    var tmpl = _.template(template);

    $('#sidebar__config').html(tmpl({settings: settings}));

    $("#config__day").slider({
      animate: true,
      range: "min",
      value: settings.daysCount,
      min: 1,
      max: 7,
      step: 1,
      slide: function (event, ui) {
        eventAggregator.trigger('changeDays', ui.value);
        $("#config__day-value").html(ui.value);
      }
    });

    $("#config__update").slider({
      animate: true,
      range: "min",
      value: settings.timeout,
      min: 15,
      max: 60,
      step: 15,
      slide: function (event, ui) {
        eventAggregator.trigger('changeTimeout', ui.value);
        $("#config__update-value").html(ui.value);
      }
    });

    $('.config__header .config__deg').click(function() {
      if(!$(this).hasClass('active')) {
        $('.config__deg').removeClass('active');
        $(this).addClass('active');
        if($(this).hasClass('config__fahrenheit')) {
          eventAggregator.trigger('convertUnits', 'us');
        }
        else {
          eventAggregator.trigger('convertUnits', 'si');
        }
      }
    })
  }

  return {
    render: render
  };
});