var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
window.onload = function () {
    var canvas = document.getElementById("app");
    var context2D = canvas.getContext("2d");
    //var context3D = canvas.getContext("webgl");
    context2D.fillStyle = "#FF000000";
    context2D.strokeStyle = "#00FF00";
    context2D.globalAlpha = 1;
    context2D.setTransform(1, 0, 0, 1, 50, 50);
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
    image.onload = function () {
        var stage = new DisplayObjectContainer();
        var tf1 = new TextField();
        tf1.text = "Hello";
        tf1.x = 0;
        var tf2 = new TextField();
        tf2.text = "World";
        tf2.x = 100;
        stage.addChild(tf1);
        stage.addChild(tf2);
        //let x = 0;
        setInterval(function () {
            context2D.clearRect(0, 0, canvas.width, canvas.height);
            //context2D.drawImage(image,x++,0);
        }, 30);
    };
    context2D.clearRect(0, 0, 400, 400);
    console.log(canvas);
};
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
    }
    DisplayObject.prototype.draw = function (context2D) {
    };
    return DisplayObject;
}());
var Bitmap = (function () {
    function Bitmap() {
    }
    Bitmap.prototype.draw = function (context2D) {
        context2D.drawImage(this.image, this.x, 0);
    };
    return Bitmap;
}());
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = "";
        return _this;
    }
    TextField.prototype.draw = function (context2D) {
        context2D.fillText(this.text, this.x, 0);
    };
    return TextField;
}(DisplayObject));
var DisplayObjectContainer = (function () {
    function DisplayObjectContainer() {
        this.array = [];
    }
    DisplayObjectContainer.prototype.draw = function (context2D) {
        for (var _i = 0, _a = this.array; _i < _a.length; _i++) {
            var Drawable = _a[_i];
            Drawable.draw(context2D);
        }
    };
    DisplayObjectContainer.prototype.addChild = function (child) {
        this.array.push(child);
    };
    return DisplayObjectContainer;
}());
//# sourceMappingURL=main.js.map