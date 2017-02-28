var TouchEventService = (function () {
    //listenerList: TouchListener[] = []; 
    function TouchEventService() {
        this._touchStatus = false;
        this.eventList = [];
        this.displayObjectList = [];
        TouchEventService.count++;
        if (TouchEventService.count > 1) {
            throw "singleton!!!";
        }
    }
    TouchEventService.getInstance = function () {
        if (TouchEventService.instance == null) {
            TouchEventService.instance = new TouchEventService();
        }
        return TouchEventService.instance;
    };
    TouchEventService.prototype.notify = function (e) {
        for (var _i = 0, _a = this.eventList; _i < _a.length; _i++) {
            var event = _a[_i];
        }
    };
    // public addEvent(event: MouseEvent) {
    //     for (var i = 0; i < this.eventList.length; i++) {
    //         if (event == this.eventList[i])
    //             return ErrorCode.REPEAT_OBSERVER;
    //     }
    //     this.eventList.push(event);
    // }
    TouchEventService.prototype.getDispalyObjectListFromMAOPAO = function (child) {
        if (child) {
            this.displayObjectList.push(child);
            this.getDispalyObjectListFromMAOPAO(child.parent);
        }
    };
    TouchEventService.prototype.getDispalyObjectListFromBUHUO = function (parent) {
        if (parent) {
            this.displayObjectList.push(parent);
            if (parent.children) {
                for (var i = 0; i < parent.children.length; i++) {
                    this.getDispalyObjectListFromBUHUO(parent.children[i]);
                }
            }
        }
    };
    return TouchEventService;
}());
TouchEventService.count = 0;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["SUCCESS"] = 0] = "SUCCESS";
    ErrorCode[ErrorCode["MISSING_TASK"] = 1] = "MISSING_TASK";
    ErrorCode[ErrorCode["REPEAT_OBSERVER"] = 2] = "REPEAT_OBSERVER";
})(ErrorCode || (ErrorCode = {}));
// function preOrder(node){
//              if(node){
//                  arr.push(node);
//                  preOrder(node.firstElementChild);
//                  preOrder(node.lastElementChild);
//              }
//          }
var TouchListener = (function () {
    function TouchListener(type, func, useCapture) {
        this.capture = false;
        this.type = type;
        this.func = func;
        this.capture = useCapture || false;
    }
    return TouchListener;
}());
var TouchEvents = (function () {
    function TouchEvents(x, y, type) {
        this.moveFlag = false;
        this.x = x;
        this.y = y;
        this.type = type;
    }
    return TouchEvents;
}());
var TouchType;
(function (TouchType) {
    TouchType[TouchType["MOUSEDOWN"] = 0] = "MOUSEDOWN";
    TouchType[TouchType["MOUSEUP"] = 1] = "MOUSEUP";
    TouchType[TouchType["CLICK"] = 2] = "CLICK";
    TouchType[TouchType["MOUSEMOVE"] = 3] = "MOUSEMOVE";
})(TouchType || (TouchType = {}));
//# sourceMappingURL=EventService.js.map