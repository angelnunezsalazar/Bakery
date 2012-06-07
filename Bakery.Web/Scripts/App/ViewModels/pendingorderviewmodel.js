var PendingOrderViewModel = function () {
    var self = this;
    self.visible = ko.computed(function () {
        if (OrdersDataSource.needSync()) {
            return true;
        }
        return false;
    });
    self.count = ko.computed(function () {
        return OrdersDataSource.pendingCount();
    });
};