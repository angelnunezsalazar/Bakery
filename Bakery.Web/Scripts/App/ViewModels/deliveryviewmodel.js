
var ChooseProductViewModel = function () {
    var self = this;
    var productsDataSource = new ProductsDataSource();

    self.products = ko.observableArray();

    self.goToPlaceOrder = function (product) {
        location.hash = 'delivery/' + product.id;
    };

    self.init = function () {
        productsDataSource.getAll(function(data) {
            self.products(data);
        });
    };

    self.init();
};

var PlaceOrderViewModel = function (productId) {
    var self = this;
    var productsDataSource = new ProductsDataSource();
    var ordersDataSource = new OrdersDataSource();

    self.order = ko.observable();

    self.postOrder = function () {
        ordersDataSource.create(self.order, function () {
            location.hash = 'delivery/confirmation';
        });
    };

    self.init = function () {
        productsDataSource.get(productId, function(product) {
            self.order(new Order(product));
        });
    };

    self.init();
};

var ConfirmationViewModel = function () {
    self.goToProducts = function () {
        location.hash = 'delivery';
    };
};


var DeliveryViewModel = function () {
    var self = this;

    self.chooseProduct = ko.observable();
    self.placeOrder = ko.observable();
    self.confirmation = ko.observable();

    self.showChooseProduct = function () {
        self.chooseProduct(new ChooseProductViewModel());
        self.placeOrder(null);
        self.confirmation(null);
    };

    self.showPlaceOrder = function (productId) {
        self.chooseProduct(null);
        self.placeOrder(new PlaceOrderViewModel(productId));
        self.confirmation(null);
    };

    self.showConfirmation = function () {
        self.chooseProduct(null);
        self.placeOrder(null);
        self.confirmation(new ConfirmationViewModel());
    };

    Sammy(function () {
        this.get('#delivery', function () {
            self.showChooseProduct();
        });

        this.get('#delivery/confirmation', function () {
            self.showConfirmation();
        });

        this.get('#delivery/:productId', function () {
            self.showPlaceOrder(this.params.productId);
        });

        this.get('', function () { this.app.runRoute('get', '#delivery'); });
    }).run();
}