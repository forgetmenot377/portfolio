define(['text!../templates/search.html'], function (searchTemplate) {
  var template = searchTemplate,
    checkBoxCount = false;

  function render(predictions) {
    var tmpl = _.template(template);

    $('#sidebar__autocomplete').html(tmpl(predictions));

    $('.guess-item__check').change(function (e) {
      checkBoxCount = $('.autocomplete__item .add-item__check:checked');
      if (checkBoxCount.length) {
        $('.sidebar__del').removeClass('icon-delete').addClass('icon-check');
      }
      else {
        $('.sidebar__del').addClass('icon-delete').removeClass('icon-check');
      }
    });
  }

  return {
    render: render
  };
});