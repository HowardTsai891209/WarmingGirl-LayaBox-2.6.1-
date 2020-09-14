export default class Point extends Laya.Script {
    constructor() {
        super();
    }

    decideWeapon(rotation: number): void {
        rotation %= 360;
        if (rotation >= 150 && rotation <= 210) {
            console.log(1);
            return;
        }else if (rotation >= 90 && rotation <= 150) {
            console.log(2);
            return;
        }else if (rotation >= 30 && rotation <= 90) {
            console.log(3);
            return;
        }else if (rotation >= 330 || rotation <= 30) {
            console.log(4);
            return;
        }else if (rotation >= 270 && rotation <= 330) {
            console.log(5);
            return;
        }else if (rotation >= 210 && rotation <= 270) {
            console.log(6);
            return;
        }
    }
}