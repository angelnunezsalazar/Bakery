var PlaceOrderViewModel = function (productId) {
    var self = this;

    self.order = ko.observable();

    self.postOrder = function () {
        OrdersDataSource.create(self.order, function () {
            location.hash = 'delivery/confirmation';
        });
    };

    self.init = function () {
        ProductsDataSource.get(productId, function (product) {
            self.order(new Order(product));
        });
    };

    self.init();
};