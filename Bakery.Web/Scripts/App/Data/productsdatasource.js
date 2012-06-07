var ProductsDataSource = (function () {
    return {
        getAll: function (success) {
            if (Connection.online()) {
                $.getJSON("/dataservice/products", function (data) {
                    success(data);
                    localStorage['/dataservice/products'] = JSON.stringify(data);
                });
            } else {
                var data = JSON.parse(localStorage['/dataservice/products']);
                success(data);
            }
        },

        get: function (id, success) {
            if (Connection.online()) {
                $.getJSON("/dataservice/products/" + id, success);
            } else {
                var products = JSON.parse(localStorage['/dataservice/products']);
                var product = $.grep(products, function (item) {
                    return item.id == id;
                })[0];
                success(product);
            }
        }
    };
} ());