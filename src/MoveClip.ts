class MoveClip extends Bitmap {

    private advancedTime: number = 0;

    private static FRAME_TIME = 20;

    private static TOTAL_FRAME = 10;

    private currentFraneIndex: number = 0;

    private data: moveClipData;

    constructor(data: moveClipData) {
        super();
        this.setMoveClipData(data);
        this.play();

    }

    ticker = (deltaTime) => {
        this.advancedTime += deltaTime;
        if (this.advancedTime >= MoveClip.FRAME_TIME * MoveClip.TOTAL_FRAME) {
            this.advancedTime -= MoveClip.FRAME_TIME * MoveClip.TOTAL_FRAME;
        }
        this.currentFraneIndex = Math.floor(this.advancedTime / MoveClip.FRAME_TIME);

        let data = this.data;

        let frameData = data.frames[this.currentFraneIndex];
        let url = frameData.image;
    }

    stop() {
        Ticker.getInstance().unregister(this.ticker);
    }

    pause() {

    }

    resume() {

    }

    play() {
        Ticker.getInstance().register(this.ticker);
    }


    public setMoveClipData(data: moveClipData) {
        this.data = data;
        this.currentFraneIndex = 0;
       // this.image = image;
        //创建 / 更新 / 调用  分开
    }
}

let moveClipData = {
    name: "hero",

    frame: [
        { "image": "1.jpg" },
        { "image": "2.jpg" }
    ]
}

type moveClipData = {
    name: string,
    frames: any[]
}




