import Point from "./Point"
export default class Spin extends Laya.Scene{
    static instance: Spin;
    public spinWheel: Laya.Sprite;
    public pointer: Laya.Sprite;
    public _point: Point;
    private rotateSpeed: number = 20;
    createChildren():void {
        super.createChildren();
        this.loadScene("WeaponSpin");
    }
    
    constructor() {
        super();
        Spin.instance = this;
    }

    onAwake():void {
        Laya.timer.frameLoop(1, this, this.SpinFn);//轉盤轉動
        this._point = this.getComponent(Point);
    }

    onEnable():void {//點擊轉盤停止
        this.spinWheel.on(Laya.Event.CLICK, this, this.StopFn);
    }

    SpinFn():void {
        this.pointer.rotation += this.rotateSpeed;
    }

    StopFn():void {
        this.spinWheel.off(Laya.Event.CLICK, this, this.StopFn);
        Laya.timer.loop(50, this, function(){
            this.rotateSpeed *= 0.95;//轉盤緩慢停止
            if(this.rotateSpeed <= 0.1){//轉盤完全停止
                Laya.timer.clear(this, this.SpinFn);
                this._point.decideWeapon(this.pointer.rotation);                
                return;
            }
        })
    }
}