var ConfirmationViewModel = function () {
    var self = this;
    self.goToProducts = function () {
        location.hash = 'delivery';
    };

    self.success = !OrdersDataSource.needSync();
};