
//list 
// |-itemRenderer
//      |-- TextField
//      |-- Button


interface RenderContext {     //跨平台

    drawImage();

    filltext();

    setTransform();

    globalAphla: number;
}

window.onload = () => {

    var canvas = document.getElementById("app") as HTMLCanvasElement;
    var context2D = canvas.getContext("2d");
    var DEG = Math.PI / 180;

   

    //     var m1 = new math.Matrix(2,Math.cos(30 * DEG),Math.sin);

    //    // a c tx     x   ax + cy + tx
    //    // b d ty  *  y = bx + dy + ty 
    //    // 0 0 1      1        1

    //    `
    //    2 0 100
    //    0 1 0
    //    0 0 1 
    //    `

    // //    a.x = 100;
    // //    a.scaleX = 2;
   
    // let lastNow = Date.now();

    // let frameHandler = () => {
    //     console.log("111");

    //     let now = Date.now();
    //     let deltaTime = lastNow - now;
    //     Ticker.getInstance().notify(deltaTime);
    //     context2D.save();
    //     context2D.setTransform(1, 0, 0, 1, 0, 0);
    //     context2D.clearRect(0, 0, canvas.width, canvas.height);
    //     //stage.updateMatrix();//3d引擎需要分开
    //     stage.draw(context2D);
    //     context2D.restore();
    //     lastNow = now;
    //     window.requestAnimationFrame(frameHandler);

    // }
    // window.requestAnimationFrame(frameHandler);

    // let speed = 10;

    // Ticker.getInstance().register((deltaTime) => {

    // Button.transX = speed * deltaTime;

    // // h = 1/2 * g * t * t;//Tween

    // // s+=1;   //新手

    // // v = g * deltaTime;
    // // s= s0 + v *deltaTime; //入门

    // // for(let i = 0;i<deltaTime/10;i++){  //切片
    // //     doit(10);
    // // }

    // // function doit(deltaTime){
    // //    v = g * deltaTime;
    // // s= s0 + v *deltaTime;   
    // // }

    // });

    var stage = new DisplayObjectContainer();
    var container = new DisplayObjectContainer();

    stage.addEventListener("mousedown",()=>{
        console.log("stage");
    });

    container.addEventListener("mousedown",()=>{
        console.log("container");
    },true);

    let tf = new TextField();
    tf.text = "可以拖动的话";
    tf.transX = 20;
    tf.transY = 40;
    tf.touchEnabled = true;

    tf.addEventListener("mousedown", () => {
        TouchEventService.getInstance().canMove = true;
        console.log("tfdown");
    });

    tf.addEventListener("mousemove", (e: MouseEvent) => {

        if (TouchEventService.getInstance().canMove == true) {
            let dx = TouchEventService.getInstance().currentX - TouchEventService.getInstance().endX;
            let dy = TouchEventService.getInstance().currentY - TouchEventService.getInstance().endY;
            tf.transX += dx;
            tf.transY += dy;
        }

    });

    tf.addEventListener("mouseup", () => {
        TouchEventService.getInstance().canMove = false;
        console.log("tfup");
    });

    let Button = new Bitmap();
    Button.src = "image.JPG";
    Button.transX = 50;
    Button.transY = 50;
    Button.scaleX = 0.3;
    Button.scaleY = 0.3;
    Button.touchEnabled = true;
    Button.addEventListener("mousedown", () => { alert("mousedown") });
    Button.addEventListener("mouseup", () => { alert("mouseup") });


    // stage.addChild(Button);
    // stage.addChild(tf);
    stage.addChild(container);

    container.addChild(Button);
    container.addChild(tf);


    setInterval(() => {

        context2D.save();

        context2D.setTransform(1, 0, 0, 1, 0, 0);

        context2D.clearRect(0, 0, canvas.width, canvas.height);

        //context2D.translate(tf1.transX,tf1.transY++);
        //context2D.translate(img.transX++,img.transY);
        //img.rotation++;
        //tf1.transY++;
         Button.transX++;
        //stage.transX++;

        stage.draw(context2D);
        context2D.restore();

    }, 60)

    window.onmouseup = (e) => {
         console.log("mouseup");
        TouchEventService.getInstance().endX = TouchEventService.getInstance().currentX;
        TouchEventService.getInstance().endY = TouchEventService.getInstance().currentY;
        let x = e.offsetX - 3;
        let y = e.offsetY - 3;
        TouchEventService.getInstance().currentX = x;
        TouchEventService.getInstance().currentY = y;
        //alert(x+","+y);
        let result = stage.hitTest(x, y);
        let target = result;
        if (result) {

            while (result.parent) {
                let type = "mouseup";
                let currentTarget = result.parent;
                let e = { type, target, currentTarget }
                result.parent.dispatchEvent(e);
                console.log(e);
                result = result.parent;
            }
        }

    };

    window.onmousedown = (e) => {
         console.log("mousedown");
        TouchEventService.getInstance().canMove = true;
        let x = e.offsetX - 3;
        let y = e.offsetY - 3;
        TouchEventService.getInstance().currentX = x;
        TouchEventService.getInstance().currentY = y;
        //alert(x+","+y);
        let result = stage.hitTest(x, y);
        console.log(result);
        let target = result;
        if (result) {

            while (result.parent) {
                let type = "mousedown";
                let currentTarget = result.parent;
                let e = { type, target, currentTarget }
                result.parent.dispatchEvent(e);
                console.log(e);
                result = result.parent;
            }
        }
    }

    window.onmousemove = (e) => {

        console.log("mousemove");
        let x = e.offsetX - 3;
        let y = e.offsetY - 3;
        TouchEventService.getInstance().currentX = x;
        TouchEventService.getInstance().currentY = y;
        //alert(x+","+y);
        
        let result = stage.hitTest(x, y);
        let target = result;
        if (result) {

            while (result.parent) {
                let type = "mousemove";
                let currentTarget = result.parent;
                let e = { type, target, currentTarget }
                result.parent.dispatchEvent(e);
                console.log(e);
                result = result.parent;
            }
        }
    };

    //  window.onclick = (e)=>{

    //     let x = e.offsetX - 3;
    //     let y = e.offsetY - 3;
    //     //alert(x+","+y);
    //      let result = stage.hitTest(x, y);
    //      let target = result;
    //      if (result) {

    //         while (result.parent) {
    //             let type = "onclick";
    //             let currentTarget =  result.parent;
    //             let e = {type,target,currentTarget}
    //             result.parent.dispatchEvent(e);
    //             console.log(e);
    //             result = result.parent;
    //         }
    //     }
    // };


    // setTimeout(function () {
    //     let result = list.hitTest(50, 50);
    //     if (result) {
    //         do {
    //             //result.dispatchEvent(e);
    //         }
    //         while (result.parent) {
    //             //result.dispatchEvent(e);
    //             result = result.parent;
    //         }
    //     }

    //     console.log(result);
    // }, 1000);


};


