var Connection = (function () {
    var onLine = true,
        lastOnLineStatus = true;

    function testConnection() {
        var xhr = new XMLHttpRequest();
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

    function init() {
        testConnection();
        if (onLine === false) {
            lastOnLineStatus = false;
            triggerEvent('offline');
        }
        setInterval(function () {
            testConnection();
            if (onLine !== lastOnLineStatus) {
                triggerEvent(onLine ? 'online' : 'offline');
                lastOnLineStatus = onLine;
            }
        }, 5000);
    }

    init();

    return {
        online: function () {
            return testConnection();
        }
    };

} ());