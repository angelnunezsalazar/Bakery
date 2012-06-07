var OrdersDataSource = (function () {
    var needSync = ko.observable(false);
    var pendingCount = ko.observable(0);

    (function () {
        var pendingOrders = localStorage['/dataservice/orders'];
        if (pendingOrders != null) {
            needSync(true);
            pendingCount(JSON.parse(pendingOrders).length);
        }
    })();

    var addToStorage = function (order) {
        var pendingOrders = localStorage['/dataservice/orders'];
        var orders = [];
        if (pendingOrders != null) {
            orders = JSON.parse(pendingOrders);
        }
        orders.push(order);
        pendingCount(pendingCount() + 1);
        localStorage['/dataservice/orders'] = JSON.stringify(orders);
    };

    var removeFromStorage = function () {
        var orders = JSON.parse(localStorage['/dataservice/orders']);
        var order = orders.pop();
        pendingCount(pendingCount() - 1);
        localStorage['/dataservice/orders'] = JSON.stringify(orders);
        return order;
    };

    var create = function (order, success, error) {
        $.ajax({
            type: "POST",
            url: "/dataservice/orders",
            data: order,
            success: success,
            error: error
        });
    };

    $(window).bind("online", function () {
        if (needSync()) {
            var order = removeFromStorage();
            while (order != null) {
                create(JSON.stringify(order));
                order = removeFromStorage();
            }
            needSync(false);
            localStorage.removeItem('/dataservice/orders');
        }
    });

    return {
        create: function (order, success) {
            var error = function () {
                addToStorage(ko.toJS(order));
                needSync(true);
                success();
            };
            create(ko.toJSON(order), success, error);
        },
        needSync: needSync,
        pendingCount: pendingCount
    };
} ());