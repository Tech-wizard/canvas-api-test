var canvas = document.getElementById("app");
var stage = engine.run(canvas);
var container = new engine.DisplayObjectContainer();
stage.addEventListener("mousedown", function () {
    console.log("stage");
});
container.addEventListener("mousedown", function () {
    console.log("container");
}, true);
var tf = new engine.TextField();
tf.text = "可以拖动的";
//tf.x = 20;
//tf.y = 40;
tf.touchEnabled = true;
tf.addEventListener("mousedown", function (e) {
    console.log("123");
});
var Button = new engine.Bitmap();
Button.src = "image.JPG";
//Button.x = 50;
//Button.y = 50;
Button.scaleX = 0.3;
Button.scaleY = 0.3;
Button.touchEnabled = true;
// Button.addEventListener("mousedown", () => { alert("mousedown") });
// Button.addEventListener("mouseup", () => { alert("mouseup") });
var distanceX;
var distanceY;
Button.addEventListener("mousedown", function (e) {
    if (TouchEventService.getInstance().isMove == false) {
        TouchEventService.getInstance().isMove = true;
    }
    TouchEventService.getInstance().currentX = e.x;
    TouchEventService.getInstance().currentY = e.y;
    distanceX = TouchEventService.getInstance().currentX - Button.x;
    distanceY = TouchEventService.getInstance().currentY - Button.y;
});
Button.addEventListener("mousemove", function (e) {
    if (TouchEventService.getInstance().isMove == true) {
        Button.x = TouchEventService.getInstance().currentX - distanceX;
        Button.y = TouchEventService.getInstance().currentY - distanceY;
    }
    TouchEventService.getInstance().currentX = e.x;
    TouchEventService.getInstance().currentY = e.y;
});
Button.addEventListener("mouseup", function (e) {
    if (TouchEventService.getInstance().isMove == true) {
        TouchEventService.getInstance().isMove = false;
    }
});
// stage.addChild(Button);
// stage.addChild(tf);
stage.addChild(container);
//container.addChild(tf);
container.addChild(Button);
container.addChild(tf);
