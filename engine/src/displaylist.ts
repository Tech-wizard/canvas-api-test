namespace engine {

    export interface RenderContext {     //跨平台

        drawImage();

        filltext();

        setTransform();

        globalAphla: number;
    }

     export interface Drawable {
        update();
    }

    export interface Event {
        addEventListener(type: string, listener: Function, useCapture?: boolean);
        dispatchEvent(e: MouseEvent);
    }


    export abstract class DisplayObject  {

        type = "DisplayObject";

        x: number = 0;

        y: number = 0;

        alpha: number = 1;

        globalAlpha: number = 1;

        scaleX: number = 1;

        scaleY: number = 1;

        rotation: number = 0;

        parent: DisplayObjectContainer;

        children: DisplayObject[] = [];

        globalMatrix: engine.Matrix;

        localMatrix: engine.Matrix;

        touchEnabled: boolean;

        touchListenerList: TouchListener[] = [];

        //捕获冒泡机制   通知整个父

          constructor(type: string) {
            this.type = type;
            this.globalMatrix = new engine.Matrix();
            this.localMatrix = new engine.Matrix();
        }

        abstract hitTest(x: number, y: number);

        //abstract render(context2D: CanvasRenderingContext2D);   //模板方法模式

        addEventListener(type: string, listener: Function, useCapture?: boolean) {

            if (useCapture == null) {
                useCapture = false;
            }

            let touchlistener = new TouchListener(type, listener, useCapture);
            this.touchListenerList.push(touchlistener);

        }

        removeEventListener(type: string, listener: Function, useCapture?: boolean) {
            if (useCapture == null) {
                useCapture = false;
            }
            let touchlistener = new TouchListener(type, listener, useCapture);

            var index = this.touchListenerList.indexOf(touchlistener);
            if (index > -1) {
                this.touchListenerList.splice(index, 1);
            }

        }

        dispatchEvent(E: any) {

            if (this.touchListenerList != null) {

                for (let j = 0; j < this.touchListenerList.length; j++) {

                    if (this.touchListenerList[j].type == E.type && this.touchListenerList[j].capture == true) {
                         console.log(this);
                        this.touchListenerList[j].func(E.e);

                    }
                }


                for (let j = 0; j < this.touchListenerList.length; j++) {

                    if (this.touchListenerList[j].type == E.type && this.touchListenerList[j].capture == false) {
                         console.log(this);
                        this.touchListenerList[j].func(E.e);

                    }
                }
            }


        }

        update() {  

            this.localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
            if (this.parent) {
                this.globalMatrix = matrixAppendMatrix(this.localMatrix, this.parent.globalMatrix);
            }
            else {
                this.globalMatrix = this.localMatrix;
            }
            if (this.parent) {
                this.globalAlpha = this.parent.globalAlpha * this.alpha;
            }
            else {
                this.globalAlpha = this.alpha;
            }

        }

  


        setMatrix() {

            this.localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);

            if (this.parent) {

                this.globalMatrix = engine.matrixAppendMatrix(this.localMatrix, this.parent.globalMatrix);

            } else {
                this.globalMatrix = new engine.Matrix(1, 0, 0, 1, 0, 0);
            }

        }
    }

    export class Bitmap extends DisplayObject implements Drawable{

        image: HTMLImageElement;

        width: number;

        height: number;

        //texture: string;

         _src = "";

        isLoaded = false;

        constructor() {

            super("Bitmap");
            this.image = document.createElement('img');

            // this.image.src = ad;
            //this.isLoade = false;

        }

        set src(value: string) {
            this._src = value;
            this.isLoaded = false;
            this.width = this.image.width;
            this.height = this.image.height;
        }


        hitTest(x: number, y: number) {

            let rect = new engine.Rectangle();

            rect.width = this.image.width;

            rect.height = this.image.height;
            let result = rect.isPointInReactangle(new engine.Point(x, y));
            //console.log("bitmap", rect.height, rect.width, x, y);

            if (result) {
                return this;
            }
            else {
                return null;
            }

        }
    }



    export class TextField extends DisplayObject implements Drawable{

        text: string = "";

        font: string = "Arial";

        size: string = "36";

        fillColor = "#FFFFFF";

        width;

        height;

        _measureTextWidth = 0;

        constructor() {
            super("TextField");
        }

        hitTest(x: number, y: number) {

            let rect = new engine.Rectangle();

            rect.height = parseInt(this.size);

            rect.width = this._measureTextWidth;

            let point = new engine.Point(x, y);

            //return rect.isPointInReactangle(point) ? this : null;
            //console.log("tf", rect.height, rect.width, x, y);
            if (rect.isPointInReactangle(point)) {
                return this;
            }
            else {
                return null;
            }

        }

    }

    export class DisplayObjectContainer extends DisplayObject implements Drawable {

        children: DisplayObject[] = [];

        constructor() {
            super("DisplayObjectContainer");
        }

       update() {
            super.update();
            for (let drawable of this.children) {
                drawable.update();
            }
        }

        addChild(child: DisplayObject) {

            if (this.children.indexOf(child) == -1) {
                this.children.push(child);
                child.parent = this;
            }

        }

        removeChild(child: DisplayObject) {

            var index = this.children.indexOf(child);
            if (index > -1) {
                this.children.splice(index, 1);
            }

        }

        removeAll() {

            this.children = [];

        }

        hitTest(x: number, y: number) {

            for (let i = this.children.length - 1; i >= 0; i--) {
                let child = this.children[i];
                //child.localMatrix * point;
                let point = new engine.Point(x, y);
                //console.log(x, y);
                let invertChildLocalMatrix = engine.invertMatrix(child.localMatrix);
                let pointBaseOnChild = engine.pointAppendMatrix(point, invertChildLocalMatrix);
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

    export class Shape extends DisplayObjectContainer {

        graphics: Graphics;
        constructor() {
            super();
            this.type = "Shape";
            this.graphics = new Graphics();
            this.addChild(this.graphics);
        }

    }

    export class Graphics extends DisplayObject {

        fillColor = "#000000";
        strokeColor = "#000000";
        lineWidth = 1;
        lineColor = "#000000";
        width;
        height;
        transX;
        transY;
       
       constructor(){
           super("Graphics");
       }

        hitTest(x: number, y: number) {

            let rect = new engine.Rectangle();

            rect.width = this.width;

            rect.height = this.height;
            
            let result = rect.isPointInReactangle(new engine.Point(x, y));
            //console.log("bitmap", rect.height, rect.width, x, y);

            if (result) {
                return this;
            }
            else {
                return null;
            }

        }

        beginFill(color:string, alpha) {
            this.fillColor = color;
            this.alpha = alpha;
        }

        endFill() {
           //context2D.fill();
        }


        drawRect(x1, y1, x2, y2) {
            this.transX = x1;
            this.transY = y1;
            this.width = x2;
            this.height = y2;
        }

    }

    export class MoveClip extends Bitmap {

        private advancedTime: number = 0;

        private static FRAME_TIME = 20;

        private static TOTAL_FRAME = 10;

        private currentFraneIndex: number = 0;

        private data: MovieClipData;

        constructor(data: engine.MovieClipData) {
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
            engine.Ticker.getInstance().unregister(this.ticker);
        }

        pause() {

        }

        resume() {

        }

        play() {
            engine.Ticker.getInstance().register(this.ticker);
        }


        public setMoveClipData(data: engine.MovieClipData) {
            this.data = data;
            this.currentFraneIndex = 0;
            // this.image = image;
            //创建 / 更新 / 调用  ---分开
        }
    }

    let moveClipData = {
        name: "hero",

        frame: [
            { "image": "1.jpg" },
            { "image": "2.jpg" }
        ]
    }

    export type MovieClipData = {
        name: string,
        frames: MovieClipFrameData[]
    }

    export type MovieClipFrameData = {
        "image": string
    }



}

