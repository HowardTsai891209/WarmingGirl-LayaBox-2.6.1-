import DiaLab from "./Diolog"
import ButtonObj from "./ButtonObject"
export default class Button3 extends Laya.Script{
    private btnObj: ButtonObj;
    constructor() {
        super();
    }

    onAwake():void{
        this.btnObj = this.owner.getComponent(ButtonObj);
    }
    
    onEnable(): void{
        let button: Laya.Button = this.owner as Laya.Button;
        button.on(Laya.Event.CLICK, this,()=>{
            DiaLab.instance.Btn3.skin = "Dialog/按鈕(選擇).png";
            DiaLab.instance.selNum += DiaLab.instance.findNext*2;
            this.btnObj.btnClick();
            this.btnObj.selectionJump();
            // DiaLab.instance.btnClick();
            // var selJump = DiaLab.instance.comNum;
            // while(DiaLab.instance.story[selJump] !== DiaLab.instance.story[DiaLab.instance.selNum]){          
            //     selJump += DiaLab.instance.findNext;
            // }
            // if(DiaLab.instance.story[selJump] == DiaLab.instance.story[DiaLab.instance.selNum]){
            //     DiaLab.instance.comNum = selJump;
            //     DiaLab.instance.chaNum = selJump+2;
            //     DiaLab.instance.line = selJump+3;
            //     DiaLab.instance.faceNum = selJump+4;
            //     DiaLab.instance.ClickFn();
            // }
        });

        button.on(Laya.Event.MOUSE_OVER, this,()=>{ 
            DiaLab.instance.Btn3.skin = "Dialog/按鈕(接觸).png";           
        })
        button.on(Laya.Event.MOUSE_OUT, this,()=>{ 
            DiaLab.instance.Btn3.skin = "Dialog/按鈕(未選)_修正.png";           
        })
    }
}