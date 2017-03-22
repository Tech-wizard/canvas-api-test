namespace engine {

    export let run = (canvas: HTMLCanvasElement) => {

        var stage = new DisplayObjectContainer();
        let context2D = canvas.getContext("2d");
        //let context2D = Factory.create();
        let lastNow = Date.now();
        let renderer = new CanvasRenderer(stage,context2D);
        let frameHandler = () => {
            let now = Date.now();
            let deltaTime = now - lastNow;
            Ticker.getInstance().notify(deltaTime);
            // context2D.setTransform(1,0,0,1,0,0)
            context2D.clearRect(0, 0, canvas.width, canvas.height);
            context2D.save();
            renderer.render();
            stage.update();
            context2D.restore();
            lastNow = now;
            window.requestAnimationFrame(frameHandler);
        }

        window.requestAnimationFrame(frameHandler);

        window.onmousedown = (e) => {

            let x = e.offsetX - 3;
            let y = e.offsetY - 3;

            let result = stage.hitTest(x, y);
            let target = result;

            let list = [];
            list.push(result);
            if (result && result.touchEnabled == true) {

                while (result.parent) {
                    list.push(result.parent);
                    result = result.parent;

                }

                for (let i = list.length - 1; i > 0; i--) {  //捕获在先
                    let type = "mousedown";
                    let currentTarget = result.parent;
                    let E = { type, target, currentTarget, e }
                    list[i].dispatchEvent(E);

                }

                for (let i = 0; i < list.length; i++) {  //冒泡在后
                    let type = "mousedown";
                    let currentTarget = result.parent;
                    let E = { type, target, currentTarget, e }
                    list[i].dispatchEvent(E);

                }
            }
        };

        window.onmouseup = (e) => {

            let x = e.offsetX - 3;
            let y = e.offsetY - 3;

            let result = stage.hitTest(x, y);

            let target = result;
            let list = [];
            list.push(result);

            if (result && result.touchEnabled == true) {

                while (result.parent) {
                    list.push(result.parent);
                    result = result.parent;
                }

                for (let i = list.length - 1; i > 0; i--) {  //捕获在先
                    let type = "mouseup";
                    let currentTarget = result.parent;
                    let E = { type, target, currentTarget, e }
                    list[i].dispatchEvent(E);
                    //console.log(e);
                }

                for (let i = 0; i < list.length; i++) {  //冒泡在后
                    let type = "mouseup";
                    let currentTarget = result.parent;
                    let E = { type, target, currentTarget, e }
                    list[i].dispatchEvent(E);
                    //console.log(e);
                }


            }

        };


        window.onmousemove = (e) => {


            let x = e.offsetX - 3;
            let y = e.offsetY - 3;

            // TouchEventService.getInstance().currentX = x;
            // TouchEventService.getInstance().currentY = y;

            let result = stage.hitTest(x, y);

            let target = result;
            let list = [];
            list.push(result);
            if (result && result.touchEnabled == true) {

                while (result.parent) {
                    list.push(result.parent);
                    result = result.parent;

                }

                for (let i = list.length - 1; i > 0; i--) {  //捕获在先
                    let type = "mousemove";
                    let currentTarget = result.parent;
                    let E = { type, target, currentTarget, e }
                    list[i].dispatchEvent(E);
                    //console.log(e);
                }

                for (let i = 0; i < list.length; i++) {  //冒泡在后
                    let type = "mousemove";
                    let currentTarget = result.parent;
                    let E = { type, target, currentTarget, e }
                    list[i].dispatchEvent(E);
                    //console.log(e);
                }
            }
        };



        return stage;

    }

    class CanvasRenderer {

        constructor(private stage: DisplayObjectContainer, private context2D: CanvasRenderingContext2D) {

        }

        render() {
            let stage = this.stage;
            let context2D = this.context2D;
            this.renderContainer(stage);
        }

        renderContainer(container: DisplayObjectContainer) {
            for (let child of container.children) {
                let context2D = this.context2D;
                context2D.globalAlpha = child.globalAlpha;
                let m = child.globalMatrix;
                context2D.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);

                if (child.type == "Bitmap") {
                    this.renderBitmap(child as Bitmap);
                }
                else if (child.type == "TextField") {
                    this.renderTextField(child as TextField);
                }
                else if (child.type == "Shape") {
                    this.renderShape(child as Shape);
                }
                else if (child.type == "DisplayObjectContainer") {
                    this.renderContainer(child as DisplayObjectContainer);
                }
            }
        }

        renderBitmap(bitmap: Bitmap) {
              this.context2D.globalAlpha = bitmap.alpha;

            if (bitmap.isLoaded) {

                this.context2D.drawImage(bitmap.image, 0, 0, bitmap.width, bitmap.height);
            }

            else {

                bitmap.image.src = bitmap._src;

                bitmap.image.onload = () => {

                    this.context2D.drawImage(bitmap.image, 0, 0, bitmap.width, bitmap.height);

                    bitmap.isLoaded = true;

                }
            }
        }

        renderTextField(textField: TextField) {
             this.context2D.font = textField.size + "px " + textField.font;

            this.context2D.globalAlpha = textField.alpha;

            this.context2D.fillStyle = textField.fillColor;

            this.context2D.fillText(textField.text, 0, parseInt(textField.size));

            textField._measureTextWidth = this.context2D.measureText(textField.text).width;  //180

        }

        renderShape(shape:Shape){

               //context2D.fillStyle = "#FFAAAA";     
            this.context2D.fillStyle =  'rgba(0, 0, 0, '+shape.graphics.alpha+')'; 
            // 'rgba(192, 80, 77, 0.7)'; 
            this.context2D.fillRect(shape.graphics.transX, shape.graphics.transY, shape.graphics.width, shape.graphics.height);
            //context2D.fill();

        }
    }
}

namespace Factory {

}

// window.onload = () => {

//     var canvas = document.getElementById("app") as HTMLCanvasElement;
//     var context2D = canvas.getContext("2d");
//     var DEG = Math.PI / 180;

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



    // setInterval(() => {

    //     context2D.save();

    //     context2D.setTransform(1, 0, 0, 1, 0, 0);

    //     context2D.clearRect(0, 0, canvas.width, canvas.height);

    //     stage.draw(context2D);
    //     context2D.restore();

    // }, 60)