
var ChooseProductViewModel = function () {
    var self = this;

    amplify.request.define("products#getAll", "ajax", {
        url: "/dataservice/products",
        dataType: "json",
        type: "GET"
    });

    self.products = ko.observableArray();

    self.goToPlaceOrder = function (product) {
        location.hash = 'delivery/' + product.id;
    };

    self.init = function () {
        amplify.request("products#getAll", function (data) {
            self.products(data);
        });
    };

    self.init();
};

var PlaceOrderViewModel = function (productId) {
    var self = this;

    amplify.request.define("products#get", "ajax", {
        url: "/dataservice/products/{id}",
        dataType: "json",
        type: "GET"
    });

    amplify.request.define("orders#create", "ajax", {
        url: "/dataservice/orders",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        type: "POST"
    });

    self.order = ko.observable();

    self.postOrder = function () {
        amplify.request("orders#create", ko.toJSON(self.order), function () {
            location.hash = 'delivery/confirmation';
        });
    };

    self.init = function () {
        amplify.request("products#get", { id: productId }, function (product) {
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