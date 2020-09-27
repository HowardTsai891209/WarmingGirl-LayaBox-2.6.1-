import GameUI from "./GameUI";
export default class Timer extends Laya.Script {
    public minute: number;
    public second: number;
    constructor() {
        super();
    }

    onAwake(): void {
        this.second = 5;
        this.minute = 0;
        // this.timer();
    }

    timer(): void {
        Laya.timer.loop(1000, this, this.count);
    }

    count(): void {
        this.second -= 1;

        if (this.second < 10) {
            GameUI.instance.minute.text = "0" + this.minute.toString();
            GameUI.instance.second.text = "0" + this.second.toString();
            if (this.second < 0) {
                this.second = 59;
                this.minute -= 1;
                GameUI.instance.minute.text = "0" + this.minute.toString();
                GameUI.instance.second.text = this.second.toString();
            }
        } else if (this.second >= 10) {
            GameUI.instance.minute.text = "0" + this.minute.toString();
            GameUI.instance.second.text = this.second.toString();
        }

        if (this.second <= 0 && this.minute <= 0) {
            console.log("time");
            Laya.timer.clear(this, this.count);
        }
    }
}