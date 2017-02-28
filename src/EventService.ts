class TouchEventService {

    private static instance;
    private static count = 0;

    _touchStatus: boolean = false;

     eventList: MouseEvent[] = [];
     displayObjectList: DisplayObject[] = [];
     //listenerList: TouchListener[] = []; 

    currentX:number;
    currentY:number;
    endX:number;
    endY:number;
    canMove=false;

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

    // public notify(e: MouseEvent) {
       
    //     for (var event of this.eventList) {
      
    //     }
    // }

    // public addEvent(event: MouseEvent) {
    //     for (var i = 0; i < this.eventList.length; i++) {
    //         if (event == this.eventList[i])
    //             return ErrorCode.REPEAT_OBSERVER;
    //     }
    //     this.eventList.push(event);
    // }

    public getDispalyObjectListFromMAOPAO(child:DisplayObject){
             if(child){
                 this.displayObjectList.push(child);
                 this.getDispalyObjectListFromMAOPAO(child.parent);
             }
    }

    public getDispalyObjectListFromBUHUO(parent:DisplayObject){
             if(parent){
                 this.displayObjectList.push(parent);
                 if(parent.children){
                 for(var i=0;i<parent.children.length;i++){
                 this.getDispalyObjectListFromBUHUO(parent.children[i]);
                 }
                 }
             }
    }

}

enum ErrorCode {

    SUCCESS,
    MISSING_TASK,
    REPEAT_OBSERVER

}


// function preOrder(node){
//              if(node){
//                  arr.push(node);
//                  preOrder(node.firstElementChild);
//                  preOrder(node.lastElementChild);
//              }
//          }

class TouchListener {

    type: string;
    func: Function;
    capture = false;

    constructor(type: string, func: Function, useCapture?: boolean) {
        this.type = type;
        this.func = func;
        this.capture = useCapture || false;
    }
}

class TouchEvents {
    
    x: number;
    y: number;
    type: number;
    moveFlag = false;

    constructor(x: number, y: number, type: number) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

}

enum TouchType {
    MOUSEDOWN = 0,
    MOUSEUP = 1,
    CLICK = 2,
    MOUSEMOVE = 3
}