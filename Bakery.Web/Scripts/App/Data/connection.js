(function () {
    var onLine = true,
        lastOnLineStatus = true;

    function testConnection() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) {
                return;
            }

            if (xhr.status == 200) {
                fireEvent("goodconnection", {});
                clearTimeout(noResponseTimer);
                // Save the data to local storage
                localStorage[url] = xhr.responseText;
                // call the handler
                callback(xhr.responseText);
            } else {
                fireEvent("connectionerror", {});
                // There is an error of some kind, use our cached copy (if available).
                if (!!localStorage[url]) {
                    // We have some data cached, return that to the callback.
                    callback(localStorage[url]);
                    return;
                }
            }
        };

        xhr.open('HEAD', '/', false);
        try {
            xhr.send();
            onLine = true;
        } catch (e) {
            onLine = false;
        }
        return onLine;
    }

    function triggerEvent(type) {
        var event = document.createEvent('HTMLEvents');
        event.initEvent(type, true, true);
        event.eventName = type;
        (document.body || window).dispatchEvent(event);
    }

//    (function() {
//        testConnection();
//        if (onLine === false) {
//            lastOnLineStatus = false;
//            triggerEvent('offline');
//        }
//        setInterval(function() {
//            testConnection();
//            if (onLine !== lastOnLineStatus) {
//                triggerEvent(onLine ? 'online' : 'offline');
//                lastOnLineStatus = onLine;
//            }
//        }, 5000);
//    })();

} ());