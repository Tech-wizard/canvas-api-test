var Ticker = (function () {
    function Ticker() {
        this.listeners = [];
    }
    Ticker.getInstance = function () {
        if (!Ticker.instance) {
            Ticker.instance = new Ticker();
        }
        else {
            return Ticker.instance;
        }
    };
    Ticker.prototype.register = function (listener) {
        this.listeners.push(listener);
    };
    Ticker.prototype.unregister = function (listener) {
    };
    Ticker.prototype.notify = function (deltaTime) {
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(deltaTime);
        }
    };
    return Ticker;
}());
//# sourceMappingURL=Ticker.js.map