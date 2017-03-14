// var canvas = document.getElementById("app") as HTMLCanvasElement;
// var stage =  engine.run(canvas);

// var container = new engine.DisplayObjectContainer();

// stage.addEventListener("mousedown", () => {
//     console.log("stage");
// });

// container.addEventListener("mousedown", () => {
//     console.log("container");
// }, true);

// let tf = new engine.TextField();
// tf.text = "可以拖动的";
// //tf.x = 20;
// //tf.y = 40;
// tf.touchEnabled = true;

// tf.addEventListener("mousedown", (e: MouseEvent) => {
//     console.log("123");
// });

// let Button_1 = new engine.Bitmap();
// Button_1.src = "image.JPG";
// //Button.x = 50;
// //Button.y = 50;
// Button_1.scaleX = 0.3;
// Button_1.scaleY = 0.3;
// Button_1.touchEnabled = true;
// // Button.addEventListener("mousedown", () => { alert("mousedown") });
// // Button.addEventListener("mouseup", () => { alert("mouseup") });

// var distanceX;
// var distanceY;
// Button_1.addEventListener("mousedown", (e: MouseEvent) => {

//     if (TouchEventService.getInstance().isMove == false) {
//         TouchEventService.getInstance().isMove = true;
//     }
//     TouchEventService.getInstance().currentX = e.x;
//     TouchEventService.getInstance().currentY = e.y;
//     distanceX = TouchEventService.getInstance().currentX - Button_1.x;
//     distanceY = TouchEventService.getInstance().currentY - Button_1.y;

// });

// Button_1.addEventListener("mousemove", (e: MouseEvent) => {

//     if (TouchEventService.getInstance().isMove == true) {

//         Button_1.x = TouchEventService.getInstance().currentX - distanceX;
//         Button_1.y = TouchEventService.getInstance().currentY - distanceY;

//     }
//     TouchEventService.getInstance().currentX = e.x;
//     TouchEventService.getInstance().currentY = e.y;

// });

// Button_1.addEventListener("mouseup", (e: MouseEvent) => {
//     if (TouchEventService.getInstance().isMove == true) {
//         TouchEventService.getInstance().isMove = false;

//     }

// });

// // stage.addChild(Button);
// // stage.addChild(tf);
// stage.addChild(container);

// //container.addChild(tf);
// container.addChild(Button_1);
// container.addChild(tf);

var canvas = document.getElementById("app") as HTMLCanvasElement;
var stage =  engine.run(canvas);

var scene = new GameScene();
GameScene.replaceScene(scene);
GameScene.getCurrentScene().stage = stage;
var pickscene = new UIScene();
UIScene.replaceScene(pickscene);
UIScene.getCurrentScene().gameMenu();
//UIScene.getCurrentScene().showPick();
