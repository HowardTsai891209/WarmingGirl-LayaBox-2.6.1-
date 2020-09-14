import DiaLab from "./Diolog"
import ButtonObj from "./ButtonObject"
export default class commandReader extends Laya.Script{
    public btn1Text: string;
    public btn2Text: string;
    public btn3Text: string;
    public nextCom: number;
    private btnObj: ButtonObj;

    constructor() {
        super();   
    }

    onAwake():void{
        this.btnObj = this.owner.getComponent(ButtonObj);
    }

    readCom(command: string):void {
        switch (command[DiaLab.instance.comNum]) {
            case "characterON":
                DiaLab.instance.Face.visible = true;
                break;
            case "characterOFF":
                DiaLab.instance.Face.visible = false;
                break;
            case "Jump":
                DiaLab.instance.selNum = DiaLab.instance.comNum+1;
                this.btnObj.selectionJump();
                DiaLab.instance.ClickFn();
                break;
            case "Wait":
                var waitSecond: number = +DiaLab.instance.story[DiaLab.instance.waitNum] * 1000;
                DiaLab.instance.Diolog.off(Laya.Event.CLICK, DiaLab.instance, DiaLab.instance.ClickFn);
                setTimeout(function(){
                    DiaLab.instance.Diolog.on(Laya.Event.CLICK, DiaLab.instance, DiaLab.instance.ClickFn);
                    DiaLab.instance.line+=DiaLab.instance.findNext;
                    DiaLab.instance.chaNum+=DiaLab.instance.findNext;
                    DiaLab.instance.faceNum+=DiaLab.instance.findNext;
                    DiaLab.instance.comNum+=DiaLab.instance.findNext;
                    DiaLab.instance.waitNum+=DiaLab.instance.findNext;
                },waitSecond)
                break;
        }
    }

    showBtn(): void{
        this.nextCom = DiaLab.instance.comNum+DiaLab.instance.findNext;
        if(DiaLab.instance.story[this.nextCom] == "Selection2"){
            this.holdText();
            DiaLab.instance.Btn1.visible = true;
            DiaLab.instance.Btn1.label = this.btn1Text;

            DiaLab.instance.Btn2.visible = true;
            DiaLab.instance.Btn2.label = this.btn2Text;

        }else if(DiaLab.instance.story[this.nextCom] == "Selection3"){
            this.holdText();
            DiaLab.instance.Btn1.visible = true;
            DiaLab.instance.Btn1.label = this.btn1Text;

            DiaLab.instance.Btn2.visible = true;
            DiaLab.instance.Btn2.label = this.btn2Text;

            DiaLab.instance.Btn3.visible = true;
            DiaLab.instance.Btn3.label = this.btn3Text;
        }
    }

    holdText():void {
        DiaLab.instance.Diolog.off(Laya.Event.CLICK, DiaLab.instance, DiaLab.instance.ClickFn);
        DiaLab.instance.selNum = this.nextCom + 1;

        this.btn1Text = DiaLab.instance.story[DiaLab.instance.line+DiaLab.instance.findNext];
        this.btn2Text = DiaLab.instance.story[DiaLab.instance.line+DiaLab.instance.findNext*2];
        this.btn3Text = DiaLab.instance.story[DiaLab.instance.line+DiaLab.instance.findNext*3];
    }
}