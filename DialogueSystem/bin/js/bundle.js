(function () {
    'use strict';

    class ButtonObj extends Laya.Script {
        constructor() {
            super();
        }
        btnClick() {
            DiaLab.instance.Diolog.on(Laya.Event.CLICK, DiaLab.instance, DiaLab.instance.ClickFn);
            DiaLab.instance.Btn1.visible = false;
            DiaLab.instance.Btn2.visible = false;
            DiaLab.instance.Btn3.visible = false;
        }
        selectionJump() {
            var selJump = DiaLab.instance.comNum;
            while (DiaLab.instance.story[selJump] !== DiaLab.instance.story[DiaLab.instance.selNum]) {
                selJump += DiaLab.instance.findNext;
            }
            if (DiaLab.instance.story[selJump] == DiaLab.instance.story[DiaLab.instance.selNum]) {
                DiaLab.instance.comNum = selJump;
                DiaLab.instance.chaNum = selJump + 2;
                DiaLab.instance.line = selJump + 3;
                DiaLab.instance.faceNum = selJump + 4;
                DiaLab.instance.ClickFn();
            }
        }
    }

    class commandReader extends Laya.Script {
        constructor() {
            super();
        }
        onAwake() {
            this.btnObj = this.owner.getComponent(ButtonObj);
        }
        readCom(command) {
            switch (command[DiaLab.instance.comNum]) {
                case "characterON":
                    DiaLab.instance.Face.visible = true;
                    break;
                case "characterOFF":
                    DiaLab.instance.Face.visible = false;
                    break;
                case "Jump":
                    DiaLab.instance.selNum = DiaLab.instance.comNum + 1;
                    this.btnObj.selectionJump();
                    DiaLab.instance.ClickFn();
                    break;
                case "Wait":
                    var waitSecond = +DiaLab.instance.story[DiaLab.instance.waitNum] * 1000;
                    DiaLab.instance.Diolog.off(Laya.Event.CLICK, DiaLab.instance, DiaLab.instance.ClickFn);
                    setTimeout(function () {
                        DiaLab.instance.Diolog.on(Laya.Event.CLICK, DiaLab.instance, DiaLab.instance.ClickFn);
                        DiaLab.instance.line += DiaLab.instance.findNext;
                        DiaLab.instance.chaNum += DiaLab.instance.findNext;
                        DiaLab.instance.faceNum += DiaLab.instance.findNext;
                        DiaLab.instance.comNum += DiaLab.instance.findNext;
                        DiaLab.instance.waitNum += DiaLab.instance.findNext;
                    }, waitSecond);
                    break;
            }
        }
        showBtn() {
            this.nextCom = DiaLab.instance.comNum + DiaLab.instance.findNext;
            if (DiaLab.instance.story[this.nextCom] == "Selection2") {
                this.holdText();
                DiaLab.instance.Btn1.visible = true;
                DiaLab.instance.Btn1.label = this.btn1Text;
                DiaLab.instance.Btn2.visible = true;
                DiaLab.instance.Btn2.label = this.btn2Text;
            }
            else if (DiaLab.instance.story[this.nextCom] == "Selection3") {
                this.holdText();
                DiaLab.instance.Btn1.visible = true;
                DiaLab.instance.Btn1.label = this.btn1Text;
                DiaLab.instance.Btn2.visible = true;
                DiaLab.instance.Btn2.label = this.btn2Text;
                DiaLab.instance.Btn3.visible = true;
                DiaLab.instance.Btn3.label = this.btn3Text;
            }
        }
        holdText() {
            DiaLab.instance.Diolog.off(Laya.Event.CLICK, DiaLab.instance, DiaLab.instance.ClickFn);
            DiaLab.instance.selNum = this.nextCom + 1;
            this.btn1Text = DiaLab.instance.story[DiaLab.instance.line + DiaLab.instance.findNext];
            this.btn2Text = DiaLab.instance.story[DiaLab.instance.line + DiaLab.instance.findNext * 2];
            this.btn3Text = DiaLab.instance.story[DiaLab.instance.line + DiaLab.instance.findNext * 3];
        }
    }

    class faceReader extends Laya.Script {
        constructor() {
            super();
        }
        readFace(face) {
            if (face[DiaLab.instance.chaNum] == "元老-狼大") {
                switch (face[DiaLab.instance.faceNum]) {
                    case "大哭":
                        DiaLab.instance.Face.skin = "face1/3-1.png";
                        break;
                    case "大笑":
                        DiaLab.instance.Face.skin = "face1/3-1.png";
                        break;
                }
            }
            else if (face[DiaLab.instance.chaNum] == "玩家小紅") {
                switch (face[DiaLab.instance.faceNum]) {
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

    class Reader extends Laya.Script {
        constructor() {
            super();
            this.storyPath = "../laya/assets/res/test.csv";
            this.preload = false;
        }
        onAwake() {
            this.comReader = this.owner.getComponent(commandReader);
            this.faReader = this.owner.getComponent(faceReader);
        }
        read(Num) {
            Laya.loader.load(this.storyPath, new Laya.Handler(this, (e) => {
                let text = e.split(",");
                this.comReader.readCom(text);
                this.faReader.readFace(text);
                DiaLab.instance.nameCase(text[Num]);
                if (DiaLab.instance.onlyOnce)
                    return;
                DiaLab.instance.story.length = 0;
                DiaLab.instance.story = DiaLab.instance.story.concat(e.split(","));
                this.preload = true;
            }));
        }
    }

    class DiaLab extends Laya.Scene {
        constructor() {
            super();
            this.story = [""];
            DiaLab.instance = this;
        }
        createChildren() {
            super.createChildren();
            this.loadScene("Msg");
        }
        onEnable() {
            this.Diolog.on(Laya.Event.CLICK, this, this.ClickFn);
        }
        onAwake() {
            this.reader = this.getComponent(Reader);
            this.comReader = this.getComponent(commandReader);
            this.onlyOnce = false;
            this.comNum = 8;
            this.chaNum = 10;
            this.line = 11;
            this.faceNum = 12;
            this.waitNum = 13;
            this.findNext = 7;
            this.word = 0;
            this.lineComplete = false;
            this.Btn1.visible = false;
            this.Btn2.visible = false;
            this.Btn3.visible = false;
            this.ShowWords();
        }
        ShowWords() {
            this.reader.read(this.chaNum);
            this.showWord = setInterval(() => {
                this.splitted = this.story[this.line][this.word];
                if (this.splitted == undefined)
                    return;
                this.Diolog.text += this.splitted;
                this.word++;
                if (this.story[this.line][this.word] == undefined) {
                    clearInterval(this.showWord);
                    this.lineComplete = true;
                    this.comReader.showBtn();
                }
            }, 10);
        }
        isEnd() {
            if (this.story[this.line + this.findNext] == undefined) {
                this.Diolog.off(Laya.Event.CLICK, this, this.ClickFn);
                console.log("結束");
                return;
            }
            else if (this.story[this.line][this.word] == undefined) {
                this.onlyOnce = true;
                this.word = 0;
                this.Diolog.text = "";
                this.line += this.findNext;
                this.chaNum += this.findNext;
                this.faceNum += this.findNext;
                this.comNum += this.findNext;
                this.waitNum += this.findNext;
                return;
            }
        }
        ClickFn() {
            this.lineComplete = !this.lineComplete;
            if (this.lineComplete) {
                clearInterval(this.showWord);
                this.word = this.story[this.line].length;
                this.Diolog.text = this.story[this.line];
                this.lineComplete = true;
                this.comReader.showBtn();
            }
            else {
                this.isEnd();
                this.ShowWords();
            }
        }
        nameCase(name) {
            switch (name) {
                case "玩家小紅":
                    this.Name.text = "小紅";
                    break;
                case "元老-狼大":
                    this.Name.text = "元老-狼大";
                    break;
                case "":
                    this.Name.text = "";
                    break;
                case "D":
                    this.Name.text = "D";
                    break;
                case "E":
                    this.Name.text = "E";
                    break;
                case "F":
                    this.Name.text = "F";
                    break;
                case "G":
                    this.Name.text = "G";
                    break;
                case "H":
                    this.Name.text = "H";
                    break;
                case "I":
                    this.Name.text = "I";
                    break;
            }
        }
    }

    class Button1 extends Laya.Script {
        constructor() {
            super();
        }
        onAwake() {
            this.btnObj = this.owner.getComponent(ButtonObj);
        }
        onEnable() {
            let button = this.owner;
            button.on(Laya.Event.CLICK, this, () => {
                DiaLab.instance.Btn1.skin = "Dialog/按鈕(選擇).png";
                this.btnObj.btnClick();
                this.btnObj.selectionJump();
            });
            button.on(Laya.Event.MOUSE_OVER, this, () => {
                DiaLab.instance.Btn1.skin = "Dialog/按鈕(接觸).png";
            });
            button.on(Laya.Event.MOUSE_OUT, this, () => {
                DiaLab.instance.Btn1.skin = "Dialog/按鈕(未選)_修正.png";
            });
        }
    }

    class Button2 extends Laya.Script {
        constructor() {
            super();
        }
        onAwake() {
            this.btnObj = this.owner.getComponent(ButtonObj);
        }
        onEnable() {
            let button = this.owner;
            button.on(Laya.Event.CLICK, this, () => {
                DiaLab.instance.Btn2.skin = "Dialog/按鈕(選擇).png";
                DiaLab.instance.selNum += DiaLab.instance.findNext;
                this.btnObj.btnClick();
                this.btnObj.selectionJump();
            });
            button.on(Laya.Event.MOUSE_OVER, this, () => {
                DiaLab.instance.Btn2.skin = "Dialog/按鈕(接觸).png";
            });
            button.on(Laya.Event.MOUSE_OUT, this, () => {
                DiaLab.instance.Btn2.skin = "Dialog/按鈕(未選)_修正.png";
            });
        }
    }

    class Button3 extends Laya.Script {
        constructor() {
            super();
        }
        onAwake() {
            this.btnObj = this.owner.getComponent(ButtonObj);
        }
        onEnable() {
            let button = this.owner;
            button.on(Laya.Event.CLICK, this, () => {
                DiaLab.instance.Btn3.skin = "Dialog/按鈕(選擇).png";
                DiaLab.instance.selNum += DiaLab.instance.findNext * 2;
                this.btnObj.btnClick();
                this.btnObj.selectionJump();
            });
            button.on(Laya.Event.MOUSE_OVER, this, () => {
                DiaLab.instance.Btn3.skin = "Dialog/按鈕(接觸).png";
            });
            button.on(Laya.Event.MOUSE_OUT, this, () => {
                DiaLab.instance.Btn3.skin = "Dialog/按鈕(未選)_修正.png";
            });
        }
    }

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("Scripts/Diolog.ts", DiaLab);
            reg("Scripts/Reader.ts", Reader);
            reg("Scripts/FaceReader.ts", faceReader);
            reg("Scripts/commandReader.ts", commandReader);
            reg("Scripts/ButtonObject.ts", ButtonObj);
            reg("Scripts/Button1.ts", Button1);
            reg("Scripts/Button2.ts", Button2);
            reg("Scripts/Button3.ts", Button3);
        }
    }
    GameConfig.width = 1920;
    GameConfig.height = 1080;
    GameConfig.scaleMode = "exactfit";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "Msg.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
