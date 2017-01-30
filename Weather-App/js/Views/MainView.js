define(['text!../templates/main.html', 'eventAggregator', 'weatherHelper', 'ui', 'bxslider' , 'scrollbar'], function (mainTemplate, eventAggregator, weatherHelper) {

  var template = mainTemplate,
      el = $('body'),
      slider,
      currentSlide = 0;

  function render() {
    var tmpl = _.template(template);
    el.prepend(tmpl());

    slider = $('.cities__list').bxSlider({
      infiniteLoop: false,
      hideControlOnEnd: true,
      controls: false,
      adaptiveHeight: true,
      onSlideAfter: function (slideElement, oldIndex, newIndex) {
        eventAggregator.trigger('slideChanged', newIndex);
      }
    });
  }

  function initialize() {
    $('.today__forecast').perfectScrollbar();

    var input = $('#form__input'),
        deleteBtn = $('#delete'),
        citiesList = $('#sidebar__cities'),
        predictionList = $('#sidebar__autocomplete'),
        addBtn = $('.sidebar__add'),
        checkBoxCount = false,
        mode = "";

    citiesList.on('click', '.autocomplete__item', function () {
      if (!mode) {
        slider.goToSlide($(this).index());
      }
    });

    $('.burger-btn').click(function () {
      $('.main__sidebar').toggleClass('main__sidebar--close');
      $('.burger-btn').toggleClass('burger-btn--close');
    });


    addBtn.click(function () {
      if (!mode) {
        input.removeClass('js-hide');
        predictionList.removeClass('js-hide');
        citiesList.addClass('js-hide');
        addBtn.toggleClass('js-active');
        mode = "add";
      }
      else if (mode === "add") {
        input.addClass('js-hide');
        predictionList.addClass('js-hide');
        citiesList.removeClass('js-hide');
        addBtn.toggleClass('js-active');
        input.val("");
        $('.autocomplete__item .add-item__check').removeAttr("checked");
        $('.sidebar__del').addClass('icon-delete').removeClass('icon-check');
        $('#sidebar__autocomplete').html('');
        mode = "";
      }
      else if (mode === "del") {
        var citiesIndexes = [];

        $('.autocomplete__item').has('.delete-item__check:checked').each(function () {
          citiesIndexes.push($(this).index());
        });

        eventAggregator.trigger('deleteCities', citiesIndexes);

        for (var i = 0; i < citiesIndexes.length; i++) {
          $('.cities__list .forecast__item').eq(citiesIndexes[i] - i).remove();
        }

        addBtn.addClass('icon-add').removeClass('icon-check');
        deleteBtn.toggleClass('js-active');
        $('.guess-item__label').addClass('js-hide');
        $('.autocomplete__item .delete-item__check').removeAttr("checked");
        slider.reloadSlider();
        mode = "";

        if(slider.getSlideCount() === 1) {
          eventAggregator.trigger('slideChanged', 0);
        }
        else {
          slider.goToSlide(slider.getSlideCount() - 1);
        }
      }
    });

    deleteBtn.click(function () {
      if (!mode) {
        mode = "del";
        $('.guess-item__label').removeClass('js-hide');
        $(this).toggleClass('js-active');

        $('.delete-item__check').change(function (e) {
          checkBoxCount = $('.autocomplete__item .delete-item__check:checked');
          if (checkBoxCount.length) {
            $('.sidebar__add').removeClass('icon-add').addClass('icon-check');
          }
          else {
            $('.sidebar__add ').removeClass('icon-check').addClass('icon-add');
          }
        });

      }
      else if (mode === "add") {
        var placeID = [];

        $('.autocomplete__item .guess-item__check:checked').next().each(function () {
          placeID.push($(this).val());
        });

        currentSlide = slider.getCurrentSlide();

        eventAggregator.trigger('addSelected', placeID);

        input.addClass('js-hide');
        predictionList.addClass('js-hide');
        citiesList.removeClass('js-hide');
        addBtn.toggleClass('js-active');
        input.val("");
        predictionList.html("");
        $('.sidebar__del').addClass('icon-delete').removeClass('icon-check');
        mode = "";
      }
      else if (mode === "del") {
        $('.guess-item__label').addClass('js-hide');
        $(this).toggleClass('js-active');
        $('.autocomplete__item .delete-item__check').removeAttr("checked");
        $('.sidebar__add').removeClass('icon-check').addClass('icon-add');
        mode = "";
      }
    });

    document.getElementById('form__input').addEventListener('input', function (e) {
      document.getElementById('sidebar__autocomplete').innerHTML = "";
      eventAggregator.trigger('startSearch', e.target.value);
    });

    $('.main__cities').on('click', '.today__update', function () {
      eventAggregator.trigger('updateForecast');
    });

    eventAggregator.on('convertUnits', function (unit) {
      ConvertUnits(unit);
    });

    var settings = JSON.parse(localStorage.getItem("settings")) || {};
    ConvertUnits(settings.unit);
    eventAggregator.trigger('slideChanged', 0);
  }

  function ConvertUnits(unit) {
    if (unit === "us") {
      $('[data-unit]').text(function (index, value) {
        return weatherHelper.convertToFahrenheit($(this).attr('data-unit'));
      });
    }
    if (unit === "si") {
      $('[data-unit]').each(function () {
        $(this).text($(this).attr('data-unit'));
      });
    }
  }

  eventAggregator.on('cityRendered', function () {
    slider.reloadSlider();

    if(slider.getSlideCount() === 1) {
      eventAggregator.trigger('slideChanged', 0);
    }
    else {
      slider.goToSlide(slider.getSlideCount() - 1);
    }

    $('.today__forecast').perfectScrollbar({ useBothWheelAxes: true });
    $('#autocomplete__wrapper').perfectScrollbar();

    var settings = JSON.parse(localStorage.getItem("settings")) || {};
    ConvertUnits(settings.unit);
  });

  eventAggregator.on('showBackground', function (city) {
    if(city) {
      var className = weatherHelper.getCurrentBackground(city.forecast.currently.temperature, city.forecast.currently.time, city.forecast.offset);
      $('body').removeClass('cold--day cold--evening cold--morning hot--day hot--morning hot--evening night').addClass(className);
    }
  });


  eventAggregator.on('updatesApplied', function () {
    slider = $('.cities__list').bxSlider({
      infiniteLoop: false,
      hideControlOnEnd: true,
      controls: false,
      adaptiveHeight: true,
      onSlideAfter: function (slideElement, oldIndex, newIndex) {
        eventAggregator.trigger('slideChanged', newIndex);
      }
    });

    $('.connection-status').text('');
  });

  eventAggregator.on('changeDays', function() {
    slider.reloadSlider();
  });

  eventAggregator.on('noConnection', function() {
    $('.connection-status').text('(No internet connection)');
  });

  return {
    render: render,
    initialize: initialize
  };
});