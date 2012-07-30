var PlaceOrderViewModel = function (productId, parent) {
    var self = this;

    self.order = ko.observable();

    self.postOrder = function () {
        OrdersDataSource.create(self.order, function () {
            parent.showConfirmation();
        });
    };

    self.init = function () {
        ProductsDataSource.get(productId, function (product) {
            self.order(new Order(product));
        });
    };

    self.init();
};


//self.order(new Order(product));
