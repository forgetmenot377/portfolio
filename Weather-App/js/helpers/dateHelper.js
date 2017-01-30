define(function () {
  function DateHelper() {
    this.weekends = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }

  DateHelper.prototype.getTodayString = function(time, offset) {
    var date = this.getDate(time, offset),
      day = date.getDay(),
      month = date.getMonth();

    return this.weekends[day] + ", " + this.months[month] + date.getDate();
  };

  DateHelper.prototype.getDate = function(time, offset) {
    var cityOffset = -(new Date()).getTimezoneOffset() / 60,
      cityTime = time + (offset - cityOffset) * 3600;

    return new Date(cityTime * 1000);
  };

  DateHelper.prototype.getTimeString = function(time, offset) {
    var date = this.getDate(time, offset),
      minutes = date.getMinutes(),
      hours = date.getHours();

    minutes = minutes > 9 ? minutes : '0' + minutes;
    hours = hours > 9 ? hours : '0' + hours;

    return hours + ":" + minutes;
  };

  DateHelper.prototype.getWeekDay = function(time, offset) {
    var day = this.getDate(time, offset).getDay();

    return this.weekends[day].substring(0, 3);
  };

  return  new DateHelper();
});