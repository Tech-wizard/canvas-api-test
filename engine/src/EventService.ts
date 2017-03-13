class TouchEventService {

    private static instance: TouchEventService;
    private static count = 0;

    _touchStatus: boolean = false;

    eventList: MouseEvent[] = [];
    displayObjectList: engine.DisplayObject[] = [];


    currentX: number;
    currentY: number;
    endX: number;
    endY: number;

    isMove = false;

    constructor() {
        TouchEventService.count++;
        if (TouchEventService.count > 1) {
            throw "singleton!!!";
        }
    }
    public static getInstance() {
        if (TouchEventService.instance == null) {
            TouchEventService.instance = new TouchEventService();
        }
        return TouchEventService.instance;
    }

    public getDispalyObjectListFromMAOPAO(child: engine.DisplayObject) {
        if (child) {
            this.displayObjectList.push(child);
            this.getDispalyObjectListFromMAOPAO(child.parent);
        }
    }

    public getDispalyObjectListFromBUHUO(parent: engine.DisplayObject) {
        if (parent) {
            this.displayObjectList.push(parent);
            if (parent.children) {
                for (var i = 0; i < parent.children.length; i++) {
                    this.getDispalyObjectListFromBUHUO(parent.children[i]);
                }
            }
        }
    }

}
// function preOrder(node){
//              if(node){
//                  arr.push(node);
//                  preOrder(node.firstElementChild);
//                  preOrder(node.lastElementChild);
//              }
//          }
namespace engine {
    export class TouchListener {

        type: string;
        func: Function;
        capture = false;

        constructor(type: string, func: Function, useCapture?: boolean) {
            this.type = type;
            this.func = func;
            this.capture = useCapture || false;
        }
    }


    export class TouchEvent {


        static TOUCH_MOVE: "touchMove";

        static TOUCH_BEGIN: "touchBegin";

        static TOUCH_END: "mouseup";

        static TOUCH_CANCEL: "touchCancel";

        static TOUCH_TAP: "mousedown";

    }

}