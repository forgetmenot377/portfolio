define('employeeModule', function () {

    function Employee(properties) {
        this.id = properties.id;
        this.name = properties.name;
        this.salary = properties.salary;
    }

    Employee.prototype.getSalary = function() {
       return this.salary;
    };

    function EmployeeFixed(properties) {
        Employee.call(this, properties);
        this.salary = this.getSalary();
    }

    EmployeeFixed.prototype = Object.create(Employee.prototype);
    EmployeeFixed.prototype.constructor = EmployeeFixed;

    var EmployeeHour = function (properties) {
        Employee.call(this, properties);

        this.salary = this.getSalary();
    };

    EmployeeHour.prototype = Object.create(Employee.prototype);
    EmployeeHour.prototype.constructor = EmployeeHour;

    EmployeeHour.prototype.getSalary = function () {
         return parseInt((this.salary  * 8 * 20.8).toFixed(2));
    };

    return {
        EmployeeFixed: EmployeeFixed,
        EmployeeHour: EmployeeHour
    }
});
