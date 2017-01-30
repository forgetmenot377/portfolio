define(['text!../templates/daily.html', 'eventAggregator', 'dateHelper'], function (dailyTemplate, eventAggregator, dateHelper) {

  var template = dailyTemplate,
      el = $('.item-block__week');

  function render(city, duration) {
    var tmpl = _.template(template);
    $('.item-block__week').each(function (index) {
      $(this).html(tmpl({context: city[index], duration: duration, dateHelper: dateHelper }));
    });
  }

  function addNewCity(city, duration) {
    var tmpl = _.template(template);

    $('.item-block__week').last().html(tmpl({
      context: city,
      duration: duration,
      dateHelper: dateHelper
    }));
  }

  return {
    render: render,
    addNewCity: addNewCity
  };
});