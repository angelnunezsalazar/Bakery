(function () {
    var onLine = true,
        lastOnLineStatus = true;

    (function () {
        initConnection();
        setInterval(function () {
            updateConnection();
        }, 5000);
    })();

    function initConnection() {
        var xhr = new XMLHttpRequest();
        xhr.open('HEAD', '/', false);
        try {
            xhr.send();
            onLine = true;
        } catch (e) {
            onLine = false;
        }

        lastOnLineStatus = onLine;
    }

    function updateConnection() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) {
                return;
            }
            if (xhr.status == 200) {
                onLine = true;
            } else {
                onLine = false;
            }

            if (onLine !== lastOnLineStatus) {
                triggerEvent(onLine ? 'online' : 'offline');
                lastOnLineStatus = onLine;
            }
        };

        xhr.open('HEAD', '/');
        xhr.send();
    }

    function triggerEvent(type) {
        var event = document.createEvent('HTMLEvents');
        event.initEvent(type, true, true);
        event.eventName = type;
        (document.body || window).dispatchEvent(event);
    }
} ());