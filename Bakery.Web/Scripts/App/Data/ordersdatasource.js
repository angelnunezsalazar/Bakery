var OrdersDataSource = (function () {
    return {
        create: function (order, success) {
            $.ajax({
                type: "POST",
                url: "/api/orders",
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                data: ko.toJSON(order),
                success: success
            });
        }
    };
} ());
