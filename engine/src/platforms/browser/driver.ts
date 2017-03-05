
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

    stage.addEventListener("mousedown", () => {
        console.log("stage");
    });

    container.addEventListener("mousedown", () => {
        console.log("container");
    }, true);

    let tf = new TextField();
    tf.text = "可以拖动的";
    tf.x = 20;
    tf.y = 40;
    tf.touchEnabled = true;
    
    tf.addEventListener("mousedown",()=>{
        console.log("123");
    });
    // tf.addEventListener("mousedown", () => {
    //     TouchEventService.getInstance().isMove = true;
    //     console.log("tfdown");
    // });

    // tf.addEventListener("mousemove", () => {

    //     if (TouchEventService.getInstance().isMove == true) {
    //         let dx = TouchEventService.getInstance().currentX - TouchEventService.getInstance().endX;
    //         let dy = TouchEventService.getInstance().currentY - TouchEventService.getInstance().endY;
    //         tf.x += dx;
    //         tf.y += dy;
    //        console.log("bm");
    //     }

    // });

    // tf.addEventListener("mouseup", () => {
    //     TouchEventService.getInstance().isMove = false;
    //     console.log("tfup");
    // });

    let Button = new Bitmap();
    Button.src = "image.JPG";
    Button.x = 50;
    Button.y = 50;
    Button.scaleX = 0.3;
    Button.scaleY = 0.3;
    Button.touchEnabled = true;
    // Button.addEventListener("mousedown", () => { alert("mousedown") });
    // Button.addEventListener("mouseup", () => { alert("mouseup") });

    var distanceX;
    var distanceY;
    Button.addEventListener("mousedown", (e:MouseEvent) => {
        
        if (TouchEventService.getInstance().isMove == false) {
            TouchEventService.getInstance().isMove = true;
           
        }
        TouchEventService.getInstance().currentX = e.x;
        TouchEventService.getInstance().currentY = e.y; 
        distanceX = TouchEventService.getInstance().currentX-Button.x;
        distanceY = TouchEventService.getInstance().currentY-Button.y;


    });

    Button.addEventListener("mousemove", (e:MouseEvent) => {

        if (TouchEventService.getInstance().isMove == true) {

            Button.x = TouchEventService.getInstance().currentX-distanceX;
            Button.y = TouchEventService.getInstance().currentY-distanceY;
          
        }
        TouchEventService.getInstance().currentX = e.x;
        TouchEventService.getInstance().currentY = e.y;

    });

    Button.addEventListener("mouseup", (e:MouseEvent) => {
        if (TouchEventService.getInstance().isMove == true) {
            TouchEventService.getInstance().isMove = false;
           
        }

    });

    // stage.addChild(Button);
    // stage.addChild(tf);
    stage.addChild(container);

    container.addChild(tf);
    container.addChild(Button);



    setInterval(() => {

        context2D.save();

        context2D.setTransform(1, 0, 0, 1, 0, 0);

        context2D.clearRect(0, 0, canvas.width, canvas.height);

        stage.draw(context2D);
        context2D.restore();

    }, 60)


    window.onmousedown = (e) => {

        let x = e.offsetX - 3;
        let y = e.offsetY - 3;
      
        let result = stage.hitTest(x, y);
          distanceX = x-result.x;
          distanceY = y-result.y;
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

    // //  window.onclick = (e)=>{

    // //     let x = e.offsetX - 3;
    // //     let y = e.offsetY - 3;
    // //     //alert(x+","+y);
    // //      let result = stage.hitTest(x, y);
    // //      let target = result;
    // //      if (result) {

    // //         while (result.parent) {
    // //             let type = "onclick";
    // //             let currentTarget =  result.parent;
    // //             let e = {type,target,currentTarget}
    // //             result.parent.dispatchEvent(e);
    // //             console.log(e);
    // //             result = result.parent;
    // //         }
    // //     }
    // // };


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


