define(['dateHelper'], function (dateHelper) {

  function WeatherHelper() {}

  WeatherHelper.prototype.convertToFahrenheit = function(value) {
    return Math.round(value * 1.8) + 32;
  };

  WeatherHelper.prototype.getCurrentBackground =  function(temp, time, offset) {
    var hour = dateHelper.getDate(time, offset).getHours();

    if(hour >=6 && hour <= 12 && temp < 20) {
      return "cold--morning";
    } else if(hour >=13 && hour <= 18 && temp < 20) {
      return "cold--day";
    } else if(hour >=19 && hour <= 23 && temp < 20) {
      return "cold--evening";
    }
    if(hour >=6 && hour <= 12 && temp >= 20) {
      return "hot--morning";
    } else if(hour >=13 && hour <= 18 && temp >= 20) {
      return "hot--day";
    } else if(hour >=19 && hour <= 23 && temp >= 20) {
      return "hot--evening";
    }
  };

  WeatherHelper.prototype.getWindDirection = function(angle) {
    if(angle < 10) {
      return "N";
    } else if(angle < 80) {
      return "NE";
    } else if(angle < 100) {
      return "E";
    } else if(angle < 170) {
      return "SE";
    } else if(angle < 190) {
      return "S";
    } else if(angle < 260) {
      return "SW";
    } else if(angle < 280) {
      return "W";
    } else if(angle < 350) {
      return "NW";
    }
    return "N";
  };

  WeatherHelper.prototype.getMoonPhase = function(phase) {
    if (phase === 0 || phase > 0.75) {
      return 'empty-moon';
    } else if (phase === 0.25) {
      return 'young-moon';
    } else if (phase === 0.5) {
      return 'full-moon';
    } else if (phase === 0.75) {
      return 'old-moon';
    } else if (phase > 0 && phase < 0.25) {
      return 'grow-moon';
    } else if (phase > 0.25 && phase < 0.5) {
      return 'almost-full';
    } else if (phase > 0.5 && phase < 0.75) {
      return 'almost-old';
    }
  };

  return new WeatherHelper();
});