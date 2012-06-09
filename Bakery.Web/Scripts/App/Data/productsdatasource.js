var ProductsDataSource = (function () {
    return {
        getAll: function (success) {
            $.ajax({
                type: "GET",
                url: "/dataservice/products",
                success: function (data) {
                    localStorage['/dataservice/products'] = JSON.stringify(data);
                    success(data);
                },
                error: function () {
                    var data = JSON.parse(localStorage['/dataservice/products']);
                    success(data);
                }
            });
        },
        get: function (id, success) {
            $.ajax({
                type: "GET",
                url: "/dataservice/products/"+id,
                success: success,
                error: function () {
//                    this.tryCount++;
//                    if (this.tryCount <= this.retryLimit) {
//                        console.log("Retry " + this.tryCount);
//                        $.ajax(this);
//                        return;
//                    }
                    var products = JSON.parse(localStorage['/dataservice/products']);
                    var product = $.grep(products, function (item) {
                        return item.id == id;
                    })[0];
                    success(product);
                }
            });
        }
    };
} ());