var ProductsDataSource = function () {
    var self = this;
    self.getAll = function (success) {
        $.getJSON("/dataservice/products", success);
    };

    self.get = function (id, success) {
        $.getJSON("/dataservice/products/" + id, success);
    };
};

var OrdersDataSource = function () {
    var self = this;
    self.create= function(order,success) {
        $.ajax({
            type: "POST",
            url: "/dataservice/orders",
            data: ko.toJSON(order),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: success
        });
    };
}