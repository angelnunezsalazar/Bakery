function initializeApplication() {
    initializeViewModels();
}

function initializeViewModels() {
    ko.applyBindings(new DeliveryViewModel());
}
