var ChooseProductViewModel = function () {
    var self = this;

    self.products = ko.observableArray();

    self.goToPlaceOrder = function (product) {
        location.hash = 'delivery/' + product.id;
    };

    self.init = function () {
        ProductsDataSource.getAll(function (data) {
            self.products(data);
        });
    };

    self.init();
};