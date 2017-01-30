require(['collectionModule', 'jquery'], function (collectionModule) {
    $("#add-textarea").click(collectionModule.getFromInput);
    $("#add-ajax").click(collectionModule.getFromAJAX);
    $("#show").click(collectionModule.getEmployeesList);
    $("#show-first").click(collectionModule.getFiveFirstNameEmployees);
    $("#show-last").click(collectionModule.getThreeLastIdsEmployees);
});