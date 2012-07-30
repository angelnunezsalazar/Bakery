
var ChooseProductViewModel = function (parent) {
    var self = this;
    self.products = ko.observableArray();

    self.goToPlaceOrder = function (product) {
        parent.showPlaceOrder(product.id);
    };

    self.init = function () {
        ProductsDataSource.getAll(function (data) {
            self.products(data);
        });
    };

    self.init();
};



//var ConfirmationViewModel = function() {
//    self.goToProducts = function () {
//        location.hash = 'delivery';
//    };
//};


//var DeliveryViewModel = function () {
//    var self = this;

//    self.chooseProduct = ko.observable();
//    self.placeOrder = ko.observable();
//    self.confirmation = ko.observable();

//    self.showChooseProduct = function () {
//        self.chooseProduct(new ChooseProductViewModel());
//        self.placeOrder(null);
//        self.confirmation(null);
//    };

//    self.showPlaceOrder = function (productId) {
//        self.chooseProduct(null);
//        self.placeOrder(new PlaceOrderViewModel(productId));
//        self.confirmation(null);
//    };

//    self.showConfirmation = function () {
//        self.chooseProduct(null);
//        self.placeOrder(null);
//        self.confirmation(new ConfirmationViewModel());
//    };

//    Sammy(function () {
//        this.get('#delivery', function () {
//            self.showChooseProduct();
//        });

//        this.get('#delivery/confirmation', function () {
//            self.showConfirmation();
//        });

//        this.get('#delivery/:productId', function () {
//            self.showPlaceOrder(this.params.productId);
//        });
//        
//        this.get('', function () { this.app.runRoute('get', '#delivery'); });
//    }).run();
//}