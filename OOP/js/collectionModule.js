define('collectionModule', ['employeeModule', 'validationModule'], function (employeeModule, validationModule) {
    var _employeesList = []; // array of employees

    function _sortList() { //sort array of employees
        _employeesList.sort(_compareSalary);
    }

    function _compareSalary(employeeA, employeeB) {//function comparator for sortList
        var diff = employeeB.salary - employeeA.salary;

        if (diff === 0) {
            if (employeeA.name > employeeB.name) return 1;
            if (employeeA.name < employeeB.name) return -1;
        }

        return diff;
    }

    function addEmployee(employees) {//add new employees
        var dataLength =  employees.length,
            errorFlag = false,
            tmpList = [];

        for (var i = 0; i <dataLength; i++) {

            if(validationModule.validateId(employees[i].id) && validationModule.validateSalary(employees[i].salary) && validationModule.validateName(employees[i].name)) {
                if (employees[i].type === "HourlySalaryEmployee") {
                    tmpList.push(new employeeModule.EmployeeHour(employees[i]));
                }
                else if(employees[i].type === "FixedSalaryEmployee") {
                    tmpList.push(new employeeModule.EmployeeFixed(employees[i]));
                }
                else {
                    errorFlag = true;
                }
            }
            else {
                errorFlag = true;
            }
        }

        if(errorFlag) {
            alert("Входные данные не корректны!");
        }
        else {
            _employeesList = tmpList;
        }
        _sortList();
        getEmployeesList();
    }

    function getFromAJAX() {
        $.ajax({
            url: 'employeesCollection.json',
            async: false,
            success: function (data) {
                addEmployee(data);
            }
        });
    }

    function getFromInput() {
        try { addEmployee(JSON.parse($("#input").val())); }
        catch(e) { alert("Входные данные не корректны!"); }
    }

    function getEmployeesList() {
        var output =  $("#output");
        if(_employeesList.length === 0) {
            output.val("Collection is empty.");
            return;
        }

        output.val(JSON.stringify(_employeesList));
    }

    function getFiveFirstNameEmployees() {
        var resultList = [],
            listLength = _employeesList.length,
            output =  $("#output");

        if(listLength === 0) {
            output.val("Collection is empty.");
            return;
        }

        for (var i = 0; i < listLength && i < 5; i++) {
            resultList.push(_employeesList[i].name);
        }

        output.val(resultList);
    }

    function getThreeLastIdsEmployees() {
        var resultList = [],
            listLength = _employeesList.length,
            output =  $("#output");

        if(listLength === 0) {
            output.val("Collection is empty.");
            return;
        }

        for (var i = 0; i < listLength && i < 3; i++) {
            resultList.push(_employeesList[listLength - i - 1].id);
        }

        output.val(resultList);
    }

    return {
        getFromAJAX: getFromAJAX,
        getFromInput: getFromInput,
        getEmployeesList: getEmployeesList,
        getFiveFirstNameEmployees: getFiveFirstNameEmployees,
        getThreeLastIdsEmployees: getThreeLastIdsEmployees
    };
});