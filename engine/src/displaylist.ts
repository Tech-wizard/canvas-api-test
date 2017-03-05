interface Drawable {

    draw(context2D: CanvasRenderingContext2D);

}

interface Event {
    addEventListener(type: string, listener: Function, useCapture?: boolean);
    dispatchEvent(e: MouseEvent);
}


abstract class DisplayObject implements Drawable {

    x: number = 0;

    y: number = 0;

    alpha: number = 1;

    globalAppha: number = 1;

    scaleX: number = 1;

    scaleY: number = 1;

    rotation: number = 0;

    parent: DisplayObjectContainer;

    children: DisplayObject[] = [];

    globalMatrix: math.Matrix;

    localMatrix: math.Matrix;

    touchEnabled: boolean;

    touchListenerList: TouchListener[] = [];

    //捕获冒泡机制   通知整个父

    constructor() {
        this.globalMatrix = new math.Matrix();
        this.localMatrix = new math.Matrix();
    }

    abstract hitTest(x: number, y: number);

    abstract render(context2D: CanvasRenderingContext2D);   //模板方法模式

    addEventListener(type: string, listener: Function, useCapture?: boolean) {

        if (useCapture == null) {
            useCapture = false;
        }

        let touchlistener = new TouchListener(type, listener, useCapture);
        this.touchListenerList.push(touchlistener);

    }

    removeEventListener(child: TouchListener) {
        var index = this.touchListenerList.indexOf(child);
        if (index > -1) {
            this.touchListenerList.splice(index, 1);
        }

    }

    dispatchEvent(E: any) {

        if (this.touchListenerList != null) {

            for (let j = 0; j < this.touchListenerList.length; j++) {

                if (this.touchListenerList[j].type == E.type && this.touchListenerList[j].capture == true) {

                    this.touchListenerList[j].func(E.e);

                }
            }


            for (let j = 0; j < this.touchListenerList.length; j++) {

                if (this.touchListenerList[j].type == E.type && this.touchListenerList[j].capture == false) {

                    this.touchListenerList[j].func(E.e);

                }
            }
        }


    }

    draw(context2D: CanvasRenderingContext2D) {  //应有final

        context2D.save();

        if (this.parent) {

            this.globalAppha = this.alpha * this.parent.globalAppha;
        }
        else {
            this.globalAppha = this.alpha;
        }

        context2D.globalAlpha = this.globalAppha;

        this.setMatrix();

        context2D.setTransform(this.globalMatrix.a, this.globalMatrix.b, this.globalMatrix.c, this.globalMatrix.d, this.globalMatrix.tx, this.globalMatrix.ty);

        this.render(context2D);
    }

    setMatrix() {

        this.localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);

        if (this.parent) {

            this.globalMatrix = math.matrixAppendMatrix(this.localMatrix, this.parent.globalMatrix);

        } else {
            this.globalMatrix = new math.Matrix(1, 0, 0, 1, 0, 0);
        }

    }
}

class Bitmap extends DisplayObject {

    image: HTMLImageElement;

    //texture: string;

    private _src = "";

    private isLoaded = false;

    constructor() {

        super();
        this.image = document.createElement('img');

        // this.image.src = ad;
        //this.isLoade = false;

    }

    set src(value: string) {
        this._src = value;
        this.isLoaded = false;
    }

    render(context2D: CanvasRenderingContext2D) {

        context2D.globalAlpha = this.alpha;

        if (this.isLoaded) {

            context2D.drawImage(this.image, 0, 0);
        }

        else {

            this.image.src = this._src;

            this.image.onload = () => {

                context2D.drawImage(this.image, 0, 0);

                this.isLoaded = true;

            }
        }

    }

    hitTest(x: number, y: number) {

        let rect = new math.Rectangle();

        rect.width = this.image.width;

        rect.height = this.image.height;
       let result = rect.isPointInReactangle(new math.Point(x, y));
       //console.log ("bitmap",result,x,y,rect)
        if (result) {
            return this;
        }
        else {
            return null;
        }

    }
}



