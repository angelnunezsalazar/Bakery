var ProductsDataSource = (function () {
    return {
        getAll: function (success) {
            $.ajax({
                type: "GET",
                url: "/api/products",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: success
            });
        },
        get: function (id, success) {
            $.ajax({
                type: "GET",
                url: "/api/products/" + id,
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: success
            });
        }

    };
} ());
