define(function() {
  function Settings(daysCount, timeout, unit) {
    this.daysCount = daysCount || 3;
    this.timeout = timeout || 15;
    this.unit = unit || "si";
  }

  return Settings;
});
