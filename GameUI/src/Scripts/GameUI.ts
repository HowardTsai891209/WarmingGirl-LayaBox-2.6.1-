import HealthBar from "./HealthBar"
import Timer from "./Timer"
export default class GameUI extends Laya.Scene{
    static instance: GameUI;
    public _health: HealthBar;
    public healthBar: Laya.Sprite;
    public health0: Laya.Sprite;
    public health1: Laya.Sprite;
    public health2: Laya.Sprite;
    public health3: Laya.Sprite;
    public health4: Laya.Sprite;
    public health5: Laya.Sprite;
    public health6: Laya.Sprite;
    public health7: Laya.Sprite;
    public health8: Laya.Sprite;
    public health9: Laya.Sprite;
    public currentHP: Laya.Text;
    public totalHP: Laya.Text;
    public healthArr: Laya.Sprite[];
    public preload: boolean = false;

    public _time: Timer;
    public minute: Laya.Text;
    public second: Laya.Text;

    public weapon: Laya.Sprite;

    createChildren():void {
        super.createChildren();
        this.loadScene("GameUI");
    }

    constructor() {
        super();
        GameUI.instance = this;
    }

    loadHealth():void {
        this.healthArr = [GameUI.instance.health0,
            GameUI.instance.health1,
            GameUI.instance.health2,
            GameUI.instance.health3,
            GameUI.instance.health4,
            GameUI.instance.health5,
            GameUI.instance.health6,
            GameUI.instance.health7,
            GameUI.instance.health8,
            GameUI.instance.health9,];
        this.preload = true;
    }

    onAwake():void {
        this.loadHealth();
        this._health = this.getComponent(HealthBar); 
        this._time = this.getComponent(Timer); 
        this._time.timer();
        // this._health.playerHP(5);              
    }

}