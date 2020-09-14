import HealthBar from "./HealthBar"
export default class GameUI extends Laya.Scene{
    static instance: GameUI;
    public _health: HealthBar;
    public HealthUI: Laya.HSlider;

    createChildren():void {
        super.createChildren();
        this.loadScene("UI");
    }

    constructor() {
        super();
        GameUI.instance = this;
    }

    onAwake():void {
        this._health = this.getComponent(HealthBar);
        this._health.test(this.HealthUI, 10);        
    }
}