class TextField extends DisplayObject {

    text: string = "";

    font: string = "Arial";

    size: string = "36";

    _measureTextWidth = 0;

    constructor() {
        super();
    }

    render(context2D: CanvasRenderingContext2D) {

        context2D.font = this.size + "px " + this.font;

        context2D.fillText(this.text, 0, 0);

        this._measureTextWidth = context2D.measureText(this.text).width;
        //console.log(this._measureTextWidth);

    }

    hitTest(x: number, y: number) {

        let rect = new math.Rectangle();

        rect.height = parseInt(this.size);

        rect.width = this._measureTextWidth;

        let point = new math.Point(x, y);
        
        //return rect.isPointInReactangle(point) ? this : null;
        //console.log(rect.isPointInReactangle(point));
        if (rect.isPointInReactangle(point)) {
            return this;
        }
        else {
            return null;
        }

    }

}





class DisplayObjectContainer extends DisplayObject implements Drawable {

    children: DisplayObject[] = [];

    constructor() {
        super();
    }

    render(context2D) {
        for (let Drawable of this.children) {
            Drawable.draw(context2D);
        }
    }

    addChild(child: DisplayObject) {

        if (this.children.indexOf(child) == -1) {
            this.children.push(child);
            child.parent = this;
        }

    }

    removechild(child: DisplayObject) {

        var index = this.children.indexOf(child);
        if (index > -1) {
            this.children.splice(index, 1);
        }

    }

    removeall() {

        this.children = [];

    }

    hitTest(x: number, y: number) {

        for (let i = this.children.length - 1; i >= 0; i--) {
            let child = this.children[i];
            //child.localMatrix * point;
            let point = new math.Point(x, y);
            let invertChildLocalMatrix = math.invertMatrix(child.localMatrix);
            let pointBaseOnChild = math.pointAppendMatrix(point, invertChildLocalMatrix);
            let HitTestResult = child.hitTest(pointBaseOnChild.x, pointBaseOnChild.y);
             //console.log(HitTestResult);
            if (HitTestResult) {
                return HitTestResult;
            }

        }
    }


}

// class Graphics {

// }

// class Shape extends DisplayObject {

//     graphics: Graphics;

//     draw(context2D: CanvasRenderingContext2D) {

//         context2D.fillRect(0, 0, 0, 0);
//     }
// }

class MoveClip extends Bitmap {

    private advancedTime: number = 0;

    private static FRAME_TIME = 20;

    private static TOTAL_FRAME = 10;

    private currentFraneIndex: number = 0;

    private data: MovieClipData;

    constructor(data: MovieClipData) {
        super();
        this.setMoveClipData(data);
        this.play();

    }

    ticker = (deltaTime) => {
        this.advancedTime += deltaTime;
        if (this.advancedTime >= MoveClip.FRAME_TIME * MoveClip.TOTAL_FRAME) {
            this.advancedTime -= MoveClip.FRAME_TIME * MoveClip.TOTAL_FRAME;
        }
        this.currentFraneIndex = Math.floor(this.advancedTime / MoveClip.FRAME_TIME);

        let data = this.data;

        let frameData = data.frames[this.currentFraneIndex];
        let url = frameData.image;
    }

    stop() {
        Ticker.getInstance().unregister(this.ticker);
    }

    pause() {

    }

    resume() {

    }

    play() {
        Ticker.getInstance().register(this.ticker);
    }


    public setMoveClipData(data: MovieClipData) {
        this.data = data;
        this.currentFraneIndex = 0;
        // this.image = image;
        //创建 / 更新 / 调用  分开
    }
}

let moveClipData = {
    name: "hero",

    frame: [
        { "image": "1.jpg" },
        { "image": "2.jpg" }
    ]
}

type MovieClipData = {
    name: string,
    frames: MovieClipFrameData[]
}

type MovieClipFrameData = {
    "image": string
}




