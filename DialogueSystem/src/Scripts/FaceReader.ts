import DiaLab from "./Diolog"
export default class faceReader extends Laya.Script{
    constructor() {
        super();   
    }

    readFace(face: string):void {       
         if(face[DiaLab.instance.chaNum] == "吳俞恆"){
            switch(face[DiaLab.instance.faceNum]){
                case "大哭":
                    DiaLab.instance.Face.skin = "face/Zh/Zh_a1003.png";
                    break;
                case "大笑":
                    DiaLab.instance.Face.skin = "face/Zh/Zh_a1005.png";
                    break;
            }
        } else if(face[DiaLab.instance.chaNum] == "少女"){
            switch(face[DiaLab.instance.faceNum]){
                case "大哭":
                    DiaLab.instance.Face.skin = "face/Gu/Gu_a1003.png";
                    break;
                case "大笑":
                    DiaLab.instance.Face.skin = "face/Gu/Gu_a1005.png";
                    break;
            }
        }
    }
}