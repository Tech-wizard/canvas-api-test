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
    img.scaleX = 0.5;
    img.y = 10;
    var tf1 = new TextField();
    tf1.text = "Hello";
    tf1.x = 0;
    var tf2 = new TextField();
    tf2.text = "World";
    tf2.x = 100;
    tf2.y = 20;
    stage.addChild(tf1);
    stage.addChild(tf2);
    stage.addChild(img);
    //stage.removechild(tf1);
    var x = 0;
    //setInterval(() => {
    context2D.clearRect(0, 0, canvas.width, canvas.height);
    stage.draw(context2D);
    // }, 30);
    console.log(canvas);
};
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.alpha = 1;
        this.scaleX = 1;
        this.scaleY = 1;
    }
    // canvas = document.getElementById("app") as HTMLCanvasElement;
    // context2D = this.canvas.getContext("2d");
    DisplayObject.prototype.draw = function (context2D) {
    };
    return DisplayObject;
}());
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap(ad) {
        var _this = _super.call(this) || this;
        _this.image = document.createElement('img');
        _this.image.src = ad;
        _this.width = _this.image.width;
        _this.height = _this.image.height;
        return _this;
    }
    Bitmap.prototype.draw = function (context2D) {
        var _this = this;
        if (this.scaleX != 1 || this.scaleY != 1) {
            context2D.scale(this.scaleX, this.scaleY);
        }
        if (this.alpha != 1) {
            context2D.globalAlpha = this.alpha;
        }
        this.image.onload = function () {
            context2D.drawImage(_this.image, _this.x, _this.y);
            context2D.scale(1, 1);
            context2D.globalAlpha = 1;
        };
    };
    return Bitmap;
}(DisplayObject));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = "";
        _this.font = "Arial";
        _this.size = "40";
        return _this;
    }
    TextField.prototype.draw = function (context2D) {
        if (this.scaleX != 1 || this.scaleY != 1) {
            context2D.scale(this.scaleX, this.scaleY);
        }
        context2D.font = this.size + "px " + this.font;
        context2D.fillText(this.text, this.x, this.y);
        context2D.scale(1, 1);
        context2D.globalAlpha = 1;
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
    DisplayObjectContainer.prototype.removechild = function (child) {
        var index = this.array.indexOf(child);
        if (index > -1) {
            this.array.splice(index, 1);
        }
    };
    DisplayObjectContainer.prototype.removeall = function () {
        this.array = [];
    };
    return DisplayObjectContainer;
}());
var Shape = (function (_super) {
    __extends(Shape, _super);
    function Shape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Shape.prototype.draw = function (context2D) {
        context2D.fillRect(0, 0, 0, 0);
    };
    return Shape;
}(DisplayObject));
//# sourceMappingURL=main.js.map