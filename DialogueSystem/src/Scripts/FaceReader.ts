import DiaLab from "./Diolog"
export default class faceReader extends Laya.Script{
    constructor() {
        super();   
    }

    readFace(face: string):void {       
         if(face[DiaLab.instance.chaNum] == "元老-狼大"){
            switch(face[DiaLab.instance.faceNum]){
                case "大哭":
                    DiaLab.instance.Face.skin = "face1/3-1.png";
                    break;
                case "大笑":
                    DiaLab.instance.Face.skin = "face1/3-1.png";
                    break;
            }
        } else if(face[DiaLab.instance.chaNum] == "玩家小紅"){
            switch(face[DiaLab.instance.faceNum]){
                case "大哭":
                    DiaLab.instance.Face.skin = "face1/2-1.png";
                    break;
                case "大笑":
                    DiaLab.instance.Face.skin = "face1/2-1.png";
                    break;
            }
        }
    }
}