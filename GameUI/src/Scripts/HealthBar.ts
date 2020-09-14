export default class HealthBar extends Laya.Script{
    constructor() {
        super();
    }

    test(target: Laya.HSlider, damage: number):void{
        Laya.timer.loop(1000,this,function(){
            console.log(target.value);
            target.value -= damage;
        })
    }
}