interface Drawable {

    draw(context2D: CanvasRenderingContext2D);

}

interface Event {
    addEventListener(type: string, listener: Function, useCapture?: boolean);
    dispatchEvent(e: MouseEvent);
}


abstract class DisplayObject implements Drawable {

    transX: number = 0;

    transY: number = 0;

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

    dispatchEvent(e: MouseEvent) {

        // if (useCapture==true) {
        //     TouchEventService.getInstance().getDispalyObjectListFromBUHUO(this);
        // }
        // else {
        //     TouchEventService.getInstance().getDispalyObjectListFromMAOPAO(this);
        // }
       
       

        for (let i = 0; i < TouchEventService.getInstance().displayObjectList.length; i++) {

            for (let j = 0; j < TouchEventService.getInstance().displayObjectList[i].touchListenerList.length; j++) {

                if (TouchEventService.getInstance().displayObjectList[i].touchListenerList[j].type == e.type) {

                    TouchEventService.getInstance().displayObjectList[i].touchListenerList[j].func();
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

        this.localMatrix.updateFromDisplayObject(this.transX, this.transY, this.scaleX, this.scaleY, this.rotation);

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

        rect.x = rect.y = 0;

        rect.width = this.image.width;

        rect.height = this.image.height;

        if (rect.isPointInReactangle(new math.Point(x, y))) {
            return this;
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

        context2D.measureText(this.text).width;

    }

    hitTest(x: number, y: number) {

        var rect = new math.Rectangle();
        rect.height = 20;
        rect.width = this._measureTextWidth;
        var point = new math.Point(x, y);
        return rect.isPointInReactangle(point) ? this : null;

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
        console.log(1111);
        for (let i = this.children.length - 1; i >= 0; i--) {
            let child = this.children[i];
            //child.localMatrix * point;
            let point = new math.Point(x, y);
            let invertChildLocalMatrix = math.invertMatrix(child.localMatrix);
            let pointBaseOnChild = math.pointAppendMatrix(point, child.localMatrix);

            // if (child.children) {
            //     for (let j = child.children.length - 1; j >= 0; j--) {
            //         let HitTestResult = child.children[j].hitTest(pointBaseOnChild.x, pointBaseOnChild.y);
            //         if (HitTestResult) {
            //             return HitTestResult;
            //         }
            //         else {
            //             return null;
            //         }
            //     }
            // }

            let HitTestResult = child.hitTest(pointBaseOnChild.x, pointBaseOnChild.y);
             console.log(HitTestResult);
            if (HitTestResult) {
                return HitTestResult;
                
            }
            else {
                return null;
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