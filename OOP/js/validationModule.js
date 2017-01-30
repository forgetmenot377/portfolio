define('validationModule', function () {
    var regExps = {
        id: /^[\d]+$/,
        name: /^[a-zA-Z]+$/
    };

    function validateId(id) {
        return (regExps.id.test(id));
    }

    function validateSalary(value) {
        return (typeof value === "number");
    }

    function validateName(name) {
        return regExps.name.test(name);
    }

    return {
        validateId: validateId,
        validateName: validateName,
        validateSalary: validateSalary
    };
});