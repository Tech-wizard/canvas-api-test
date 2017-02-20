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
    var img = new Bitmap();
    img.src = "image.JPG";
    img.scaleX = 0.5;
    img.y = 10;
    img.alpha = 0.1;
    var tf1 = new TextField();
    tf1.text = "Hello";
    tf1.x = 0;
    tf1.alpha = 0.5;
    var tf2 = new TextField();
    tf2.text = "World";
    tf2.x = 100;
    tf2.y = 20;
    stage.addChild(img);
    stage.addChild(tf1);
    stage.addChild(tf2);
    //stage.removechild(tf1);
    setInterval(function () {
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        tf1.y++;
        img.x++;
        stage.draw(context2D);
    }, 100);
    console.log(canvas);
};
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.alpha = 1;
        this.globalAppha = 1;
        this.scaleX = 1;
        this.scaleY = 1;
    }
    DisplayObject.prototype.draw = function (context2D) {
        if (this.parent) {
            this.globalAppha = this.parent.globalAppha * this.alpha;
        }
        else {
            this.globalAppha = this.alpha;
        }
        context2D.globalAlpha = this.globalAppha;
        this.render(context2D);
    };
    DisplayObject.prototype.render = function (context2D) {
    };
    return DisplayObject;
}());
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        var _this = _super.call(this) || this;
        //texture: string;
        _this._src = "";
        _this.isLoaded = false;
        _this.image = document.createElement('img');
        return _this;
        // this.image.src = ad;
        //this.isLoade = false;
    }
    Object.defineProperty(Bitmap.prototype, "src", {
        set: function (value) {
            this._src = value;
            this.isLoaded = false;
        },
        enumerable: true,
        configurable: true
    });
    Bitmap.prototype.render = function (context2D) {
        var _this = this;
        context2D.globalAlpha = this.alpha;
        if (this.isLoaded) {
            context2D.drawImage(this.image, this.x, this.y);
        }
        else {
            this.image.src = this._src;
            this.image.onload = function () {
                context2D.drawImage(_this.image, _this.x, _this.y);
                _this.isLoaded = true;
            };
        }
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
    TextField.prototype.render = function (context2D) {
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
    };
    return TextField;
}(DisplayObject));
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
    function DisplayObjectContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.array = [];
        return _this;
    }
    DisplayObjectContainer.prototype.render = function (context2D) {
        for (var _i = 0, _a = this.array; _i < _a.length; _i++) {
            var Drawable = _a[_i];
            Drawable.draw(context2D);
        }
    };
    DisplayObjectContainer.prototype.addChild = function (child) {
        if (this.array.indexOf(child) == -1) {
            this.array.push(child);
            child.parent = this;
        }
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
}(DisplayObject));
var Graphics = (function () {
    function Graphics() {
    }
    return Graphics;
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