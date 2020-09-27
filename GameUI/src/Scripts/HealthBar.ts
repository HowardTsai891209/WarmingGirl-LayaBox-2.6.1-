import GameUI from "./GameUI";

export default class HealthBar extends Laya.Script{
    public playerHealth: number = 100;
    public arrStart: number;
    public arrEnd: number;
    constructor() {
        super();
    }

    playerHP(damage: number):void{
            // this.playerHealth -= damage;
            GameUI.instance.currentHP.text = this.playerHealth.toString();
            this.showHealth();
    }

    showHealth():void {
        if(!GameUI.instance.preload) return;
        this.arrEnd = parseInt((this.playerHealth/10).toString());
        if(this.playerHealth <= 0){
            console.log("死亡");
            this.playerHealth = 0;
            GameUI.instance.healthArr[0].visible = false;
            return;
        }
        for(this.arrStart = 0;this.arrStart < this.arrEnd;this.arrStart++){
            GameUI.instance.healthArr[this.arrStart].visible = true;
        }
        for(this.arrStart = 9;this.arrStart > this.arrEnd;this.arrStart--){
            GameUI.instance.healthArr[this.arrStart].visible = false;
        }
    }
}