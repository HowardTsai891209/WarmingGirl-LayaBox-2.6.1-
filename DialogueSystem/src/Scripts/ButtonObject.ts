import DiaLab from "./Diolog"
export default class ButtonObj extends Laya.Script{
    constructor() {
        super();
    }
    
    btnClick(): void {
        DiaLab.instance.Diolog.on(Laya.Event.CLICK, DiaLab.instance, DiaLab.instance.ClickFn);
        DiaLab.instance.Btn1.visible = false;
        DiaLab.instance.Btn2.visible = false;
        DiaLab.instance.Btn3.visible = false;
    }

    selectionJump():void{
        var selJump = DiaLab.instance.comNum;
        while(DiaLab.instance.story[selJump] !== DiaLab.instance.story[DiaLab.instance.selNum]){          
            selJump += DiaLab.instance.findNext;
        }
        if(DiaLab.instance.story[selJump] == DiaLab.instance.story[DiaLab.instance.selNum]){
            DiaLab.instance.comNum = selJump;
            DiaLab.instance.chaNum = selJump+2;
            DiaLab.instance.line = selJump+3;
            DiaLab.instance.faceNum = selJump+4;
            DiaLab.instance.ClickFn();
        }
    }
}