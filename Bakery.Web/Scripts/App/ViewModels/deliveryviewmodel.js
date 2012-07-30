var DeliveryViewModel = function () {
    var self = this;

    self.chooseProduct = ko.observable();
    self.placeOrder = ko.observable();

    self.showChooseProduct = function () {
        self.chooseProduct(new ChooseProductViewModel(self));
        self.placeOrder(null);
    };

    self.showPlaceOrder = function (productId) {
        self.chooseProduct(null);
        self.placeOrder(new PlaceOrderViewModel(productId, self));
    };

    self.showConfirmation = function () {
        //TODO: Mostrar la Tercera vista y ocultar las demás
    };

    self.showChooseProduct();
};
