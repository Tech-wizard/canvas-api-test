

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

    var img = new Bitmap("image.jpg");

    img.scaleX = 0.99;
    img.y = 10;
    // image.onload = () => {

    // }

    let tf1 = new TextField();
    tf1.text = "Hello";
    tf1.x = 0;

    let tf2 = new TextField();
    tf2.text = "World";
    tf2.x = 100;

    stage.addChild(tf1);
    stage.addChild(tf2);
    stage.addChild(img);

    stage.removechild(tf1);

    let x = 0;

    setInterval(() => {

        context2D.clearRect(0, 0, canvas.width, canvas.height);

        stage.draw(context2D);

    }, 30);

    console.log(canvas);

};

interface Drawable {

    draw(context2D: CanvasRenderingContext2D);

}

class DisplayObject implements Drawable {

    x: number = 0;

    y: number = 0;

    // canvas = document.getElementById("app") as HTMLCanvasElement;

    // context2D = this.canvas.getContext("2d");

    draw(context2D: CanvasRenderingContext2D) {

    }
}

class Bitmap extends DisplayObject {

    image: HTMLImageElement;

    scaleX: number = 1;

    scaleY: number = 1;

    texture: string;

    alpha: number = 1;

    width: number;

    height: number;

    constructor(ad: string) {

        super();
        this.image = document.createElement('img');
        this.image.src = ad;
        this.width = this.image.width;
        this.height = this.image.height;

    }

    draw(context2D: CanvasRenderingContext2D) {



        if (this.scaleX != 1 || this.scaleY != 1) {
            //context2D.scale(this.scaleX, this.scaleY);
            this.image.width = this.width*this.scaleX;

            this.image.height = this.height*this.scaleY;
        }

        if (this.alpha != 1) {
            context2D.globalAlpha = this.alpha;
        }

        context2D.drawImage(this.image, this.x, this.y);
    }
}



class TextField extends DisplayObject {

    text: string = "";

    font: string = "Arial";

    size: string = "40";

    draw(context2D: CanvasRenderingContext2D) {

        context2D.font = this.size + "px " + this.font;
        context2D.fillText(this.text, this.x, this.y);
    }

}


class Shape extends DisplayObject {

    draw(context2D: CanvasRenderingContext2D) {

        context2D.fillRect(0, 0, 0, 0);
    }
}


class DisplayObjectContainer implements Drawable {

    array: Drawable[] = [];

    draw(context2D) {

        for (let Drawable of this.array) {

            Drawable.draw(context2D);
        }
    }

    addChild(child: Drawable) {

        this.array.push(child);

    }

    removechild(child: Drawable) {

        var index = this.array.indexOf(child);

        if (index > -1) {

            this.array.splice(index, 1);

        }

    }

    removeall() {
        this.array = [];
    }

}