function initializeApplication() {
    initializeCustomBindings();
    initializeViewModels();
}

function initializeViewModels() {
    ko.applyBindings(new PendingOrderViewModel(), document.getElementById("pendingToSave"));
    ko.applyBindings(new DeliveryViewModel(), document.getElementById("delivery"));
}

function initializeCustomBindings() {
    ko.bindingHandlers.money = {
        update: function (element, valueAccessor) {
            var value = valueAccessor().toFixed(2);
            var $elm = $(element);
            var method = $elm.is(":input") ? "val" : "html";
            $elm[method]("$" + value);
        }
    };
}