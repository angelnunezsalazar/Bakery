function initializeApplication() {
    initializeCustomBindings();
    initializeAjaxDefaultParameters();
    initializeViewModels();
}

function initializeViewModels() {
    ko.applyBindings(new PendingOrderViewModel(), document.getElementById("pendingToSave"));
    ko.applyBindings(new DeliveryViewModel(), document.getElementById("delivery"));
}

function initializeCustomBindings() {
    ko.bindingHandlers.money = {
        update: function (element, valueAccessor) {
            var value = valueAccessor().toFixed(2);
            var $elm = $(element);
            var method = $elm.is(":input") ? "val" : "html";
            $elm[method]("$" + value);
        }
    };
}

function initializeAjaxDefaultParameters() {
    $.ajaxSetup({
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        retryLimit: 1
    });

    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        if (!originalOptions.tryCount) {
            originalOptions.tryCount = 0;
            originalOptions._error = originalOptions.error;
        };
        options.error = function (_jqXHR, _textStatus, _errorThrown) {
            originalOptions.tryCount++;
            if (originalOptions.tryCount <= options.retryLimit) {
                console.log("Retry url:" + originalOptions.url + ",tryCount:" + originalOptions.tryCount);
                $.ajax(originalOptions);
                return;
            }
            if (originalOptions._error) originalOptions._error(_jqXHR, _textStatus, _errorThrown);
        };
    });
}