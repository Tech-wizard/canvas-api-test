

window.onload = () => {

    var canvas = document.getElementById("app") as HTMLCanvasElement;
    var context2D = canvas.getContext("2d");

    //var context3D = canvas.getContext("webgl");

    context2D.fillStyle = "#FF000000";
    context2D.strokeStyle = "#00FF00";

    context2D.globalAlpha = 1;
    context2D.setTransform(1, 0, 0, 1, 50, 50);

    //1 0 50
    //0 1 50
    //0 0 1

    context2D.fill();
    context2D.stroke();

    //context2D.fillText("Hellow", 0, 10);
    //context2D.measureText("Hellow").width;
    //context2D.clearRect(0, 0, 400, 400);
    //context2D.fillRect(0,0,100,100);  //设计不好的地方 做一件事情只有一种方法 一个api一个职责

    // var image = document.createElement('img');
    // image.src = "image.jpg";

    var stage = new DisplayObjectContainer();

    var img = new Bitmap();
    img.src = "image.JPG";
    img.scaleX = 0.5;
    img.y = 10;
    img.alpha = 0.1;


    let tf1 = new TextField();
    tf1.text = "Hello";
    tf1.x = 0;
    tf1.alpha = 0.5;

    let tf2 = new TextField();
    tf2.text = "World";
    tf2.x = 100;
    tf2.y = 20;

    stage.addChild(img);
    stage.addChild(tf1);
    stage.addChild(tf2);

    //stage.removechild(tf1);

    setInterval(() => {

        context2D.clearRect(0, 0, canvas.width, canvas.height);
        tf1.y++;
        img.x++;
        stage.draw(context2D);

    }, 100)


    console.log(canvas);

};

interface Drawable {

    draw(context2D: CanvasRenderingContext2D);

}

class DisplayObject implements Drawable {

    x: number = 0;

    y: number = 0;

    alpha: number = 1;

    globalAppha: number = 1;

    scaleX: number = 1;

    scaleY: number = 1;

    parent: DisplayObjectContainer;



    draw(context2D: CanvasRenderingContext2D) {  //应有final

        if (this.parent) {
            this.globalAppha = this.parent.globalAppha * this.alpha;
        }
        else {
            this.globalAppha = this.alpha;
        }

        context2D.globalAlpha = this.globalAppha;

        this.render(context2D);
    }

    render(context2D: CanvasRenderingContext2D) {   //模板方法模式

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
            context2D.drawImage(this.image, this.x, this.y);
        }

        else {

          this.image.src = this._src;

            this.image.onload = () => {

                context2D.drawImage(this.image, this.x, this.y);

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

        if (this.scaleX != 1 || this.scaleY != 1) {

            context2D.scale(this.scaleX, this.scaleY);

        }

        context2D.font = this.size + "px " + this.font;

        // if (this.alpha != 1) {

        //     context2D.globalAlpha = this.alpha;

        // }

        context2D.fillText(this.text, this.x, this.y);

        context2D.scale(1, 1);

        //  context2D.globalAlpha = 1;
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