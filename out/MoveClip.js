var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MoveClip = (function (_super) {
    __extends(MoveClip, _super);
    function MoveClip(data) {
        var _this = _super.call(this) || this;
        _this.advancedTime = 0;
        _this.currentFraneIndex = 0;
        _this.ticker = function (deltaTime) {
            _this.advancedTime += deltaTime;
            if (_this.advancedTime >= MoveClip.FRAME_TIME * MoveClip.TOTAL_FRAME) {
                _this.advancedTime -= MoveClip.FRAME_TIME * MoveClip.TOTAL_FRAME;
            }
            _this.currentFraneIndex = Math.floor(_this.advancedTime / MoveClip.FRAME_TIME);
            var data = _this.data;
            var frameData = data.frames[_this.currentFraneIndex];
            var url = frameData.image;
        };
        _this.setMoveClipData(data);
        _this.play();
        return _this;
    }
    MoveClip.prototype.stop = function () {
        Ticker.getInstance().unregister(this.ticker);
    };
    MoveClip.prototype.pause = function () {
    };
    MoveClip.prototype.resume = function () {
    };
    MoveClip.prototype.play = function () {
        Ticker.getInstance().register(this.ticker);
    };
    MoveClip.prototype.setMoveClipData = function (data) {
        this.data = data;
        this.currentFraneIndex = 0;
        // this.image = image;
        //创建 / 更新 / 调用  分开
    };
    return MoveClip;
}(Bitmap));
MoveClip.FRAME_TIME = 20;
MoveClip.TOTAL_FRAME = 10;
var moveClipData = {
    name: "hero",
    frame: [
        { "image": "1.jpg" },
        { "image": "2.jpg" }
    ]
};
//# sourceMappingURL=MoveClip.js.map