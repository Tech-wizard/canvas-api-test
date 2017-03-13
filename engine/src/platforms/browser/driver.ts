
//list 
// |-itemRenderer
//      |-- TextField
//      |-- Button
namespace engine {

 export let run = (canvas: HTMLCanvasElement) => {

        var stage = new DisplayObjectContainer();
        let context2D = canvas.getContext("2d");
        let lastNow = Date.now();
        let frameHandler = () => {
            let now = Date.now();
            let deltaTime = now - lastNow;
            Ticker.getInstance().notify(deltaTime);
            context2D.clearRect(0, 0, canvas.width, canvas.height);
            context2D.save();
            stage.draw(context2D);
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
                let E = { type, target, currentTarget,e }
                list[i].dispatchEvent(E);
               
            }

            for (let i = 0; i < list.length; i++) {  //冒泡在后
                let type = "mousedown";
                let currentTarget = result.parent;
                let E = { type, target, currentTarget,e }
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
                let E = { type, target, currentTarget,e }
                list[i].dispatchEvent(E);
                //console.log(e);
            }

            for (let i = 0; i < list.length; i++) {  //冒泡在后
                let type = "mouseup";
                let currentTarget = result.parent;
                let E = { type, target, currentTarget,e }
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
                let E = { type, target, currentTarget,e }
                list[i].dispatchEvent(E);
                //console.log(e);
            }

            for (let i = 0; i < list.length; i++) {  //冒泡在后
                let type = "mousemove";
                let currentTarget = result.parent;
                let E = { type, target, currentTarget,e }
                list[i].dispatchEvent(E);
                //console.log(e);
            }
        }
    };



        return stage;

    }
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