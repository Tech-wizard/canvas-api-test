

window.onload = () => {

    var canvas = document.getElementById("app") as HTMLCanvasElement;
    var context2D = canvas.getContext("2d");
    var DEG = Math.PI / 180;
    //var context3D = canvas.getContext("webgl");

    // context2D.fillStyle = "#FF000000";
    // context2D.strokeStyle = "#00FF00";

    // context2D.globalAlpha = 1;
    // context2D.setTransform(1, 0, 0, 1, 50, 50);

    //1 0 50
    //0 1 50
    //0 0 1

    // context2D.fill();
    // context2D.stroke();

    //context2D.fillText("Hellow", 0, 10);
    //context2D.measureText("Hellow").width;
    //context2D.clearRect(0, 0, 400, 400);
    //context2D.fillRect(0,0,100,100);  //设计不好的地方 做一件事情只有一种方法 一个api一个职责

    // var image = document.createElement('img');
    // image.src = "image.jpg";


    //     var m1 = new math.Matrix(2,Math.cos(30 * DEG),Math.sin);

    //    // a c tx     x   ax + cy + tx
    //    // b d ty  *  y = bx + dy + ty 
    //    // 0 0 1      1        1

    //    `

    //    2 0 100
    //    0 1 0
    //    0 0 1 
    //    `

    // //    var a = new COntainer();
    // //    a.x = 100;
    // //    a.scaleX = 2;·


    var stage = new DisplayObjectContainer();

    var img = new Bitmap();
    img.src = "image.JPG";
    img.scaleX = 0.5;
    img.transY = 10;
    img.alpha = 0.1;
    img.rotation = 45;

    let tf1 = new TextField();
    tf1.text = "Hello";
    tf1.transX = 0;
    tf1.alpha = 0.5;

    let tf2 = new TextField();
    tf2.text = "World";
    tf2.transX = 100;
    tf2.transY = 20;

    stage.addChild(img);
    stage.addChild(tf1);
    stage.addChild(tf2);

    //context2D.setTransform(1, 0, 0, 1, 0, 0);
    //stage.removechild(tf1);
    //context2D.save();
    setInterval(() => {

        //context2D.restore();

       context2D.setTransform(1, 0, 0, 1, 0, 0);

        context2D.clearRect(0, 0, canvas.width, canvas.height);

        //context2D.translate(tf1.transX,tf1.transY++);
        //context2D.translate(img.transX++,img.transY);
        tf1.transY++;
        img.transX++;

          stage.draw(context2D);

    }, 60)

    console.log(canvas);

};

interface Drawable {

    draw(context2D: CanvasRenderingContext2D);

}

class DisplayObject implements Drawable {

    transX: number = 0;

    transY: number = 0;

    alpha: number = 1;

    globalAppha: number = 1;

    scaleX: number = 1;

    scaleY: number = 1;

    rotation: number = 0;

    parent: DisplayObjectContainer;

    globalMatrix: math.Matrix;

    localMatrix: math.Matrix;

    draw(context2D: CanvasRenderingContext2D) {  //应有final

         context2D.save();

        if (this.parent) {

            this.globalAppha = this.parent.globalAppha * this.alpha;
        }
        else {
            this.globalAppha = this.alpha;
        }

        context2D.globalAlpha = this.globalAppha;

        this.setMatrix();

        context2D.setTransform(this.globalMatrix.a, this.globalMatrix.b, this.globalMatrix.c, this.globalMatrix.d, this.globalMatrix.tx, this.globalMatrix.ty);

        this.render(context2D);
    }

    render(context2D: CanvasRenderingContext2D) {   //模板方法模式

    }

    setMatrix() {

        this.localMatrix = new math.Matrix();

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
}



class TextField extends DisplayObject {

    text: string = "";

    font: string = "Arial";

    size: string = "40";

    render(context2D: CanvasRenderingContext2D) {


        context2D.font = this.size + "px " + this.font;

        context2D.fillText(this.text, 0, 0);

    }

}





class DisplayObjectContainer extends DisplayObject implements Drawable {

    array: Drawable[] = [];

    render(context2D) {

        for (let Drawable of this.array) {

            Drawable.draw(context2D);
        }
    }

    addChild(child: DisplayObject) {

        if (this.array.indexOf(child) == -1) {

            this.array.push(child);

            child.parent = this;
        }

    }

    removechild(child: DisplayObject) {

        var index = this.array.indexOf(child);

        if (index > -1) {

            this.array.splice(index, 1);

        }

    }

    removeall() {

        this.array = [];

    }

}

class Graphics {

}

class Shape extends DisplayObject {

    graphics: Graphics;

    draw(context2D: CanvasRenderingContext2D) {

        context2D.fillRect(0, 0, 0, 0);
    }
}