

window.onload = () => {

    var canvas = document.getElementById("app") as HTMLCanvasElement;
    var context2D = canvas.getContext("2d");
    //var context3D = canvas.getContext("webgl");

    context2D.fillStyle = "#FF000000";
    context2D.strokeStyle = "#00FF00";

    context2D.globalAlpha = 1;
    context2D.setTransform(1,0,0,1,50,50);
    //1 0 50
    //0 1 50
    //0 0 1
    context2D.rect(0, 0, 100, 100);
    context2D.fill();
    context2D.stroke();

    context2D.fillText("Hellow", 0, 10);
    context2D.measureText("Hellow").width;

    //context2D.fillRect(0,0,100,100);  //设计不好的地方 做一件事情只有一种方法 一个api一个职责

    var image = document.createElement("");
   
    image.onload = () => {

        var stage = new DisplayObjectContainer();
        let tf1 = new TextField();
        tf1.text = "Hello";
        tf1.x = 0;

        let tf2 = new TextField();
        tf2.text = "World";
        tf2.x = 100;

        stage.addChild(tf1);
        stage.addChild(tf2);
        //let x = 0;
        setInterval(() => {
            context2D.clearRect(0, 0, canvas.width, canvas.height);
            //context2D.drawImage(image,x++,0);

        }, 30);

    }

    context2D.clearRect(0, 0, 400, 400);

    console.log(canvas);

};

interface Drawable {

    draw(context2D: CanvasRenderingContext2D);

}

class DisplayObject implements Drawable{

    x:number = 0;

    y:number = 0;

  draw(context2D: CanvasRenderingContext2D){

  }
}

class Bitmap implements Drawable {

    image: HTMLImageElement;

    draw(context2D: CanvasRenderingContext2D) {
        context2D.drawImage(this.image, this.x, 0);
    }
}



class TextField extends DisplayObject{

    text: string = "";

    draw(context2D: CanvasRenderingContext2D) {
        context2D.fillText(this.text, this.x, 0);
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

}