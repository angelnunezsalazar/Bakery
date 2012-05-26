/// <reference path="../_references.js" />

var Order = function (product) {
    var self = this;
    self.address = ko.observable();
    self.email = ko.observable();
    self.quantity = ko.observable(1);
    self.productId = product.id;
    self.product = product;
    self.total = ko.computed(function () {
        return (self.product.price * self.quantity()).toFixed(2);
    });
}